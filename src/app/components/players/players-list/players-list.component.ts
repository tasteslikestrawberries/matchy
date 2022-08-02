import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Observable, tap, startWith, catchError, of, map } from 'rxjs';
import { IPlayer } from 'src/app/models/IPlayer';
import { PlayerService } from 'src/app/services/player.service';
import { MatDialog } from '@angular/material/dialog';
import { PlayerCardComponent } from '../player-card/player-card.component';
import { MatchService } from 'src/app/services/match.service';
import { IMatch } from 'src/app/models/IMatch';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements OnInit {
  players$?: Observable<IPlayer[]>;
  isLoading$?: Observable<boolean>;
  error$?: Observable<Error | false>;
  players?: any;
  matches?: IMatch[];

  //MAT TABLE
  displayedColumns = ['idx', 'name', 'email', 'totalSetsWon', 'actions'];
  dataSource!: MatTableDataSource<IPlayer[]>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private playerService: PlayerService, private matchService: MatchService, public dialog: MatDialog) { }

  ngOnInit() {
    this.fetchPlayers();
  }

  fetchPlayers() {
    this.players$ = this.playerService.getPlayers().pipe(
      tap((data: any) => {
        this.players = data;
        this.fetchMatches();
        this.resetDataSource();
      })
    );

    this.isLoading$ = this.players$.pipe(
      map(() => false),
      startWith(true),
      catchError((err) => of(false))
    );

    this.error$ = this.players$.pipe(
      map(() => false),
      catchError((err) => of(err))
    );
  }

  fetchMatches() {
    this.matchService.getMatches().subscribe(data => {
      this.matches = data;

      const wonSetsObj = this.matches?.reduce((acc: any, { player1, player2 }) => {
        const idP1 = player1.id;
        const idP2 = player2.id;
        const setsWonP1 = player1.setsWon;
        const setsWonP2 = player2.setsWon;

        //p1
        if (!acc[idP1]) {
          acc[idP1] = 0;
        }
        acc[idP1] += setsWonP1;

        //p2
        if (!acc[idP2]) {
          acc[idP2] = 0;
        }
        acc[idP2] += setsWonP2;

        return acc;
      }, {})

      //sets players' totalSetsWon
      this.players = this.players.map((player: any) => {
        return { ...player, totalSetsWon: wonSetsObj[player.id] ?? 0 }
      })

      this.resetDataSource()
    })
  }

  resetDataSource() {
    this.dataSource = new MatTableDataSource(this.players);
    this.sortPlayers();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  sortPlayers() {
    this.players = this.players.sort((a: any, b: any) => b.totalSetsWon - a.totalSetsWon);
  }

  showDetails(id: string) {
    const player = this.players.find((player: IPlayer) => player.id === id)
    let dialogRef = this.dialog.open(PlayerCardComponent, {
      width: '400px',
      height: 'auto',
      data: {
        player: player
      }
    });
  }

  deletePlayer(id: string) {
    this.playerService.deletePlayer(id);
    this.players = this.players.filter((player: IPlayer) => player.id !== id);
    this.resetDataSource();
  }

}

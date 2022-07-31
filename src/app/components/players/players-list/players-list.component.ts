import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Observable, tap, startWith, catchError, of, map } from 'rxjs';
import { IPlayer } from 'src/app/models/IPlayer';
import { PlayerService } from 'src/app/services/player.service';
import { MatDialog } from '@angular/material/dialog';
import { PlayerCardComponent } from '../player-card/player-card.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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

  //MAT TABLE
  displayedColumns = ['idx', 'name', 'email', 'actions'];
  dataSource!: MatTableDataSource<IPlayer[]>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private playerService: PlayerService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchPlayers();
  }

  fetchPlayers() {
    this.players$ = this.playerService.getPlayers().pipe(
      tap((data: any) => {
        this.players = data;
        console.log(this.players)
        this.resetDataSource()
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

  resetDataSource() {
    this.dataSource = new MatTableDataSource(this.players);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  sortData(sort: Sort) {
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

}

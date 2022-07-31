import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Observable, tap, startWith, catchError, of, map } from 'rxjs';
import { IPlayer } from 'src/app/models/IPlayer';
import { MatchService } from 'src/app/services/match.service';
import { MatDialog } from '@angular/material/dialog';
import { MatchCardComponent } from '../match-card/match-card.component';
import { IMatch } from 'src/app/models/IMatch';

@Component({
  selector: 'app-matches-list',
  templateUrl: './matches-list.component.html',
  styleUrls: ['./matches-list.component.scss']
})
export class MatchesListComponent implements OnInit {
  matches$?: Observable<IPlayer[]>;
  isLoading$?: Observable<boolean>;
  error$?: Observable<Error | false>;
  matches?: any;
  
  //MAT TABLE
  displayedColumns = ['player1', 'setswon1', 'player2', 'setswon2', 'actions'];
  dataSource!: MatTableDataSource<IPlayer[]>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private matchService: MatchService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchMatches();
  }

  fetchMatches() {
    this.matches$ = this.matchService.getMatches().pipe(
      tap((data: any) => {
        this.matches = data;
        this.resetDataSource()
      })
    );

    this.isLoading$ = this.matches$.pipe(
      map(() => false),
      startWith(true),
      catchError((err) => of(false))
    );

    this.error$ = this.matches$.pipe(
      map(() => false),
      catchError((err) => of(err))
    );
  }

  resetDataSource() {
    this.dataSource = new MatTableDataSource(this.matches);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  sortData(sort: Sort) {
  }

  showDetails(id: string) {
    const match = this.matches.find((match: IMatch) => match.id === id)
    let dialogRef = this.dialog.open(MatchCardComponent, {
      width: '400px',
      height: 'auto',
      data: {
        match: match
      }
    });
  }

  deleteMatch(id: string) {
    this.matchService.deleteMatch(id);
    this.matches = this.matches.filter( (match: IMatch) => match.id !== id);
    this.resetDataSource();
  }

}

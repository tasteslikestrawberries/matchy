import { Injectable } from '@angular/core';
import { IPlayer } from '../models/IPlayer';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private subject = new BehaviorSubject<IPlayer[]>([]);
  players$ = this.subject.asObservable();

  private url =
    'https://matchy-acb41-default-rtdb.europe-west1.firebasedatabase.app/players.json';

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<IPlayer[]> {
    return this.http.get(this.url).pipe(
      map((data) =>
        Object.entries(data).map(([id, player]) => {
          return { id: id, ...player };
        })
      )
    );
  }

  addPlayer(player: IPlayer) {
    this.http.post<IPlayer>(this.url, player).subscribe();
  }

  deletePlayer(id: string) {
    this.http
      .delete<IPlayer>(
        `https://matchy-acb41-default-rtdb.europe-west1.firebasedatabase.app/players/${id}.json`
      )
      .subscribe();
  }

}
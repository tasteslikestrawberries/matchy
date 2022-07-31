import { Injectable } from '@angular/core';
import { IMatch } from '../models/IMatch';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private subject = new BehaviorSubject<IMatch[]>([]);
  matches$ = this.subject.asObservable();

  private url =
    'https://matchy-acb41-default-rtdb.europe-west1.firebasedatabase.app/matches.json';

  constructor(private http: HttpClient) { }

  getMatches(): Observable<IMatch[]> {
    return this.http.get(this.url).pipe(
      map((data) =>
        Object.entries(data).map(([id, match]) => {
          return { id: id, ...match };
        })
      )
    );
  }

  addMatch(match: IMatch) {
    this.http.post<IMatch>(this.url, match).subscribe();
  }

}
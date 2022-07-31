import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective, Validators, FormBuilder, FormControl, FormGroup, FormArray, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { tap, Subscription } from 'rxjs';
import { IMatch } from 'src/app/models/IMatch';
import { IPlayer } from 'src/app/models/IPlayer';
import { MatchService } from 'src/app/services/match.service';
import { PlayerService } from 'src/app/services/player.service';


@Component({
  selector: 'app-matches-form',
  templateUrl: './matches-form.component.html',
  styleUrls: ['./matches-form.component.scss']
})
export class MatchesFormComponent implements OnInit, OnDestroy {

  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;

  match?: IMatch;
  playerSub?: Subscription;
  players!: IPlayer[];

  matchForm = this.fb.group({
    player1Name: ['', Validators.required],
    player2Name: ['', Validators.required],
    points1: this.fb.array([this.createNewSet()], [Validators.minLength(3), Validators.maxLength(5)]),
    points2: this.fb.array([this.createNewSet()], [Validators.minLength(3), Validators.maxLength(5)])
  });

  exceededMaximumSets = false;

  constructor(
    private fb: FormBuilder,
    private matchService: MatchService,
    private playerService: PlayerService,
    private router: Router) { }

  ngOnInit(): void {
    this.fetchPlayers();
  }

  //for validators to access form values
  get f() { return this.matchForm.controls; }
  get points1(): FormArray {
    return this.matchForm.get("points1") as FormArray
  }
  get points2(): FormArray {
    return this.matchForm.get("points2") as FormArray
  }


  fetchPlayers() {
    this.playerSub = this.playerService.getPlayers().pipe(
      tap((data: any) => {
        this.players = data;
      })
    ).subscribe();
  }

  onSubmit() {

    const formValues = this.matchForm.value;
    const [firstPlayerWins, secondPlayerWins] = this.calculateSetsWon();
    this.match = {
      player1: {
        id: this.players.find((player) => player.name === formValues.player1Name)?.id!,
        name: formValues.player1Name!,
        points: this.points1.value.map((obj: any) => obj.set),
        setsWon: firstPlayerWins
      },
      player2: {
        id: this.players.find((player) => player.name === formValues.player2Name)?.id!,
        name: formValues.player2Name!,
        points: this.points2.value.map((obj: any) => obj.set),
        setsWon: secondPlayerWins
      },
    }

    this.setWinner(this.match);
    this.matchService.addMatch(this.match);
    this.formGroupDirective.resetForm();
    this.navigateToMain();
  }

  addSetPoints() {
    if (this.points1.length >= 5 || this.points2.length >= 5) {
      this.exceededMaximumSets = true;
      return
    } else {
      this.points1.push(this.createNewSet());
      this.points2.push(this.createNewSet());
    }
  }

  createNewSet(): FormGroup {
    return new FormGroup({
      'set': new FormControl('')
    })
  }

  calculateSetsWon() {
    let firstPlayerWins = 0;
    let secondPlayerWins = 0;
    for(let i = 0; i<this.points1.length; i++) {
    
      if(this.points1.value[i].set > this.points2.value[i].set) {
        ++firstPlayerWins
      } else ++secondPlayerWins
    }
    return [firstPlayerWins, secondPlayerWins]
  }

  setWinner(match: IMatch) {
   if(match.player1.setsWon > match.player2.setsWon) {
    match.winner = match.player1.name
   } else {
    match.winner = match.player2.name
   }
  }

  navigateToMain() {
    this.router.navigate(['/'])
  }

  ngOnDestroy(): void {
    this.playerSub?.unsubscribe();
  }

}
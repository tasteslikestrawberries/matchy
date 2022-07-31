import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective, Validators, FormBuilder } from '@angular/forms';
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
    p1s1: ['', Validators.required],
    p1s2: ['', Validators.required],
    p1s3: ['', Validators.required],
    p1s4: ['', Validators.required],
    p1s5: ['', Validators.required],
    p2s1: ['', Validators.required],
    p2s2: ['', Validators.required],
    p2s3: ['', Validators.required],
    p2s4: ['', Validators.required],
    p2s5: ['', Validators.required],
  });

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

  fetchPlayers() {
    this.playerSub = this.playerService.getPlayers().pipe(
      tap((data: any) => {
        this.players = data;
      })
    ).subscribe();
  }

  onSubmit() {

    const formValues = this.matchForm.value;
    this.match = {
      player1: {
        id: this.players.find((player) => player.name === formValues.player1Name)?.id!,
        name: formValues.player1Name!,
        points: [+formValues.p1s1!, +formValues.p1s2!, +formValues.p1s3!, +formValues.p1s4!, +formValues.p1s5!]
      },
      player2: {
        id: this.players.find((player) => player.name === formValues.player2Name)?.id!,
        name: formValues.player2Name!,
        points: [+formValues.p2s1!, +formValues.p2s2!, +formValues.p2s3!, +formValues.p2s4!, +formValues.p2s5!]
      }
    }
    this.matchService.addMatch(this.match);
    this.formGroupDirective.resetForm();
    this.navigateToMain();
  }

  navigateToMain() {
    this.router.navigate(['/'])
  }

  ngOnDestroy(): void {
    this.playerSub?.unsubscribe();
  }

}
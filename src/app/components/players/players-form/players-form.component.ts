import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IPlayer } from 'src/app/models/IPlayer';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-players-form',
  templateUrl: './players-form.component.html',
  styleUrls: ['./players-form.component.scss']
})
export class PlayersFormComponent {

  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;

  player!: IPlayer;

  playerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(private fb: FormBuilder, private playerService: PlayerService, private router: Router) { }

  get f() { return this.playerForm.controls; } //for validators to access form values

  onSubmit() {
    this.player = this.playerForm.value as IPlayer;
    this.playerService.addPlayer(this.player);
    this.formGroupDirective.resetForm();
    this.navigateToMain();
  }

  navigateToMain() {
    this.router.navigate(['/players-list'])
  }
}
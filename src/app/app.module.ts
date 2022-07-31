import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlayersListComponent } from './components/players/players-list/players-list.component';
import { PlayersFormComponent } from './components/players/players-form/players-form.component';
import { PlayerCardComponent } from './components/players/player-card/player-card.component';
import { MatchesListComponent } from './components/matches/matches-list/matches-list.component';
import { MatchesFormComponent } from './components/matches/matches-form/matches-form.component';
import { MatchCardComponent } from './components/matches/match-card/match-card.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    PlayersListComponent,
    PlayersFormComponent,
    PlayerCardComponent,
    MatchesListComponent,
    MatchesFormComponent,
    MatchCardComponent,
    DashboardComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

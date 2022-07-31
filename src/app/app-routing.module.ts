import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatchesFormComponent } from './components/matches/matches-form/matches-form.component';
import { MatchesListComponent } from './components/matches/matches-list/matches-list.component';
import { PlayersFormComponent } from './components/players/players-form/players-form.component';
import { PlayersListComponent } from './components/players/players-list/players-list.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'matches-list', component: MatchesListComponent },
  { path: 'matches-form', component: MatchesFormComponent },
  { path: 'players-list', component: PlayersListComponent },
  { path: 'players-form', component: PlayersFormComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

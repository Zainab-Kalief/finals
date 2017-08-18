import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuestionComponent } from './question/question.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'log_out', redirectTo: '', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'home/:score', component: HomeComponent},
  {path: 'home/:result', component: HomeComponent},
  {path: 'new_question', component: QuestionComponent},
  {path: 'lets_play', component: GameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {TicketComponent} from './components/ticket/ticket.component';
import {TicketsComponent} from './components/tickets/tickets.component';
import {SearchComponent} from './components/search/search.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'ticket', component: TicketComponent},
  {path: 'tickets', component: TicketsComponent},
  {path: 'search/:term', component: SearchComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

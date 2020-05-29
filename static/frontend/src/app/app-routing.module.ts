import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {TicketComponent} from './components/ticket/ticket.component';
import {TicketsComponent} from './components/tickets/tickets.component';
import {SearchComponent} from './components/search/search.component';
import { UpdateTicketComponent } from './components/update-ticket/update-ticket.component';
import { CreateTicketComponent } from './components/create-ticket/create-ticket.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'ticket/:id', component: TicketComponent},
  {path: 'tickets', component: TicketsComponent},
  {path: 'create-ticket', component: CreateTicketComponent},
  {path: 'update-ticket/:id', component: UpdateTicketComponent},
  {path: 'search/:term', component: SearchComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

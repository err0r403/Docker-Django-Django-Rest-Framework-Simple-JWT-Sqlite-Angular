import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {TicketComponent} from './components/ticket/ticket.component';
import {TicketsComponent} from './components/tickets/tickets.component';
import {SearchComponent} from './components/search/search.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import {TicketCardComponent} from './components/ticket-card/ticket-card.component';

import {TicketsService} from './services/tickets.service';
import { NoopInterceptor } from './http-interceptors/noop-interceptor';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    TicketComponent,
    TicketsComponent,
    SearchComponent,
    NavbarComponent,
    TicketCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    TicketsService,
    { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

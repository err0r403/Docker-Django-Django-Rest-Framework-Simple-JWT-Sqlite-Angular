import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {TicketsInterface} from '../interfaces/tickets.interface';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: `Bearer ${localStorage.getItem('access')}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private tickets: TicketsInterface[];

  constructor(private http: HttpClient) {
    console.log('-.-');
  }

  private myAccountUrl = 'http://127.0.0.1:8000/api/my-account/';
  public getMyAccount(): Observable<any> {
    return this.http.get<any>(this.myAccountUrl, httpOptions);
  }

  private ticketsUrl = 'http://127.0.0.1:8000/api/tickets/';
  public getTickets(): Observable<TicketsInterface[]> {
    return this.http.get<TicketsInterface[]>(this.ticketsUrl, httpOptions);
  }

  public getMyTickets(): Observable<TicketsInterface[]> {
    return this.http.get<TicketsInterface[]>(this.ticketsUrl + '?my-tickets=1', httpOptions);
  }

  public getTicket(id: string): Observable<TicketsInterface> {
    const ticketUrl = `${this.ticketsUrl}${id}`;
    return this.http.get<TicketsInterface>(ticketUrl, httpOptions);
  }

  public createTicket(ticket: {}): Subscription {
    return this.create(ticket).subscribe((data) => {

    });
  }

  public create(ticket: {}): Observable<any> {
    return this.http.post(this.ticketsUrl, ticket);
  }

  public updateTicket(ticket: {}, id: number): Subscription {
    return this.update(ticket, id).subscribe((data) => {

    });
  }

  public update(ticket: {}, id: number): Observable<any> {
    const ticketUrl = `${this.ticketsUrl}${id}/`;
    return this.http.patch(ticketUrl, ticket);
  }

  public searchTicketAndFilter(term: string, filter: string) {
    term = term.toLocaleLowerCase();
    filter = filter.toLocaleLowerCase();
    console.log('term & filter!', term, filter);
    if ('title description state author'.indexOf(filter) >= 0) {
      console.log('term & filter?', term, filter);
      const ticketsArr = [];
      return new Observable<TicketsInterface[]>((observer) => {
        this.http.get<TicketsInterface[]>(this.ticketsUrl, httpOptions)
        .subscribe((tickets) => {
          for (const ticket of tickets) {
            let filtered = ticket[`${filter}`].toString();
            filtered = filtered.toLocaleLowerCase();
            console.log('filtered', filtered);
            if (filtered.indexOf(term) >= 0) {
              console.log('term & filter3', term, filter);
              ticketsArr.push(ticket);
              }
            }
          observer.next(ticketsArr);
        }, (e) => {
          observer.next(ticketsArr);
        });
      });
    }
  }

  public searchTicket(term: string): Observable<TicketsInterface[]> {
    term = term.toLocaleLowerCase();
    const ticketsArr = [];
    return new Observable<TicketsInterface[]>((observer) => {
      this.http.get<TicketsInterface[]>(this.ticketsUrl, httpOptions)
        .subscribe((tickets) => {
          for (const ticket of tickets) {
            const title = ticket.title.toLocaleLowerCase();
            const description = ticket.description.toLocaleLowerCase();
            const author = ticket.author.toString();
            const state = ticket.state.toLocaleLowerCase();
            console.log('term', term);
            if (title.indexOf(term) >= 0 || description.indexOf(term) >= 0 || author.indexOf(term) >= 0 || state.indexOf(term) >= 0) {
              ticketsArr.push(ticket);
            }
          }
          observer.next(ticketsArr);
      }, (e) => {
        observer.next(ticketsArr);
      });
    });
  }
}

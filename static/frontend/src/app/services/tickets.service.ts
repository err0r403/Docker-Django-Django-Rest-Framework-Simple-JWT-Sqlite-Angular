import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {TicketsInterface} from '../interfaces/tickets.interface';
import { Observable } from 'rxjs/internal/Observable';

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

  private ticketsUrl = 'http://127.0.0.1:8000/api/tickets';
  public getTickets(): Observable<TicketsInterface[]> {
    return this.http.get<TicketsInterface[]>(this.ticketsUrl, httpOptions);
  }

  public getTicket(id: string): TicketsInterface {
    return this.tickets
      .find(ticket => ticket.id === parseInt(id, 10));
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

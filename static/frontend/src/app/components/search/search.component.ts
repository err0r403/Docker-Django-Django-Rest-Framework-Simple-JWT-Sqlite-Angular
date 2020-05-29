import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TicketsInterface} from '../../interfaces/tickets.interface';

import { TicketsService } from '../../services/tickets.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public tickets: TicketsInterface[];
  public term: string;
  public filter: string;
  public flag: boolean;

  constructor(
    private activatedRouter: ActivatedRoute,
    private ticketsService: TicketsService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe((params) => {
      this.filter = params.filter;
      console.log('filter1', this.filter);
    });
    this.activatedRouter.params.subscribe((params) => {
      this.term = params.term;
      if (!this.filter){
        this.ticketsService.searchTicket(params.term).subscribe((tickets: TicketsInterface[]) => this.tickets = tickets);
      } else {
        console.log('term & filter2', this.term, this.filter);
        this.ticketsService.searchTicketAndFilter(this.term, this.filter)
          .subscribe((tickets: TicketsInterface[]) => this.tickets = tickets);
      }
    });
  }

  public searchMyTickets(term: string, filter: string, checked: string) {
    console.log('checked', checked);
    if (checked) {
      this.router.navigate(['/search', term], { queryParams: {filter}});
    } else {

    }
  }

  public searchTickets(term: string, filter: string) {
    this.router.navigate(['/search', term], { queryParams: {filter}});
  }

  public showTicket(index: number): void {
    this.router.navigate(['/ticket', index]);
  }

}

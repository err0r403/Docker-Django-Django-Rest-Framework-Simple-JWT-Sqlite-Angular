import { Component, OnInit } from '@angular/core';
import {TicketsService} from '../../services/tickets.service';
import {TicketsInterface} from '../../interfaces/tickets.interface';
import { LoginService } from '../../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  public tickets: TicketsInterface[];
  public permissions: any;

  constructor(
    private loginService: LoginService,
    private ticketsService: TicketsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!localStorage.getItem('access')) { this.router.navigate(['/login']); }
    this.loginService.isLoggedIn().subscribe((data) => {
      if (Object.keys(data).length){
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/tickets']);
        document.title = 'Tickets';
        this.ticketsService.getTickets()
            .subscribe((tickets: TicketsInterface[]) => this.tickets = tickets);
        this.ticketsService.getMyAccount()
            .subscribe((permissions: any) => this.permissions = permissions);
      }
    }, (e) => {
      this.router.navigate(['/login']);
      console.log('e1', e);
    });
  }

  public showTicket(index: number): void {
    this.router.navigate(['/ticket', index]);
  }

  public myTickets(e) {
    if (e.target.checked) {
      this.ticketsService.getMyTickets()
            .subscribe((tickets: TicketsInterface[]) => this.tickets = tickets);
    } else {
      this.ticketsService.getTickets()
      .subscribe((tickets: TicketsInterface[]) => this.tickets = tickets);
    }
  }

  public searchTickets(term: string, filter: string) {
    this.router.navigate(['/search', term], { queryParams: {filter}});
  }

}

import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { TicketsService } from 'src/app/services/tickets.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TicketsInterface } from 'src/app/interfaces/tickets.interface';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  public ticket: TicketsInterface;
  public id: string;

  constructor(
    private activatedRouter: ActivatedRoute,
    private loginService: LoginService,
    private ticketsService: TicketsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe((params) => {
      this.id = params.id;
      console.log('id1', this.id);
    });
    if (!localStorage.getItem('access')) { this.router.navigate(['/login']); }
    this.loginService.isLoggedIn().subscribe((data) => {
      if (Object.keys(data).length){
        this.router.navigate(['/login']);
      } else {
        document.title = `Ticket ${this.id}`;
        this.ticketsService.getTicket(this.id)
            .subscribe((ticket: TicketsInterface) => this.ticket = ticket);
      }
    }, (e) => {
      this.router.navigate(['/login']);
      console.log('e1', e);
    });
  }

  public showTicket(index: number): void {
    this.router.navigate(['/ticket', index]);
  }
}

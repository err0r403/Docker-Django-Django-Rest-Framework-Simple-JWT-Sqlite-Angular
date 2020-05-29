import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TicketsService } from 'src/app/services/tickets.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TicketsInterface } from 'src/app/interfaces/tickets.interface';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.css']
})
export class UpdateTicketComponent implements OnInit {

  public ticket: TicketsInterface;
  public id: string;
  public title: string;
  public description: string;
  public state: string;

  updateTicketForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    state: new FormControl(''),
  });

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
            .subscribe((ticket: TicketsInterface) => {
              this.ticket = ticket;
              this.title = ticket.title;
              this.description = ticket.description;
              this.state = ticket.state;
            });
      }
    }, (e) => {
      this.router.navigate(['/login']);
      console.log('e1', e);
    });
  }

  onSubmit() {
    console.log('onSubmit update');
    this.ticketsService.updateTicket(this.updateTicketForm.value, this.ticket.id).add((data) => {
      console.log('update Res:', data);
    });
  }
}

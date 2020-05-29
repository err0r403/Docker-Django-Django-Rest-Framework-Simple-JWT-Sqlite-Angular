import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TicketsService } from 'src/app/services/tickets.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})

export class CreateTicketComponent implements OnInit {

  createTicketForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    state: new FormControl(''),
  });

  constructor(
    private ticketsService: TicketsService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('onSubmit create');
    this.ticketsService.createTicket(this.createTicketForm.value).add((data) => {
      console.log('create Res:', data);
    });
    }
  }

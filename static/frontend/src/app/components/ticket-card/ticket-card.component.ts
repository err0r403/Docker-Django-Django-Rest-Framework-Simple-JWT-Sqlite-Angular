import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import { TicketsService } from 'src/app/services/tickets.service';



@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.css']
})
export class TicketCardComponent implements OnInit {
  public permissions: any;

  @Input() ticket: any = {};
  @Input() index: number;

  @Output() selectedTicket: EventEmitter<number>;

  constructor(
    private router: Router,
    private ticketsService: TicketsService
    ) {
    this.selectedTicket = new EventEmitter();
  }

  ngOnInit(): void {
    this.ticketsService.getMyAccount()
        .subscribe((permissions: any) => this.permissions = permissions);
  }

  public showTicket(): void {
    // this.router.navigate(['/ticket', index]);
    this.selectedTicket.emit(this.index);
  }

}
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';



@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.css']
})
export class TicketCardComponent implements OnInit {

  @Input() ticket: any = {};
  @Input() index: number;

  @Output() selectedTicket: EventEmitter<number>;

  constructor(private router: Router) {
    this.selectedTicket = new EventEmitter();
  }

  ngOnInit(): void {
  }

  public showTicket(): void {
    // this.router.navigate(['/ticket', index]);
    this.selectedTicket.emit(this.index);
  }

}
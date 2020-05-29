import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  public logout() {
    this.loginService.logout();
  }

  public getAccess() {
    return localStorage.getItem('access') ? true : false;
  }

  public searchTicket(term: string) {
    this.router.navigate(['search', term]);
  }

}

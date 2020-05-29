import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    if (localStorage.getItem('access')) {
      this.loginService.isLoggedIn().subscribe((data) => {
        if (Object.keys(data).length){
          this.loginService.logout();
          this.router.navigate(['/login']);
        } else {
          this.router.navigate(['/tickets']);
        }
      });
    }
  }

  onSubmit() {
    console.log('onSubmit login');
    this.loginService.login(this.loginForm.value).add((data) => {
      this.loginService.isLoggedIn().subscribe((data) => {
        if (Object.keys(data).length){
          this.loginService.logout();
          this.router.navigate(['/login']);
        } else {
          this.router.navigate(['/tickets']);
        }
      }, (e) => {
        console.log('e2', e);
      });
    });
  }

}

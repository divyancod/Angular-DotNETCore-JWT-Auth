import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  errorMessage: string;
  constructor(private authService: AuthService, private router: Router) {
    this.email = '';
    this.password = '';
    this.errorMessage = '';
  }

  ngOnInit(): void {}

  login() {
    if (this.email != '' && this.password != '') {
      this.authService.loginUser(this.email, this.password).subscribe({
        next: (data) => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('email', data.email);
          this.authService.updateUserSubject(true);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.errorMessage = err.message;
        },
      });
    } else {
      this.errorMessage = 'Kindly enter all fields';
    }
  }
}

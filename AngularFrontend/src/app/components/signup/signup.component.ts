import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  email: string = '';
  password: string = '';
  repassword: string = '';
  errorMessage: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  signup() {
    if (this.password != this.repassword) {
      this.errorMessage = 'Password and Repassword dont match';
    } else if (
      this.email == '' ||
      this.password == '' ||
      this.repassword == ''
    ) {
      this.errorMessage = 'Fields cant be empty';
    } else {
      this.authService.signupUser(this.email, this.password).subscribe({
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
    }
  }
}

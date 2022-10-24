import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isUserLogin: boolean = false;
  userEmail: string = '';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isUserLogin = this.authService.isUserLoggedIn();
    if (this.isUserLogin) {
      this.getUserName();
    }
    this.authService.userAuthObservable().subscribe((data) => {
      this.isUserLogin = data;
      if (data == true) {
        this.getUserName();
      }
    });
  }
  logout() {
    this.authService.signOut();
  }
  getUserName() {
    this.userEmail = localStorage.getItem('email') as string;
  }
}

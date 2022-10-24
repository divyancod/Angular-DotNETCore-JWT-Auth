import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { UserModel } from '../Models/UserModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authSubject: Subject<boolean>;
  constructor(private http: HttpClient, private router: Router) {
    this.authSubject = new Subject<boolean>();
  }
  signupUser(email: string, password: string): Observable<UserModel> {
    localStorage.clear();
    return this.http
      .post<UserModel>(
        `https://localhost:7057/signup?email=${email}&password=${password}`,
        null
      )
      .pipe(catchError(this.handleError));
  }
  loginUser(email: string, password: string): Observable<UserModel> {
    localStorage.clear();
    return this.http
      .post<UserModel>(
        `https://localhost:7057/login?email=${email}&password=${password}`,
        null
      )
      .pipe(catchError(this.handleError));
  }
  signOut() {
    this.router.navigate(['login']);
    this.authSubject.next(false);
    localStorage.clear();
  }
  isUserLoggedIn(): boolean {
    var token = localStorage.getItem('token');
    if (token == null || token === '') return false;
    return true;
  }
  userAuthObservable() {
    return this.authSubject;
  }
  updateUserSubject(value: boolean) {
    this.authSubject.next(value);
  }
  handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.error));
  }
}

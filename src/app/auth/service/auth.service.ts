import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userIsAuthenticated = true;
  private _userId = 'abc'
  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  constructor() { }

  login() {
    this._userIsAuthenticated = true;
  }

  logout() {
    this._userIsAuthenticated = false;
  }
  get userId() {
    return this._userId
  }
}

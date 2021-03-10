import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private http: HttpClient, private router: Router) { }

  authApi = 'https://nextige.com/patidarlab/api/login?APP_KEY=ABCDEFGHJK';
  regApi = 'http://nextige.com/patidarlab/api/register?APP_KEY=ABCDEFGHJK';

  authUser(u: any) {
    return this.http.post<any>(this.authApi, u);
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('token')) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }

  login(l: any) {
    localStorage.setItem('token', l);
    this.router.navigate(['/dashboard']);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  registerUser(user: any) {
    return this.http.post<any>(this.regApi, user);
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }
}

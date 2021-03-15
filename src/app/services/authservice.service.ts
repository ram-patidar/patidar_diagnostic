import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private http: HttpClient, private router: Router) { }
apiKey = '?APP_KEY=ABCDEFGHJK';
  authApi = 'https://nextige.com/patidarlab/api/login?APP_KEY=ABCDEFGHJK';
  regApi = 'http://nextige.com/patidarlab/api/register?APP_KEY=ABCDEFGHJK';
  userApi = 'http://nextige.com/patidarlab/api/user/';

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

  login(l: any, id:any, name:any) {
    localStorage.setItem('token', l);
    localStorage.setItem('uid', id);
    localStorage.setItem('name', name);
    this.router.navigate(['/dashboard']);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
    localStorage.removeItem('name');
    this.router.navigate(['']);
  }

  getLoggedInuser(id){
  return this.http.get(this.userApi+id+this.apiKey)
  }
  updateUser(id,data){
    return this.http.put(this.userApi+id+this.apiKey,data);
    }

  registerUser(user: any) {
    return this.http.post<any>(this.regApi, user).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.error instanceof ErrorEvent) {
         
          } else {
              // console.log(`error status : ${err.error.errors.email} ${err.error.errors.email}`);
           
          } 
      } else {
          console.error("some thing else happened");
      }
      return throwError(err.error.errors.email);

      })
    );
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }
}

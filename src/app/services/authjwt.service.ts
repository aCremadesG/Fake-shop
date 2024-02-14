import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { JwtTokens } from '../interfaces/jwt-tokens';
import { User } from '../interfaces/user';
import { LocalStorageService } from './local-storage.service';
import { LocalUser } from '../classes/local-user';

@Injectable({
  providedIn: 'root'
})
export class AuthjwtService {

  private apiUrl = environment.apiUrl
  private user: LocalUser = new LocalUser();

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  authentication(user: User): Observable<JwtTokens> {
    return this.http.post<JwtTokens>(`${this.apiUrl}auth/login`, user).pipe(catchError(this.handleError));
  }

  saveTokens(userTokens: JwtTokens){
    this.localStorageService.setItem('userTokens', userTokens);
    this.user.setTokens(userTokens);
  }

  loadTokens(){
    const userTokens = this.localStorageService.getItem<JwtTokens>('userTokens');
    if(userTokens!==null){
       this.user.setTokens(userTokens)
    }
  }

  getUser(): Observable<User> {
    const requestOptions = new HttpHeaders({'authorization': this.user.returnTokens.access_token!});
    return this.http.get<User>(`${this.http}auth/profile`, {headers: requestOptions});
  }

  saveUser(userData: User) {
    this.localStorageService.setItem('userData', userData)
    this.user.setUser(userData);
  }

  loadUser(){
    const userData = this.localStorageService.getItem<User>('userData');
    if(userData!==null){
      this.user.setUser(userData);
    }
  }

  refreshAccessToken(accessToken: {}): Observable<JwtTokens> {
    return this.http.post<JwtTokens>(`${this.http}auth/refresh-token`, accessToken);
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = `An error occurred: ${err.error.message}`;
    if(err.error.statusCode === 401){
      errorMessage = `LOGIN.FAILED_LOGIN`
    }
    return throwError(() => errorMessage);
  }

}

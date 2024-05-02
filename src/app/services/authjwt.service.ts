import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, delay, interval, Subject, BehaviorSubject } from 'rxjs';
import { JwtTokens } from '../interfaces/jwt-tokens';
import { User } from '../interfaces/user';
import { LocalStorageService } from './local-storage.service';
import { LocalUser } from '../classes/local-user';
import { LoginErrorHandler } from '../classes/login-error-handler';
import * as dayjs from 'dayjs'
dayjs().format()

@Injectable({
  providedIn: 'root'
})
export class AuthjwtService {

  private apiUrl = environment.apiUrl
  private user: LocalUser = new LocalUser();
  private subject = new BehaviorSubject<any>({user: this.user});
  private renewDate: dayjs.Dayjs = dayjs();
  private loginErrorHandler: LoginErrorHandler = new LoginErrorHandler();

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    ) { }
    
  authentication(user: User): Observable<JwtTokens> {
    return this.http.post<JwtTokens>(`${this.apiUrl}auth/login`, user).pipe(catchError(this.loginErrorHandler.handleError));
  }

  saveTokens(userTokens: JwtTokens){
    this.localStorageService.setItem('userTokens', userTokens);
    this.renewDate = dayjs().add(10, 'h');
    this.localStorageService.setItem('renewDate', this.renewDate)
    this.user.setTokens(userTokens);
  }

  loadTokens(){
    const userTokens = this.localStorageService.getItem<JwtTokens>('userTokens');
    if(this.userIsLogged()){
      this.user.setTokens(userTokens!);
      this.loadUser();
      this.renewTokens();
      this.user.setLogged(true);
      this.sendLocalUser();
      return;
    }
    this.emptyLocalUserData();
    this.sendLocalUser();
  }

  userIsLogged(){
    const userTokens = this.localStorageService.getItem<JwtTokens>('userTokens');
    return userTokens !== null && this.validateDate();
  }

  closeSesion(){
    this.emptyLocalUserData();
    this.user = new LocalUser();
    this.sendLocalUser();
  }

  renewTokens(){
    const now = dayjs();
    if(now.isBefore(this.renewDate) && now.isAfter(this.renewDate.subtract(1, 'h'))){
      this.refreshAccessToken(this.user.returnRefreshToken).subscribe((data) => {
        this.saveTokens(data);
        this.renewTokens();
      })
    }else if(now.isBefore(this.renewDate) && now.isAfter(this.renewDate.subtract(9,'h'))){
      this.refreshAccessToken(this.user.returnRefreshToken).pipe(delay(this.renewDate.subtract(1,'h').date())).subscribe((data) => {
        this.saveTokens(data);
        this.renewTokens();
      })
    }else if(now.isBefore(this.renewDate.subtract(9,'h'))){
      interval(9*60*60*1000).subscribe((data) => {this.refreshAccessToken(this.user.returnRefreshToken).subscribe((data) => {this.saveTokens(data)})})
    }
  }

  private validateDate(){
    let validateRenewDate = this.localStorageService.getItem<string>('renewDate')
    if(validateRenewDate !== null){
      const checkDate: string = (validateRenewDate).toString();
      this.renewDate = dayjs(checkDate)
      return dayjs().isBefore(checkDate)
    }
    return false;
  }

  getUser(): Observable<User> {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.user.returnTokens.access_token!}`});
    return this.http.get<User>(`${this.apiUrl}auth/profile`, {headers});
  }

  saveUser(userData: User) {
    this.localStorageService.setItem('userData', userData)
    this.user.setUser(userData);
    this.user.setLogged(true);
    this.sendLocalUser();
  }

  loadUser(){
    const userData = this.localStorageService.getItem<User>('userData');
    if(userData!==null){
      this.user.setUser(userData);
    }
  }

  emptyLocalUserData(){
    this.localStorageService.removeItem('userData');
    this.localStorageService.removeItem('renewDate');
    this.localStorageService.removeItem('userTokens');
  }

  refreshAccessToken(accessToken: {}): Observable<JwtTokens> {
    return this.http.post<JwtTokens>(`${this.apiUrl}auth/refresh-token`, {refreshToken: accessToken});
  }

  sendLocalUser(){
    this.subject.next({user: this.user});
  }

  getLocalUser(): Observable<any> {
    return this.subject.asObservable();
  }

  isAuthenticatedUser(){
    return this.user.returnLogged;
  }

}

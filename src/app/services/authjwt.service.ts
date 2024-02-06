import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewUser } from '../interfaces/new-user';
import { Observable } from 'rxjs';
import { JwtTokens } from '../interfaces/jwt-tokens';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthjwtService {

  private apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  authentication(user: NewUser): Observable<JwtTokens> {
    return this.http.post<JwtTokens>(`${this.apiUrl}/auth/login`, user);
  }

  getUser(authorization: {}): Observable<User> {
    const requestOptions = new HttpHeaders(authorization);
    return this.http.get<User>(`${this.http}/auth/profile`, {headers: requestOptions});
  }

  refreshAccessToken(accessToken: {}): Observable<JwtTokens> {
    return this.http.post<JwtTokens>(`${this.http}/auth/refresh-token`, accessToken);
  }

}

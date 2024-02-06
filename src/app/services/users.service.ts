import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { NewUser } from '../interfaces/new-user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}users`);
  }

  getUser(idUser: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}users/${idUser}`);
  }

  createUser(user: NewUser): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}users/`, user);
  }

  updateUser(idUser: number, user: NewUser): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}users/${idUser}`, user);
  }

  checkEmail(email: {}): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}users/is-available`, email);
  }
}

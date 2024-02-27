import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorAlertService {
  private subject = new Subject<any>();

  constructor() { }

  sendData(data: any){
    this.subject.next({error: data})
  }

  getData(): Observable<any> {
    return this.subject.asObservable()
  }
}

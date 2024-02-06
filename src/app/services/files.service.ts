import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }
  
    getFile(fileName: string) {
      return this.http.get(`${this.apiUrl}files/${fileName}`);
    }

    uploadFile(file: {}) {
      return this.http.post(`${this.apiUrl}files/upload`, file);
    }
}

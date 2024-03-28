import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LearnService {

  constructor(private http:HttpClient) { }

  getALL(n:string){
    return this.http.get(`http://localhost/learnup/${n}`)
  }
}

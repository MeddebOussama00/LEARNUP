import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { subscribe } from 'diagnostics_channel';
import { catchError, Observable, of } from 'rxjs';
import { map } from 'rxjs-compat/operator/map';
import { Course } from '../course/course.component';
import { doc } from '../report/report.component';
import { CourService } from './cour.service';
import { DatePipe } from '@angular/common';
import { Message } from '../Message.model';

export interface Report{
  id:number,
  title:string,
  date:Date,
  id_user:Number,
}
@Injectable({
  providedIn: 'root'
})
export class DataService  {
  private files: Array<Course> = [];
  private rep:Array<Course>= [];
  url = "http://localhost/learnUp/cour.php";
  url2="http://localhost/learnUp/chat.php";
  generateSimpleId(): number {
    const randomInt = Math.floor(Math.random() * 100000000000) + 1;
    return randomInt;
  }
  constructor(private c: CourService, private http: HttpClient) { }
  getReport(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url + '?query=report').pipe(
      catchError((error: any) => {
        console.error(error);
        return [];
      })
    );
  }
  getReportMessage():Observable<Message[]> {
    return this.http.get<Message[]>(this.url2+ '?query=getreport').pipe(
      catchError((error: any) => {
        console.error(error);
        return [];
      })
    )
  }
  deletedMessage(id: number): Observable<any> {
    const params = new HttpParams().set('c', id.toString()); 
    return this.http.delete(`${this.url2}?query=deleteMessage`, { params })
    .pipe(
      catchError((error: any) => {
        console.error(error);
        return [];
      })
    );
  }
  
  deletedCour(id: number): Observable<any> {
        const params = new HttpParams().set('c', id);
        return this.http.delete(`${this.url}?query=deleteCour`, { params })
      .pipe(
        catchError((error: any) => {
          console.error(error);
          return [];
        })
      );
  }
  
  set(v: Course): void {
    this.files.push(v);
  }

  setRep(v: Course): void {  
    this.rep.push(v); 
    this.c.putCour(v.id)
  }

  getRep(): Array<Course> {
    return this.rep;
  }

  get(): Array<Course> {
    return this.files;
  }  
  upload(course:any): Observable<any> {
    const data = JSON.stringify(course);
    console.log(course)
    this.files.push(course);
    return this.http.post(`${this.url}?query=addCour`, data);
  }
}



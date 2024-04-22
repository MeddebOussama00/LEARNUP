import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { subscribe } from 'diagnostics_channel';
import { catchError, Observable, of, tap } from 'rxjs';
import { map } from 'rxjs-compat/operator/map';
import { Course } from '../course/course.component';
import { doc } from '../report/report.component';
import { CourService } from './cour.service';
import { DatePipe } from '@angular/common';
import { Message } from '../Message.model';
import { LoginService } from './login.service';

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

  constructor(private c: CourService, private http: HttpClient,private l:LoginService ) { 
  } 
  getProfileDoc(): Observable<any> {
    const c = 1;
    if (c) {
      const params = new HttpParams().set('query', 'getaccountDoc').set('c', c.toString());
      return this.http.get(`${this.url}`, { params }).pipe(
        catchError(error => {
          console.error('Error getting profile messages:', error);
          return of(null); // Return an empty observable or handle the error as needed
        })
      );
    }
    return of(null);
  }
  getProfileMsg(): Observable<any> {
    const c = 1;
    if (c) {
      const params = new HttpParams().set('query', 'getaccount').set('c', c.toString());
      return this.http.get(`${this.url2}`, { params }).pipe(
        catchError(error => {
          console.error('Error getting profile messages:', error);
          return of(null); // Return an empty observable or handle the error as needed
        })
      );
    }
    return of(null);
  }
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
      tap(()=>{console.log("succes")}),
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
  upload(course: any): Observable<any> {
    const fileData = course.data;
    const base64Data = this.arrayBufferToBase64(fileData);
    const data = {
      title: course.title,
      type: course.type,
      date: course.date,
      nblike: course.nblike,
      nbdislike: course.nbdislike,
      report: course.report,
      id_U: course.id_U,
      id_sub: course.id_sub,
      data:base64Data
    };
    return this.http.post(`${this.url}?query=addCour`, data);
  }

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
}



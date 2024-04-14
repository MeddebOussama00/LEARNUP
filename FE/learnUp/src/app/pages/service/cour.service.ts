import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { query } from 'express';
import { catchError, Observable, throwError } from 'rxjs';
import { Course } from '../course/course.component';
@Injectable({
  providedIn: 'root'
})
export class CourService {
  private courID = 0;
  courses = [];
  url = "http://localhost/learnUp/cour.php";

  constructor(private http: HttpClient) {}
  setId(c: number) {
    this.courID = c;
  }
  Putlike(c:Course){
    return this.http.put(this.url ,{c})
  }
  putCour(id: number): Observable<any> {
    const requestData = { id: id, data:'1'}; 
    return this.http.put(`${this.url}?query=putReport`, requestData)
      .pipe(
        catchError((error: any) => {
          console.error(error);
          return [];
        })
      );
  }
  getCour(): Observable<[]> {
    const params = new HttpParams().set('c', this.courID.toString());
    return this.http.get<[]>(this.url+ '?query=cour', { params }).pipe(
      catchError((error: any) => {
        console.error(error);
        return [];
      })
    );
  }

  b64toBlob(b64Data: string, contentType: string): Blob {
    const byteNumbers = atob(b64Data);
    const byteArray = new Uint8Array(byteNumbers.length);
    for (let i = 0; i < byteNumbers.length; i++) {
      byteArray[i] = byteNumbers.charCodeAt(i);
    }
    const blob = new Blob([byteArray], { type: contentType });
    return blob;
  }
}
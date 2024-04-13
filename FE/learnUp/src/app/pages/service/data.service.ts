import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { subscribe } from 'diagnostics_channel';
import { catchError, Observable } from 'rxjs';
import { map } from 'rxjs-compat/operator/map';
import { Course } from '../course/course.component';
import { doc } from '../report/report.component';
import { CourService } from './cour.service';
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

  constructor(private c: CourService, private http: HttpClient) { }
  getReport(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url + '?query=report').pipe(
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
  upload(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const fileContent = new Uint8Array(e.target.result);
        this.files.push({
          id: 0, 
          title: file.name,
          data: fileContent,
          type: 'cour',
          date: file.lastModifiedDate,
          nblike: 0,
          nbdislike: 0,
          report:0,
          id_U: 0, // Assign appropriate user ID
          id_sub: 0 // Assign appropriate subject ID
        });
      }
      fileReader.readAsArrayBuffer(file);
    }
  }
}


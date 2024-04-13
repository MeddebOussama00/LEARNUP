import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  query = '';
  url='http://localhost/learnUp/search.php';
  url2='http://localhost/learnUp/chat.php';
  constructor( private http:HttpClient) {  }
  getAllLevel(): Observable<{ namelevel: string, idlevel: number }[]> {
    this.query = 'level';
    return this.http.get<any[]>(`${this.url}?query=${this.query}`).pipe(
      map(response => {
        return response.map(level => ({
          namelevel: level.namelevel,
          idlevel: level.idlevel
        }));
      }),
      catchError(error => {
        console.error(error);
        return of([]);
      })
    );
  }
  getSpecialty(s: string): Observable<{ idspe: number, namespe: string }[]> {
    this.query = 'specialty';
    const params = new HttpParams().set('s', s);
    return this.http.get<any[]>(`${this.url}?query=${this.query}`, { params }).pipe(
      map(response => {
        return response.map(spec => ({
          idspe: spec.idspe,
          namespe: spec.namespe
        }));
      }),
      catchError(error => {
        console.error(error);
        return of([]);
      })
    );
  }
  getAllClass(c: string): Observable<{ idclass: number, nameclass: string }[]> {
    this.query = 'class';
    const params = new HttpParams().set('s', c);
    return this.http.get<any[]>(`${this.url}?query=${this.query}`, { params }).pipe(
      map(response => {
        return response.map((data: any) => ({
          idclass: data.idclass,
          nameclass: data.nameclass
        }));
      }),
      catchError(error => {
        console.error(error);
        return of([]);
      })
    );
  }
  getMessage(){
   return this.http.get(this.url2).pipe(catchError(error => {
    console.error(error);
    return of([]);
    }))
  }
  getAllCour(s:string){
    this.query = 'cour';
    const params = new HttpParams().set('s', s);
    return this.http.get<any[]>(`${this.url}?query=${this.query}`, { params }).pipe(
      map(response => {
        return response.map((data: any) => ({
          idSubject: data.idSubject,
          nameSub: data.nameSub
        }));
      }),
      catchError(error => {
        console.error(error);
        return of([]);
      })
    );
  }
}
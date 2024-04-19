import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private id: string | null = null;
  private type: string | null = null;

  constructor(private http: HttpClient) { }

  private setId(id: string | undefined): void {
    this.id = id || null;
  }

  private setType(type: string | undefined): void {
    this.type = type || null;
  }

  login(email: string, password: string): Observable<{ message: string, id?: string, type?: string }> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.http.post<{ message: string, id?: string, type?: string }>('http://localhost/learnUp/login.php', body.toString(), { headers })
      .pipe(
        tap((response) => {
          if (response && response.message === 'Login successful.') {

            const id = response.id;
            const type = response.type;
            this.setId(id);
            this.setType(type);
          }
        })
      );
  }

  getId(): string | null {
    return this.id;
  }

  getType(): string | null {
    return this.type;
  }
}

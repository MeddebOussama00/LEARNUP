import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private l:LoginService) { }
  canActivate(): boolean {
    if (!this.l.getId()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root'
})
export class AuthSeachService implements CanActivate {

  constructor(private router: Router, private searchService: SearchService) {}

  canActivate(): boolean {
    if (this.searchService.getVisitedSearch()) {
      return true;
    } else {
      this.router.navigate(['/search']); 
      return false;
    }
  }
}

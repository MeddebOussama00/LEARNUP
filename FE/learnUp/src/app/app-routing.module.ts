import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './pages/search/search.component';
import { ReportComponent } from './pages/report/report.component';
import { LoginComponent } from './pages/login/login.component';
import { AccountComponent } from './pages/account/account.component';
import { AuthSeachService } from './pages/service/auth-seach.service';

const routes: Routes = [
  {path:'login',
  component:LoginComponent
},
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'home',
    canActivate: [AuthSeachService], // Apply AuthGuard to home route
    loadChildren: () => import('./pages/home/home.module').then(m => m.HOMEModule)
  },
  {
    path: 'report',
    component: ReportComponent
  },
  {
    path: 'profile',
    canActivate: [AuthSeachService], // Apply AuthGuard to profile route
    component: AccountComponent
  }];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './pages/search/search.component';
import { ReportComponent } from './pages/report/report.component';
import { LoginComponent } from './pages/login/login.component';
import { AccountComponent } from './pages/account/account.component';
import { AuthSeachService } from './pages/service/auth-seach.service';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthGuardService } from './pages/service/auth-guard.service';

const routes: Routes = [
  /*{path:'', redirectTo: '/login', pathMatch: 'full'},*/
  {path:'',
    component:LoginComponent
  },
  {path:'register',
    component:SignupComponent},
  {path:'Search',
    component: SearchComponent,canActivate: [AuthGuardService],
  },
  {
    path: 'home',
    canActivate: [AuthSeachService], 
    loadChildren: () => import('./pages/home/home.module').then(m => m.HOMEModule)
  },
  {
    path: 'report',
    canActivate:[AuthGuardService], 
    component: ReportComponent
  },
  {
    path: 'profile',
    canActivate: [AuthGuardService], 
    component: AccountComponent
  }];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './pages/component/chat/chat.component';
import { ExamnComponent } from './pages/examn/examn.component';
import { SearchComponent } from './pages/search/search.component';
import { HOMEComponent } from './pages/home/home.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { LogUpComponent } from './pages/log-up/log-up.component';

const routes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: 'logUP', component: LogUpComponent },
  {
    path: 'Search',
    component: SearchComponent
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HOMEModule),

  },
  {
    path: '',
    redirectTo: 'home/Cour',
    pathMatch: 'full'
  }
]
@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
/*   {
    path: '',
    redirectTo: 'home/Cour',
    pathMatch: 'full'
  } lazem token ba3d import laztLoading */
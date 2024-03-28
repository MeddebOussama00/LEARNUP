import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './pages/chat/chat.component';
import { ExamnComponent } from './pages/examn/examn.component';
import { SearchComponent } from './pages/search/search.component';
import { HOMEComponent } from './pages/home/home.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { LogUpComponent } from './pages/log-up/log-up.component';

const routes: Routes = [
  
  /*{path:'login', component:LogInComponent},
  {path:'logUP', component:LogUpComponent},
  { path:'Search', component: SearchComponent },
  {path:'home',component:HOMEComponent},
  { path: '', redirectTo: 'Cour', pathMatch: 'full' },
  { path: 'Cour', component: CoursesComponent },
  { path: 'Examn', component: ExamnComponent },
  { path: 'Chat', component: ChatComponent } */
];


@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
/*const routes: Routes = [

    { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'login', component:LogInComponent},
  {path:'logUP', component:LogUpComponent},
  { path: 'Search', component: SearchComponent },
  {path:'home',component:HOMEComponent},
  { path: '', redirectTo: 'Cour', pathMatch: 'full' },
  { path: 'Cour', component: CoursesComponent },
  { path: 'Examn', component: ExamnComponent },
  { path: 'Chat', component: ChatComponent } 
]; */
  /*{ path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LogInComponent },
  { path: 'logup', component: LogUpComponent },
  { path: 'search', component: SearchComponent },
  {
    path: 'home',
    component: HOMEComponent,
    children: [
      { path: '', redirectTo: 'cour', pathMatch: 'full' },
      { path: 'cour', component: CoursesComponent },
      { path: 'examn', component: ExamnComponent },
      { path: 'chat', component: ChatComponent }
    ]
  }
];*/
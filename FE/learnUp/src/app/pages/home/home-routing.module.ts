import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HOMEComponent } from './home.component';
import { CoursesComponent } from '../courses/courses.component';
import { ExamnComponent } from '../examn/examn.component';
const routes: Routes = [
  {
    path: 'home', 
    component: HOMEComponent,
    children: [
      { path: '', redirectTo: 'Cour', pathMatch: 'full' },
      { path: 'Cour', component:CoursesComponent },
      { path: 'Examn', component: ExamnComponent },
      { path: 'Chat', component: ExamnComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HOMERoutingModule { }

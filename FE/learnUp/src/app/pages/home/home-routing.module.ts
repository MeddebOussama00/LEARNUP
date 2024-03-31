import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HOMEComponent } from './home.component';
import { CoursesComponent } from '../courses/courses.component';
import { ExamnComponent } from '../examn/examn.component';
import { CommunitychatComponent } from '../communitychat/communitychat.component';
const homeRoutes: Routes = [
  {
    path: '',
    component: HOMEComponent,
    children: [
      { path: 'Cour', component: CoursesComponent },
      { path: 'Examn', component: ExamnComponent },
      { path: 'Chat', component: CommunitychatComponent} 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class HOMERoutingModule { }

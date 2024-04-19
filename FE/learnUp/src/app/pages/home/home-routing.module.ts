import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HOMEComponent } from './home.component';
import { ExamnComponent } from '../examn/examn.component';
import { CommunityChatComponent } from '../community-chat/community-chat.component';
import { CourseComponent } from '../course/course.component';

const homeRoutes: Routes = [
  {
    path: '',
    component: HOMEComponent,
    children: [
      { path: 'Cour', component: CourseComponent },
      { path: 'Examn', component: ExamnComponent },
      { path: 'Chat', component: CommunityChatComponent } 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class HOMERoutingModule { }

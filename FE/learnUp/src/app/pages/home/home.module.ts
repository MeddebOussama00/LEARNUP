import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HOMERoutingModule } from './home-routing.module';
// Import RouterModule without routes argument
import { RouterModule } from '@angular/router';
import { HOMEComponent } from './home.component';
import { ExamnComponent } from '../examn/examn.component';
import { CommunityChatComponent } from '../community-chat/community-chat.component';
import { CourseComponent } from '../course/course.component';

@NgModule({
  imports: [
    CommonModule,
    HOMERoutingModule,
    RouterModule
  ]
})
export class HOMEModule { 
}

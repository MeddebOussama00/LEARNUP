import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { ExamnComponent } from './examn/examn.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { HOMEComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { CourComponent } from './component/cour/cour.component';
import { LogInComponent } from './log-in/log-in.component';
import { LogUpComponent } from './log-up/log-up.component';
import { SearchComponent } from './search/search.component';
import { ReportComponent } from './report/report.component';
import { MsgComponent } from './component/msg/msg.component';
import { DocComponent } from './component/doc/doc.component';
import { ReactiveFormsModule } from "@angular/forms";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
@NgModule({
  declarations: [
    SearchComponent,
    HeaderComponent,
    CourComponent,
    ExamnComponent,
    ChatComponent,HOMEComponent,CoursesComponent, LogInComponent,LogUpComponent, ReportComponent, MsgComponent, DocComponent
  ],
  imports: [
    CommonModule, RouterModule,FormsModule, ReactiveFormsModule,SweetAlert2Module.forRoot()
  ],
  exports : [
    SearchComponent,HeaderComponent,CoursesComponent,ChatComponent,ExamnComponent,HOMEComponent,LogInComponent,LogUpComponent,ReportComponent
  ]
})
export class PagesModule { }

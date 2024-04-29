import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { ExamnComponent } from './examn/examn.component';
import { ChatComponent } from './component/chat/chat.component';
import { FormsModule } from '@angular/forms';
import { HOMEComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { CourComponent } from './component/cour/cour.component';
import { SearchComponent } from './search/search.component';
import { ReportComponent } from './report/report.component';
import { MsgComponent } from './component/msg/msg.component';
import { DocComponent } from './component/doc/doc.component';
import { ReactiveFormsModule } from "@angular/forms";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoginComponent } from './login/login.component';
import { CommunityChatComponent } from './community-chat/community-chat.component';
import { HttpClientModule } from '@angular/common/http';
import { CourseComponent } from './course/course.component';
import { AccountComponent } from './account/account.component';
import { SignupComponent } from './signup/signup.component';
@NgModule({
  declarations: [
    SearchComponent,
    HeaderComponent,
    CourComponent,
    ExamnComponent,
    ChatComponent,HOMEComponent, LoginComponent,AccountComponent,ReportComponent, MsgComponent, DocComponent, CommunityChatComponent, LoginComponent, CourseComponent, AccountComponent, SignupComponent
  ],
  imports: [
    CommonModule, RouterModule,FormsModule, ReactiveFormsModule,SweetAlert2Module.forRoot(),HttpClientModule
  ],
  exports : [
    SearchComponent,HeaderComponent,AccountComponent,CourseComponent,ExamnComponent,HOMEComponent,ReportComponent,LoginComponent,CommunityChatComponent
  ]
})
export class PagesModule { }

import { Injectable } from '@angular/core';
import { CourService } from './cour.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../course/course.component';
import { DataService } from './data.service';
import { Message } from '../Message.model';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root'
})
export class ReportSharedService {
  private reportedCoursesSubject = new BehaviorSubject<Course[]>([]);
  reportedCourses$ = this.reportedCoursesSubject.asObservable();
  private AllCoursesSubject = new BehaviorSubject<Course[]>([]);
  AllCourses$ = this.AllCoursesSubject.asObservable();

  private AllmsgSubject = new BehaviorSubject<Message[]>([]);
  Allmsg$ = this.AllmsgSubject.asObservable();

  private reportedMessagaSubject = new BehaviorSubject<Message[]>([]);
  reportedMessage$ = this.reportedMessagaSubject.asObservable();

  private accountMsgSubject = new BehaviorSubject<Message[]>([]);
  accountMsge$ = this.accountMsgSubject.asObservable();

  private accountDocSubject = new BehaviorSubject<Course[]>([]);
  accountDoc$ = this.accountDocSubject.asObservable();

  constructor(
    private d: DataService,
    private c: CourService,
    private t:ChatService,
    private h: ChatService
  ) {}

  deleteMessage(id: number): void {
    console.log(id)
    const updatedReportedMessages = this.reportedMessagaSubject.value.filter(message => message.id !== id);
    const updatedAccountMessages = this.accountMsgSubject.value.filter(message => message.id !== id);
    const updatedAll=this.AllmsgSubject.value.filter(message => message.id !== id);
    this.reportedMessagaSubject.next(updatedReportedMessages);
    this.accountMsgSubject.next(updatedAccountMessages);
    this.AllmsgSubject.next(updatedAll)
  }
  deleteDocument(id: number): void {
    const updatedReportedMessages = this.reportedCoursesSubject.value.filter(doc =>doc.id !== id);
    const updatedAccountMessages = this.accountDocSubject.value.filter(doc =>doc.id !== id);
    const updatedAll=this.AllCoursesSubject.value.filter(message => message.id !== id);
    this.reportedCoursesSubject.next(updatedReportedMessages);
    this.accountDocSubject.next(updatedAccountMessages);
    this.AllCoursesSubject.next(updatedAll)

  }
  getReport(): Observable<Course[]> {
    return this.d.getReport();
  }

  updateAccountDocSubject(data: Course[]): void {
    this.accountDocSubject.next(data);
  }
  updateMsgSubject(data: any[]): void {
    this.accountMsgSubject.next(data);
  }
  getMessage(): Observable<Message[]> {
    return this.d.getReportMessage();
  }

  getAllMessge(): Observable<Message[]>{
    return this.Allmsg$=this.t.getMessages()
    
  }

  getAccountMsg(): Observable<Message[]> {
    return this.accountMsge$=this.d.getProfileMsg();
  }

  getAccountDoc(): Observable<Message[]> {
    return this.accountDoc$=this.d.getProfileDoc();
  }

  addReportedCourse(course: Course) {
    this.reportedCoursesSubject.next([...this.reportedCoursesSubject.value, course]);
  }

  addReportedMessage(message: Message) {
    this.reportedMessagaSubject.next([...this.reportedMessagaSubject.value, message]);
  }

  reportedmessage(message: Message) {
    message.report = 1;
    this.h.putMessage(message.id).subscribe();
    this.addReportedMessage(message);
  }

  reportCourse(course: Course) {
    course.report = 1;
    this.addReportedCourse(course);
    this.c.putCour(course.id).subscribe();
  }
}

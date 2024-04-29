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
  reportedCoursesSubject = new BehaviorSubject<Course[]>([]);
  reportedCourses$ = this.reportedCoursesSubject.asObservable();
  AllCoursesSubject = new BehaviorSubject<Course[]>([]);
  AllCourses$ = this.AllCoursesSubject.asObservable();

  AllmsgSubject = new BehaviorSubject<Message[]>([]);
  Allmsg$ = this.AllmsgSubject.asObservable();

  reportedMessagaSubject = new BehaviorSubject<Message[]>([]);
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
    const updatedReportedMessages = this.reportedMessagaSubject.value.filter(message => message.id !== id);
    const updatedAccountMessages = this.accountMsgSubject.value.filter(message => message.id !== id);
    this.reportedMessagaSubject.next(updatedReportedMessages);
    this.accountMsgSubject.next(updatedAccountMessages);
    this.AllmsgSubject.next(this.AllmsgSubject.value.filter(message => message.id !== id));
  }

  deleteDocument(id: number): void {
    const updatedReportedDocuments = this.reportedCoursesSubject.value.filter(doc => doc.id !== id);
    const updatedAccountDocuments = this.accountDocSubject.value.filter(doc => doc.id !== id);
    this.reportedCoursesSubject.next(updatedReportedDocuments);
    this.accountDocSubject.next(updatedAccountDocuments);
  }

  public updateAllCourses(courses: Course[]): void {
    this.AllCoursesSubject.next(courses);
  }

  public updateAllMessages(messages: Message[]): void {
    this.AllmsgSubject.next(messages);
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
  getAllMessge(): Observable<Message[]> {
    this.Allmsg$ = this.t.getMessages();
    console.log(this.Allmsg$)
    return this.Allmsg$
  }

}
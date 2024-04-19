import { Injectable } from '@angular/core';
import { CourService} from './cour.service'
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Course } from '../course/course.component';
import { DataService, Report } from './data.service';
import { Message } from '../Message.model';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root'
})
export class ReportSharedService {
  private reportedCourse = new BehaviorSubject<Course | undefined>(undefined);
  private reportedMessage = new BehaviorSubject<Message | undefined>(undefined);
  constructor(private d: DataService, private c: CourService,private h :ChatService){}

  private reportedCoursesSubject = new BehaviorSubject<Course[]>([]);
  reportedCourses$ = this.reportedCoursesSubject.asObservable();
  private reportedMessagaSubject = new BehaviorSubject<Message[]>([]);
  reportedMessage$ = this.reportedMessagaSubject.asObservable();

  getReport(): Observable<Course[]> {
    return this.d.getReport();
  }
  getMessage(): Observable<Message[]>{
    return this.d.getReportMessage()
  }
  addReportedCourse(course: Course) {
    this.reportedCoursesSubject.next([...this.reportedCoursesSubject.getValue(), course]);
  }
  addReportedMessage(message:Message){
    this.reportedMessagaSubject.next([...this.reportedMessagaSubject.getValue(), message]);
  }
  reportedmessage(message:Message){
    message.report=1;
    this.h.putMessage(message.id).subscribe();
    this.addReportedMessage(message)
  }
  reportCourse(course: Course) {
    course.report = 1;
    this.addReportedCourse(course);
    this.c.putCour(course.id).subscribe();
  }
}


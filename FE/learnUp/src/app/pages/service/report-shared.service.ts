import { Injectable } from '@angular/core';
import { CourService} from './cour.service'
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../course/course.component';
import { DataService, Report } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ReportSharedService {
  private reportedCourse = new BehaviorSubject<Course | undefined>(undefined);

  constructor(private d: DataService, private c: CourService){}

  private reportedCoursesSubject = new BehaviorSubject<Course[]>([]);
  reportedCourses$ = this.reportedCoursesSubject.asObservable();

  getReport(): Observable<Course[]> {
    return this.d.getReport();
  }

  addReportedCourse(course: Course) {
    this.reportedCoursesSubject.next([...this.reportedCoursesSubject.getValue(), course]);
  }

  reportCourse(course: Course) {
    course.report = 1;
    this.addReportedCourse(course);
    this.c.putCour(course.id).subscribe();
  }
}


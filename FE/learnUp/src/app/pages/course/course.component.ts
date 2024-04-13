import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { Subject } from 'rxjs';
import { CourService } from '../service/cour.service';
import { DataService } from '../service/data.service';
import { ReportSharedService } from '../service/report-shared.service';
export interface Course {
  id: number;
  title: string;
  data: Uint8Array;
  type: string;
  date: Date;
  nblike: number;
  nbdislike: number;
  report:number;
  id_U: number;
  id_sub: number;
}

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  cs: Course[] = [];
  courDeletedSubject = new Subject<number>();

  constructor(
    private d: DataService,
    private c: CourService,
    private reportService: ReportSharedService 
  ) { }
  ngOnInit() {
    this.fetchCourses();
      }

      fetchCourses(): void {
        this.c.getCour().subscribe((data: any[]) => {
          this.cs = data.map(item => ({
            id: item.id_d,
            title: item.title,
            data: new Uint8Array(item.dataD),
            type: item.type,
            date: new Date(item.date),
            nblike: item.nblike,
            nbdislike: item.nbdislike,
            report:item.report,
            id_U: item.id_U,
            id_sub: item.subject_id2 
          }));
          this.cs.forEach(c => this.d.set(c));
        });
        this.courDeletedSubject.subscribe((id: number) => {
          this.d.deletedCour(id).subscribe(() => {
            this.cs = this.cs.filter(c => c.id !== id);
          });
        });
      }

  FileUpload(event: any): void {
    this.d.upload(event);
  }

}


  /*updateCourseList(updatedCourse: Course) {
    const courseIndex = this.cs.findIndex(c => c.id === updatedCourse.id);
    if (courseIndex !== -1) {
      this.cs[courseIndex] = updatedCourse; 
    }
    console.log(this.cs);
    
  }*/
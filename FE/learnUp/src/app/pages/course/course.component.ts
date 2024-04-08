import { Component, OnInit } from '@angular/core';
import { CourService } from '../service/cour.service';
import { DataService } from '../service/data.service';
export interface Course {
  id: number;
  title: string;
  data: Uint8Array;
  type: string;
  date: Date;
  nblike: number;
  nbdislike: number;
  id_U: number;
  id_sub: number;
}
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent implements OnInit {
  cs: Course[] = [];
  
  constructor(private dataService: DataService, private c: CourService) { }

  ngOnInit() {
    this.fetchCourses();
  }

  fetchCourses(): void {
    this.c.getCour().subscribe((data: any[]) => {
      this.cs = data.map(item => ({
        id: item.id_d,
        title: item.title,
        data: new Uint8Array(item.dataD), // Convert dataD to Uint8Array
        type: item.type,
        date: new Date(item.date),
        nblike: item.nblike,
        nbdislike: item.nbdislike,
        id_U: item.id_U,
        id_sub: item.subject_id2 
      }));
      this.cs.forEach(c => this.dataService.set(c));
    });
  }

  FileUpload(event: any): void {
    this.dataService.upload(event);
  }

}

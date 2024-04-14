import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { log } from 'console';
import { Subject } from 'rxjs';
import { CourService } from '../service/cour.service';
import { DataService } from '../service/data.service';
import { ReportSharedService } from '../service/report-shared.service';
import { SearchService } from '../service/search.service';

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
  form:FormGroup
  cs: Course[] = [];
  n!:string
  cour:{ idSubject: number, nameSub: string }[]=[]
  courDeletedSubject = new Subject<number>();

  constructor(private fb: FormBuilder,    private d: DataService,
    private c: CourService,
    private s: SearchService,
    private reportService: ReportSharedService) {
      this.form = this.fb.group({
        cour: [null, Validators.required],
        examn: [null, Validators.required],
        subjects: [[], Validators.required],
        file: [null, Validators.required]
      });
  }
  ngOnInit() {
    this.fetchCourses();
    this.n=this.s.c;
    this.getCour()
      }
      validateFile(control: FormControl): { [key: string]: any } | null {
        if (control.value && control.value.type !== 'application/pdf') {
          return { 'fileType': true };
        }
        return null;
      }
 getCour(){
    if (this.n) {
      this.s.getAllCour(this.n).subscribe((data:{ idSubject: number, nameSub: string }[]) => {
        this.cour = data;
        console.log(this.cour)
      });   
      }
    }
      fetchCourses(): void {
        this.c.getCour().subscribe((data: any[]) => {
          this.cs= data.map(item => ({
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

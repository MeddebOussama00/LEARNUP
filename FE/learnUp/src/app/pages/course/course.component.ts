import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { log } from 'console';
import { Observable, Subject } from 'rxjs';
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
  form!: FormGroup;
  cs: Course[] = [];
  n!: string;
  cour: { idSubject: number, nameSub: string }[] = [];
  courDeletedSubject = new Subject<number>();
  m: string = '';
  formArray = new FormArray<FormControl<boolean | null>>(this.cour.map(() => new FormControl(false)));
  private courseSubject: Subject<Course | undefined> = new Subject<Course | undefined>();

  constructor(private fb: FormBuilder, private d: DataService,
    private c: CourService,
    private s: SearchService,
    private reportService: ReportSharedService) {
  }
  ngOnInit() {
    this.form = this.fb.group({
      cour: [null, Validators.required],
      examn: [null, Validators.required],
      subject: [null, Validators.required], // Use a single form control for the selected subject
      file: [null, [Validators.required, this.validateFile.bind(this)]],
    });
    
    this.fetchCourses();
    this.n = this.s.c;
    this.getCourPop();
  }
  
  getSelectedSubject(): number | undefined {
    return this.form.get('subject')?.value;
  }  
  validateFile(control: FormControl): { [key: string]: any } | null {
    if (control.value && control.value.type !== 'application/pdf') {
      return { 'fileType': true };
    }
    return null;
  }
  GetFile(event: any) {
    const file = event.target.files[0];
    if (!file) {
      return null;
    }
    const fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      const fileContent = e.target.result;
      const selectedSubjectId = this.getSelectedSubject();
      if (selectedSubjectId !== undefined) {
        const course: Course = {
          id: this.d.generateSimpleId(),
          title: file.name,
          data: new Uint8Array(fileContent as ArrayBuffer), // convert fileContent to ArrayBuffer
          type: 'cour',
          date: new Date(),
          nblike: 0,
          nbdislike: 0,
          report: 0,
          id_U: 1,
          id_sub: selectedSubjectId
        }
        this.courseSubject.next(course); // emit the course object through the subject
      }
    };
    fileReader.readAsArrayBuffer(file);
    return null;
  }
  FileUpload(event: Event) {
    this.courseSubject.subscribe((course) => {
      console.log(course)
      if (course) {
        this.d.upload(course).subscribe(() => {
          this.fetchCourses();
        });
      }
    });
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
getCourPop(): void {
  if (this.n) {
    this.s.getAllCour(this.n).subscribe((data: { idSubject: number, nameSub: string }[]) => {
      this.cour = data;
      const formArray = this.formArray; // Use the initialized formArray variable
      formArray.clear(); // Clear any existing controls
      this.cour.forEach(subject => {
        formArray.push(new FormControl(false)); // Add a FormControl for each subject
      });
    });
  }
}


}


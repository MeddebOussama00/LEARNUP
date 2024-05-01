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
  selectedCourse: Course | null = null;
  formArray = new FormArray<FormControl<boolean | null>>(this.cour.map(() => new FormControl(false)));
  private courseSubject: Subject<Course | undefined> = new Subject<Course | undefined>();

  constructor(private fb: FormBuilder, private d: DataService,
    private c: CourService,
    private s: SearchService,
    private reportService: ReportSharedService) {
      this.form = this.fb.group({
        mat: ["", Validators.required],
        subject: ["", Validators.required], 
        file: [null, [Validators.required, this.validateFile.bind(this)]],
      }); 
  }
  ngOnInit() {   

    this.fetchCourses();
    this.n = this.s.c;
    this.getCourPop();
    this.reportService.accountDoc$.subscribe((data: Course[]) => {
      this.cs = data;
    });

  }
  isFormValid(): boolean {
    const fileControl = this.form.controls['file'];
    const courControl = this.form.controls['mat'];
    const subjectControl = this.form.controls['subject'];
    console.log('File control valid:', fileControl.valid);
    console.log('Cour control value:', courControl.value);
    console.log('Subject control value:', subjectControl.value);
    return fileControl.valid && courControl.value !== '' && subjectControl.value !== '';
  }
  
  
  getSelectedSubject(): number | undefined {
    return this.form.get('subject')?.value;
  }  
  getSelectedType(): string| undefined {
    return this.form.get('mat')?.value;
  }
  validateFile(control: FormControl): { [key: string]: any } | null {
    if (control.value && control.value.type !== 'application/pdf') {
      return { 'fileType': true };
    }
    return null;
  }

  getfile(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const fileData = (event.target as FileReader).result as ArrayBuffer;
        const selectedSubjectId = this.getSelectedSubject();
        const mat=this.getSelectedType()
        if (selectedSubjectId !== undefined && mat!==undefined) {

          const course: Course = {
            id: 0,
            title: file.name,
            data: new Uint8Array(fileData),
            type: mat,
            date: new Date(),
            nblike: 0,
            nbdislike: 0,
            report: 0,
            id_U: 1, 
            id_sub: selectedSubjectId
          };
          this.selectedCourse = course; 
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  onAddCourse() {
    if (this.selectedCourse) {
      this.d.upload(this.selectedCourse).subscribe(
        (response) => {
          console.log('Course added successfully:', response);
          this.fetchCourses();

        },
        (error) => {
          console.error('Error adding course:', error);
        }
      );
    } else {
      console.error('No course data to add.');
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
              this.reportService.updateAccountDocSubject(this.cs);
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
      const formArray = this.formArray; 
      formArray.clear(); 
      this.cour.forEach(subject => {
        formArray.push(new FormControl(false)); 
      });
    });
  }
}


}


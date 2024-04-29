import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Course } from '../course/course.component';
import { CourService } from '../service/cour.service';
import { DataService } from '../service/data.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchService } from '../service/search.service';

@Component({
  selector: 'app-examn',
  templateUrl: './examn.component.html',
  styleUrl: './examn.component.css'
})
export class ExamnComponent implements OnInit {
  sh : Course[] = [];
  n!: string;
  selectedCourse: Course | null = null;
  form!: FormGroup;
  cour: { idSubject: number, nameSub: string }[] = [];
  courDeletedSubject = new Subject<number>();
  m: string = '';
  formArray = new FormArray<FormControl<boolean | null>>(this.cour.map(() => new FormControl(false)));
  private courseSubject: Subject<Course | undefined> = new Subject<Course | undefined>();
  constructor(private fb: FormBuilder,private d: DataService,private c:CourService,private s:SearchService)  { }
  ngOnInit() {
    this.form = this.fb.group({
      cour: [null, Validators.required],
      examn: [null, Validators.required],
      subject: [null, Validators.required], 
      file: [null, [Validators.required, this.validateFile.bind(this)]],
    });
    
    this.fetchCourses();
    this.n = this.s.c;
    this.getCourPop();
  }
  fetchCourses(): void {
    this.c.getexman().subscribe((data: any[]) => {
      console.log(data);
      this.sh= data.map(item => ({
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
      this.sh.forEach(c => this.d.set(c));
    });
    this.courDeletedSubject.subscribe((id: number) => {
      this.d.deletedCour(id).subscribe(() => {
        this.sh= this.sh.filter(c => c.id !== id);
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
  getSelectedSubject(): number | undefined {
    return this.form.get('subject')?.value;
  }  
  validateFile(control: FormControl): { [key: string]: any } | null {
    if (control.value && control.value.type !== 'application/pdf') {
      return { 'fileType': true };
    }
    return null;
  }
  getSelectedType(): string| undefined {
    return this.form.get('mat')?.value;
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
  
}
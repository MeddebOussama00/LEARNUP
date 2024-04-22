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
      subject: [null, Validators.required], // Use a single form control for the selected subject
      file: [null, [Validators.required, this.validateFile.bind(this)]],
    });
    
    this.fetchCourses();
    this.n = this.s.c;
    this.getCourPop();
  }
  fetchCourses(): void {
    this.c.getexman().subscribe((data: any[]) => {
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
        const formArray = this.formArray; // Use the initialized formArray variable
        formArray.clear(); // Clear any existing controls
        this.cour.forEach(subject => {
          formArray.push(new FormControl(false)); // Add a FormControl for each subject
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
          id: 0,
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
  
}
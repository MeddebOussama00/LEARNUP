import { Component, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import { log } from 'console';
import { CourseComponent } from '../../course/course.component';
import { Course } from '../../course/course.component';
import { doc } from '../../report/report.component';
import { CourService } from '../../service/cour.service';
import { DataService } from '../../service/data.service';
import { ReportSharedService } from '../../service/report-shared.service';
@Component({
  selector: 'app-cour',
  templateUrl: './cour.component.html',
  styleUrls: ['./cour.component.css']
})
export class CourComponent implements OnInit {
  @Input() cours!: Course ;
  public isLiked = false;
  public isDisliked = false;
  r:Array<any> = [];
  constructor( private c :CourService,private d:DataService,private shared :ReportSharedService) {}
  
  ngOnInit(): void {}
  reportCourse() {
    this.cours.report = 1;
    this.c.putCour(this.cours.id).subscribe();
    this.shared.reportCourse(this.cours);
  }

  likeCount(): void {
    if (this.cours && this.cours.nblike !== undefined) {
      this.cours.nblike++;
      this.c.Putlike(this.cours.id).subscribe(()=>{console.log("succes")});
    }
  }

  dislikeCount(): void {
    if (this.cours && this.cours.nbdislike!== undefined)  {
      this.cours.nbdislike++;
      this.c.Putdislike(this.cours.id).subscribe(()=>{console.log("succes")});

    }
  }



  download(): void {
    if (this.cours && this.cours.data) {
      const blob = new Blob([this.cours.data]); 
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = this.cours.title || 'download';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }
}



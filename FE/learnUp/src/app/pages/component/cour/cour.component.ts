import { Component, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import { CourseComponent } from '../../course/course.component';
import { Course } from '../../course/course.component';
import { CourService } from '../../service/cour.service';
@Component({
  selector: 'app-cour',
  templateUrl: './cour.component.html',
  styleUrls: ['./cour.component.css']
})
export class CourComponent implements OnInit {
  @Input() cours: Course | undefined;
  public isLiked = false;
  public isDisliked = false;
  
  constructor( private c :CourService) {}
  
  ngOnInit(): void {}

  likeCount(): void {
    this.isLiked = true;
    if (this.cours && this.cours.nblike !== undefined) {
      this.cours.nblike++;
      this.updateCounts();
    }
  }

  dislikeCount(): void {
    this.isDisliked = true;
    if (this.cours && this.cours.nbdislike!== undefined)  {
      this.cours.nbdislike++;
    }
  }

  updateCounts():void {
    if(this.cours){
      /*this.c.Putlike(this.cours);*/
    }
  }

  download(): void {
    if (this.cours && this.cours.data) {
      const blob = new Blob([this.cours.data]); // Convert Uint8Array to Blob
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

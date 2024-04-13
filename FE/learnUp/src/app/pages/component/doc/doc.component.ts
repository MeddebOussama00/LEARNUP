import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { type } from 'os';
import { Course } from '../../course/course.component';
import { doc } from '../../report/report.component';
import { CourService } from '../../service/cour.service';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrl: './doc.component.css'
})
export class DocComponent implements OnInit {
  @Input() c:any;
  @Output() deleteCourse = new EventEmitter<number>();
  ngOnInit(): void {
  }  
  courDeleted(id: number): void {
    this.deleteCourse.emit(id);
  }
}
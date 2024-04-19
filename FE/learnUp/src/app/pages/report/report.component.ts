import { Component, OnInit } from '@angular/core';
import { Course } from '../course/course.component';
import { CourService } from '../service/cour.service';
import { DataService } from '../service/data.service';
import { ReportSharedService } from '../service/report-shared.service';

export interface doc {
  id: number;
  title: string;
  date: Date;
  id_U: number;
  id_sub: number;
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent{
  r: any[] = [];
  sh:any[]=[]
  constructor(
    private dataService: DataService,
    private sharedService: ReportSharedService
  ) {
    this.sharedService.getReport().subscribe((reportedCourses: any[]) => {
      this.r = reportedCourses;
    });
    this.sharedService.getMessage().subscribe((reportedMessage: any[]) => {
      this.sh = reportedMessage;
    });
  }
  
  courDeleted(id: number): void {
    this.dataService.deletedCour(id).subscribe(() => {
      this.r = this.r.filter((course) => course.id !== id);
    });
  }
  MessageDeleted(id: number): void {
    this.dataService.deletedMessage(id).subscribe(() => {
      this.sh = this.sh.filter((message) => message.id !== id);
    });
  }
  

}
import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  sh: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.sh= this.dataService.get();  
  } 
    
  FileUpload(event:any){
    this.dataService.upload(event)
  }

}

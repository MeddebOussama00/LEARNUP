import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
@Component({
  selector: 'app-examn',
  templateUrl: './examn.component.html',
  styleUrl: './examn.component.css'
})
export class ExamnComponent implements OnInit {
  sh: any[] = [];

  constructor(private dataService: DataService)  { }

  ngOnInit() {
    this.sh= this.dataService.get();  
    
  } 
  FileUpload(event:any){
    this.dataService.upload(event)
  }
    
}
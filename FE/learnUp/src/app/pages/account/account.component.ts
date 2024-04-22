import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { LoginService } from '../service/login.service';
import { ReportSharedService } from '../service/report-shared.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  r: any[] = [];
  sh:any[]=[]
  constructor(
    private dataService: DataService,
    private sharedService: ReportSharedService,
    private l : LoginService
  ){}    
  ngOnInit(){
    this.sharedService.getAccountDoc().subscribe((accountDocSubject: any[]) => {
      this.r =accountDocSubject;
    });
    this.sharedService.getAccountMsg().subscribe((accountMsgSubject: any[]) => {
      this.sh = accountMsgSubject;
    });
  }
  logout(){
    this.l.logout()
  }
  deleteDocument(documentId: number) {
    this.dataService.deletedCour(documentId).subscribe(response => {
      if (response.success) {
        this.r = this.r.filter(doc => doc.id !== documentId);
        this.sharedService.deleteDocument(documentId)
      }
    });
  }
  deleteMessage(documentId: number) {
    this.dataService.deletedMessage(documentId).subscribe(response => {
      if (response.success) {
        this.sh = this.sh.filter(msg=> msg.id !== documentId);
        this.sharedService.deleteMessage(documentId)
      }
    });
  }
}

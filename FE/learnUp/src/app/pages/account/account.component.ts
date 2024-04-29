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
  type: string | null = '';

  constructor(
    private dataService: DataService,
    private sharedService: ReportSharedService,
    private l: LoginService
  ) {}

  ngOnInit() {

      this.loadData()

    this.type = this.l.getType();
  }

  loadData() {
    this.sharedService.getAccountDoc().subscribe((accountDocSubject: any[]) => {
      this.r = accountDocSubject;
    });
    this.sharedService.getAccountMsg().subscribe((accountMsgSubject: any[]) => {
      this.sh = accountMsgSubject;
    });
  }
  logout(){
    this.l.logout()
  }
  deleteDocument(documentId: number) {
    console.log(documentId)
    this.dataService.deletedCour(documentId).subscribe(response => {
        this.r = this.r.filter(doc => doc.id !== documentId);
        this.loadData()
    });
  }
  deleteMessage(documentId: number) {
    console.log(documentId)
    this.dataService.deletedMessage(documentId).subscribe(response => {
        this.sh = this.sh.filter(msg=> msg.id !== documentId);
        this.loadData()
    });
  }
}

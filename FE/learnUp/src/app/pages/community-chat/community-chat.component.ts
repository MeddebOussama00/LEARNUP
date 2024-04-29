import { Component, OnInit } from '@angular/core';
import { Message } from '../Message.model';
import { catchError, map, Observable, of } from 'rxjs';
import { ChatService } from '../service/chat.service';
import { ReportSharedService } from '../service/report-shared.service';

@Component({
  selector: 'app-community-chat',
  templateUrl: './community-chat.component.html',
  styleUrls: ['./community-chat.component.css']
})
export class CommunityChatComponent implements OnInit {
  messages$: Observable<Message[]> | undefined;
  newMessage: string = '';

  constructor(private chatService: ChatService, private r: ReportSharedService) { }

  ngOnInit(): void {
    this.loadMessages()
    this.r.reportedMessage$.subscribe((reportedMessages: Message[]) => {
      if (this.messages$) {
        this.messages$ = this.messages$.pipe(
          map(messages => messages.filter(message => !reportedMessages.some(reportedMessage => reportedMessage.id === message.id)))
        );
      }
    });
  
   
  }
  
  
  
  loadMessages(): void {
    this.messages$ = this.chatService.getMessages();
  }

  sendMessage(): void {
    if (this.newMessage.trim() !== '') {
      this.chatService.addMessage(this.newMessage)
        .subscribe(() => {
          this.loadMessages()
          this.newMessage = '';
        });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Message } from '../Message.model';
import { catchError, Observable, of } from 'rxjs';
import { ChatService } from '../service/chat.service';
import { Commentaire } from '../Comment.model';
@Component({
  selector: 'app-community-chat',
  templateUrl: './community-chat.component.html',
  styleUrl: './community-chat.component.css'
})
export class CommunityChatComponent implements OnInit {
  messages$: Observable<Message[]> | undefined;
  newMessage: string = '';

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.messages$ = this.chatService.getMessages()
      .pipe(
        catchError(error => {
          console.error('Error fetching messages:', error); // Handle errors gracefully
          return of([]); // Return an empty observable in case of error
        })
      );
  }

  sendMessage(): void {
    if (this.newMessage.trim() !== '') {
      this.chatService.addMessage(this.newMessage)
        .subscribe(() => {
          this.messages$ = this.chatService.getMessages();
          this.newMessage = '';
        });
    }
  }
}

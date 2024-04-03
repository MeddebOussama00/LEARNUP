import { Component, OnInit } from '@angular/core';
import { ChatService } from '../service/chat.service';

@Component({
  selector: 'app-communitychat',
  templateUrl: './communitychat.component.html',
  styleUrl: './communitychat.component.css'
})
export class CommunitychatComponent implements OnInit {
  bc = '';
  newMessage = '';
  messages: {sender: string, content: string, comments: Array<string>,date:Date }[] = [];

  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.messages = this.chat.getMs();
    this.bc = this.chat.bc;
  }
  
  chatsend() {
    this.chat.sendMessage(this.newMessage);
    this.newMessage = '';
  }

  Chatcommente(message:any) {
    this.chat.addComment(message, this.newMessage);
    this.newMessage = `Replying to ${message.sender}:`;
  }

  get placeholder(): string {
    if (this.messages && this.messages.length > 0 && this.messages[0].comments && this.messages[0].comments.length > 0) {
      return 'Type your commenthere...';
    }
    return 'Type a message here...';
  }
}

import { Component, Input } from '@angular/core';
import { ChatService } from '../../service/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  @Input() message:any={}
  constructor(private chat:ChatService){}

  Chatcommente(message:any){
    this.chat.comment(message)
  }
}

/*  import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

interface Message {
  sender: string;
  content: string;
  comments?: Array<string>;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages: Message[] = [];
  newMessage: string = '';
  c = new Date();

  constructor(private datePipe: DatePipe) {}

  sendMessage() {
    console.log();
    if (this.newMessage) {
      this.messages.push({ sender: 'You', content: this.newMessage });
      this.newMessage = '';
    }
  }

  commente(message: Message) {
    this.c = new Date();
    if (this.newMessage) {
      message.comments = message.comments || [];
      message.comments.push(this.newMessage);
      this.messages.push({
        sender: 'commenter',
        content: this.newMessage,
        comments: []
      });
      this.newMessage = '';
    }
  }
}*/




  
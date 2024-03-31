import { Component, OnInit } from '@angular/core';
import { ChatService } from '../service/chat.service';

@Component({
  selector: 'app-communitychat',
  templateUrl: './communitychat.component.html',
  styleUrl: './communitychat.component.css'
})
export class CommunitychatComponent implements OnInit {
  bc=""
  newMessage=""
  constructor(private chat:ChatService){}
  messages: {sender: string, content: string, comments: Array<string> }[]=[]
 ngOnInit(){
  this.messages=this.chat.getMs()
  this.bc=this.chat.bc
 }
 chatsend() {
  this.chat.sendMessage(this.newMessage);
  this.newMessage = '';
}
}
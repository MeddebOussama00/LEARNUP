import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  messages: Array<{ sender: string, content: string }> = [];
  newMessage: string = '';
  bc="Type your message here...";
  c = new Date();
  sendMessage() {
    if (this.newMessage) {
      this.messages.push({ sender: 'You', content: this.newMessage });
      this.newMessage = '';
    }}
   /* commentOnMessage(message: {sender: string, content: string, comments: Array<string> }) {
      this.bc="repondre a ce comenter"
      const newComment = prompt('Enter your comment:');
      if (newComment) {
        message.comments.push(newComment);
      }
    } */ 
}
/*    <div class="message-container" *ngFor="let message of messages">
      <div class="sender">{{ message.sender }}:</div>
      <div class="content">{{ message.content }}</div>
    </div> */
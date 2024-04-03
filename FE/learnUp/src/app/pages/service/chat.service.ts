import { Injectable } from '@angular/core';
export interface Message {
  sender: string;
  content: string;
  date: Date;
  comments: string[];
}
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  messages: Message[] = [];
  newMessage: string = '';
  bc = 'Type your message here...';

  setMessage(s: string) {
    this.newMessage = s;
  }

  sendMessage(s: string) {
    if (s && this.bc!== 'Type your message here...') {
      const message = this.messages.find(m => m.sender === 'You');
      if (message) {
        message.content = s;
        message.comments.push(s);
        this.newMessage = '';
        this.bc = 'Type your message here...';
      }
    } else {
      const message: Message = {
        sender: 'You',
        content: s,
        date: new Date(),
        comments: [],
      };
      this.messages.push(message);
      this.newMessage = '';
    }
  }

  getMs() {
    return this.messages;
  }

  addComment(message: Message, comment: string) {
    if (!message.comments) {
      message.comments = [];
    }
    message.comments.push(comment);
    this.messages = this.messages.map((m) => (m === message? {...message, comments: [...message.comments, comment] } : m));
  }

  chatComment(message: Message) {
    this.bc = `Reply to ${message.sender}`;
  }
}
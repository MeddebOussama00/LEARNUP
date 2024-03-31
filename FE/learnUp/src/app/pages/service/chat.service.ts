import { Injectable } from '@angular/core';

interface Message {
  sender: string;
  content: string;
  date: Date;
  comments: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  //readonly DEFAULT_MESSAGE = 'Type your message here...';
  messages: Message[] = [];
  newMessage: string = '';
  bc = 'Type your message here...';
  setMessage(s:string){
    this.newMessage=s;
  }
  sendMessage(s:string) {
    if (s) {
      const message: Message = {
        sender: 'You',
        content: this.newMessage,
        date: new Date(),
        comments: [],
      };
      this.messages.push(message);
      this.newMessage = '';
    }
  }
  getMs(){
    return this.messages
  }
  addComment(message: Message, comment: string) {
    message.comments.push(comment);
    this.messages.push({ ...message, comments: [...message.comments, comment] });
  }

  comment(message: Message) {
    if (this.newMessage) {
      this.addComment(message, this.newMessage);
      this.newMessage = '';
    }
    this.bc = `repondre a ${message.sender}`;
  }
}



/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }
  messages: {sender: string, content: string,date:Date, comments: Array<string> }[]=[]
  newMessage: string = '';
  bc="Type your message here...";
  sendMessage() {
    if (this.newMessage) {
      this.messages.push({ sender: 'You', content: this.newMessage,date:new Date(),comments:[] });
      this.newMessage = '';
    }}
    commente(message:any){
      this.bc=`repondre a ${message.sender}`;
      if(this.newMessage){
        this.messages.push({ sender: 'commenter à you  ', content: this.newMessage,date:new Date(),comments:[] })
        this.messages.push({ sender: 'You', content: this.newMessage,date:new Date(),comments:[this.newMessage] });
        this.newMessage = '';
      }
}*/

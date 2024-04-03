import { Component, Input } from '@angular/core';
import { ChatService,Message } from '../../service/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  @Input() message!: Message;
  @Input() bc!: string;
  public chatServiceAccessor = this.chatService;
  public like=0
  public dislike=0
  public isLiked = false;
  public isDisliked = false;
  constructor(private chatService: ChatService) {}

  chatComment(message: Message) {
    this.bc = message.sender;
  }
  onButtonClick(message: Message) {
    if (this.bc !== 'Type your message here...') {
      this.chatServiceAccessor.addComment(message, this.chatServiceAccessor.newMessage);
      this.chatServiceAccessor.newMessage = '';
      this.bc = 'Type your message here...';
    }
  }
  likeCount(): void {
    this.isLiked=true
    if(this.like>-1){
      this.like ++;
    }
  }
  dislikeCount(): void {
    this.isDisliked=true
    this.dislike++;
  }
}
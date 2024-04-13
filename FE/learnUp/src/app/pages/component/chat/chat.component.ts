import { Component, Input, OnInit } from '@angular/core';
import { ChatService} from '../../service/chat.service'; 
import { Message } from '../../Message.model';
import { Commentaire } from '../../Comment.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input()
  message!: Message;
  showCommentInput: boolean = false;
  newComment: string = '';

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    if (!this.message?.comments) {
      this.message.comments = [];
    }
  }

  toggleCommentInput(): void {
    this.showCommentInput = !this.showCommentInput;
  }

  addComment(): void {
    if (this.newComment.trim() !== '') {
      this.chatService.addComment(this.message?.id, this.newComment)
        .subscribe((comment: Commentaire) => {
          this.message.comments = this.message.comments ?? [];
          this.message?.comments.push(comment);
          this.newComment = '';
          this.showCommentInput = false;
        });
    }
  }
}  

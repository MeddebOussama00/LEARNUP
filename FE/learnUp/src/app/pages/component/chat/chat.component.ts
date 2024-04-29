import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from '../../service/chat.service'; 
import { Message } from '../../Message.model';
import { Commentaire } from '../../Comment.model';
import { ReportSharedService } from '../../service/report-shared.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() message!: Message; 
   isLiked = false; 
   isDisliked = false; 
  showCommentInput = false;
  newComment = '';

  constructor(private chatService: ChatService, private shared: ReportSharedService) {}

  ngOnInit(): void {
    if (!this.message?.comments) {
      this.message.comments = [];
    }
  }

  likeCount(): void {
    if (this.message && this.message.nblike !== undefined) {
      this.message.nblike++;
      this.chatService.Putlike(this.message.id).subscribe(()=>{console.log("succes")});
    }
  }

  dislikeCount(): void {
    if (this.message && this.message.nbdislike!== undefined)  {
      this.message.nbdislike++;
      this.chatService.Putdislike(this.message.id).subscribe(()=>{console.log("succes")});

    }
  }
  reportMessage() {
    this.message.report = 1;
    this.chatService.putMessage(this.message.id).subscribe();
    this.shared.reportedmessage(this.message)
  }
  toggleCommentInput(): void {
    this.showCommentInput = !this.showCommentInput;
  }

  addComment(): void {
    if (this.newComment.trim() !== '') {
      this.chatService.addComment(this.message?.id, this.newComment)
        .subscribe((comment: Commentaire) => {
          if (!this.message.comments) {
            this.message.comments = []; 
          }
          this.message.comments.push(comment); 
          console.log(this.message.comments)
          this.newComment = '';
          this.showCommentInput = false;
        });
    }
  }
  
}  

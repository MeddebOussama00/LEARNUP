import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cour',
  templateUrl: './cour.component.html',
  styleUrl: './cour.component.css'
})
export class CourComponent {
  public like=0
  public dislike=0
  public isLiked = false;
  public isDisliked = false;
  
  constructor(){
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

import { Component, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-cour',
  templateUrl: './cour.component.html',
  styleUrl: './cour.component.css'
})
export class CourComponent {
  @Input() cours: any;
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
  download(){
    const arrayBuffer = new Uint8Array(this.cours.f).buffer;
    const blob = new Blob([arrayBuffer], {type: "application/pdf"});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = this.cours.name;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }
}


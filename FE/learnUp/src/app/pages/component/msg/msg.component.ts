import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.css'] // Change 'styleUrl' to 'styleUrls'
})
export class MsgComponent implements OnInit {
  @Input() c: any;
  @Output() MessageDeleted = new EventEmitter<number>(); // Change 'deletmessage' to 'MessageDeleted'

  constructor() { }

  ngOnInit(): void {
  }

  deleteMessage(id: number): void { // Change 'MessageDeleted' to 'deleteMessage'
    this.MessageDeleted.emit(id);
  }
}

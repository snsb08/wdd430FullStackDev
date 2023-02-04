import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import {Message} from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit{
  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('msgText') msgTextInputRef: ElementRef;
  // @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: string = '13';

  constructor(private mService: MessageService){};

  onSendMessage(){
    const msgSubject = this.subjectInputRef.nativeElement.value;
    const msgMsgText = this.msgTextInputRef.nativeElement.value;
    const newMessage = new Message('0', msgSubject, msgMsgText, this.currentSender);
    this.mService.addMessage(newMessage);
    // this.addMessageEvent.emit(newMessage);
  }

  onClear(){
    // const clearMessage = new Message('0', '', '', this.currentSender);
    // this.addMessageEvent.emit(clearMessage);
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
  }

  ngOnInit() {
    
  }

}

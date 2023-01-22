import { Component, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';

import {Message} from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {
  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('msgText') msgTextInputRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender = "Sheyla"

  onSendMessage(){
    const msgSubject = this.subjectInputRef.nativeElement.value;
    const msgMsgText = this.msgTextInputRef.nativeElement.value;
    const newMessage = new Message('0', msgSubject, msgMsgText, this.currentSender);
    this.addMessageEvent.emit(newMessage);
  }

  onClear(){
    const clearMessage = new Message('0', '', '', this.currentSender);
    this.addMessageEvent.emit(clearMessage);
  }

}

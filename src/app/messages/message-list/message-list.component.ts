import { Component, OnDestroy, OnInit } from '@angular/core';

import {Message} from '../message.model';
import { MessageService } from '../message.service';
import {Subscription } from 'rxjs';


@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnDestroy{
  messages: Message[] = [
    // new Message ('1', 'Hi', 'How are you?', 'Sheyla'),
    // new Message ('2', 'hey', 'Great! and you?', 'Justin')
  ];
 private subscription: Subscription;
 messageId: string = "";



  constructor(private messageService: MessageService) {}

  ngOnInit(){
    // this.messages = this.messageService.getMessages();
    // this.messageService.messageChangedEvent
    // .subscribe(
    //   (messages: Message[]) => {
    //     this.messages = messages;
    //   }
    // )

    this.subscription = this.messageService.messageListChangedEvent
    .subscribe(
      (messages: Message[]) => {
        this.messages= messages;
      }
    );
    this.messageService.getMessages();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  // onAddMessage(message:Message){
  //   this.messages.push(message);
  // }

}

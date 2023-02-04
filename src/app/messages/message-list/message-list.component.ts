import { Component, OnInit } from '@angular/core';

import {Message} from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit{
  messages: Message[] = [
    // new Message ('1', 'Hi', 'How are you?', 'Sheyla'),
    // new Message ('2', 'hey', 'Great! and you?', 'Justin')
  ];

  constructor(private messageService: MessageService) {}

  ngOnInit(){
    this.messages = this.messageService.getMessages();
    this.messageService.messageChangedEvent
    .subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    )
  }


  // onAddMessage(message:Message){
  //   this.messages.push(message);
  // }

}

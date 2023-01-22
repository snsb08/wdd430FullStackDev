import { Component } from '@angular/core';

import {Message} from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
messages: Message[] = [
  new Message ('1', 'Hi', 'How are you?', 'Sheyla'),
  new Message ('2', 'hey', 'Great! and you?', 'Justin')
];

onAddMessage(message:Message){
  this.messages.push(message);
}

}

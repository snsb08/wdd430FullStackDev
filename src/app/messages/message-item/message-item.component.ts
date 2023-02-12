import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { Contact } from 'src/app/contacts/contact.model';

import { ContactService } from 'src/app/contacts/contact.service';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit{
  @Input() message: Message;
  // @Input() contact: Contact;
  messageSender:string;


  constructor(private contactService: ContactService) {}

  ngOnInit(){
    // console.log(this.message.sender);
    // console.log(Contact);
    // console.log(this.messageSender);

    const contact: Contact = this.contactService.getContact(this.message.sender);
    // console.log(this.message.sender);

    this.messageSender = contact.name;
    // console.log(this.messageSender);
  }
}

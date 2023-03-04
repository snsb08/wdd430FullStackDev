import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { Contact } from 'src/app/contacts/contact.model';

import { ContactService } from 'src/app/contacts/contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit, OnDestroy{
  @Input() message: Message;
  // @Input() contact: Contact;
  messageSender:string;
  subscription: Subscription;


  constructor(private contactService: ContactService) {}

  ngOnInit(){
    let contact: Contact = this.contactService.getContact(this.message.sender);
    this.messageSender = contact.name;

    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      ()=>{
        contact = this.contactService.getContact(this.message.sender);
        this.messageSender = contact.name;

      }
    )

    // console.log(this.message.sender);
    // console.log(Contact);
    // console.log(this.messageSender);

    //const contact: Contact = this.contactService.getContact(this.message.sender);
    // console.log(this.message.sender);

    //this.messageSender = contact.name;
    // console.log(this.messageSender);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

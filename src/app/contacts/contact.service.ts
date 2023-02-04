import { Injectable, EventEmitter } from '@angular/core';
import {Contact} from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>(); 

  contacts:Contact[] = [];

  constructor() {
    this.contacts = MOCKCONTACTS;
   }

  //method to return the list of contacts
  getContacts():Contact[] {
    return this.contacts.slice();
  }

  //  getContact(id:string) {
    
  //   this.contacts.forEach(contact => {
  //     // console.log(contact.id);
  //     // console.log(id);
  //     if(contact.id === id) {
  //       console.log(contact.id);
  //       console.log(id);
  //       console.log(contact.name);
  //       console.log(contact);

  //       return contact

  //     }
  //   })
  //   return null;
  // }
  
  // getContact(id:string): Contact {
  //   for(let contact of this.contacts) {
  //     if(contact.id == id) {
  //       return contact;
  //     } else if (contact == this.contacts[this.contacts.length-1]){
  //       return null;
  //     }
  //   }

  // }

  getContact(id:string): Contact {
    for(let contact of this.contacts) {
      if(contact.id == id) {
        return contact;
      }
      }
      return null;
  }



 }


import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Contact} from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new Subject<Contact>(); 
  contactChangedEvent = new Subject<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  contacts:Contact[] = [];
  maxContactId: number;

  constructor(private http: HttpClient) {
    // this.contacts = MOCKCONTACTS;
    this.contacts = this.getContacts() ;
    this.maxContactId = this.getMaxContactId();
   }

  //method to return the list of contacts
  // getContacts():Contact[] {
  //   return this.contacts.slice();
  // }

  //new getContacts with http request
  getContacts(){
    this.http.get<Contact[]>('https://mywdd430cms-default-rtdb.firebaseio.com/contacts.json')
      .subscribe((contacts:Contact[]) =>{
        this.contacts = contacts;
        this.maxContactId = this.getMaxContactId()
        //sort the list of contacts
        this.contacts.sort((a,b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0)
        //emit the next contact list
        //change event
        this.contactListChangedEvent.next(this.contacts.slice());
      
      //error method
        (error:any)=>{
          //print the error to the console
          console.log(error);
        }
      });
      return this.contacts.slice();
  }

  storeContacts(){
    JSON.stringify(this.contacts);
    this.http.put<Contact[]>('https://mywdd430cms-default-rtdb.firebaseio.com/contacts.json',
    this.contacts)
    .subscribe( {
      next: () => this.contactListChangedEvent.next(this.contacts.slice())

    });
  }

  

  getContact(id:string): Contact {
    for(let contact of this.contacts) {
      if(contact.id == id) {
        return contact;
      }
      }
      return null;
  }

  deleteContact(contact: Contact){
    if(!contact) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    // this.contactChangedEvent.next(this.contacts.slice());
    this.storeContacts();
  }

  getMaxContactId():number{
    let maxId = 0;
    for (const contact of this.contacts){
      let currentId = parseInt(contact.id)
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact:Contact){
    if (!newContact) {
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    // let contactsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(contactsListClone)
    this.storeContacts();
  }

  updateContact(originalContact:Contact, newContact:Contact) {
    if (originalContact === null || newContact === null) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    // let contactsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(contactsListClone)
    this.storeContacts();
  }

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
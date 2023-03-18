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
    // this.http.get<Contact[]>('https://mywdd430cms-default-rtdb.firebaseio.com/contacts.json')
    this.http.get<Contact[]>('https://localhost:3000/contacts')  
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

  // deleteContact(contact: Contact){
  //   if(!contact) {
  //     return;
  //   }

  //   const pos = this.contacts.indexOf(contact);
  //   if (pos < 0) {
  //     return;
  //   }
  //   this.contacts.splice(pos, 1);
  //   // this.contactChangedEvent.next(this.contacts.slice());
  //   this.storeContacts();
  // }

  //UPDATED deleteContact() after week11:
  deleteContact(contact: Contact) {

    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === contact.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          this.sortAndSend();
        }
      );
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

  // addContact(newContact:Contact){
  //   if (!newContact) {
  //     return;
  //   }
  //   this.maxContactId++;
  //   newContact.id = this.maxContactId.toString();
  //   this.contacts.push(newContact);
  //   // let contactsListClone = this.contacts.slice();
  //   // this.contactListChangedEvent.next(contactsListClone)
  //   this.storeContacts();
  // }

  //UPDATED addContact after week11:
  addContact(contact: Contact) {
    if (!contact) {
      return;
    }

    // make sure id of the new contact is empty
    contact.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
      contact,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new contact to contacts
          this.contacts.push(responseData.contact);
          this.sortAndSend();
        }
      );
  }

  // updateContact(originalContact:Contact, newContact:Contact) {
  //   if (originalContact === null || newContact === null) {
  //     return;
  //   }
  //   const pos = this.contacts.indexOf(originalContact);
  //   if (pos < 0) {
  //     return;
  //   }
  //   newContact.id = originalContact.id;
  //   this.contacts[pos] = newContact;
  //   // let contactsListClone = this.contacts.slice();
  //   // this.contactListChangedEvent.next(contactsListClone)
  //   this.storeContacts();
  // }

  //UPDATED updateContact() after week11
  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === originalContact.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Contact to the id of the old Contact
    newContact.id = originalContact.id;
    // newContact._id = originalContact._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/contacts/' + originalContact.id,
      newContact, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.contacts[pos] = newContact;
          this.sortAndSend();
        }
      );
  }
  
  sortAndSend(){
    this.contacts.sort((a,b)=>{
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    this.contactListChangedEvent.next(this.contacts.slice())
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
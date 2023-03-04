import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {Contact} from '../contact.model';
import { ContactService } from '../contact.service';
import { ContactsFilterPipe } from '../contacts-filter.pipe';


@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit{
  // @Output() selectedContactEvent = new EventEmitter<Contact>(); deleted after adding services
  contacts: Contact[] = [
    // new Contact( '1', 'R. Kent Jackson', 'jacksonk@byui.edu', '208-496-3771', '../../assets/images/jacksonk.jpg', null ),
    // new Contact( '2', 'Rex Barzee', 'barzeer@byui.edu', '208-496-3768', '../../assets/images/barzeer.jpg', null )
  ];
  selectedContact: Contact [];
  subscription: Subscription;
  term: string;


  constructor(private contactService: ContactService) {}

  ngOnInit(){
    // this.contacts = this.contactService.getContacts();

    // this.contactService.contactChangedEvent
    // .subscribe(
    //   (contact: Contact[]) => {
    //     this.selectedContact = contact;
    //   }
    // );
    // this.contactService.getContacts();

    this.subscription = this.contactService.contactListChangedEvent
    .subscribe(
      (contacts: Contact[]) => {
        this.contacts= contacts;
      }
    );
    this.contactService.getContacts();
  }

  search(value:string){
    this.term = value;
  }

  // onSelected(contact: Contact){
  // //   this.selectedContactEvent.emit(contact);Deleted now that we have services enabled
  // this.contactService.contactSelectedEvent.emit(this.contact);
    
  // } 
}




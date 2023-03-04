import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  // name: 'contactsFilter'
  name: 'filteredContacts'

})
export class ContactsFilterPipe implements PipeTransform {

    //transform method to filter out all of the contacts whose name contains the value of the search term. 
  transform(contacts: Contact[], term: string): any {
    let filteredContacts: Contact[]=[];
    if (term && term.length > 0){
     filteredContacts = contacts.filter(
      (contact:Contact)=>
      contact.name.toLowerCase().includes(term.toLowerCase())
     );
    }
    if(filteredContacts.length < 1){
      return contacts;
    }
    return filteredContacts;
  }


  //transform(value: any, args? : any): any
  // transform(contacts: Contact[], term: string): any {
  //   let filteredArray: Contact[]=[];
  //   for(let i=0; i<contacts.length;i++){
  //     let contact = contacts[i];
  //     if (contact.name.toLowerCase().includes(term)){
  //       filteredArray.push(contact);
  //     } 
  //   }
  //   if(filteredArray.length < 1){
  //     return contacts;
  //   }
  //   return filteredArray;
  // }

  //transform(contacts: Contact[], term) BEGIN
   
//    Create a new array to contain the filtered list of contacts
 
//    FOR every contact in the contacts list
//       IF the contact's name includes the value of the search term THEN
//          Add the contact to the new filtered array
//       ENDIF
//    ENDFOR
 
//    If the new filtered array has no contacts in it THEN
//       RETURN the original contacts list
//    ENDIF
 
//    RETURN the new filtered array of contacts
// END

}

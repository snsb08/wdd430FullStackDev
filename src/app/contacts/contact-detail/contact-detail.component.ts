import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';

import {Contact} from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit{
  @Input() contact: Contact;
  id: string;


  // @Input() contact: Contact[] = [
  //   new Contact( '1', 'R. Kent Jackson', 'jacksonk@byui.edu', '208-496-3771', '../../assets/images/jacksonk.jpg', 'null' ),
  //   new Contact( '2', 'Rex Barzee', 'barzeer@byui.edu', '208-496-3768', '../../assets/images/barzeer.jpg', 'null' )
  // ]

  constructor( private contactService: ContactService,
      private router: Router,
      private route: ActivatedRoute ) {}

  ngOnInit(){
    this.route.params
    .subscribe(
      (params: Params) => {
      this.id = params['id'];
      this.contact = this.contactService.getContact(this.id);
    });
  }

  onDelete(){
    this.contactService.deleteContact(this.contact);
    //navigate or navigateByUrl?
    this.router.navigate(['/contacts']);
  }

}

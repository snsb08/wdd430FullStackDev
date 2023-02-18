import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {Subscription } from 'rxjs';

import {Document} from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit, OnDestroy {
 @Input() document: Document;
//  @Input() document: Document[];

 subscription: Subscription;

 constructor( private documentService: DocumentService){}

 ngOnInit(){
  // this.document = this.documentService.getDocuments();
  // this.subscription = this.documentService.documentListChangedEvent
  //   .subscribe(
  //     next?: (document: Document) => {
  //       this.documentsList = documents[];
  //     }
  //   );

  

 }

ngOnDestroy(): void {

 }  

//  onSelectedDocument(){
//   // this.contactSelected.emit(); //part of the output EventEmitter
//   this.documentService.documentSelectedEvent.emit(this.document);

//  }


}

import { Component, Input, OnInit } from '@angular/core';

import {Document} from '../document.model';
// import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit {
 @Input() document: Document;

//  constructor( private documentService: DocumentService){}

 ngOnInit(){}


//  onSelectedDocument(){
//   // this.contactSelected.emit(); //part of the output EventEmitter
//   this.documentService.documentSelectedEvent.emit(this.document);

//  }


}

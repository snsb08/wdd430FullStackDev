import { Component, OnDestroy, OnInit } from '@angular/core';
import {Subscription } from 'rxjs';

import {Document} from '../document.model'
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  // @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents:Document[]=[]; 
  // = [
    // new Document('1', 'doc1', 'This is document #1', 'url#1', 'child1'),
    // new Document('2', 'doc2', 'This is document #2', 'url#2', 'child2'),
    // new Document('3', 'doc3', 'This is document #3', 'url#3', 'child3'),
    // new Document('4', 'doc4', 'This is document #4', 'url#4', 'child4'),
    // new Document('5', 'doc5', 'This is document #5', 'url#5', 'child5')
  // ];
 private subscription: Subscription;

  documentId: string = "";
  selectedDocument: Document;

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    // this.documents = this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent
    .subscribe(
      (documents: Document[]) => {
        this.documents= documents;
      }
    );
    this.documentService.getDocuments();

    // this.documentService.documentChangedEvent
    // .subscribe(
    //   (document: Document) => {
    //     this.selectedDocument = document;
    //   }
    // );

    // // this.subscription = this.documentService.documentListChangedEvent
    // this.documentService.documentListChangedEvent
    // .subscribe(
    //   // next?: (document: Document) => {
    //   //   this.documentsList = documents[];
    //   // }
    //   (document: Document) => {
    //     this.documentList = document;
    //   }

    // );
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // onSelectedDocument(document:Document){
  //   this.selectedDocumentEvent.emit(document);
  // }
 

}

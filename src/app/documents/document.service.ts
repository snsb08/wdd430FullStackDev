import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documents: Document [] = [];

  constructor() { 
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments():Document[]{
    return this.documents.slice();
  }

  // getDocument(id:string){
  //   return this.documents[+id];

  // }

  // getDocument(id:string):Document{
  //   this.documents.forEach(document => {
  //     if(document.id == id) {
  //       return document
  //     }
  //   })
  //   return null;

  // }

  getDocument(id:string):Document {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  deleteDocument(document: Document) {
    if(!document) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
  }
}

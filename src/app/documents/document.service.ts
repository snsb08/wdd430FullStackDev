import { Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  // documentSelectedEvent = new EventEmitter<Document>();
  // documentChangedEvent = new EventEmitter<Document[]>();
  documentSelectedEvent = new Subject<Document>();
  documentChangedEvent = new Subject<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  documents: Document [] = [];
  maxDocumentId: number;

  constructor() { 
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
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
    let documentsListClone = this.documents.slice();

    this.documentChangedEvent.next(documentsListClone);
  }


  getMaxId():number {
    let maxId = 0;
    for (const document of this.documents) {
      let currentId = parseInt(document.id) 
      if (currentId > maxId) {
        maxId = currentId
      }
    }
    return maxId
  }

  addDocument(newDocument:Document){
    if (newDocument === null) {
      return;
    }

    this.maxDocumentId++ 
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    let documentsListClone = this.documents.slice();

    this.documentListChangedEvent.next(documentsListClone)
  }

  updateDocument(originalDocument:Document, newDocument:Document) {
    if (originalDocument === null || newDocument === null) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone)

  }

  
  
} //end of export

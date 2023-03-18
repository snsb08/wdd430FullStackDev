import { Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Subscription } from 'rxjs';

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
  subscription: Subscription;

  constructor(private http: HttpClient) { 
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
    
  }
  //replace getDocuments for http requests
  getDocuments(){
    // this.http.get<Document[]>('https://mywdd430cms-default-rtdb.firebaseio.com/documents.json')
    this.http.get<Document[]>('https://localhost:3000/documents')
    .subscribe((documents:Document[]) =>{
      this.documents = documents;
      this.maxDocumentId = this.getMaxId()
      //sort the list of documents by name
      this.documents.sort((a,b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0)
      //emit the next document list
      //change event
      this.documentListChangedEvent.next(this.documents.slice());
    
    //error method
      (error:any)=>{
        //print the error to the console
        console.log(error);
      }
    })
  }

  storeDocuments(){
    // this.documents.getDocuments(); //?
    JSON.stringify(this.documents);
    this.http.put<Document[]>('https://mywdd430cms-default-rtdb.firebaseio.com/documents.json',
    this.documents)
    .subscribe( {
      next: () => this.documentListChangedEvent.next(this.documents.slice())

      // console.log(response);
    });
  }

  //fecth or get documents? are they the same?
  // fetchDocuments(){
  //   this.http
  //   .get<Document[]>('https://mywdd430cms-default-rtdb.firebaseio.com/documents/json');
  //   .subscribe(documents =>{
  //     this.documentService.setDocuments(documents);
  //   })
  // }

  // getDocuments():Document[]{
  //   return this.documents.slice();
  // }

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

  // setDocuments(documents: Document[]){
  //   this.documents = documents;
  //   this.documentsChanged.next(this.documents.slice());
  // }

  getDocument(id:string):Document {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  // deleteDocument(document: Document) {
  //   if(!document) {
  //     return;
  //   }

  //   const pos = this.documents.indexOf(document);
  //   if (pos < 0) {
  //     return;
  //   }
  //   this.documents.splice(pos, 1);
  //   // let documentsListClone = this.documents.slice();

  //   // this.documentChangedEvent.next(documentsListClone);
  //   this.storeDocuments();

  // }

  //UPDATED deleteDocument() after week11:
  deleteDocument(document: Document) {

    if (!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          this.sortAndSend();
        }
      );
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

  // addDocument(newDocument:Document){
  //   if (newDocument === null) {
  //     return;
  //   }

  //   this.maxDocumentId++ 
  //   newDocument.id = this.maxDocumentId.toString();
  //   this.documents.push(newDocument);
  //   // let documentsListClone = this.documents.slice();

  //   // this.documentListChangedEvent.next(documentsListClone);
  //   this.storeDocuments();
  // }

  //UPDATED addDocument after week11:
  addDocument(document: Document) {
    if (!document) {
      return;
    }

    // make sure id of the new Document is empty
    document.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);
          this.sortAndSend();
        }
      );
  }

  // updateDocument(originalDocument:Document, newDocument:Document) {
  //   if (originalDocument === null || newDocument === null) {
  //     return;
  //   }
  //   const pos = this.documents.indexOf(originalDocument);
  //   if (pos < 0) {
  //     return;
  //   }
  //   newDocument.id = originalDocument.id;
  //   this.documents[pos] = newDocument;
  //   // let documentsListClone = this.documents.slice();
  //   // this.documentListChangedEvent.next(documentsListClone)
  //   this.storeDocuments();
    
  // }

  //UPDATED updateDocument() after week11
  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    // newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/documents/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
        }
      );
  }
  
  sortAndSend(){
    this.documents.sort((a,b)=>{
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    this.documentListChangedEvent.next(this.documents.slice())
  }
  
} //end of export

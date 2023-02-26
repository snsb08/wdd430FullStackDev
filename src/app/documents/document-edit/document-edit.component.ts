import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { DocumentService } from '../document.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit{
  originalDocument: Document;
  document:Document;
  editMode: boolean = false;
  id: number;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit() {
    this.route.params.subscribe (
      (params: Params)=> {
        const id = params['id']; 
        if(!id ){
          this.editMode = false;
          return;
        }
        this.originalDocument= this.documentService.getDocument(id);

        if(!this.originalDocument){
          return;
        }
        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      }
    )
  }

  onSubmit(form: NgForm){
    const value= form.value;
   
    const newDocument = new Document(value.id, value.name, value.description, value.url); 
    // this.documentService.addDocument(newDocument);

    if (this.editMode === true){
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument)
    }
    this.router.navigate(['/documents']);

  }

  onCancel(){
    this.router.navigate(['/documents'] )
  }


// function onCancel(){

// }  
}

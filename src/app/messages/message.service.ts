import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Subject, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];
  maxMessageId: number;
  messageListChangedEvent = new Subject<Message[]>();
  subscription: Subscription;



  constructor(private http: HttpClient) {
    this.messages = MOCKMESSAGES;
    this.maxMessageId = this.getMaxId();

  }

  // getMessages():Message[] {
  //   return this.messages.slice();
  // }

  getMessages(){
    this.http.get<Message[]>('https://mywdd430cms-default-rtdb.firebaseio.com/messages.json')
    .subscribe((messages:Message[]) =>{
      this.messages = messages;
      this.maxMessageId = this.getMaxId();
      //sort the list of messages
      this.messages.sort((a,b) => (a.id < b.id) ? -1 : (a.id > b.id) ? 1 : 0)
      //emit the next message list
      //change event
      this.messageListChangedEvent.next(this.messages.slice());
    
    //error method
      (error:any)=>{
        //print the error to the console
        console.log(error);
      }
    })
  }

  storeMessages(){
    // this.messages.getmessages(); //?
    JSON.stringify(this.messages);
    this.http.put<Message[]>('https://mywdd430cms-default-rtdb.firebaseio.com/messages.json',
    this.messages)
    .subscribe( {
      next: () => this.messageListChangedEvent.next(this.messages.slice())

      // console.log(response);
    });
  }

  getMessage(id:string):Message {
    // this.messages.forEach(message => {
    for (const message of this.messages) {

      if(message.id == id) {
        return message
      }
    }
    return null;
  } 

  addMessage(newMessage:Message){
    // this.messages.push(message);
    // this.messageChangedEvent.emit(this.messages.slice());
    if (newMessage === null) {
      return;
    }

    this.maxMessageId++ 
    newMessage.id = this.maxMessageId.toString();
    this.messages.push(newMessage);
    this.storeMessages();
  }

  getMaxId():number{
    let maxId = 0;
    for (const message of this.messages) {
      let currentId = parseInt(message.id) 
      if (currentId > maxId) {
        maxId = currentId
      }
    }
    return maxId
  }

  updateMessage(originalMessage:Message, newMessage:Message) {
    if (originalMessage === null || newMessage === null) {
      return;
    }
    const pos = this.messages.indexOf(originalMessage);
    if (pos < 0) {
      return;
    }
    newMessage.id = originalMessage.id;
    this.messages[pos] = newMessage;
    this.storeMessages();
    
  }

  deleteMessage(message: Message) {
    if(!message) {
      return;
    }

    const pos = this.messages.indexOf(message);
    if (pos < 0) {
      return;
    }
    this.messages.splice(pos, 1);
    this.storeMessages();

  }



}

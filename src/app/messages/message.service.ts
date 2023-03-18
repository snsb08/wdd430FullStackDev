import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    // this.http.get<Message[]>('https://mywdd430cms-default-rtdb.firebaseio.com/messages.json')
    this.http.get<Message[]>('https://localhost:3000/messages')
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

  // addMessage(newMessage:Message){
  //   // this.messages.push(message);
  //   // this.messageChangedEvent.emit(this.messages.slice());
  //   if (newMessage === null) {
  //     return;
  //   }

  //   this.maxMessageId++ 
  //   newMessage.id = this.maxMessageId.toString();
  //   this.messages.push(newMessage);
  //   this.storeMessages();
  // }

  //UPDATED addMessage after week11:
  addMessage(message: Message) {
    if (!message) {
      return;
    }

    // make sure id of the new message is empty
    message.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message1: string, message: Message }>('http://localhost:3000/messages',
      message,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new message to messages
          this.messages.push(responseData.message);
          this.sortAndSend();
        }
      );
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

  // updateMessage(originalMessage:Message, newMessage:Message) {
  //   if (originalMessage === null || newMessage === null) {
  //     return;
  //   }
  //   const pos = this.messages.indexOf(originalMessage);
  //   if (pos < 0) {
  //     return;
  //   }
  //   newMessage.id = originalMessage.id;
  //   this.messages[pos] = newMessage;
  //   this.storeMessages();
    
  // }

  //UPDATED updateMessage() after week11
  updateMessage(originalMessage: Message, newMessage: Message) {
    if (!originalMessage || !newMessage) {
      return;
    }

    const pos = this.messages.findIndex(d => d.id === originalMessage.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new message to the id of the old message
    newMessage.id = originalMessage.id;
    // newMessage._id = originalMessage._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/messages/' + originalMessage.id,
      newMessage, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.messages[pos] = newMessage;
          this.sortAndSend();
        }
      );
  }
  
  sortAndSend(){
    this.messages.sort((a,b)=>{
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });
    this.messageListChangedEvent.next(this.messages.slice())
  }

  // deleteMessage(message: Message) {
  //   if(!message) {
  //     return;
  //   }

  //   const pos = this.messages.indexOf(message);
  //   if (pos < 0) {
  //     return;
  //   }
  //   this.messages.splice(pos, 1);
  //   this.storeMessages();

  // }

  //UPDATED deleteMessage() after week11:
  deleteMessage(message: Message) {

    if (!message) {
      return;
    }

    const pos = this.messages.findIndex(d => d.id === message.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/messages/' + message.id)
      .subscribe(
        (response: Response) => {
          this.messages.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }




}

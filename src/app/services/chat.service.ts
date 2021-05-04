
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChatUser } from '../models/ChatUser';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private chatCollection: AngularFirestoreCollection <ChatUser>;
  private chat: Observable<ChatUser[]>;

  constructor(private firestore: AngularFirestore) {
    this.chatCollection = firestore.collection('ChatUser');
    this.chat = this.chatCollection.snapshotChanges().pipe(map(
      actions =>{
        return actions.map( a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data}
        })
      }
    ))
   }
  getChats(){
    return this.chat;
  }
  
  getChat(id:string){
    return this.chatCollection.doc<ChatUser>(id).valueChanges();
  }

  addChat(ChatUser:ChatUser){
    return this.chatCollection.add({...ChatUser});
  }

  updateChat(id:string, ChatUser:ChatUser){
    return this.chatCollection.doc(id).update({...ChatUser});
  }

//   removeAyudante(id:string){
//     return this.ayudantesCollection.doc(id).delete();
//  }
}

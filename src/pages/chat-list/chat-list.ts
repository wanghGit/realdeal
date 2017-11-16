import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ChatListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-list',
  templateUrl: 'chat-list.html',
})
export class ChatListPage {
  chatList = [];
  constructor(public events: Events, public navCtrl: NavController, public navParams: NavParams, public storage: Storage, ) {
    this.events.subscribe('chatList', (chatStorage) => {
      // this.chatList=data
      console.log('聊天列表发生变化')
      //this.chatList=chatStorage
      for (let i = 0; i < chatStorage.length; i++) {
        //this.chatList=chatStorage[i].user
        this.chatList.push({
          userName: chatStorage[i].user.id,
          msg: chatStorage[i].info.record.msg,
        })
        // this.chatList = [{
        //   user: { id: chatStorage[i].user.id },
        //   info: { toUser: { id: chatStorage[i].info.toUser.id }, record: { msg: chatStorage[i].info.record.msg} }
        // }];
        console.log(this.chatList[i].userName + '/////' + chatStorage[i].user.id)
        console.log(this.chatList[i].msg + '/////' + chatStorage[i].info.record.msg)
      }
    })

    // for(let i=0;i<this.storage.get('chatStorage').length;i++){
    //   if(this.storage.get('chatStorage')[i].user.id===this.storage.get('user').id){
    //     this.chatList=this.storage.get('chatStorage')[i].info.record.msg
    //   }
    // }

    //this.chatList.sort((a,b)=>a.record[a.record.length-1].time-b.record[a.record.length-1].time)
  }



}

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
  chatListPage = [];
  info = []; //聊天列表
  constructor(public events: Events, public navCtrl: NavController, public navParams: NavParams, public storage: Storage, ) {
    this.events.subscribe('chatList', (chatList) => {
      // this.chatList=data
      console.log('聊天列表发生变化')
      //this.chatList=chatStorage
      //if (chatList.length !== 0) {
      for (let i = 0; i < chatList.length; i++) {
        //this.chatList=chatStorage[i].user
        this.chatListPage.push({
          userName: chatList[i].userId,
          msg: chatList[i].message,
        })
        console.log(this.chatListPage[i].userName + '///chatlsit msg//' + this.chatListPage[i].msg)
      }
      // }
    })

    //this.chatList.sort((a, b) => a.record[a.record.length - 1].time - b.record[a.record.length - 1].time)
  }

  ionViewDidLoad() {
    this.storage.get('chatStorage').then(chatStorage => console.log(chatStorage));
    this.storage.get('chatStorage').then((chatStorage) => {
      console.log(chatStorage);
      this.storage.get('user').then((user) => {
        for (let i = 0; i < chatStorage.length; i++) {
          //判断是否有该用户的记录
          if (chatStorage[i].userId === user.id) {
            console.log('--->', chatStorage[i]);
            this.info = chatStorage[i].info
          }
        }
      })
    })
  }

}

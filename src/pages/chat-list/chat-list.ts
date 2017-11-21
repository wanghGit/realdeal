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
  info = []; //聊天列表
  constructor(public events: Events, public navCtrl: NavController, public navParams: NavParams, public storage: Storage, ) {
    this.events.subscribe('chatList', (chatStorage) => {
      console.log('chatList 收到消息', chatStorage)
      this.storage.get('user').then((user) => {
        for (let i = 0; i < chatStorage.length; i++) {
          //判断是否有该用户的记录
          if (chatStorage[i].userId === user.id) {
            for (let j = 0; j < chatStorage[i].info.length; j++) {
              let last = chatStorage[i].info[j].record.length - 1;
              this.info.push({
                toUser: chatStorage[i].info[j].toUser,
                userName: chatStorage[i].info[j].toUser.id,
                msg: chatStorage[i].info[j].record[last].msg,
              })
            }
          }
        }
      })
    })

    //this.chatList.sort((a, b) => a.record[a.record.length - 1].time - b.record[a.record.length - 1].time)
  }

  ionViewDidLoad() {
    //this.storage.get('chatStorage').then(chatStorage => console.log(chatStorage));
    this.storage.get('chatStorage').then((chatStorage) => {
      console.log(chatStorage);
      this.storage.get('user').then((user) => {
        console.log('chat listchatStorage------>',chatStorage)
        for (let i = 0; i < chatStorage.length; i++) {
          //判断是否有该用户的记录
          if (chatStorage[i].userId === user.id) {
            //this.info = chatStorage[i].info
            for (let j = 0; j < chatStorage[i].info.length; j++) {
              //if (chatStorage[i].info[j].toUser.id === toUser.id) {
              let last = chatStorage[i].info[j].record.length - 1;
              // console.log('//////jjj/', chatStorage[i].info[j])
              this.info.push({
                toUser: chatStorage[i].info[j].toUser,
                userName: chatStorage[i].info[j].toUser.id,
                msg: chatStorage[i].info[j].record[last].msg,
              })
              //}
            }
          }
        }
      })
    })
  }

  gotoChat(c) {
    console.log('chalist--to--chat-->',c);
    this.navCtrl.push('Chat', { toUser: c.toUser });
  }
}

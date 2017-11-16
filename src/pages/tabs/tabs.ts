import { Component } from '@angular/core';
import { IonicPage, Events, Content, TextInput } from "ionic-angular";
import { FindPage } from '../find/find';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';

import { Realtime, TextMessage } from 'leancloud-realtime';
import { TypedMessagesPlugin } from 'leancloud-realtime-plugin-typed-messages';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FindPage;
  tab2Root = HomePage;
  tab3Root = ProfilePage;

  realtime;
  constructor(public events: Events, public storage: Storage, ) {
    // if()
    // 初始化实时通讯 SDK
    this.realtime = new Realtime({
      appId: 'tfaMh3UmNXSphGOeLMjFYfmi-gzGzoHsz',
      plugins: [TypedMessagesPlugin], // 注册富媒体消息插件
    });

    this.createUserChat();
    this.createUserChatList();

  }

  createUserChat() {
    console.log('subscribe')
    this.events.subscribe('user:talk', (user) => this.subscribe(user));

  }
  createUserChatList() {
    console.log('chatListsubscribe/////')
    this.events.subscribe('user:login', (user) => this.chatListsubscribe(user));
  }

  subscribe(user) {
    console.log('subscribe', user)
    this.realtime.createIMClient(user.id).then((Jerry) => {
      Jerry.on('message', (message, conversation) => {

        console.log('Message received/////: ', message);
        this.storage.get('chatStorage').then((chatStorage) => {
          //this.storage.get('user').then(user => {
          //console.log(user.id+'////'+chatStorage)
          //let mesgExist = false;
          //let userExist = false;
          //for (let i = 0; i < chatStorage.length; i++) {
          //console.log(user.id+'////'+chatStorage[i].info.toUser.id)
          //用户是否登录过
          //if (chatStorage[i].user.id === user.id) {
          //userExist=true;
          //for (let j = 0; j < chatStorage[i].info[j].length; j++) {
          //console.log(user.id+'////'+chatStorage[i].info[j])
          //console.log(user.id+'////'+chatStorage[i].info.toUser.id+'////'+message.from)
          //判断与当前用户的聊天记录
          //if (message.from === chatStorage[i].info.toUser.id) {
          //console.log(user.id+'////'+chatStorage[i].info.toUser.id+'////'+message.from)
          //mesgExist = true;
          chatStorage = [{
            user: { id: user.id },
            info: { toUser: { id: message.from }, record: { msg: message.text } }
          }];

          //chatStorage[i].info[j].record.push(message);
          //}
          //}
          // if (!mesgExist) {
          //   // chatStorage[i].info.push(
          //   //   {
          //   //     toUser: { id: message.from },
          //   //     record: [message]
          //   //   }
          //   // )
          //   chatStorage = [{
          //     user: { id: user.id },
          //     info: { toUser: { id: message.from }, record: {msg: message.text}} 
          // }];
          // this.events.publish('chatList', chatStorage);
          // }
          //chatStorage[i].info.push(message);
          //return
          //}
          //用户第一次登录
          // if(!userExist) {
          //   chatStorage = [{
          //     user: { id: user.id },
          //     info: { toUser: { id: message.from }, record: {msg: message.text}} 
          // }];
          // this.events.publish('chatList', chatStorage);
          // }

          //}
          this.storage.set('chatStorage', chatStorage);
          console.log('chatStorage--------->');
          console.log(chatStorage);
          this.events.publish('chatReco', chatStorage);
          //})

        });

      });
    }).catch(console.error);
  }
  chatListsubscribe(user) {
    // this.realtime.createIMClient(user.id).then((Jerry) => {
    //   Jerry.on('message', (message, conversation) => {

    console.log('/////Message received/////: ');
    this.storage.get('chatStorage').then((chatStorage) => {
      this.events.publish('chatList', chatStorage);
      //console.log('////'+chatStorage)
    });

    //   });
    // }).catch(console.error);
  }
}

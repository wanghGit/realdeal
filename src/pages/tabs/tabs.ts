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
  //存储聊天列表
  chatList = [];

  constructor(public events: Events, public storage: Storage, ) {
    // if()
    // 初始化实时通讯 SDK
    this.realtime = new Realtime({
      appId: 'tfaMh3UmNXSphGOeLMjFYfmi-gzGzoHsz',
      plugins: [TypedMessagesPlugin], // 注册富媒体消息插件
    });

    //this.createUserChat();
    this.createUserChatList();
    //this.chatListFirst();
  }

  // createUserChat() {
  //   console.log('subscribe')
  //   this.events.subscribe('user:talk', (user) => this.subscribe(user));

  // }
  createUserChatList() {
    console.log('chatListsubscribe/////')
    this.events.subscribe('user:login', (user) => this.chatListsubscribe(user));
  }

  // subscribe(user) {
  //   console.log('subscribe', user.id)
  //   let userNotExist = true;
  //   this.realtime.createIMClient(user.id).then((Jerry) => {
  //     Jerry.on('message', (message, conversation) => {

  //       console.log('Message received/////: ', message);
  //       this.storage.get('chatStorage').then((chatStorage) => {
  //         for (let i = 0; i < chatStorage.length; i++) {
  //           //判断是否有该用户的记录
  //           if (chatStorage[i].userId === user.id) {
  //             chatStorage[i].info.push({
  //               toUser: { id: message.from, name: '', head: '' },
  //               record: message.text
  //             })
  //             userNotExist = false;
  //           }
  //         }
  //         if (userNotExist) {
  //           chatStorage.push({
  //             userId: user.id,
  //             info: [{ toUser: { id: message.from, name: '', head: '' }, record: [message.text] }]
  //           })
  //         }
  //         //this.storage.set('chatStorage', chatStorage);
  //         console.log('chatStorage-----rec---->');
  //         console.log(chatStorage);
  //         this.events.publish('chatReco', chatStorage);
  //       });

  //     });
  //   }).catch(console.error);
  // }
  chatListsubscribe(user) {
    this.realtime.createIMClient(user.id.toString()).then((Jerry) => {
      Jerry.on('message', (message, conversation) => {
        this.storage.get('chatStorage').then((chatStorage) => {
          //console.log(chatStorage.length+'/////chatListsubscribe/len////: '+user.id);
          // for (let i = 0; i < chatStorage.length; i++) {
          //   //判断是否有当前用户的
          //   if (chatStorage[i].userId === user.id) {
          //     //console.log(chatStorage[i].userId+'/////chatListsubscribe/////: '+user.id);
          //     for (let j = 0; j < chatStorage[i].info.length; j++) {
          //       //console.log(chatStorage[i].info[j].record+'/////info len/////: '+user.id);
          //       this.chatList.push({
          //         userName: chatStorage[i].userId,
          //         message: chatStorage[i].info[j].record,
          //         messageId: Date.now().toString(),
          //         userId: chatStorage[i].userId,
          //         toUserId: chatStorage[i].info[j].toUser.id,
          //       })
          //     }
          //   }
          // }
          //console.log(this.chatList[i].message+'/////chatLislen/////: '+this.chatList[i].userName);
          this.events.publish('chatList', chatStorage);
          
        });
      });
    }).catch(console.error);
  }
}

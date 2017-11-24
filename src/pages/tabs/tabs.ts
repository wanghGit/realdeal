import { Component, ViewChild } from '@angular/core';
import { IonicPage, Events, Content, TextInput, NavParams, Tabs } from "ionic-angular";

import { Realtime, TextMessage } from 'leancloud-realtime';
import { TypedMessagesPlugin } from 'leancloud-realtime-plugin-typed-messages';
import { Storage } from '@ionic/storage';
import { ChatService } from '../../providers/chat-service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;

  tab1Root = 'FindPage';
  tab2Root = 'HomePage';
  tab3Root = 'ProfilePage';
  APP_ID = 'QQdjhY28We5l3D2S9yTCqrK2-gzGzoHsz';
  APP_KEY = 'Ma3TcoycEMGwiPG2LYX5o1Eg';
  realtime;
  //存储聊天列表
  chatList = [];

  constructor(public events: Events, public navParams: NavParams, public storage: Storage, public chatService: ChatService) {
    // if()
    // 初始化实时通讯 SDK
    this.realtime = new Realtime({
      appId: this.APP_ID,
      plugins: [TypedMessagesPlugin], // 注册富媒体消息插件
      pushOfflineMessages: true,
    });
    if (navParams.get('selectedTab')) {
      this.tabRef.select(navParams.get('selectedTab'));
    } else {
      this.tabRef.select(1);
    }
    this.listenChat();
  }

  listenChat() {
    let ob = Observable.fromPromise(this.storage.get('user'));
    ob.subscribe((user) => {
      console.log('user----->', user);
      if (user.id) {
        // 创建 createIMClient
        this.chatListsubscribe(user);
      } else {
        this.events.subscribe('user:login', (user) => {
          //创建 createIMClient
          this.chatListsubscribe(user);
        });
      }
    })
  }

  chatListsubscribe(user) {
    this.realtime.createIMClient(user.id.toString()).then((Jerry) => {
      Jerry.on('message', (message, conversation) => {
        // user.id.on('unreadmessagescountupdate', function(conversations) {
        //   for(let conv of conversations) {
        //     console.log('未读消息监听--》',conv.id, conv.name, conv.unreadMessagesCount);
        //   }
        // });
        console.log('tabs-user-用户接受消息-message-->', message);
        console.log('tabs-user-接受消息id-userId-->', user.id);
        if (user.id.toString() === message.from)
          return;
        let newMsg = {
          messageId: Date.now().toString(),
          userId: user.id,
          userName: user.id,
          userAvatar: message.avatar,
          toUserId: message.from,
          time: Date.now(),
          message: message.text,
          status: 'pending'
        };
        console.log('tabs-user-接受消息格式化-newMsg-->', newMsg);
        this.chatService.storeChatRec(newMsg);
        //this.storage.get('chatStorage').then((chatStorage) => {
        // this.events.publish('chatList', chatStorage);
        //});
      });
    }).catch(console.error);
  }
}

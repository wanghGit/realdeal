import { Component } from '@angular/core';
import { IonicPage, Events, Content, TextInput } from "ionic-angular";

import { Realtime, TextMessage } from 'leancloud-realtime';
import { TypedMessagesPlugin } from 'leancloud-realtime-plugin-typed-messages';
import { Storage } from '@ionic/storage';
import { ChatService } from '../../providers/chat-service';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'FindPage';
  tab2Root = 'HomePage';
  tab3Root = 'ProfilePage';

  realtime;
  //存储聊天列表
  chatList = [];

  constructor(public events: Events, public storage: Storage,public chatService: ChatService ) {
    // if()
    // 初始化实时通讯 SDK
    this.realtime = new Realtime({
      appId: 'tfaMh3UmNXSphGOeLMjFYfmi-gzGzoHsz',
      plugins: [TypedMessagesPlugin], // 注册富媒体消息插件
    });

    //this.createUserChat();
    this.listenChat();
    //this.chatListFirst();
  }

  // createUserChat() {
  //   console.log('subscribe')
  //   this.events.subscribe('user:talk', (user) => this.subscribe(user));

  // }
  listenChat() {
    this.storage.get('user').then((user) => {
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
        console.log('tabs--received---message-->: ', message);
        if (user.id.toString() === message.from) 
        return;
        let newMsg = {
          messageId: Date.now().toString(),
          userId: message.from,
          userName: message.userName,
          userAvatar: message.avatar,
          toUserId: message.from,
          time: Date.now(),
          message: message.text,
          status: 'pending'
      };
      console.log('tabs--received---newMsg-->: ', newMsg);
      this.events.publish('chatList',  this.chatService.storeChat(newMsg));
       });
    }).catch(console.error);
  }
}

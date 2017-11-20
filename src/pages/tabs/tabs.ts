import { Component } from '@angular/core';
import { IonicPage, Events, Content, TextInput } from "ionic-angular";

import { Realtime, TextMessage } from 'leancloud-realtime';
import { TypedMessagesPlugin } from 'leancloud-realtime-plugin-typed-messages';
import { Storage } from '@ionic/storage';

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

  constructor(public events: Events, public storage: Storage, ) {
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
        console.log('tabs received: ', message);
        if (user.id.toString() === message.from) console.log('自己收到自己的消息，不存'); return;
        //该登录用户是否有聊天记录
        let userNotExist = true;
        //是否和该用户有聊天记录
        let toUserNotExist = true;
        //获取缓存数据
        this.storage.get('chatStorage').then((chatStorage) => {
          for (let i = 0; i < chatStorage.length; i++) {
            //判断是否有该登录用户的记录
            if (chatStorage[i].userId === user.id) {
              console.log('exist--tab--》', user)
              //判断是否有和该用户的聊天记录
              for (let j = 0; j < chatStorage[i].info.length; j++) {
                if (chatStorage[i].info[j].toUser.id === message.from) {
                  chatStorage[i].info[j].record.push({
                    message: message.text,
                    userId: message.from
                  })
                  toUserNotExist = false;
                }
              }
              if (toUserNotExist) {
                chatStorage[i].info.push({
                  toUser: { id: message.from, name: '', head: '' },
                  record: [{
                    message: message.text,
                    userId: message.from
                  }]
                })

              }
              userNotExist = false;
            }
          }
          //没有该登录用户的聊天记录
          if (userNotExist) {
            console.log('not exist--tab--》', user)
            chatStorage.push({
              userId: user.id,
              info: [{ toUser: { id: message.from, name: '', head: '' }, record: [{ msg: message.text }] }]
            })
          }
          this.storage.set('chatStorage', chatStorage);
          console.log('tabs.chatStorage------>', chatStorage)
          this.events.publish('chatList', chatStorage);
        });
      });
    }).catch(console.error);
  }
}

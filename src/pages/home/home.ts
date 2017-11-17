import { Component, ViewChild } from '@angular/core';

import { NavParams, IonicPage, NavController, Events } from 'ionic-angular';
import { Content, TextInput } from 'ionic-angular';
import { HomeService, ChatMessage, UserInfo } from './home.service';
import { Realtime, TextMessage } from 'leancloud-realtime';
import { TypedMessagesPlugin } from 'leancloud-realtime-plugin-typed-messages';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: TextInput;
  //msgList = [];
  toUser: UserInfo = {
    id: null,
    name: null
  }
  user: UserInfo = {
    id: null
  };
  editorMsg: string = '';
  showEmojiPicker = false;

  realtime;

  constructor(public navParams: NavParams, public navCtrl: NavController,
    public homeService: HomeService, public events: Events, public storage: Storage
  ) {
    this.storage.get('isLogin').then((isLogin) => {
      if (isLogin === true) {
        this.storage.get('user').then((user) => {
        //this.storage.get('user').then((user) => {
          this.storage.get('user').then(user =>{  this.user = user;console.log(user)});
        this.events.publish('user:login',user)
        });
       // });
      }
  });

    //初始化实时通讯 SDK
    // this.realtime = new Realtime({
    //   appId: 'tfaMh3UmNXSphGOeLMjFYfmi-gzGzoHsz',
    //   plugins: [TypedMessagesPlugin], // 注册富媒体消息插件
    // });
    //接收消息
    // this.realtime.createIMClient('wh').then((wh) => {
    //   wh.on('message', (message, conversation) => {
    //     console.log('Message received: ', message.text);
    //     this.msgList.push({
    //       userName: message.from,
    //       message: message.text,
    //       messageId: Date.now().toString(),
    //       userId: this.toUser.id,
    //     })
    //   });
    // }).catch(console.error);
  }

  ask(id) {
    console.log('---------->', this.editorMsg)
    this.user.id = this.editorMsg;
    //this.events.publish('user:login',this.user)
    this.storage.get('isLogin').then((isLogin) => {
      if (isLogin === true) {
        //this.events.publish('user:talk', this.user)
        //this.storage.set('user', { id: id })
        this.homeService.ask(id).subscribe(toUser => {
          //console.log(toUser)
          this.toUser.id = toUser.id.toString();
          this.toUser.name = toUser.name;
          this.navCtrl.push('Chat', {
            // name: user.name,
            // id: user.id
            user: this.user,
            toUser: this.toUser
          })
        })
      }
      else if (isLogin === false) {
        alert('请先登录');
        this.navCtrl.push('LoginPage');
      }

    });
  }

  onFocus() {
    this.showEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }
  switchEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    if (!this.showEmojiPicker) {
      this.messageInput.setFocus();
    }
    this.content.resize();
    this.scrollToBottom();
  }
  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }

  gotoChatList() {
    //this.events.publish('user:login', this.user)
    this.navCtrl.push('ChatListPage');
  }
}

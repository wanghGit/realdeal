import { Component, ViewChild } from '@angular/core';

import { NavParams, IonicPage, NavController, Events, PopoverController } from 'ionic-angular';
import { Content, TextInput } from 'ionic-angular';
import { Realtime, TextMessage } from 'leancloud-realtime';
import { TypedMessagesPlugin } from 'leancloud-realtime-plugin-typed-messages';
import { Storage } from '@ionic/storage';
import { ChatService } from '../../providers/chat-service';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: TextInput;
  //msgList = [];
  toUser = {
    id: null,
    name: null
  }
  user = {
    id: null
  };
  editorMsg: string = '';
  showEmojiPicker = false;

  realtime;
  unReadMessageCount = 0;
  constructor(public navParams: NavParams, public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public chatService: ChatService, public events: Events, public storage: Storage
  ) {
    this.storage.get('isLogin').then((isLogin) => {
      if (isLogin === true) {
        this.storage.get('user').then((userInfo) => {
          //this.storage.get('user').then((user) => {
          this.user = userInfo; console.log(this.user.id + '////user')
          this.events.publish('user:login', this.user);
        });
        // });
      }
    });

    this.events.subscribe('unReadMessageCount', () => {
      this.unReadMessageCount = this.unReadMessageCount + 1;
      console.log('this.unReadMessageCount------------------------------->', this.unReadMessageCount)
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

    let popover = this.popoverCtrl.create('ProblemPayPage', { id: id });
    popover.present();
    //this.user.id = this.editorMsg;
    //this.events.publish('user:login',this.user)

    // this.storage.get('isLogin').then((isLogin) => {
    //   if (isLogin === true) {
    //     this.storage.get('user').then(user => {
    //       console.log('当前登录用户-->', user);
    //       this.user = user;
    //       this.chatService.ask(id).subscribe(toUser => {
    //         console.log('当前聊天用户-->', toUser);
    //         this.toUser.id = toUser.id.toString();
    //         this.toUser.name = toUser.name;
    //         this.navCtrl.push('Chat', {
    //           user: this.user,
    //           toUser: this.toUser
    //         })
    //       })
    //     })
    //   }
    //   else {
    //     alert('请先登录');
    //     this.navCtrl.push('LoginPage');
    //   }
    // });
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

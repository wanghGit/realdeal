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

  editorMsg: string = '';
  showEmojiPicker = false;

  realtime;
  unReadMessageCount = 0;
  constructor(public navParams: NavParams, public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public chatService: ChatService, public events: Events, public storage: Storage
  ) {
    this.events.subscribe('unReadMessageCount', () => {
      this.unReadMessageCount = this.unReadMessageCount + 1;
      //console.log('this.unReadMessageCount------------------------------->', this.unReadMessageCount)
    });
  }

  ask(id) {
    this.storage.get('isLogin').then((isLogin) => {
      if (isLogin === true) {
        let popover = this.popoverCtrl.create('ProblemPayPage', { id: id }, {
          showBackdrop: true, enableBackdropDismiss: false
        });
        popover.present();
      }
      else {
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

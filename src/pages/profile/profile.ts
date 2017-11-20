import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user;
  isLogin;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  ionViewDidLoad() {
    this.initUser();
  }

  initUser() {
    this.storage.get('user').then(user => this.user = user);
    this.storage.get('isLogin').then(isLogin => this.isLogin = isLogin
    );
  }

  clearCache() {
    this.storage.clear();
    this.storage.set('isLogin', false);
    this.storage.set('user', {});
    this.storage.set('chatStorage', []);
    this.initUser();
    this.storage.get('chatStorage').then(chatStorage => console.log(chatStorage));

    console.log('清理缓存：图片，视频，语音。。。不清理聊天记录，登录信息');
  }
}

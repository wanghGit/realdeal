import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserService } from '../../providers/user-service';

/**
 * Generated class for the ProfileInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-info',
  templateUrl: 'profile-info.html',
})
export class ProfileInfoPage {

  user = {
    name: '',
    role: '',
  };
  isLogin;
  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public userService: UserService,
    public storage: Storage) {
  }

  ionViewWillLoad() {
    this.initUser();
  }

  initUser() {
    this.storage.get('user').then(user => {
      this.user = { ...this.user, ...user }
    });
    this.storage.get('isLogin').then(isLogin => this.isLogin = isLogin);
  }

  logout() {
    this.storage.set('user', {});
    this.storage.set('isLogin', false);
    this.initUser();
    this.navCtrl.setRoot('TabsPage');
  }

  update() {
    this.userService.updateUserNameAndRole(this.user).subscribe(()=>{
    this.storage.set('user', this.user);
      let toast = this.toastCtrl.create({
        message: '保存成功.',
        duration: 2000,
        showCloseButton: true,
        closeButtonText: '关闭'
      });
      toast.present();
    })
    
  }
}

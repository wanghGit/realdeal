import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserService } from '../../providers/user-service';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  user = {
    phone: null,
    email: null
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public storage: Storage,
    public userService: UserService) {
  }

  ionViewWillEnter() {
    this.initUser();
  }

  initUser() {
    this.storage.get('user').then(user => {
      this.user = { ...this.user, ...user }
    });
  }

  update() {
    this.userService.updateUserPhoneAndEmail(this.user).subscribe(() => {
      this.storage.set('user', this.user);
      let toast = this.toastCtrl.create({
        message: '修改成功.',
        duration: 2000,
        showCloseButton: true,
        closeButtonText: '关闭'
      });
      toast.present();
    })
  }
}

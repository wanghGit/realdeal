import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, } from 'ionic-angular';
//import { Component } from '@angular/core';
//import { NavController, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { Storage } from '@ionic/storage';
import { UserService } from '../../providers/user-service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  phone;
  password;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    private userService: UserService,
    public storage: Storage,
    public events: Events, ) {
  }

  loginForm = this.formBuilder.group({
    //'LoginID': ['admin@163.com', [Validators.required, Validators.pattern('^([a-zA-Z0-9_.]*)((@[a-zA-Z0-9_.]*)\.([a-zA-Z]{2}|[a-zA-Z]{3}))$')]],// 第一个参数是默认值
    phone: [this.phone, [Validators.required]],// 第一个参数是默认值
    password: [this.password, [Validators.required]]
  });

  register() {
    this.navCtrl.push('RegisterPage');
  }

  login(user, _event) {
    console.log(user);
    _event.preventDefault();//该方法将通知 Web 浏览器不要执行与事件关联的默认动作
    this.userService.login(user).subscribe(data => {
      console.log('--登录用户信息-->',data);
      //let userLogin=[{user:'',isLogin:''}];
      if (data.id) {
        this.navCtrl.setRoot('TabsPage', { selectedTab: 1 });
        this.storage.set('user', data);
        this.storage.set('isLogin', true);
        this.events.publish('user:login',user);
      }
      else {
        let toast = this.toastCtrl.create({
          message: '用户名或密码错误.',
          duration: 3000,
          showCloseButton: true,
          closeButtonText: '关闭'
        });
        toast.present();
      }
    });
  }

}

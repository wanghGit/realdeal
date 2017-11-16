import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
//import { Component } from '@angular/core';
//import { NavController, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/toPromise';

import { UserInfoService } from "./../../providers/UserInfoService";
import { StorageService } from "./../../providers/StorageService";

//import { emailValidator } from './../../providers/validator'

import { MyinfoPage } from '../myinfo/myinfo';

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
  providers: [UserInfoService]
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    private userInfoService: UserInfoService,
    private storageService: StorageService) {
  }

  loginForm = this.formBuilder.group({
    //'LoginID': ['admin@163.com', [Validators.required, Validators.pattern('^([a-zA-Z0-9_.]*)((@[a-zA-Z0-9_.]*)\.([a-zA-Z]{2}|[a-zA-Z]{3}))$')]],// 第一个参数是默认值
    'LoginID': ['admin@163.com2', [Validators.required, Validators.minLength(4)]],// 第一个参数是默认值
    'LoginPwd': ['123456', [Validators.required, Validators.minLength(4)]]
  });

  ionViewDidLoad() {
    console.log('Hello Login Page');
  }

  login(user, _event) {
    _event.preventDefault();//该方法将通知 Web 浏览器不要执行与事件关联的默认动作
    this.userInfoService.login(user).then(data => {

      alert(JSON.stringify(data));
      if (data.Result.ID > 0)//登录成功
      {
        this.storageService.write('UserInfo', data.Result);
        //测试写缓存
        //let ss = this.storageService.read<UserInfoData>('UserInfo');
        //console.log(ss.UserToken);
        //传参
        this.navCtrl.push(MyinfoPage, { item: data.Result.ID });
      }
      else {
        let toast = this.toastCtrl.create({
          message: '用户名或密码错误.',
          duration: 3000,
          position: 'middle',
          showCloseButton: true,
          closeButtonText: '关闭'
        });
        toast.present();
      }
    });
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../providers/user-service';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  phone;
  password;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    private userService: UserService) {
  }

  registerForm = this.formBuilder.group({
    //'LoginID': ['admin@163.com', [Validators.required, Validators.pattern('^([a-zA-Z0-9_.]*)((@[a-zA-Z0-9_.]*)\.([a-zA-Z]{2}|[a-zA-Z]{3}))$')]],// 第一个参数是默认值
    phone: [this.phone, [Validators.required]],// 第一个参数是默认值
    password: [this.password, [Validators.required]]
  });

  register(user) {
    this.userService.register(user).subscribe(() => {
      alert('注册成功，前往登录页面');
      this.navCtrl.push('LoginPage');
    });
  }

}

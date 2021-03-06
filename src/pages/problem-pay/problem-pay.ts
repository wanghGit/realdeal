import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ChatService } from '../../providers/chat-service';

/**
 * Generated class for the ProblemPayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-problem-pay',
  templateUrl: 'problem-pay.html',
})
export class ProblemPayPage {
  toUser = {
    id: null,
    name: null
  }
  user = {
    id: null
  };
  price;
  type = 1
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public chatService: ChatService, ) {
  }

  close() {
    this.viewCtrl.dismiss();
  }

  confirm() {
    this.storage.get('isLogin').then((isLogin) => {
      if (isLogin === true) {
        this.storage.get('user').then(user => {
          console.log('当前登录用户-->', user);
          this.user = user;
          this.chatService.ask(this.navParams.get('id')).subscribe(toUser => {
            console.log('当前聊天用户-->', toUser);
            this.toUser.id = toUser.id.toString();
            this.toUser.name = toUser.name;

            this.viewCtrl.dismiss();
            let loader = this.loadingCtrl.create({
              content: "正在支付",
              duration: 1000
            });
            loader.present();

            setTimeout(() => {
              let loader = this.loadingCtrl.create({
                content: "支付成功,正在为您寻找答主",
                duration: 4000
              });
              loader.present();
            }, 1000);

            setTimeout(() => {
              this.navCtrl.push('Chat', {
                user: this.user,
                toUser: this.toUser
              })
            }, 6000);
          })
        })
      }
      else {
        alert('请先登录');
        this.navCtrl.push('LoginPage');
      }
    });
  }
}

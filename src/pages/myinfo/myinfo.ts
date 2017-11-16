import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, ActionSheetController, ViewController } from 'ionic-angular';

import { UserInfoService } from "./../../providers/UserInfoService";


@Component({
  selector: 'page-myinfo',
  templateUrl: 'myinfo.html',
  providers: [UserInfoService]
})
export class MyinfoPage {
  id: number;// 用来接收上一个页面传递过来的参数
  user;
  constructor(public navCtrl: NavController,
    navParams: NavParams,
    private userInfoService: UserInfoService,
    public actionSheetCtrl: ActionSheetController,
    private popoverCtrl: PopoverController
  ) {
    this.id = navParams.get('item');//这个是通过页面跳转传过来的值
    this.getInfo();
  }

  getInfo() {
    this.userInfoService.GetUserInfo(this.id).then(data => {
      this.user = data.Result;
      //alert(JSON.stringify(this.user));
    });
  }


  ionViewDidLoad() {
    console.log('Hello Myinfo Page');
  }

  // 弹出选择框
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '提示',
      buttons: [
        {
          text: '保存',
          role: 'destructive',
          handler: () => {
            //this.saveImage(imgUrl);
            alert('保存 clicked');
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            alert('取消 clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }


  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }
}

@Component({
  template: `
    <ion-list>
      <ion-list-header>Ionic</ion-list-header>
      <button ion-item (click)="close()">Learn Ionic</button>
      <button ion-item (click)="close()">Documentation</button>
      <button ion-item (click)="close()">Showcase</button>
    </ion-list>
  `
})
class PopoverPage {
  constructor(public viewCtrl: ViewController) { }

  close() {
    alert('closed');
    this.viewCtrl.dismiss();
  }
}


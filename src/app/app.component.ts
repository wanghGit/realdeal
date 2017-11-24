import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import AV from 'leancloud-storage';

import { TabsPage } from '../pages/tabs/tabs';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
   APP_ID = 'QQdjhY28We5l3D2S9yTCqrK2-gzGzoHsz';
   APP_KEY = 'Ma3TcoycEMGwiPG2LYX5o1Eg';
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    // 初始化存储 SDK
    AV.init({
      appId: this.APP_ID,
      appKey:this.APP_KEY,
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}


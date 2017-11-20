import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//module
import { TabsPageModule } from '../pages/tabs/tabs.module';

//service
import { UserService } from '../providers/user-service';
import { EmojiService } from '../providers/emoji-service';
import { ChatService } from '../providers/chat-service';
import { ProblemService } from '../providers/problem-service';

// filter

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    // ionic module
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    // custom module
    TabsPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    // custom service
    EmojiService,
    UserService,
    ChatService,
    ProblemService
  ]
})
export class AppModule { }

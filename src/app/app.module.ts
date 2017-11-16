import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EmojiProvider } from '../providers/emoji';

import { HomePageModule } from '../pages/home/home.module';
import { FindPageModule } from '../pages/find/find.module';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { ChatListPageModule } from '../pages/chat-list/chat-list.module';
import { IonicStorageModule } from '@ionic/storage';

//服务要加这里
import { HttpService } from "../providers/HttpService";
import { StorageService } from "../providers/StorageService";
import { EmojiPickerComponentModule } from '../components/emoji-picker/emoji-picker.module';
import { RegisterPageModule } from '../pages/register/register.module';
@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HomePageModule,
    FindPageModule,
    TabsPageModule,
    ProfilePageModule,
    ChatListPageModule,
    EmojiPickerComponentModule,
    IonicModule.forRoot(MyApp),
    RegisterPageModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    EmojiProvider,
    HttpService, StorageService
  ]
})
export class AppModule { }

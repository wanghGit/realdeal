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
import { FindSearchPageModule } from '../pages/find-search/find-search.module';
import { ProfileInfoPageModule } from '../pages/profile-info/profile-info.module';
import { OtherInfoPageModule } from '../pages/other-info/other-info.module';
import { ProblemDetailPageModule } from '../pages/problem-detail/problem-detail.module';
import { AccountPageModule } from '../pages/account/account.module';
import { ProfileLabelPageModule } from '../pages/profile-label/profile-label.module';
import { ProfileAnswerPageModule } from '../pages/profile-answer/profile-answer.module';
import { ProfileApplyAnswerPageModule } from '../pages/profile-apply-answer/profile-apply-answer.module';
import { ProfileFollowPageModule } from '../pages/profile-follow/profile-follow.module';
import { ProfileHelpPageModule } from '../pages/profile-help/profile-help.module';

// filter
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
    FindSearchPageModule,
    ProfileInfoPageModule,
    OtherInfoPageModule,
    ProblemDetailPageModule,
    AccountPageModule,
    ProfileLabelPageModule,
    ProfileAnswerPageModule,
    ProfileApplyAnswerPageModule,
    ProfileFollowPageModule,
    ProfileHelpPageModule,
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

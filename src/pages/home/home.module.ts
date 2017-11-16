import { NgModule } from '@angular/core';
import { HomePage } from './home';
import { IonicPageModule } from 'ionic-angular';
import { EmojiPickerComponentModule } from "../../components/emoji-picker/emoji-picker.module";
import { EmojiProvider } from "../../providers/emoji";
import { HomeService } from './home.service';
import { HttpModule } from '@angular/http';

@NgModule({
    declarations: [HomePage],
    imports: [
        EmojiPickerComponentModule,
        IonicPageModule.forChild(HomePage),
    ],
    providers: [
        HomeService,
        EmojiProvider
    ]
})
export class HomePageModule { }
import { NgModule } from '@angular/core';
import { HomePage } from './home';
import { IonicPageModule } from 'ionic-angular';
import { EmojiPickerComponentModule } from "../../components/emoji-picker/emoji-picker.module";

@NgModule({
    declarations: [HomePage],
    imports: [
        EmojiPickerComponentModule,
        IonicPageModule.forChild(HomePage),
    ]
})
export class HomePageModule { }
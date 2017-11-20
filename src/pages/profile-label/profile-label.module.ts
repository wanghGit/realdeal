import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileLabelPage } from './profile-label';

@NgModule({
  declarations: [
    ProfileLabelPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileLabelPage),
  ],
})
export class ProfileLabelPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileFollowPage } from './profile-follow';

@NgModule({
  declarations: [
    ProfileFollowPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileFollowPage),
  ],
})
export class ProfileFollowPageModule {}

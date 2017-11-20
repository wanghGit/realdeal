import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProblemPublishPage } from './problem-publish';

@NgModule({
  declarations: [
    ProblemPublishPage,
  ],
  imports: [
    IonicPageModule.forChild(ProblemPublishPage),
  ],
})
export class ProblemPublishPageModule {}

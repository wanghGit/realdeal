import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindSearchPage } from './find-search';

@NgModule({
  declarations: [
    FindSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(FindSearchPage),
  ],
})
export class FindSearchPageModule {}

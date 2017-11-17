import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindPage } from './find';
import { FilterHanziPipe } from '../../pipes/limit';

@NgModule({
  declarations: [
    FindPage,
    FilterHanziPipe
  ],
  imports: [
    IonicPageModule.forChild(FindPage),
  ],
})
export class FindPageModule { }

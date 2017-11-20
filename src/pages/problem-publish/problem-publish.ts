import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProblemPublishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-problem-publish',
  templateUrl: 'problem-publish.html',
})
export class ProblemPublishPage {
  problem = {
    title: '',
    content: ''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,
  ) { }

  gotoNext() {
    this.navCtrl.push('ProblemPublishNextPage', { problem: this.problem })
  }
}

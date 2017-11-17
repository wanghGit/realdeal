import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProblemDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-problem-detail',
  templateUrl: 'problem-detail.html',
})
export class ProblemDetailPage {
  problem;
  commentList;
  comment;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.problem = navParams.get('problem');
    this.commentList=[
      {
        user:{
          id:1,
          name:'xyz'
        },
        comment:{
          content:'很不错啊，厉害了'
        }
      },
      {
        user:{
          id:1,
          name:'xyz'
        },
        comment:{
          content:'很不错啊，厉害了'
        }
      },
      {
        user:{
          id:1,
          name:'xyz'
        },
        comment:{
          content:'很不错啊，厉害了'
        }
      },
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProblemDetailPage');
  }

}

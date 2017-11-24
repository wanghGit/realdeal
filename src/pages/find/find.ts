import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ProblemService } from '../../providers/problem-service';
import { UserService } from '../../providers/user-service';

/**
 * Generated class for the FindPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-find',
  templateUrl: 'find.html',
})
export class FindPage {
  search;
  professorList = [];
  problemList = [];
  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public userService: UserService,
    public problemService: ProblemService
  ) {
  }

  ionViewDidLoad() {
    this.problemService.getAllProblem().subscribe(data => {
      this.problemList = data;
      console.log(data);
    })
    this.userService.getRecommendedUser().subscribe(data => {
      this.professorList = data;
      console.log(data);
    })
  }

  showProfessorDetail(user) {
    this.navCtrl.push('OtherInfoPage', { user });
  }

  showProblemDetail(problem) {
    this.navCtrl.push('ProblemDetailPage', { problem });
  }

  focus() {
    let modal = this.modalCtrl.create('FindSearchPage', this.search, {
    });
    modal.present();
  }
}

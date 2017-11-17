import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.problemList = [
      {
        title: '如何说话有条理，让大家更容易接受',
        user: {
          id: 1,
          name: '静易莫'
        },
        content: '早在一个月前，南京市国土局公布了“河西南部电子商务及云计算创业园地块”。从出让条件看，该地块更像是为阿里巴巴江苏总部定制的地块，比如，该幅地要求竞买人或实际控制人的控股公司为全球领先的电商平台及公共云服务提供商,竞买人或其实际控制人的控股公司2016年电商业务营业收入不低于1000亿人民币、云计算业务营业收入不低于50亿人民币，该地块不接受联合报名竞买等等。'
      },
      {
        title: '如何说话有条理，让大家更容易接受',
        user: {
          id: 1,
          name: '静易莫'
        },
        content: '早在一个月前，南京市国土局公布了“河西南部电子商务及云计算创业园地块”。从出让条件看，该地块更像是为阿里巴巴江苏总部定制的地块，比如，该幅地要求竞买人或实际控制人的控股公司为全球领先的电商平台及公共云服务提供商,竞买人或其实际控制人的控股公司2016年电商业务营业收入不低于1000亿人民币、云计算业务营业收入不低于50亿人民币，该地块不接受联合报名竞买等等。'
      },
      {
        title: '如何说话有条理，让大家更容易接受',
        user: {
          id: 1,
          name: '静易莫'
        },
        content: '早在一个月前，南京市国土局公布了“河西南部电子商务及云计算创业园地块”。从出让条件看，该地块更像是为阿里巴巴江苏总部定制的地块，比如，该幅地要求竞买人或实际控制人的控股公司为全球领先的电商平台及公共云服务提供商,竞买人或其实际控制人的控股公司2016年电商业务营业收入不低于1000亿人民币、云计算业务营业收入不低于50亿人民币，该地块不接受联合报名竞买等等。'
      },
      {
        title: '如何说话有条理，让大家更容易接受',
        user: {
          id: 1,
          name: '静易莫'
        },
        content: '早在一个月前，南京市国土局公布了“河西南部电子商务及云计算创业园地块”。从出让条件看，该地块更像是为阿里巴巴江苏总部定制的地块，比如，该幅地要求竞买人或实际控制人的控股公司为全球领先的电商平台及公共云服务提供商,竞买人或其实际控制人的控股公司2016年电商业务营业收入不低于1000亿人民币、云计算业务营业收入不低于50亿人民币，该地块不接受联合报名竞买等等。'
      },
      {
        title: '如何说话有条理，让大家更容易接受',
        user: {
          id: 1,
          name: '静易莫'
        },
        content: '早在一个月前，南京市国土局公布了“河西南部电子商务及云计算创业园地块”。从出让条件看，该地块更像是为阿里巴巴江苏总部定制的地块，比如，该幅地要求竞买人或实际控制人的控股公司为全球领先的电商平台及公共云服务提供商,竞买人或其实际控制人的控股公司2016年电商业务营业收入不低于1000亿人民币、云计算业务营业收入不低于50亿人民币，该地块不接受联合报名竞买等等。'
      },
    ];
    this.professorList = [
      {
        id: 1,
        name: '静易莫',
        role: 'java高级工程师'
      },
      {
        id: 1,
        name: '静易莫',
        role: 'java高级工程师'
      },
      {
        id: 1,
        name: '静易莫',
        role: 'java高级工程师'
      },
      {
        id: 1,
        name: '静易莫',
        role: 'java高级工程师'
      },
      {
        id: 1,
        name: '静易莫',
        role: 'java高级工程师'
      },
      {
        id: 1,
        name: '静易莫',
        role: 'java高级工程师'
      },
    ]
  }

  showProfessorDetail(user) {
    this.navCtrl.push('OtherInfoPage', {user});
  }

  showProblemDetail(problem) {
    this.navCtrl.push('ProblemDetailPage', {problem});
  }

  focus() {
    let modal = this.modalCtrl.create('FindSearchPage', this.search, {
    });
    modal.present();
  }
}

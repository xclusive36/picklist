import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

/**
 * Generated class for the TallyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tally',
  templateUrl: 'tally.html',
})
export class TallyPage {
  masterArray: any;
  itemList: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    this.masterArray = navParams.get('masterArray');
    this.itemList = navParams.get('itemList');
    console.log(this.itemList);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TallyPage');
  }

}

import { Component, trigger, style, transition, animate } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import {ConfigurePage} from '../configure/configure';

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
  animations: [
    //trigger('fade', [
    //  state('visible', style({
    //    opacity: 1
    //  })),
    //  state('invisible', style({
    //    opacity: 0.1
    //  })),
    //  transition('visible <=> invisible', animate('200ms linear'))
    //]),
    trigger('fade', [
      transition(':enter', [
        style({opacity: 0.1}),
        animate(200, style({opacity: 1}))
      ]),
      transition(':leave', [
        animate(200, style({opacity: 0.1}))
      ]),
    ]),
    trigger('flyInOut', [
      transition(':enter', [
        style({transform: 'scale(1, 0)'}),
        animate(150, style({transform: 'scale(1, 1)'}))
      ]),
      transition(':leave', [
        animate(200, style({transform: 'scale(1, 0)'}))
      ])
    ]),
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity:0}),
        animate(450, style({opacity:1}))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(450, style({opacity:0}))
      ])
    ])
  ]
})
export class TallyPage {
  param: any;
  paramID: any;
  masterArray: any
  locationList: any;
  categoryList: any;
  itemList: any;
  currentLocation: any;
  pickMode: any;
  totalcount: any
  location: any;
  locationcount: any;
  thisList: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public events: Events) {
    this.storage = storage;

    this.param = navParams.get('param');
    this.paramID = navParams.get('paramID');
    this.masterArray = navParams.get('masterArray');

    this.setVars();
    this.thisList = this.categoryList[this.paramID].itemList;
    //this.thisList = this[this.param];
  }

  countDown(item){
    if(item.count > 0){
      this.masterArray.totalcount = this.masterArray.totalcount - 1;
      this.locationList[this.currentLocation.id].count = this.locationList[this.currentLocation.id].count - 1;
      this.categoryList[this.paramID].count = this.categoryList[this.paramID].count - 1;
      item.count = item.count - 1;
      if(item.count === 0){
        if(this.pickMode[0][1]){
          item.display = false;
        }
      }
      this.event();
    }
  }

  countClear(item){
    this.masterArray.totalcount = this.masterArray.totalcount - item.count;
    this.locationList[this.currentLocation.id].count = this.locationList[this.currentLocation.id].count - item.count;
    this.categoryList[this.paramID].count = this.categoryList[this.paramID].count - item.count;
    item.count = 0;
    this.event();
    if(this.pickMode[0][1]){
      item.display = false;
    }
  }

  countUp(item){
      this.masterArray.totalcount = this.masterArray.totalcount + 1;
      this.locationList[this.currentLocation.id].count = this.locationList[this.currentLocation.id].count + 1;
      this.categoryList[this.paramID].count = this.categoryList[this.paramID].count + 1;
      item.count = item.count + 1;
      this.event();
  }

  configure(item){
    this.navCtrl.push(ConfigurePage, {
      param: item,
      paramID: this.paramID,
      masterArray: this.masterArray
    });
  }

  reorderItems(indexes, object) {
    let element = this[object][indexes.from];
    this[object].splice(indexes.from, 1);
    this[object].splice(indexes.to, 0, element);
  }

  pick(){
    this.reorderItems({from: 0, to: 1}, 'pickMode');
    this.switch_pickMode();
  }

  switch_pickMode(){
    // cycle through and set all counts to 0
    for(let i = 0; i < this.locationList.length; i++){
      if(this.pickMode[0][1] === true){
        if(this.locationList[i].count === 0){
          this.locationList[i].display = false;
        }
      } else {
        this.locationList[i].display = true;
      }
      for(let j = 0; j < this.locationList[i].categoryList.length; j++){
        if(this.pickMode[0][1] === true){
          if(this.locationList[i].categoryList[j].count === 0){
            this.locationList[i].categoryList[j].display = false;
          }
        } else {
          this.locationList[i].categoryList[j].display = true;
        }
        for(let k = 0; k < this.locationList[i].categoryList[j].itemList.length; k++){
          if(this.pickMode[0][1] === true){
            if(this.locationList[i].categoryList[j].itemList[k].count === 0){
              this.locationList[i].categoryList[j].itemList[k].display = false;
            }
          } else {
            this.locationList[i].categoryList[j].itemList[k].display = true;
          }
        }
      }
    }
  }

  reset(){
    // if pickMode is engaged, turn off!
    if(this.pickMode[0][1] === true){
      this.pick();
    }

    // Reset totalcount as 0
    this.totalcount = 0;
    this.masterArray.totalcount = this.totalcount;

    // cycle through and set all counts to 0
    for(let i = 0; i < this.locationList.length; i++){
      this.locationList[i].count = 0;
      for(let j = 0; j < this.locationList[i].categoryList.length; j++){
        this.locationList[i].categoryList[j].count = 0;
        for(let k = 0; k < this.locationList[i].categoryList[j].itemList.length; k++){
          this.locationList[i].categoryList[j].itemList[k].count = 0;
        }
      }
    }

    // re-initialize locationcount
    this.locationcount = this.locationList[this.currentLocation.id].count;

    this.save();

    // trigger event on HomePage
    this.event();
    this.navCtrl.pop();
  }

  setVars(){
    this.currentLocation = this.masterArray.currentLocation; // define currentLocation as object from 'masterArray'
    this.locationList = this.masterArray.locationList; // define locationList as object from 'masterArray'

    // If there are no created locations, create a new 'default' location
    if(this.locationList.length === 0){

      this.currentLocation.id = 0;
      this.currentLocation.title = 'Default';

      this.locationList.push({
        title: 'Default',
        count: 0,
        selected: true,
        display: true,
        categoryList: []
      });

    }

    this.pickMode = this.masterArray.pickMode; // define pickMode as object from 'masterArray'
    this.totalcount = this.masterArray.totalcount; // define totalcount as object from 'masterArray'

    // cycle through locationList
    for(let i = 0; i < this.locationList.length; i++){

      if(this.locationList[i].selected === true){

        // define location, id and count of selected item
        this.location = this.locationList[i].title;
        this.currentLocation.id = this.locationList.map(function(e) { return e.title; }).indexOf(this.currentLocation.title);
        this.locationcount = this.locationList[this.currentLocation.id].count;

      }

    }

    this.categoryList = this.locationList[this.currentLocation.id].categoryList; // define categoryList as object from 'masterArray'
  }

  event(){
    this.events.publish('item:updated', this.masterArray);
  }

  save(){
    this.storage.set('masterArray', this.masterArray); // Save 'masterArray' into storage
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad TallyPage');
  }

}

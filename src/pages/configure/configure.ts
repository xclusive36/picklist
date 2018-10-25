import { Component, trigger, style, transition, animate, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController, ItemSliding, List } from 'ionic-angular';

import { Storage } from '@ionic/storage';

/**
 * Generated class for the ConfigurePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-configure',
  templateUrl: 'configure.html',
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
export class ConfigurePage {
  @ViewChild(List) list: List;

  param: any;
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
  paramID: any;
  reorder: any = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public alertCtrl: AlertController, public events: Events) {
    this.storage = storage;

    this.param = navParams.get('param');
    this.masterArray = navParams.get('masterArray');

    this.setVars();

    if(this.param === 'itemList'){
      this.paramID = navParams.get('paramID');
      this.thisList = this.categoryList[this.paramID].itemList;
      this.itemList = this.thisList;
    } else {
      this.thisList = this[this.param];
    }
  }

  reOrder() {
    this.reorder = !this.reorder;
    this.list.closeSlidingItems();
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

  add(){
    this.showPrompt('add', '');
  }

  delete(item, slidingItem: ItemSliding){
    this.presentConfirm(item);
    slidingItem.close();
  }

  presentConfirm(item) {
    let alert = this.alertCtrl.create({
      title: 'Delete ' + item.title,
      message: 'Do you want to delete ' + item.title + '?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            var index;
            if(this.param === 'itemList'){
              index = this.categoryList[this.paramID].itemList.indexOf(item);
            } else {
              index = this[this.param].indexOf(item);
            }
            if (index > -1) {
              if(this.param === 'itemList'){
                this.categoryList[this.paramID].itemList.splice(index, 1);
              } else {
                this[this.param].splice(index, 1);
              }
              if(item.count > 0){
                this.masterArray.totalcount = this.masterArray.totalcount - item.count;
                if(this.param === 'categoryList'){
                  this.locationList[this.currentLocation.id].count = this.locationList[this.currentLocation.id].count - item.count;
                }
                if(this.param === 'itemList'){
                  this.categoryList[this.paramID].count = this.categoryList[this.paramID].count - item.count;
                  this.locationList[this.currentLocation.id].count = this.locationList[this.currentLocation.id].count - item.count;
                }
              }
              if(this.param === 'locationList' && this[this.param].length > 0 && item.selected === true){
                this[this.param][0].selected = true;
                this.currentLocation.title = this[this.param][0].title;
                this.currentLocation.id = 0;
              } else if(this.param === 'locationList' && this[this.param].length === 0 && item.selected === true){
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
            }

            // Save to localStorage and set event to update HomePage
            this.save();
            this.event();
          }
        }
      ]
    });
    alert.present();
  }

  edit(item, slidingItem: ItemSliding){
    this.showPrompt('edit', item);
    slidingItem.close();
  }

  showPrompt(action, item) {
    let title = '';
    let message = '';
    // check and set
    if(action === 'edit'){
      title = item.title;
      message = 'Enter a name to replace ' + title + '.';
    } else {
      title = 'New item';
      message = 'Enter a new name to add to this list.'
    }

    let prompt = this.alertCtrl.create({
      title: title,
      message: message,
      inputs: [
        {
          name: 'title',
          placeholder: title
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            // Check if data was inputed
            data.title = data.title.trim();
            if(data.title === ''){ // Data was not inputed
              return false; // ignore
            } else { // Data was inputed
              data.title = data.title.toUpperCase();
              if(action === 'edit'){
                if(this.param === 'locationList' && item.selected === true){
                  this.currentLocation.title = data.title;
                }
                item.title = data.title;
              } else {
                this.thisList.push({
                  title: data.title,
                  count: 0,
                  display: true,
                  selected: false
                });
                if(this.param === 'locationList'){
                  this.thisList[this.thisList.length - 1].categoryList = [];
                } else if(this.param === 'categoryList') {
                  this.thisList[this.thisList.length - 1].itemList = [];
                }
              }

              // Save to localStorage and set event to update HomePage
              this.save();
              this.event();
            }
          }
        }
      ]
    });
    prompt.present();
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Low battery',
      subTitle: '10% of battery remaining',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ConfigurePage');
  }

}

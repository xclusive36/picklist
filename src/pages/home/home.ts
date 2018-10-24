import { Component, trigger, style, transition, animate } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
//import { trigger, state, style, transition, animate } from '@angular/animations';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Storage } from '@ionic/storage';

import {ConfigurePage} from '../configure/configure';
import {TallyPage} from '../tally/tally';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
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

export class HomePage {

  masterArray: any;
  locationList: any;
  currentLocation: any;
  location: any;
  categoryList: any;
  itemList: any;
  pickbutton: any;
  pickMode: any = [ ['gray', false], ['red', true] ];
  locationcount: any;
  totalcount: any;

  items = [];

  // Start constructor()
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public events: Events) {

    // set vars and storage
    this.storage = storage;
    this.storage.remove('masterArray');

    // pull storage and check if 'masterArray' exists
    this.storage.get('masterArray').then((result) => {

      if(!result){ // 'masterArray' does not exist
        this.defineArray(); // Call function to define masterArray and set to localStorage
      } else { // If 'masterArray' exists in storage
        this.masterArray = result; // set 'masterArray' as 'masterArray' from storage
      }
      this.setVars(); // Call function to set all variables needed for page to function

    });

    // On event item:updated
    events.subscribe('item:updated', (masterArray) => {
      // reset masterArray
      this.masterArray = masterArray;
      this.location = this.currentLocation.title;
      this.totalcount = this.masterArray.totalcount;
      this.locationcount = this.locationList[this.currentLocation.id].count;
      this.switch_pickMode();
    });

  } // End constructor()

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
  }

  locationSelect(event){
    this.currentLocation.title = event;
    this.location = event;
    this.currentLocation.id = this.locationList.map(function(e) { return e.title; }).indexOf(this.currentLocation.title);

    // Cycle through all items in 'locationList' and set all 'selected' as false
    for(let i = 0; i < this.locationList.length; i++){
      this.locationList[i].selected = false;
    }

    // Set the 'selected item' as true
    this.locationList[this.currentLocation.id].selected = true;

    // define categoryList as object from 'masterArray'
    this.categoryList = this.locationList[this.currentLocation.id].categoryList;
    this.switch_pickMode();

    // define 'locationcount' as the selected count
    this.locationcount = this.locationList[this.currentLocation.id].count;

  }

  configure(item){
    this.navCtrl.push(ConfigurePage, {
      param: item,
      masterArray: this.masterArray
    });
  }

  tally(title){
    this.navCtrl.push(TallyPage, {
      param: title,
      paramID: this.categoryList.map(function(e) { return e.title; }).indexOf(title),
      masterArray: this.masterArray
    });
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

  defineArray(){
    this.masterArray = { // Define new 'masterArray'
      totalcount: 1,
      currentLocation: {
        id: 0,
        title: 'GONDOLA'
      },
      locationList: [
        {
          title: 'GONDOLA',
          count: 1,
          selected: true,
          display: true,
          categoryList: [
            {
              title: '12 PACKS',
              count: 0,
              selected: false,
              display: true,
              itemList: [
                {
                  title: 'PEPSI',
                  count: 0,
                  display: true,
                  selected: false
                }
              ]
            },
            {
              title: '2 LITERS',
              count: 1,
              selected: false,
              display: true,
              itemList: [
                {
                  title: 'PEPSI',
                  count: 1,
                  display: true,
                  selected: false
                }
              ]
            },
            {
              title: '6 PACKS',
              count: 0,
              selected: false,
              display: true,
              itemList: [
                {
                  title: 'PEPSI',
                  count: 0,
                  display: true,
                  selected: false
                }
              ]
            }
          ]
        },
        {
          title: 'VESTIBULE',
          count: 0,
          selected: false,
          display: true,
          categoryList: [

          ]
        }
      ],
      categoryList: [],
      pickMode: [ ['gray', false], ['red', true] ]
    };

    this.save(); // Set new 'masterArray' into storage
  }

  save(){
    this.storage.set('masterArray', this.masterArray); // Save 'masterArray' into storage
  }

}

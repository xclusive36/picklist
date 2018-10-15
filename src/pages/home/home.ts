import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

//import { ConfigurePage } from '../configure/configure';
import { TallyPage } from '../tally/tally';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  locations: any;
  location: string;

  masterArray: any;
  currentLocation: any;
  locationList: any;
  categoryList: any;
  locationcount: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.locations = ['a', 'b'];
    // delete masterArray and start fresh
    storage.remove('masterArray');

    // Pull masterArray from storage
    storage.get('masterArray').then((result) => {

      if(!result){ // 'masterArray' does not exist
        this.defineArray(); // Call function to define masterArray and set to Storage
      } else { // If 'masterArray' exists in storage
        this.masterArray = result; // set variable 'masterArray' from storage
      }

      // set vars
      this.currentLocation = this.masterArray.currentLocation;
      this.locationList = this.masterArray.locationList;
      this.categoryList = this.masterArray.locationList[this.currentLocation.id].categoryList;

      console.log(this.masterArray);
      console.log(this.locationList);
      console.log(this.categoryList);
      this.location = this.currentLocation.title;

    });

  }

  locationSelect() {

    // On location select change, update master defineArray
    // update current location with the selected title and // ID
    // cycle through locationList and set all as false except selected to true

    this.currentLocation.title = this.location;
    this.currentLocation.id = this.locationList.map(function(e) { return e.title; }).indexOf(this.currentLocation.title);

    // Cycle through all items in 'locationList' and set all 'selected' as false
    for(let i = 0; i < this.locationList.length; i++){
      this.locationList[i].selected = false;
    }

    // Set the 'selected item' as true
    this.locationList[this.currentLocation.id].selected = true;

    // define categoryList as object from 'masterArray'
    this.categoryList = this.locationList[this.currentLocation.id].categoryList;
    //this.switch_pickMode();

    // define 'locationcount' as the selected count
    this.locationcount = this.locationList[this.currentLocation.id].count;

    console.log(this.masterArray);

  }

  openPage(item){
    this.navCtrl.push(TallyPage, {
      masterArray: this.masterArray,
      itemList: item
    });
  }

  defineArray(){
    this.masterArray = { // Define new 'masterArray'
      totalcount: 0,
      currentLocation: {
        id: 0,
        title: 'DEFAULT'
      },
      locationList: [
        {
          title: 'DEFAULT',
          count: 0,
          selected: true,
          display: true,
          categoryList: [
            {
              title: 'Category 1',
              count: 0,
              selected: false,
              display: true,
              itemList: [
                {
                  title: 'Item 1',
                  count: 0,
                  display: true,
                  selected: false
                }
              ]
            }
          ]
        },
        {
          title: 'DEFAULT2',
          count: 0,
          selected: true,
          display: true,
          categoryList: [
            {
              title: 'Category 2',
              count: 0,
              selected: false,
              display: true,
              itemList: [
                {
                  title: 'Item 1',
                  count: 0,
                  display: true,
                  selected: false
                }
              ]
            }
          ]
        }
      ],
      pickMode: [ ['gray', false], ['red', true] ]
    };

    this.save(); // Set new 'masterArray' into storage
  }

  save(){
    this.storage.set('masterArray', this.masterArray); // Save 'masterArray' into storage
  }

}

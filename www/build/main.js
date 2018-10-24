webpackJsonp([2],{

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigurePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the ConfigurePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ConfigurePage = /** @class */ (function () {
    function ConfigurePage(navCtrl, navParams, storage, alertCtrl, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.storage = storage;
        this.param = navParams.get('param');
        this.masterArray = navParams.get('masterArray');
        this.setVars();
        if (this.param === 'itemList') {
            this.paramID = navParams.get('paramID');
            this.thisList = this.categoryList[this.paramID].itemList;
            this.itemList = this.thisList;
        }
        else {
            this.thisList = this[this.param];
        }
    }
    ConfigurePage.prototype.reorderItems = function (indexes, object) {
        var element = this[object][indexes.from];
        this[object].splice(indexes.from, 1);
        this[object].splice(indexes.to, 0, element);
    };
    ConfigurePage.prototype.pick = function () {
        this.reorderItems({ from: 0, to: 1 }, 'pickMode');
        this.switch_pickMode();
    };
    ConfigurePage.prototype.switch_pickMode = function () {
        // cycle through and set all counts to 0
        for (var i = 0; i < this.locationList.length; i++) {
            if (this.pickMode[0][1] === true) {
                if (this.locationList[i].count === 0) {
                    this.locationList[i].display = false;
                }
            }
            else {
                this.locationList[i].display = true;
            }
            for (var j = 0; j < this.locationList[i].categoryList.length; j++) {
                if (this.pickMode[0][1] === true) {
                    if (this.locationList[i].categoryList[j].count === 0) {
                        this.locationList[i].categoryList[j].display = false;
                    }
                }
                else {
                    this.locationList[i].categoryList[j].display = true;
                }
                for (var k = 0; k < this.locationList[i].categoryList[j].itemList.length; k++) {
                    if (this.pickMode[0][1] === true) {
                        if (this.locationList[i].categoryList[j].itemList[k].count === 0) {
                            this.locationList[i].categoryList[j].itemList[k].display = false;
                        }
                    }
                    else {
                        this.locationList[i].categoryList[j].itemList[k].display = true;
                    }
                }
            }
        }
    };
    ConfigurePage.prototype.reset = function () {
        // if pickMode is engaged, turn off!
        if (this.pickMode[0][1] === true) {
            this.pick();
        }
        // Reset totalcount as 0
        this.totalcount = 0;
        this.masterArray.totalcount = this.totalcount;
        // cycle through and set all counts to 0
        for (var i = 0; i < this.locationList.length; i++) {
            this.locationList[i].count = 0;
            for (var j = 0; j < this.locationList[i].categoryList.length; j++) {
                this.locationList[i].categoryList[j].count = 0;
                for (var k = 0; k < this.locationList[i].categoryList[j].itemList.length; k++) {
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
    };
    ConfigurePage.prototype.setVars = function () {
        this.currentLocation = this.masterArray.currentLocation; // define currentLocation as object from 'masterArray'
        this.locationList = this.masterArray.locationList; // define locationList as object from 'masterArray'
        // If there are no created locations, create a new 'default' location
        if (this.locationList.length === 0) {
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
        for (var i = 0; i < this.locationList.length; i++) {
            if (this.locationList[i].selected === true) {
                // define location, id and count of selected item
                this.location = this.locationList[i].title;
                this.currentLocation.id = this.locationList.map(function (e) { return e.title; }).indexOf(this.currentLocation.title);
                this.locationcount = this.locationList[this.currentLocation.id].count;
            }
        }
        this.categoryList = this.locationList[this.currentLocation.id].categoryList; // define categoryList as object from 'masterArray'
    };
    ConfigurePage.prototype.event = function () {
        this.events.publish('item:updated', this.masterArray);
    };
    ConfigurePage.prototype.save = function () {
        this.storage.set('masterArray', this.masterArray); // Save 'masterArray' into storage
    };
    ConfigurePage.prototype.add = function () {
        this.showPrompt('add', '');
    };
    ConfigurePage.prototype.delete = function (item, slidingItem) {
        this.presentConfirm(item);
        slidingItem.close();
    };
    ConfigurePage.prototype.presentConfirm = function (item) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Delete ' + item.title,
            message: 'Do you want to delete ' + item.title + '?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        //console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Delete',
                    handler: function () {
                        var index;
                        if (_this.param === 'itemList') {
                            index = _this.categoryList[_this.paramID].itemList.indexOf(item);
                        }
                        else {
                            index = _this[_this.param].indexOf(item);
                        }
                        if (index > -1) {
                            if (_this.param === 'itemList') {
                                _this.categoryList[_this.paramID].itemList.splice(index, 1);
                            }
                            else {
                                _this[_this.param].splice(index, 1);
                            }
                            if (item.count > 0) {
                                _this.masterArray.totalcount = _this.masterArray.totalcount - item.count;
                                if (_this.param === 'categoryList') {
                                    _this.locationList[_this.currentLocation.id].count = _this.locationList[_this.currentLocation.id].count - item.count;
                                }
                                if (_this.param === 'itemList') {
                                    _this.categoryList[_this.paramID].count = _this.categoryList[_this.paramID].count - item.count;
                                    _this.locationList[_this.currentLocation.id].count = _this.locationList[_this.currentLocation.id].count - item.count;
                                }
                            }
                            if (_this.param === 'locationList' && _this[_this.param].length > 0 && item.selected === true) {
                                _this[_this.param][0].selected = true;
                                _this.currentLocation.title = _this[_this.param][0].title;
                                _this.currentLocation.id = 0;
                            }
                            else if (_this.param === 'locationList' && _this[_this.param].length === 0 && item.selected === true) {
                                _this.currentLocation.id = 0;
                                _this.currentLocation.title = 'Default';
                                _this.locationList.push({
                                    title: 'Default',
                                    count: 0,
                                    selected: true,
                                    display: true,
                                    categoryList: []
                                });
                            }
                        }
                        // Save to localStorage and set event to update HomePage
                        _this.save();
                        _this.event();
                    }
                }
            ]
        });
        alert.present();
    };
    ConfigurePage.prototype.edit = function (item, slidingItem) {
        this.showPrompt('edit', item);
        slidingItem.close();
    };
    ConfigurePage.prototype.showPrompt = function (action, item) {
        var _this = this;
        var title = '';
        var message = '';
        // check and set
        if (action === 'edit') {
            title = item.title;
            message = 'Enter a name to replace ' + title + '.';
        }
        else {
            title = 'New item';
            message = 'Enter a new name to add to this list.';
        }
        var prompt = this.alertCtrl.create({
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
                    handler: function (data) {
                        //console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        // Check if data was inputed
                        data.title = data.title.trim();
                        if (data.title === '') {
                            return false; // ignore
                        }
                        else {
                            data.title = data.title.toUpperCase();
                            if (action === 'edit') {
                                if (_this.param === 'locationList' && item.selected === true) {
                                    _this.currentLocation.title = data.title;
                                }
                                item.title = data.title;
                            }
                            else {
                                _this.thisList.push({
                                    title: data.title,
                                    count: 0,
                                    display: true,
                                    selected: false
                                });
                                if (_this.param === 'locationList') {
                                    _this.thisList[_this.thisList.length - 1].categoryList = [];
                                }
                                else if (_this.param === 'categoryList') {
                                    _this.thisList[_this.thisList.length - 1].itemList = [];
                                }
                            }
                            // Save to localStorage and set event to update HomePage
                            _this.save();
                            _this.event();
                        }
                    }
                }
            ]
        });
        prompt.present();
    };
    ConfigurePage.prototype.presentAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Low battery',
            subTitle: '10% of battery remaining',
            buttons: ['Dismiss']
        });
        alert.present();
    };
    ConfigurePage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad ConfigurePage');
    };
    ConfigurePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-configure',template:/*ion-inline-start:"/Users/xclusive36/picklist/src/pages/configure/configure.html"*/'<!--\n  Generated template for the ConfigurePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>Configure</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="add(item)">\n        <ion-icon name="add"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n\n  <ion-list>\n    <ion-item-group reorder="true" (ionItemReorder)="reorderItems($event, param)">\n      <ion-item-sliding *ngFor="let item of thisList" #slidingItem>\n        <ion-item class="link" [@fade]>\n          <ion-icon name="ios-arrow-forward-outline" small item-start></ion-icon>\n          {{ item.title }}\n        </ion-item>\n        <ion-item-options side="right">\n          <button ion-button color="success" (click)="edit(item, slidingItem)">Edit</button>\n          <button ion-button color="danger" (click)="delete(item, slidingItem)">Delete</button>\n        </ion-item-options>\n      </ion-item-sliding>\n    </ion-item-group>\n    <ion-item padding text-center *ngIf=\'thisList?.length === 0\' (click)="add(item)">\n      <p>&nbsp;</p>\n    </ion-item>\n  </ion-list>\n\n</ion-content>\n<ion-footer>\n  <ion-grid>\n    <ion-row>\n      <ion-col>\n        <button ion-button block small disabled color="blue" (click)="reset()">RESET</button>\n      </ion-col>\n      <ion-col>\n        <button ion-button block small disabled [color]="pickMode[0][0]" (click)="pick()">PICK MODE</button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-footer>\n'/*ion-inline-end:"/Users/xclusive36/picklist/src/pages/configure/configure.html"*/,
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
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_22" /* trigger */])('fade', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_21" /* transition */])(':enter', [
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* style */])({ opacity: 0.1 }),
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* animate */])(200, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* style */])({ opacity: 1 }))
                    ]),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_21" /* transition */])(':leave', [
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* animate */])(200, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* style */])({ opacity: 0.1 }))
                    ]),
                ]),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_22" /* trigger */])('flyInOut', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_21" /* transition */])(':enter', [
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* style */])({ transform: 'scale(1, 0)' }),
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* animate */])(150, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* style */])({ transform: 'scale(1, 1)' }))
                    ]),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_21" /* transition */])(':leave', [
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* animate */])(200, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* style */])({ transform: 'scale(1, 0)' }))
                    ])
                ]),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_22" /* trigger */])('fadeInOut', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_21" /* transition */])(':enter', [
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* style */])({ opacity: 0 }),
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* animate */])(450, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* style */])({ opacity: 1 }))
                    ]),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_21" /* transition */])(':leave', [
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* animate */])(450, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* style */])({ opacity: 0 }))
                    ])
                ])
            ]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]) === "function" && _e || Object])
    ], ConfigurePage);
    return ConfigurePage;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=configure.js.map

/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TallyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__configure_configure__ = __webpack_require__(101);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the TallyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TallyPage = /** @class */ (function () {
    function TallyPage(navCtrl, navParams, storage, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.events = events;
        this.storage = storage;
        this.param = navParams.get('param');
        this.paramID = navParams.get('paramID');
        this.masterArray = navParams.get('masterArray');
        this.setVars();
        this.thisList = this.categoryList[this.paramID].itemList;
        //this.thisList = this[this.param];
    }
    TallyPage.prototype.countDown = function (item) {
        if (item.count > 0) {
            this.masterArray.totalcount = this.masterArray.totalcount - 1;
            this.locationList[this.currentLocation.id].count = this.locationList[this.currentLocation.id].count - 1;
            this.categoryList[this.paramID].count = this.categoryList[this.paramID].count - 1;
            item.count = item.count - 1;
            if (item.count === 0) {
                if (this.pickMode[0][1]) {
                    item.display = false;
                }
            }
            this.event();
        }
    };
    TallyPage.prototype.countClear = function (item) {
        this.masterArray.totalcount = this.masterArray.totalcount - item.count;
        this.locationList[this.currentLocation.id].count = this.locationList[this.currentLocation.id].count - item.count;
        this.categoryList[this.paramID].count = this.categoryList[this.paramID].count - item.count;
        item.count = 0;
        this.event();
        if (this.pickMode[0][1]) {
            item.display = false;
        }
    };
    TallyPage.prototype.countUp = function (item) {
        this.masterArray.totalcount = this.masterArray.totalcount + 1;
        this.locationList[this.currentLocation.id].count = this.locationList[this.currentLocation.id].count + 1;
        this.categoryList[this.paramID].count = this.categoryList[this.paramID].count + 1;
        item.count = item.count + 1;
        this.event();
    };
    TallyPage.prototype.configure = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__configure_configure__["a" /* ConfigurePage */], {
            param: item,
            paramID: this.paramID,
            masterArray: this.masterArray
        });
    };
    TallyPage.prototype.reorderItems = function (indexes, object) {
        var element = this[object][indexes.from];
        this[object].splice(indexes.from, 1);
        this[object].splice(indexes.to, 0, element);
    };
    TallyPage.prototype.pick = function () {
        this.reorderItems({ from: 0, to: 1 }, 'pickMode');
        this.switch_pickMode();
    };
    TallyPage.prototype.switch_pickMode = function () {
        // cycle through and set all counts to 0
        for (var i = 0; i < this.locationList.length; i++) {
            if (this.pickMode[0][1] === true) {
                if (this.locationList[i].count === 0) {
                    this.locationList[i].display = false;
                }
            }
            else {
                this.locationList[i].display = true;
            }
            for (var j = 0; j < this.locationList[i].categoryList.length; j++) {
                if (this.pickMode[0][1] === true) {
                    if (this.locationList[i].categoryList[j].count === 0) {
                        this.locationList[i].categoryList[j].display = false;
                    }
                }
                else {
                    this.locationList[i].categoryList[j].display = true;
                }
                for (var k = 0; k < this.locationList[i].categoryList[j].itemList.length; k++) {
                    if (this.pickMode[0][1] === true) {
                        if (this.locationList[i].categoryList[j].itemList[k].count === 0) {
                            this.locationList[i].categoryList[j].itemList[k].display = false;
                        }
                    }
                    else {
                        this.locationList[i].categoryList[j].itemList[k].display = true;
                    }
                }
            }
        }
    };
    TallyPage.prototype.reset = function () {
        // if pickMode is engaged, turn off!
        if (this.pickMode[0][1] === true) {
            this.pick();
        }
        // Reset totalcount as 0
        this.totalcount = 0;
        this.masterArray.totalcount = this.totalcount;
        // cycle through and set all counts to 0
        for (var i = 0; i < this.locationList.length; i++) {
            this.locationList[i].count = 0;
            for (var j = 0; j < this.locationList[i].categoryList.length; j++) {
                this.locationList[i].categoryList[j].count = 0;
                for (var k = 0; k < this.locationList[i].categoryList[j].itemList.length; k++) {
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
    };
    TallyPage.prototype.setVars = function () {
        this.currentLocation = this.masterArray.currentLocation; // define currentLocation as object from 'masterArray'
        this.locationList = this.masterArray.locationList; // define locationList as object from 'masterArray'
        // If there are no created locations, create a new 'default' location
        if (this.locationList.length === 0) {
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
        for (var i = 0; i < this.locationList.length; i++) {
            if (this.locationList[i].selected === true) {
                // define location, id and count of selected item
                this.location = this.locationList[i].title;
                this.currentLocation.id = this.locationList.map(function (e) { return e.title; }).indexOf(this.currentLocation.title);
                this.locationcount = this.locationList[this.currentLocation.id].count;
            }
        }
        this.categoryList = this.locationList[this.currentLocation.id].categoryList; // define categoryList as object from 'masterArray'
    };
    TallyPage.prototype.event = function () {
        this.events.publish('item:updated', this.masterArray);
    };
    TallyPage.prototype.save = function () {
        this.storage.set('masterArray', this.masterArray); // Save 'masterArray' into storage
    };
    TallyPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad TallyPage');
    };
    TallyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tally',template:/*ion-inline-start:"/Users/xclusive36/picklist/src/pages/tally/tally.html"*/'<!--\n  Generated template for the TallyPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{ param }}</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only color="blue" (click)="configure(\'itemList\')">\n        <ion-icon name="more"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-list>\n\n      <ion-item-group *ngFor="let item of thisList">\n        <ion-item *ngIf="item.display" [@fade]>\n          <ion-grid>\n            <ion-row>\n              <ion-col text-center>\n                <button ion-button block icon-only item-start color="red" (click)="countDown(item)">\n                  <ion-icon name="remove"></ion-icon>\n                </button>\n              </ion-col>\n              <ion-col text-center>\n                <button ion-button block outline item-start color="black" (click)="countClear(item)">\n                  {{ item.count }}\n                </button>\n              </ion-col>\n              <ion-col text-center>\n                <button ion-button block icon-only item-end color="blue" (click)="countUp(item)">\n                  <ion-icon name="add"></ion-icon>\n                </button>\n              </ion-col>\n            </ion-row>\n            <ion-row>\n              <ion-col text-center>{{ item.title }}</ion-col>\n            </ion-row>\n          </ion-grid>\n        </ion-item>\n      </ion-item-group>\n      <ion-item padding text-center *ngIf=\'thisList?.length === 0\' (click)="configure(\'itemList\')">\n        <p>&nbsp;</p>\n      </ion-item>\n\n    </ion-list>\n</ion-content>\n<ion-footer>\n  <ion-grid>\n    <ion-row>\n      <ion-col>\n        <button ion-button block small color="blue" (click)="reset()">RESET</button>\n      </ion-col>\n      <ion-col>\n        <button ion-button block small [color]="pickMode[0][0]" (click)="pick()">PICK MODE</button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-footer>\n'/*ion-inline-end:"/Users/xclusive36/picklist/src/pages/tally/tally.html"*/,
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
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_22" /* trigger */])('fade', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_21" /* transition */])(':enter', [
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* style */])({ opacity: 0.1 }),
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* animate */])(200, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* style */])({ opacity: 1 }))
                    ]),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_21" /* transition */])(':leave', [
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* animate */])(200, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* style */])({ opacity: 0.1 }))
                    ]),
                ]),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_22" /* trigger */])('flyInOut', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_21" /* transition */])(':enter', [
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* style */])({ transform: 'scale(1, 0)' }),
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* animate */])(150, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* style */])({ transform: 'scale(1, 1)' }))
                    ]),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_21" /* transition */])(':leave', [
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* animate */])(200, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* style */])({ transform: 'scale(1, 0)' }))
                    ])
                ]),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_22" /* trigger */])('fadeInOut', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_21" /* transition */])(':enter', [
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* style */])({ opacity: 0 }),
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* animate */])(450, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* style */])({ opacity: 1 }))
                    ]),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_21" /* transition */])(':leave', [
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* animate */])(450, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* style */])({ opacity: 0 }))
                    ])
                ])
            ]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]) === "function" && _d || Object])
    ], TallyPage);
    return TallyPage;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=tally.js.map

/***/ }),

/***/ 111:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 111;

/***/ }),

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/configure/configure.module": [
		273
	],
	"../pages/tally/tally.module": [
		274
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 152;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__configure_configure__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tally_tally__ = __webpack_require__(102);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { trigger, state, style, transition, animate } from '@angular/animations';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



var HomePage = /** @class */ (function () {
    // Start constructor()
    function HomePage(navCtrl, navParams, storage, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.events = events;
        this.pickMode = [['gray', false], ['red', true]];
        this.items = [];
        // set vars and storage
        this.storage = storage;
        this.storage.remove('masterArray');
        // pull storage and check if 'masterArray' exists
        this.storage.get('masterArray').then(function (result) {
            if (!result) {
                _this.defineArray(); // Call function to define masterArray and set to localStorage
            }
            else {
                _this.masterArray = result; // set 'masterArray' as 'masterArray' from storage
            }
            _this.setVars(); // Call function to set all variables needed for page to function
        });
        // On event item:updated
        events.subscribe('item:updated', function (masterArray) {
            // reset masterArray
            _this.masterArray = masterArray;
            _this.location = _this.currentLocation.title;
            _this.totalcount = _this.masterArray.totalcount;
            _this.locationcount = _this.locationList[_this.currentLocation.id].count;
            _this.switch_pickMode();
        });
    } // End constructor()
    HomePage.prototype.reorderItems = function (indexes, object) {
        var element = this[object][indexes.from];
        this[object].splice(indexes.from, 1);
        this[object].splice(indexes.to, 0, element);
    };
    HomePage.prototype.pick = function () {
        this.reorderItems({ from: 0, to: 1 }, 'pickMode');
        this.switch_pickMode();
    };
    HomePage.prototype.switch_pickMode = function () {
        // cycle through and set all counts to 0
        for (var i = 0; i < this.locationList.length; i++) {
            if (this.pickMode[0][1] === true) {
                if (this.locationList[i].count === 0) {
                    this.locationList[i].display = false;
                }
            }
            else {
                this.locationList[i].display = true;
            }
            for (var j = 0; j < this.locationList[i].categoryList.length; j++) {
                if (this.pickMode[0][1] === true) {
                    if (this.locationList[i].categoryList[j].count === 0) {
                        this.locationList[i].categoryList[j].display = false;
                    }
                }
                else {
                    this.locationList[i].categoryList[j].display = true;
                }
                for (var k = 0; k < this.locationList[i].categoryList[j].itemList.length; k++) {
                    if (this.pickMode[0][1] === true) {
                        if (this.locationList[i].categoryList[j].itemList[k].count === 0) {
                            this.locationList[i].categoryList[j].itemList[k].display = false;
                        }
                    }
                    else {
                        this.locationList[i].categoryList[j].itemList[k].display = true;
                    }
                }
            }
        }
    };
    HomePage.prototype.reset = function () {
        // if pickMode is engaged, turn off!
        if (this.pickMode[0][1] === true) {
            this.pick();
        }
        // Reset totalcount as 0
        this.totalcount = 0;
        this.masterArray.totalcount = this.totalcount;
        // cycle through and set all counts to 0
        for (var i = 0; i < this.locationList.length; i++) {
            this.locationList[i].count = 0;
            for (var j = 0; j < this.locationList[i].categoryList.length; j++) {
                this.locationList[i].categoryList[j].count = 0;
                for (var k = 0; k < this.locationList[i].categoryList[j].itemList.length; k++) {
                    this.locationList[i].categoryList[j].itemList[k].count = 0;
                }
            }
        }
        // re-initialize locationcount
        this.locationcount = this.locationList[this.currentLocation.id].count;
        this.save();
    };
    HomePage.prototype.locationSelect = function (event) {
        this.currentLocation.title = event;
        this.location = event;
        this.currentLocation.id = this.locationList.map(function (e) { return e.title; }).indexOf(this.currentLocation.title);
        // Cycle through all items in 'locationList' and set all 'selected' as false
        for (var i = 0; i < this.locationList.length; i++) {
            this.locationList[i].selected = false;
        }
        // Set the 'selected item' as true
        this.locationList[this.currentLocation.id].selected = true;
        // define categoryList as object from 'masterArray'
        this.categoryList = this.locationList[this.currentLocation.id].categoryList;
        this.switch_pickMode();
        // define 'locationcount' as the selected count
        this.locationcount = this.locationList[this.currentLocation.id].count;
    };
    HomePage.prototype.configure = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__configure_configure__["a" /* ConfigurePage */], {
            param: item,
            masterArray: this.masterArray
        });
    };
    HomePage.prototype.tally = function (title) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__tally_tally__["a" /* TallyPage */], {
            param: title,
            paramID: this.categoryList.map(function (e) { return e.title; }).indexOf(title),
            masterArray: this.masterArray
        });
    };
    HomePage.prototype.setVars = function () {
        this.currentLocation = this.masterArray.currentLocation; // define currentLocation as object from 'masterArray'
        this.locationList = this.masterArray.locationList; // define locationList as object from 'masterArray'
        // If there are no created locations, create a new 'default' location
        if (this.locationList.length === 0) {
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
        for (var i = 0; i < this.locationList.length; i++) {
            if (this.locationList[i].selected === true) {
                // define location, id and count of selected item
                this.location = this.locationList[i].title;
                this.currentLocation.id = this.locationList.map(function (e) { return e.title; }).indexOf(this.currentLocation.title);
                this.locationcount = this.locationList[this.currentLocation.id].count;
            }
        }
        this.categoryList = this.locationList[this.currentLocation.id].categoryList; // define categoryList as object from 'masterArray'
    };
    HomePage.prototype.defineArray = function () {
        this.masterArray = {
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
                    categoryList: []
                }
            ],
            categoryList: [],
            pickMode: [['gray', false], ['red', true]]
        };
        this.save(); // Set new 'masterArray' into storage
    };
    HomePage.prototype.save = function () {
        this.storage.set('masterArray', this.masterArray); // Save 'masterArray' into storage
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/xclusive36/picklist/src/pages/home/home.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-title>Picklist Merch App</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-list>\n    <ion-list-header>\n      <ion-icon name="navigate" padding-right></ion-icon>\n      LOCATIONS\n      <ion-badge margin-left color="gray">{{ totalcount }}</ion-badge>\n      <button ion-button icon-only color="blue" clear item-end (click)="configure(\'locationList\')">\n        <ion-icon name="more" color="blue"></ion-icon>\n      </button>\n    </ion-list-header>\n\n    <ion-item>\n      <ion-badge item-start color="red">{{ locationcount }}</ion-badge>\n      <ion-select [(ngModel)]="location" (ionChange)="locationSelect($event)" interface="action-sheet">\n        <ion-option *ngFor="let item of locationList" [value]="item.title">{{ item.title }}</ion-option>\n      </ion-select>\n    </ion-item>\n  </ion-list>\n\n  <ion-list>\n    <ion-list-header>\n      CATEGORIES\n      <button ion-button icon-only clear item-end color="blue" (click)="configure(\'categoryList\')">\n        <ion-icon name="more" color="blue"></ion-icon>\n      </button>\n    </ion-list-header>\n    <ion-item-sliding *ngFor="let item of categoryList">\n      <button ion-item class="link" *ngIf="item.display" [@fade] (click)="tally(item.title)">\n      <ion-badge item-start color="blue">{{ item.count }}</ion-badge>\n        {{ item.title }}\n      </button>\n    </ion-item-sliding>\n    <ion-item padding text-center text-wrap *ngIf=\'categoryList?.length === 0\' (click)="configure(\'categoryList\')">\n      <p>&nbsp;</p>\n    </ion-item>\n  </ion-list>\n\n</ion-content>\n<ion-footer>\n  <ion-grid>\n    <ion-row>\n      <ion-col>\n        <button ion-button block small color="blue" (click)="reset()">RESET</button>\n      </ion-col>\n      <ion-col>\n        <button ion-button block small [color]="pickMode[0][0]" (click)="pick()">PICK MODE</button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-footer>\n'/*ion-inline-end:"/Users/xclusive36/picklist/src/pages/home/home.html"*/,
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
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_22" /* trigger */])('fade', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_21" /* transition */])(':enter', [
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* style */])({ opacity: 0.1 }),
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* animate */])(200, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* style */])({ opacity: 1 }))
                    ]),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_21" /* transition */])(':leave', [
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* animate */])(200, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* style */])({ opacity: 0.1 }))
                    ]),
                ]),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_22" /* trigger */])('flyInOut', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_21" /* transition */])(':enter', [
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* style */])({ transform: 'scale(1, 0)' }),
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* animate */])(150, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* style */])({ transform: 'scale(1, 1)' }))
                    ]),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_21" /* transition */])(':leave', [
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* animate */])(200, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* style */])({ transform: 'scale(1, 0)' }))
                    ])
                ]),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_22" /* trigger */])('fadeInOut', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_21" /* transition */])(':enter', [
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* style */])({ opacity: 0 }),
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* animate */])(450, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* style */])({ opacity: 1 }))
                    ]),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_21" /* transition */])(':leave', [
                        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* animate */])(450, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* style */])({ opacity: 0 }))
                    ])
                ])
            ]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]) === "function" && _d || Object])
    ], HomePage);
    return HomePage;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(221);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_configure_configure__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_configure_configure_module__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_tally_tally__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_tally_tally_module__ = __webpack_require__(274);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/configure/configure.module#ConfigurePageModule', name: 'ConfigurePage', segment: 'configure', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tally/tally.module#TallyPageModule', name: 'TallyPage', segment: 'tally', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_10__pages_configure_configure_module__["ConfigurePageModule"],
                __WEBPACK_IMPORTED_MODULE_12__pages_tally_tally_module__["TallyPageModule"]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_configure_configure__["a" /* ConfigurePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_tally_tally__["a" /* TallyPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 272:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(197);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/xclusive36/picklist/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/xclusive36/picklist/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigurePageModule", function() { return ConfigurePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__configure__ = __webpack_require__(101);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ConfigurePageModule = /** @class */ (function () {
    function ConfigurePageModule() {
    }
    ConfigurePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__configure__["a" /* ConfigurePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__configure__["a" /* ConfigurePage */]),
            ],
        })
    ], ConfigurePageModule);
    return ConfigurePageModule;
}());

//# sourceMappingURL=configure.module.js.map

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TallyPageModule", function() { return TallyPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tally__ = __webpack_require__(102);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TallyPageModule = /** @class */ (function () {
    function TallyPageModule() {
    }
    TallyPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__tally__["a" /* TallyPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__tally__["a" /* TallyPage */]),
            ],
        })
    ], TallyPageModule);
    return TallyPageModule;
}());

//# sourceMappingURL=tally.module.js.map

/***/ })

},[198]);
//# sourceMappingURL=main.js.map
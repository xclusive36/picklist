import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TallyPage } from './tally';

@NgModule({
  declarations: [
    TallyPage,
  ],
  imports: [
    IonicPageModule.forChild(TallyPage),
  ],
})
export class TallyPageModule {}

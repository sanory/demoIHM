import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SimonPage } from './simon';

@NgModule({
  declarations: [
    SimonPage,
  ],
  imports: [
    IonicPageModule.forChild(SimonPage),
  ],
})
export class SimonPageModule {}

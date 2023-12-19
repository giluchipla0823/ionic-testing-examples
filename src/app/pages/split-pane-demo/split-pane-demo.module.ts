import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplitPaneDemoPageRoutingModule } from './split-pane-demo-routing.module';

import { SplitPaneDemoPage } from './split-pane-demo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplitPaneDemoPageRoutingModule
  ],
  declarations: [SplitPaneDemoPage]
})
export class SplitPaneDemoPageModule {}

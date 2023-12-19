import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExampleAnimationPageRoutingModule } from './example-animation-routing.module';

import { ExampleAnimationPage } from './example-animation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExampleAnimationPageRoutingModule
  ],
  declarations: [ExampleAnimationPage]
})
export class ExampleAnimationPageModule {}

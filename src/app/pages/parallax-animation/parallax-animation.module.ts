import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParallaxAnimationPageRoutingModule } from './parallax-animation-routing.module';

import { ParallaxAnimationPage } from './parallax-animation.page';
import { ParallaxHeaderDirective } from 'src/app/directives/parallax-header.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParallaxAnimationPageRoutingModule,
    
  ],
  declarations: [ParallaxAnimationPage, ParallaxHeaderDirective]
})
export class ParallaxAnimationPageModule {}

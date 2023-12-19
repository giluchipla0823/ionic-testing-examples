import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParallaxAnimationPage } from './parallax-animation.page';

const routes: Routes = [
  {
    path: '',
    component: ParallaxAnimationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParallaxAnimationPageRoutingModule {}

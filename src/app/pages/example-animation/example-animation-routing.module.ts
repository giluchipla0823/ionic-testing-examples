import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExampleAnimationPage } from './example-animation.page';

const routes: Routes = [
  {
    path: '',
    component: ExampleAnimationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExampleAnimationPageRoutingModule {}

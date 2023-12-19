import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplitPaneDemoPage } from './split-pane-demo.page';

const routes: Routes = [
  {
    path: '',
    component: SplitPaneDemoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplitPaneDemoPageRoutingModule {}

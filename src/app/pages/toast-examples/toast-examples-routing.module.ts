import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToastExamplesPage } from './toast-examples.page';

const routes: Routes = [
  {
    path: '',
    component: ToastExamplesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToastExamplesPageRoutingModule {}

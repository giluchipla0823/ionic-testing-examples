import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StorageCacheApiPage } from './storage-cache-api.page';

const routes: Routes = [
  {
    path: '',
    component: StorageCacheApiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StorageCacheApiPageRoutingModule {}

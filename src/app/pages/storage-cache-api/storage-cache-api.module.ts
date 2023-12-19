import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StorageCacheApiPageRoutingModule } from './storage-cache-api-routing.module';

import { StorageCacheApiPage } from './storage-cache-api.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StorageCacheApiPageRoutingModule,
  ],
  declarations: [StorageCacheApiPage],
})
export class StorageCacheApiPageModule {}

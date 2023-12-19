import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ToastExamplesPageRoutingModule } from './toast-examples-routing.module';

import { ToastExamplesPage } from './toast-examples.page';
import { ToastTemplateCustomComponent } from 'src/app/components/toast-template-custom/toast-template-custom.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToastExamplesPageRoutingModule
  ],
  declarations: [ToastExamplesPage, ToastTemplateCustomComponent]
})
export class ToastExamplesPageModule {}

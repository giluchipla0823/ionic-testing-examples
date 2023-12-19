import { ModuleWithProviders, NgModule } from '@angular/core';

import { ToastNotificationComponent } from './toast-notification.component';
import {
  DefaultNoComponentGlobalToastNotificationConfig,

  TOAST_CONFIG,
} from './config/toast-config';

import { CommonModule } from '@angular/common';
import { GlobalToastNotificationConfig } from './config/interfaces/toast.interface';

export const DefaultGlobalToastNotificationConfig: GlobalToastNotificationConfig = {
  ...DefaultNoComponentGlobalToastNotificationConfig,
  toastComponent: ToastNotificationComponent,
};

@NgModule({
  imports: [CommonModule],
  declarations: [ToastNotificationComponent],
  exports: [ToastNotificationComponent],
})
export class ToastNotificationModule {
  static forRoot(
    config: Partial<GlobalToastNotificationConfig> = {}
  ): ModuleWithProviders<ToastNotificationModule> {
    return {
      ngModule: ToastNotificationModule,
      providers: [
        {
          provide: TOAST_CONFIG,
          useValue: {
            default: DefaultGlobalToastNotificationConfig,
            config,
          },
        },
      ],
    };
  }
}

@NgModule({})
export class ToastrComponentlessModule {
  static forRoot(
    config: Partial<GlobalToastNotificationConfig> = {}
  ): ModuleWithProviders<ToastNotificationModule> {
    return {
      ngModule: ToastNotificationModule,
      providers: [
        {
          provide: TOAST_CONFIG,
          useValue: {
            default: DefaultNoComponentGlobalToastNotificationConfig,
            config,
          },
        },
      ],
    };
  }
}

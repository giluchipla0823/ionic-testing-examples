import { InjectionToken } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { ToastNotificationRef } from './toast-ref';
import { GlobalToastNotificationConfig, IndividualToastNotificationConfig, ToastToken } from './interfaces/toast.interface';
import { ToastProgressAnimation } from './enums/toast.enum';


/**
 * Everything a toast needs to launch
 */
export class ToastNotificationPackage<ConfigPayload = any> {
  private onTap$ = new Subject<void>();
  private onAction$ = new Subject<any>();

  constructor(
    public toastId: number,
    public config: IndividualToastNotificationConfig<ConfigPayload>,
    public message: string | null | undefined,
    public title: string | undefined,
    public toastType: string,
    public toastRef: ToastNotificationRef<any>
  ) {
    this.toastRef.afterClosed().subscribe(() => {
      this.onAction$.complete();
      this.onTap$.complete();
    });
  }

  /** Fired on click */
  triggerTap(): void {
    this.onTap$.next();

    if (this.config.tapToDismiss) {
      this.onTap$.complete();
    }
  }

  onTap(): Observable<void> {
    return this.onTap$.asObservable();
  }

  /** Available for use in custom toast */
  triggerAction(action?: any): void {
    this.onAction$.next(action);
  }

  onAction(): Observable<void> {
    return this.onAction$.asObservable();
  }
}

export const DefaultNoComponentGlobalToastNotificationConfig: GlobalToastNotificationConfig = {
  maxOpened: 0,
  autoDismiss: false,
  newestOnTop: true,
  preventDuplicates: false,
  countDuplicates: false,
  resetTimeoutOnDuplicate: false,
  includeTitleDuplicates: false,
  iconClasses: {
    error: 'toast-error',
    info: 'toast-info',
    success: 'toast-success',
    warning: 'toast-warning',
  },
  closeButton: false,
  disableTimeOut: false,
  timeOut: 5000,
  extendedTimeOut: 1000,
  enableHtml: false,
  progressBar: false,
  toastClass: 'street-toast',
  positionClass: 'toast-top-right',
  titleClass: 'toast-title',
  messageClass: 'toast-message',
  easing: 'ease-in',
  easeTime: 300,
  tapToDismiss: false,
  onActivateTick: false,
  progressAnimation: ToastProgressAnimation.DECREASING,
};


export const TOAST_CONFIG = new InjectionToken<ToastToken>('TOAST_CONFIG');

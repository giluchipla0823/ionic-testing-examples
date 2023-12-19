import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  NgZone,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastNotificationPackage } from './config/toast-config';
import { ToastNotificationService } from './toast-notification.service';
import { IndividualToastNotificationConfig } from './config/interfaces/toast.interface';
import { ToastDisableTimeOut, ToastStatusValue } from './config/enums/toast.enum';

@Component({
  selector: 'app-toast-notification-component',
  templateUrl: './toast-notification.component.html',
  animations: [
    trigger('flyInOut', [
      state('inactive', style({ opacity: 0 })),
      state('active', style({ opacity: 1 })),
      state('removed', style({ opacity: 0 })),
      transition(
        'inactive => active',
        animate('{{ easeTime }}ms {{ easing }}')
      ),
      transition('active => removed', animate('{{ easeTime }}ms {{ easing }}')),
    ]),
  ],
})
export class ToastNotificationComponent<ConfigPayload = any> implements OnDestroy {
  message?: string | null;
  title?: string;
  options: IndividualToastNotificationConfig<ConfigPayload>;
  duplicatesCount!: number;
  originalTimeout: number;
  /** width of progress bar */
  width = -1;
  /** a combination of toast type and options.toastClass */
  @HostBinding('class') toastClasses = '';
  /** controls animation */
  @HostBinding('@flyInOut') state!: {
    value: ToastStatusValue;
    params: { easeTime: number | string; easing: string };
  };

  /** hides component when waiting to be displayed */
  @HostBinding('style.display')
  get displayStyle(): string | undefined {
    if (this.state.value === ToastStatusValue.INACTIVE) {
      return 'none';
    }

    return;
  }

  private timeout: any;
  private intervalId: any;
  private hideTime!: number;
  private afterActivateSubscription$: Subscription;
  private manualClosedSubscription$: Subscription;
  private timeoutResetSubscription$: Subscription;
  private countDuplicateSubscription$: Subscription;

  constructor(
    private host: ElementRef,
    private toastService: ToastNotificationService,
    private toastPackage: ToastNotificationPackage,
    private ngZone?: NgZone
  ) {
    this.message = toastPackage.message;
    this.title = toastPackage.title;
    this.options = toastPackage.config;
    this.originalTimeout = toastPackage.config.timeOut;
    this.toastClasses = `${toastPackage.toastType} ${toastPackage.config.toastClass}`;

    this.afterActivateSubscription$ = toastPackage.toastRef.afterActivate().subscribe(() => {
      this.activateToast();
    });
    this.manualClosedSubscription$ = toastPackage.toastRef.manualClosed().subscribe(() => {
      this.remove();
    });
    this.timeoutResetSubscription$ = toastPackage.toastRef.timeoutReset().subscribe(() => {
      this.resetTimeout();
    });
    this.countDuplicateSubscription$ = toastPackage.toastRef.countDuplicate().subscribe((count) => {
      this.duplicatesCount = count;
    });

    this.state = {
      value: ToastStatusValue.INACTIVE,
      params: {
        easeTime: this.toastPackage.config.easeTime,
        easing: 'ease-in',
      },
    };
  }

  public ngOnDestroy(): void {
    this.afterActivateSubscription$.unsubscribe();
    this.manualClosedSubscription$.unsubscribe();
    this.timeoutResetSubscription$.unsubscribe();
    this.countDuplicateSubscription$.unsubscribe();
    clearInterval(this.intervalId);
    clearTimeout(this.timeout);
  }
  
  /**
   * Activates toast and sets timeout
   */
  public activateToast(): void {
    this.state = { ...this.state, value: ToastStatusValue.ACTIVE };
    if (
      !(
        this.options.disableTimeOut === true ||
        this.options.disableTimeOut === ToastDisableTimeOut.TIME_OUT
      ) &&
      this.options.timeOut
    ) {
      this.outsideTimeout(() => this.remove(), this.options.timeOut);
      this.hideTime = new Date().getTime() + this.options.timeOut;
      if (this.options.progressBar) {
        this.outsideInterval(() => this.updateProgress(), 10);
      }
    }
  }

  /**
   * updates progress bar width
   */
  public updateProgress(): void {
    if (this.width === 0 || this.width === 100 || !this.options.timeOut) {
      return;
    }
    const now = new Date().getTime();
    const remaining = this.hideTime - now;
    this.width = (remaining / this.options.timeOut) * 100;
    if (this.options.progressAnimation === 'increasing') {
      this.width = 100 - this.width;
    }
    if (this.width <= 0) {
      this.width = 0;
    }
    if (this.width >= 100) {
      this.width = 100;
    }
  }

  public resetTimeout(): void {
    clearTimeout(this.timeout);
    clearInterval(this.intervalId);
    this.state = { ...this.state, value: ToastStatusValue.ACTIVE };

    this.outsideTimeout(() => this.remove(), this.originalTimeout);
    this.options.timeOut = this.originalTimeout;
    this.hideTime = new Date().getTime() + (this.options.timeOut || 0);
    this.width = -1;
    if (this.options.progressBar) {
      this.outsideInterval(() => this.updateProgress(), 10);
    }
  }

  /**
   * tells toastService to remove this toast after animation time
   */
  public remove(): void {
    if (this.state.value === ToastStatusValue.REMOVED) {
      return;
    }
    clearTimeout(this.timeout);
    this.state = { ...this.state, value: ToastStatusValue.REMOVED };
    this.outsideTimeout(
      () => this.toastService.remove(this.toastPackage.toastId),
      +this.toastPackage.config.easeTime
    );
  }

  @HostListener('click')
  tapToast(): void {
    // if (this.state.value === ToastStatusValue.REMOVED) {
    //   return;
    // }

    // this.toastPackage.triggerTap();
    
    // if (this.options.tapToDismiss) {
    //   this.remove();
    // }
  }

  @HostListener('mouseenter')
  stickAround(): void {
    if (this.state.value === ToastStatusValue.REMOVED) {
      return;
    }

    if (this.options.disableTimeOut !== ToastDisableTimeOut.EXTENDED_TIME_OUT) {
      clearTimeout(this.timeout);
      this.options.timeOut = 0;
      this.hideTime = 0;

      // disable progressBar
      clearInterval(this.intervalId);
      this.width = 0;
    }
  }
  @HostListener('mouseleave')
  delayedHideToast(): void {
    if (
      this.options.disableTimeOut === true ||
      this.options.disableTimeOut === ToastDisableTimeOut.EXTENDED_TIME_OUT ||
      this.options.extendedTimeOut === 0 ||
      this.state.value === ToastStatusValue.REMOVED
    ) {
      return;
    }
    this.outsideTimeout(() => this.remove(), this.options.extendedTimeOut);
    this.options.timeOut = this.options.extendedTimeOut;
    this.hideTime = new Date().getTime() + (this.options.timeOut || 0);
    this.width = -1;
    if (this.options.progressBar) {
      this.outsideInterval(() => this.updateProgress(), 10);
    }
  }

  public outsideTimeout(func: () => any, timeout: number): void {
    if (this.ngZone) {
      this.ngZone.runOutsideAngular(
        () =>
          (this.timeout = setTimeout(
            () => this.runInsideAngular(func),
            timeout
          ))
      );
    } else {
      this.timeout = setTimeout(() => func(), timeout);
    }
  }

  public outsideInterval(func: () => any, timeout: number): void {
    if (this.ngZone) {
      this.ngZone.runOutsideAngular(
        () =>
          (this.intervalId = setInterval(
            () => this.runInsideAngular(func),
            timeout
          ))
      );
    } else {
      this.intervalId = setInterval(() => func(), timeout);
    }
  }

  public getHost() {
    return this.host;
  }

  private runInsideAngular(func: () => any): void {
    if (this.ngZone) {
      this.ngZone.run(() => func());
    } else {
      func();
    }
  }
}

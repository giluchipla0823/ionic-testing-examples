import {
  Inject,
  Injectable,
  Injector,
  NgZone,
  SecurityContext,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { OverlayService } from './overlay/overlay.service';
import { ToastNotificationRef } from './config/toast-ref';
import { ToastNotificationContainerDirective } from './toast-notification.directive';
import {
  ToastNotificationPackage,
  TOAST_CONFIG,
} from './config/toast-config';
import { ComponentPortal } from '../portal/component-portal';
import { ActiveToast } from './config/types/toast.type';
import { GlobalToastNotificationConfig, IndividualToastNotificationConfig, ToastToken } from './config/interfaces/toast.interface';

@Injectable({ providedIn: 'root' })
export class ToastNotificationService {
  ToastConfig: GlobalToastNotificationConfig;
  currentlyActive = 0;
  toasts: ActiveToast<any>[] = [];
  overlayContainer?: ToastNotificationContainerDirective;
  previousToastMessage: string | undefined;

  private index = 0;

  constructor(
    @Inject(TOAST_CONFIG) token: ToastToken,
    private overlayService: OverlayService,
    private injector: Injector,
    private sanitizer: DomSanitizer,
    private ngZone: NgZone
  ) {
    this.ToastConfig = {
      ...token.default,
      ...token.config,
    };

    if (token.config.iconClasses) {
      this.ToastConfig.iconClasses = {
        ...token.default.iconClasses,
        ...token.config.iconClasses,
      };
    }
  }

  /**
   * Show toast
   */
  show<ConfigPayload = any>(
    message?: string,
    title?: string,
    override: Partial<IndividualToastNotificationConfig<ConfigPayload>> = {},
    type = ''
  ): ActiveToast<any> | null {
    return this.preBuildNotification(
      type,
      message,
      title,
      this.applyConfig(override)
    );
  }

  /**
   * Show successful toast
   */
  success<ConfigPayload = any>(
    message?: string,
    title?: string,
    override: Partial<IndividualToastNotificationConfig<ConfigPayload>> = {}
  ): ActiveToast<any> | null {
    const type = this.ToastConfig.iconClasses.success || '';
    return this.preBuildNotification(
      type,
      message,
      title,
      this.applyConfig(override)
    );
  }

  /**
   * Show error toast
   */
  error<ConfigPayload = any>(
    message?: string,
    title?: string,
    override: Partial<IndividualToastNotificationConfig<ConfigPayload>> = {}
  ): ActiveToast<any> | null {
    const type = this.ToastConfig.iconClasses.error || '';
    return this.preBuildNotification(
      type,
      message,
      title,
      this.applyConfig(override)
    );
  }

  /**
   * Show info toast
   */
  info<ConfigPayload = any>(
    message?: string,
    title?: string,
    override: Partial<IndividualToastNotificationConfig<ConfigPayload>> = {}
  ): ActiveToast<any> | null {
    const type = this.ToastConfig.iconClasses.info || '';
    return this.preBuildNotification(
      type,
      message,
      title,
      this.applyConfig(override)
    );
  }
  

  /**
   * Show warning toast
   */
  warning<ConfigPayload = any>(
    message?: string,
    title?: string,
    override: Partial<IndividualToastNotificationConfig<ConfigPayload>> = {}
  ): ActiveToast<any> | null {
    const type = this.ToastConfig.iconClasses.warning || '';
    return this.preBuildNotification(
      type,
      message,
      title,
      this.applyConfig(override)
    );
  }

  /**
   * Remove all or a single toast by id
   */
  clear(toastId?: number): void {
    // Call every toastRef manualClose function
    for (const toast of this.toasts) {
      if (toastId !== undefined) {
        if (toast.toastId === toastId) {
          toast.toastRef.manualClose();
          return;
        }
      } else {
        toast.toastRef.manualClose();
      }
    }
  }
  
  /**
   * Remove and destroy a single toast by id
   */
  remove(toastId: number): boolean {
    const found = this._findToast(toastId);
    
    if (!found) {
      return false;
    }

    found.activeToast.toastRef.close();

    this.toasts.splice(found.index, 1);
    this.currentlyActive = this.currentlyActive - 1;

    if (!this.ToastConfig.maxOpened || !this.toasts.length) {
      return false;
    }

    if (
      this.currentlyActive < this.ToastConfig.maxOpened &&
      this.toasts[this.currentlyActive]
    ) {
      const toastRef = this.toasts[this.currentlyActive].toastRef;

      if (!toastRef.isInactive()) {
        this.currentlyActive = this.currentlyActive + 1;
        toastRef.activate();
      }
    }

    return true;
  }

  /**
   * Determines if toast message is already shown
   */
  findDuplicate(
    title = '',
    message = '',
    resetOnDuplicate: boolean,
    countDuplicates: boolean
  ): ActiveToast<any> | null {
    const { includeTitleDuplicates } = this.ToastConfig;

    for (const toast of this.toasts) {
      const hasDuplicateTitle = includeTitleDuplicates && toast.title === title;

      if (
        (!includeTitleDuplicates || hasDuplicateTitle) &&
        toast.message === message
      ) {
        toast.toastRef.onDuplicate(resetOnDuplicate, countDuplicates);

        return toast;
      }
    }

    return null;
  }

  /**
   * Create a clone of global config and apply individual settings
   */
  private applyConfig(override: Partial<IndividualToastNotificationConfig> = {}): GlobalToastNotificationConfig {
    return { ...this.ToastConfig, ...override };
  }

  /**
   * Find toast object by id
   */
  private _findToast(
    toastId: number
  ): { index: number; activeToast: ActiveToast<any> } | null {
    for (let i = 0; i < this.toasts.length; i++) {
      if (this.toasts[i].toastId === toastId) {
        return { index: i, activeToast: this.toasts[i] };
      }
    }

    return null;
  }

  /**
   * Determines the need to run inside angular's zone then builds the toast
   */
  private preBuildNotification(
    toastType: string,
    message: string | undefined,
    title: string | undefined,
    config: GlobalToastNotificationConfig
  ): ActiveToast<any> | null {
    if (config.onActivateTick) {
      return this.ngZone.run(() =>
        this.buildNotification(toastType, message, title, config)
      );
    }

    return this.buildNotification(toastType, message, title, config);
  }

  /**
   * Creates and attaches toast data to component
   * returns the active toast, or in case preventDuplicates is enabled the original/non-duplicate active toast.
   */
  private buildNotification(
    toastType: string,
    message: string | undefined,
    title: string | undefined,
    config: GlobalToastNotificationConfig
  ): ActiveToast<any> | null {
    if (!config.toastComponent) {
      throw new Error('ToastNotificationComponent required');
    }

    // max opened and auto dismiss = true
    // if timeout = 0 resetting it would result in setting this.hideTime = Date.now(). Hence, we only want to reset timeout if there is
    // a timeout at all
    const duplicate = this.findDuplicate(
      title,
      message,
      this.ToastConfig.resetTimeoutOnDuplicate && config.timeOut > 0,
      this.ToastConfig.countDuplicates
    );

    if (
      ((this.ToastConfig.includeTitleDuplicates && title) || message) &&
      this.ToastConfig.preventDuplicates &&
      duplicate !== null
    ) {
      return duplicate;
    }

    this.previousToastMessage = message;

    let keepInactive = false;

    if (
      this.ToastConfig.maxOpened &&
      this.currentlyActive >= this.ToastConfig.maxOpened
    ) {
      keepInactive = true;
      if (this.ToastConfig.autoDismiss) {
        this.clear(this.toasts[0].toastId);
      }
    }

    const overlayRef = this.overlayService.create(
      config.positionClass,
      this.overlayContainer
    );

    this.index = this.index + 1;

    let sanitizedMessage: string | undefined | null = message;

    if (message && config.enableHtml) {
      sanitizedMessage = this.sanitizer.sanitize(SecurityContext.HTML, message);
    }

    const toastRef = new ToastNotificationRef(overlayRef);

    const toastPackage = new ToastNotificationPackage(
      this.index,
      config,
      sanitizedMessage,
      title,
      toastType,
      toastRef
    );

    /** New injector that contains an instance of `ToastNotificationPackage`. */
    const providers = [{ provide: ToastNotificationPackage, useValue: toastPackage }];
    const toastInjector = Injector.create({
      providers,
      parent: this.injector,
    });

    const component = new ComponentPortal(config.toastComponent, toastInjector);
    const portal = overlayRef.attach(component, config.newestOnTop);
    toastRef.componentInstance = portal.instance;

    const toastInstance: ActiveToast<any> = {
      toastId: this.index,
      title: title || '',
      message: message || '',
      toastRef,
      onShown: toastRef.afterActivate(),
      onHidden: toastRef.afterClosed(),
      onTap: toastPackage.onTap(),
      onAction: toastPackage.onAction(),
      portal,
    };

    if (!keepInactive) {
      this.currentlyActive = this.currentlyActive + 1;

      setTimeout(() => {
        toastInstance.toastRef.activate();
      });
    }

    this.toasts.push(toastInstance);

    return toastInstance;
  }
}

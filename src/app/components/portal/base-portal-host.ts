import { ComponentRef } from '@angular/core';
import { ComponentPortal } from './component-portal';

/**
 * Partial implementation of PortalHost that only deals with attaching a
 * ComponentPortal
 */
export abstract class BasePortalHost {

  /**
   * The portal currently attached to the host.
   */
  private attachedPortal?: ComponentPortal<any>;

  /**
   * A function that will permanently dispose this host.
   */
  private disposeFn?: () => void;

  attach(
    portal: ComponentPortal<any>,
    newestOnTop: boolean
  ): ComponentRef<any> {
    this.attachedPortal = portal;
    return this.attachComponentPortal(portal, newestOnTop);
  }

  abstract attachComponentPortal<T>(
    portal: ComponentPortal<T>,
    newestOnTop: boolean
  ): ComponentRef<T>;

  detach(): void {
    if (this.attachedPortal) {
      this.attachedPortal.setAttachedHost();
    }

    this.attachedPortal = undefined;

    if (this.disposeFn && typeof this.disposeFn === 'function') {
      this.disposeFn();
      this.disposeFn = undefined;
    }
  }

  setDisposeFn(fn: () => void): void {
    this.disposeFn = fn;
  }
}

import { ComponentRef } from '@angular/core';
import { BasePortalHost } from '../../portal/base-portal-host';
import { ComponentPortal } from '../../portal/component-portal';

/**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
export class OverlayRef {
  constructor(private portalHost: BasePortalHost) {}

  attach(
    portal: ComponentPortal<any>,
    newestOnTop: boolean = true
  ): ComponentRef<any> {
    return this.portalHost.attach(portal, newestOnTop);
  }

  /**
   * Detaches an overlay from a portal.
   * @returns Resolves when the overlay has been detached.
   */
  detach() {
    return this.portalHost.detach();
  }
}

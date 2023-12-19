import { ComponentRef, Injector, ViewContainerRef } from '@angular/core';
import { BasePortalHost } from './base-portal-host';

export interface ComponentType<T> {
  new (...args: any[]): T;
}

/**
 * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
 */
export class ComponentPortal<T> {
  private attachedHost?: BasePortalHost;
  /**
   * The type of the component that will be instantiated for attachment.
   */
  component: ComponentType<T>;

  /**
   * [Optional] Where the attached component should live in Angular's *logical* component tree.
   * This is different from where the component *renders*, which is determined by the PortalHost.
   * The origin necessary when the host is outside of the Angular application context.
   */
  viewContainerRef!: ViewContainerRef;

  /**
   * Injector used for the instantiation of the component.
   */
  injector: Injector;

  constructor(component: ComponentType<T>, injector: Injector) {
    this.component = component;
    this.injector = injector;
  }

  /** Attach this portal to a host. */
  attach(host: BasePortalHost, newestOnTop: boolean): ComponentRef<any> {
    this.attachedHost = host;
    return host.attach(this, newestOnTop);
  }

  /** Detach this portal from its host */
  detach(): void {
    const host = this.attachedHost;

    if (host) {
      this.attachedHost = undefined;
      return host.detach();
    }
  }

  /** Whether this portal is attached to a host. */
  get isAttached(): boolean {
    return this.attachedHost !== null;
  }

  /**
   * Sets the PortalHost reference without performing `attach()`. This is used directly by
   * the PortalHost when it is performing an `attach()` or `detach()`.
   */
  setAttachedHost(host?: BasePortalHost): void {
    this.attachedHost = host;
  }
}

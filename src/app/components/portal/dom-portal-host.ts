import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
} from '@angular/core';
import { BasePortalHost } from './base-portal-host';
import { ComponentPortal } from './component-portal';

/**
 * A PortalHost for attaching portals to an arbitrary DOM element outside of the Angular
 * application context.
 *
 * This is the only part of the portal core that directly touches the DOM.
 */
export class DomPortalHost extends BasePortalHost {
  constructor(
    private hostDomElement: Element,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef
  ) {
    super();
  }

  /**
   * Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver.
   * @param portal Portal to be attached
   */
  attachComponentPortal<T>(
    portal: ComponentPortal<T>,
    newestOnTop: boolean
  ): ComponentRef<T> {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(portal.component);
    let componentRef: ComponentRef<T>;

    // If the portal specifies a ViewContainerRef, we will use that as the attachment point
    // for the component (in terms of Angular's component tree, not rendering).
    // When the ViewContainerRef is missing, we use the factory to create the component directly
    // and then manually attach the ChangeDetector for that component to the application (which
    // happens automatically when using a ViewContainer).
    componentRef = componentFactory.create(portal.injector);

    // When creating a component outside of a ViewContainer, we need to manually register
    // its ChangeDetector with the application. This API is unfortunately not yet published
    // in Angular core. The change detector must also be deregistered when the component
    // is destroyed to prevent memory leaks.
    this.appRef.attachView(componentRef.hostView);

    this.setDisposeFn(() => {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    });

    // At this point the component has been instantiated, so we move it to the location in the DOM
    // where we want it to be rendered.
    if (newestOnTop) {
      this.hostDomElement.insertBefore(
        this.getComponentRootNode(componentRef),
        this.hostDomElement.firstChild
      );
    } else {
      this.hostDomElement.appendChild(this.getComponentRootNode(componentRef));
    }

    return componentRef;
  }

  /** Gets the root HTMLElement for an instantiated component. */
  private getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
    return (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
  }
}

import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  Inject,
  Injectable,
} from '@angular/core';

import { DomPortalHost } from '../../portal/dom-portal-host';
import { ToastNotificationContainerDirective } from '../toast-notification.directive';
import { OverlayContainerService } from './overlay-container.service';
import { OverlayRef } from './overlay-ref';

/**
 * Service to create Overlays. Overlays are dynamically added pieces of floating UI, meant to be
 * used as a low-level building building block for other components. Dialogs, tooltips, menus,
 * selects, etc. can all be built using overlays. The service should primarily be used by authors
 * of re-usable components rather than developers building end-user applications.
 *
 * An overlay *is* a PortalHost, so any kind of Portal can be loaded into one.
 */
@Injectable({ providedIn: 'root' })
export class OverlayService {
  // Namespace panes by overlay container
  private paneElements: Map<
    ToastNotificationContainerDirective,
    Record<string, HTMLElement>
  > = new Map();

  constructor(
    private overlayContainerService: OverlayContainerService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  /**
   * Creates an overlay.
   * @returns A reference to the created overlay.
   */
  create(
    positionClass?: string,
    overlayContainer?: ToastNotificationContainerDirective
  ): OverlayRef {
    // get existing pane if possible
    return this.createOverlayRef(
      this.getPaneElement(positionClass, overlayContainer)
    );
  }

  getPaneElement(
    positionClass: string = '',
    overlayContainer?: ToastNotificationContainerDirective
  ): HTMLElement {
    if (!this.paneElements.get(overlayContainer as ToastNotificationContainerDirective)) {
      this.paneElements.set(overlayContainer as ToastNotificationContainerDirective, {});
    }

    if (
      !this.paneElements.get(overlayContainer as ToastNotificationContainerDirective)![
        positionClass
      ]
    ) {
      this.paneElements.get(overlayContainer as ToastNotificationContainerDirective)![
        positionClass
      ] = this._createPaneElement(positionClass, overlayContainer);
    }

    return this.paneElements.get(overlayContainer as ToastNotificationContainerDirective)![
      positionClass
    ];
  }

  /**
   * Creates the DOM element for an overlay and appends it to the overlay container.
   * @returns Newly-created pane element
   */
  private _createPaneElement(
    positionClass: string,
    overlayContainer?: ToastNotificationContainerDirective
  ): HTMLElement {
    const pane = this.document.createElement('div');

    pane.id = 'toast-container';
    pane.classList.add(positionClass);
    pane.classList.add('toast-container');

    if (!overlayContainer) {
      this.overlayContainerService.getContainerElement().appendChild(pane);
    } else {
      overlayContainer.getContainerElement().appendChild(pane);
    }

    return pane;
  }

  /**
   * Create a DomPortalHost into which the overlay content can be loaded.
   * @param pane The DOM element to turn into a portal host.
   * @returns A portal host for the given DOM element.
   */
  private _createPortalHost(pane: HTMLElement): DomPortalHost {
    return new DomPortalHost(pane, this.componentFactoryResolver, this.appRef);
  }

  /**
   * Creates an OverlayRef for an overlay in the given DOM element.
   * @param pane DOM element for the overlay
   */
  private createOverlayRef(pane: HTMLElement): OverlayRef {
    return new OverlayRef(this._createPortalHost(pane));
  }
}

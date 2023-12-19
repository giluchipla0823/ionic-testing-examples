import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy } from '@angular/core';

/** Container inside which all toasts will render. */
@Injectable({ providedIn: 'root' })
export class OverlayContainerService implements OnDestroy {
  protected containerElement!: HTMLElement;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnDestroy() {
    if (this.containerElement && this.containerElement.parentNode) {
      this.containerElement.parentNode.removeChild(this.containerElement);
    }
  }

  /**
   * This method returns the overlay container element. It will lazily
   * create the element the first time  it is called to facilitate using
   * the container in non-browser environments.
   * @returns the container element
   */
  getContainerElement(): HTMLElement {
    if (!this.containerElement) {
      this._createContainer();
    }
    return this.containerElement;
  }

  /**
   * Create the overlay container element, which is simply a div
   * with the 'cdk-overlay-container' class on the document body
   * and 'aria-live="polite"'
   */
  protected _createContainer(): void {
    const container = this.document.createElement('div');
    container.classList.add('overlay-container');
    container.setAttribute('aria-live', 'polite');
    this.document.body.appendChild(container);
    this.containerElement = container;
  }
}

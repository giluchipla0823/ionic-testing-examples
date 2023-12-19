import { Observable, Subject } from 'rxjs';
import { OverlayRef } from '../overlay/overlay-ref';

/**
 * Reference to a toast opened via the ToastNotificationService.
 */
export class ToastNotificationRef<T> {
  /** The instance of component opened into the toast. */
  componentInstance!: T;

  /** Count of duplicates of this toast */
  private duplicatesCount = 0;

  /** Subject for notifying the user that the toast has finished closing. */
  private afterClosed$ = new Subject<void>();

  /** triggered when toast is activated */
  private activate$ = new Subject<void>();

  /** notifies the toast that it should close before the timeout */
  private manualClose$ = new Subject<void>();

  /** notifies the toast that it should reset the timeouts */
  private resetTimeout$ = new Subject<void>();

  /** notifies the toast that it should count a duplicate toast */
  private countDuplicate$ = new Subject<number>();

  constructor(private overlayRef: OverlayRef) {}

  manualClose(): void {
    this.manualClose$.next();
    this.manualClose$.complete();
  }

  manualClosed(): Observable<any> {
    return this.manualClose$.asObservable();
  }

  timeoutReset(): Observable<any> {
    return this.resetTimeout$.asObservable();
  }

  countDuplicate(): Observable<number> {
    return this.countDuplicate$.asObservable();
  }

  /**
   * Close the toast.
   */
  close(): void {
    this.overlayRef.detach();
    this.afterClosed$.next();
    this.manualClose$.next();
    this.afterClosed$.complete();
    this.manualClose$.complete();
    this.activate$.complete();
    this.resetTimeout$.complete();
    this.countDuplicate$.complete();
  }

  /** Gets an observable that is notified when the toast is finished closing. */
  afterClosed(): Observable<any> {
    
    return this.afterClosed$.asObservable();
  }

  isInactive(): boolean {
    return this.activate$.isStopped;
  }

  activate(): void {
    this.activate$.next();
    this.activate$.complete();
  }

  /** Gets an observable that is notified when the toast has started opening. */
  afterActivate(): Observable<any> {

    return this.activate$.asObservable();
  }

  /** Reset the toast timouts and count duplicates */
  onDuplicate(resetTimeout: boolean, countDuplicate: boolean): void {
    if (resetTimeout) {
      this.resetTimeout$.next();
    }
    
    if (countDuplicate) {
      this.countDuplicate$.next(++this.duplicatesCount);
    }
  }
}

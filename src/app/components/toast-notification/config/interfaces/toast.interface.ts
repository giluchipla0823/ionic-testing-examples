import { ComponentType } from "../../../portal/component-portal";
import { ToastProgressAnimation } from "../enums/toast.enum";
import { DisableTimoutType, ToastIconClasses } from "../types/toast.type";

/**
 * Configuration for an individual toast.
 */
export interface IndividualToastNotificationConfig<ConfigPayload = any> {
    /**
     * disable both timeOut and extendedTimeOut
     * default: false
     */
    disableTimeOut: DisableTimoutType;
  
    /**
     * toast time to live in milliseconds
     * default: 5000
     */
    timeOut: number;
  
    /**
     * toast show close button
     * default: false
     */
    closeButton: boolean;
  
    /**
     * time to close after a user hovers over toast
     * default: 1000
     */
    extendedTimeOut: number;
  
    /**
     * show toast progress bar
     * default: false
     */
    progressBar: boolean;
  
    /**
     * changes toast progress bar animation
     * default: decreasing
     */
    progressAnimation: ToastProgressAnimation;
  
    /**
     * render html in toast message (possibly unsafe)
     * default: false
     */
    enableHtml: boolean;
  
    /**
     * css class on toast component
     * default: street-toast
     */
    toastClass: string;
  
    /**
     * css class on toast container
     * default: toast-top-right
     */
    positionClass: string;
  
    /**
     * css class on toast title
     * default: toast-title
     */
    titleClass: string;
  
    /**
     * css class on toast message
     * default: toast-message
     */
    messageClass: string;
  
    /**
     * animation easing on toast
     * default: ease-in
     */
    easing: string;
  
    /**
     * animation ease time on toast
     * default: 300
     */
    easeTime: string | number;
  
    /**
     * clicking on toast dismisses it
     * default: false
     */
    tapToDismiss: boolean;
  
    /**
     * Angular toast component to be shown
     * default: Toast
     */
    toastComponent?: ComponentType<any>;
  
    /**
     * Helps show toast from a websocket or from event outside Angular
     * default: false
     */
    onActivateTick: boolean;
  
    /**
     * New toast placement
     * default: true
     */
    newestOnTop: boolean;
  
    /**
     * Payload to pass to the toast component
     */
    payload?: ConfigPayload;
}
  
  
/**
 * Global Toast configuration
 * Includes all IndividualToastNotificationConfig
 */
export interface GlobalToastNotificationConfig extends IndividualToastNotificationConfig {
    /**
     * max toasts opened. Toasts will be queued
     * Zero is unlimited
     * default: 0
     */
    maxOpened: number;

    /**
     * dismiss current toast when max is reached
     * default: false
     */
    autoDismiss: boolean;

    iconClasses: Partial<ToastIconClasses>;

    /**
     * block duplicate messages
     * default: false
     */
    preventDuplicates: boolean;

    /**
     * display the number of duplicate messages
     * default: false
     */
    countDuplicates: boolean;

    /**
     * Reset toast timeout when there's a duplicate (preventDuplicates needs to be set to true)
     * default: false
     */
    resetTimeoutOnDuplicate: boolean;

    /**
     * consider the title of a toast when checking if duplicate
     * default: false
     */
    includeTitleDuplicates: boolean;
}


export interface ToastToken {
    default: GlobalToastNotificationConfig;
    config: Partial<GlobalToastNotificationConfig>;
}
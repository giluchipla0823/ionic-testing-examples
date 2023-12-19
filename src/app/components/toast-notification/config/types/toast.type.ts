import { Observable } from "rxjs";
import { ToastNotificationRef } from "../../config/toast-ref";
import { ComponentRef } from "@angular/core";
import { ToastDisableTimeOut } from "../enums/toast.enum";

export type ActiveToast<C> = {
    toastId: number;
    title: string;
    message: string;
    portal: ComponentRef<C>;
    toastRef: ToastNotificationRef<C>;
    onShown: Observable<void>;
    onHidden: Observable<void>;
    onTap: Observable<void>;
    onAction: Observable<any>;
}

// export type ProgressAnimationType = 'increasing' | 'decreasing';

export type DisableTimoutType = boolean | ToastDisableTimeOut;

export type ToastIconClasses = {
    error: string;
    info: string;
    success: string;
    warning: string;
    [key: string]: string;
}
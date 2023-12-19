import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class SyncService {

    private _displayRequiredSync$ = new BehaviorSubject<boolean>(false);

    get displayRequiredSync$(): Observable<boolean> {
        return this._displayRequiredSync$.asObservable();
    }

    set displayRequiredSync$(value: any) {
        this._displayRequiredSync$.next(value);
    }

    sync()  {
        setTimeout(() => {
            this.displayRequiredSync$ = true;
        }, 1000);
    }
}
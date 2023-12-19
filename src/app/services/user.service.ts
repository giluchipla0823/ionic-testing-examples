import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  StorageApiService,
  ApiCacheResponse,
} from './storage/storage-api.service';
import { ToastController } from '@ionic/angular';
import { Network } from '@capacitor/network';

import {
  RandomUserResponse,
  UserCacheResponse,
} from './../pages/storage-cache-api/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private connected: boolean = true;

  constructor(
    private http: HttpClient,
    private storageApiService: StorageApiService,
    private toastController: ToastController
  ) {
    Network.addListener('networkStatusChange', (status) => {
      this.connected = status.connected;
    });

    this.toastController.create({ animated: false }).then((toast) => {
      toast.present();
      toast.dismiss();
    });
  }

  getUsers(forceRefresh: boolean): Observable<UserCacheResponse> {
    const url = 'https://randomuser.me/api?results=10';

    return this.getData(url, forceRefresh).pipe(
      map((res) => {
        return {
          expiredAt: res?.expiredAt,
          data: res?.data?.results || [],
          createdAt: res?.createdAt,
        };
      })
    );
  }

  private getData(url: string, forceRefresh: boolean = false) {
    if (!this.connected) {
      this.toastController
        .create({
          message: 'You are viewing offline data.',
          duration: 2000,
        })
        .then((toast) => toast.present());

      return from(this.storageApiService.get<RandomUserResponse>(url));
    }

    if (forceRefresh) {
      return this.callAndCache(url);
    }

    return from(this.storageApiService.get<RandomUserResponse>(url)).pipe(
      switchMap((result) => {
        if (!result) {
          return this.callAndCache(url);
        }

        return of(result);
      })
    );
  }

  private callAndCache(
    url: string
  ): Observable<ApiCacheResponse<RandomUserResponse>> {
    return this.http.get<RandomUserResponse>(url).pipe(
      tap((res) => this.storageApiService.set(url, res)),
      map((res) => {
        return {
          expiredAt: null,
          createdAt: null,
          data: res,
        };
      })
    );
  }
}

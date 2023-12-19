import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { StorageApiService } from 'src/app/services/storage/storage-api.service';
import { User } from './user.type';

@Component({
  selector: 'app-storage-cache-api',
  templateUrl: './storage-cache-api.page.html',
  styleUrls: ['./storage-cache-api.page.scss'],
})
export class StorageCacheApiPage implements OnInit {
  users: Array<User> = [];
  cacheCreatedAt!: number | null | undefined;

  constructor(
    private userService: UserService,
    private storageApiService: StorageApiService,
    private loadingController: LoadingController
  ) {
    this.loadingController.create({ animated: false }).then((loading) => {
      loading.present();
      loading.dismiss();
    });
  }

  async ngOnInit() {
    this.refreshUsers(true);
  }

  async refreshUsers(forceRefresh: boolean) {
    // const loading = await this.loadingController.create({
    //   message: 'Loading data...',
    // });

    // await loading.present();

    this.userService
      .getUsers(forceRefresh)
      // .pipe(finalize(() => loading.dismiss()))
      .subscribe((res) => {
        // console.log(JSON.stringify(res));
        this.users = res.data;
        this.cacheCreatedAt = res?.createdAt;
      });
  }

  clearData(): void {
    this.users = [];
  }

  clearCache(): void {
    this.storageApiService.clear();
  }
}

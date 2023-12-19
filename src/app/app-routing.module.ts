import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'storage-api',
    loadChildren: () =>
      import('./pages/storage-cache-api/storage-cache-api.module').then(
        (m) => m.StorageCacheApiPageModule
      ),
  },
  {
    path: 'split-pane-demo',
    loadChildren: () => import('./pages/split-pane-demo/split-pane-demo.module').then( m => m.SplitPaneDemoPageModule)
  },
  {
    path: 'toast-examples',
    loadChildren: () => import('./pages/toast-examples/toast-examples.module').then( m => m.ToastExamplesPageModule)
  },
  {
    path: 'example-animation',
    loadChildren: () => import('./pages/example-animation/example-animation.module').then( m => m.ExampleAnimationPageModule)
  },
  {
    path: 'parallax-animation',
    loadChildren: () => import('./pages/parallax-animation/parallax-animation.module').then( m => m.ParallaxAnimationPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

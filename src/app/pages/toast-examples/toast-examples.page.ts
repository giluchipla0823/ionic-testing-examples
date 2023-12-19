import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ActiveToast } from 'src/app/components/toast-notification/config/types/toast.type';
import { ToastNotificationService } from 'src/app/components/toast-notification/toast-notification.service';
import { ToastTemplateCustomComponent } from 'src/app/components/toast-template-custom/toast-template-custom.component';
import { SyncService } from 'src/app/services/sync.service';

@Component({
  selector: 'app-toast-examples',
  templateUrl: './toast-examples.page.html',
  styleUrls: ['./toast-examples.page.scss'],
})
export class ToastExamplesPage implements OnInit {

  @ViewChild('actionsTemplate', { static: false, read: TemplateRef }) actionsTemplate: TemplateRef<any>
  @ViewChild('toastUsers', { static: false, read: TemplateRef }) toastUsersTemplate: TemplateRef<any>
  @ViewChild('usersModal') usersModal: IonModal;


  private activeToasts: Array<ActiveToast<any>> = [];

  constructor(
    private toastNotificationService: ToastNotificationService,
    private vcr: ViewContainerRef,
    private syncService: SyncService
  ) { }

  ngOnInit() {
  
  }

  sync() {

    const message = 'Tenemos nuevos usuarios para contactar.';

    this.showToastUsersUsingNgTemplate({ message, buttonText: 'VER USUARIOS' });
    this.showToastUsersUsingNgTemplate({ message, buttonText: 'VER PERSONAS' });
  }

  sync2() {
    const message = 'Tenemos nuevos usuarios para contactar.';
    this.showToastUsersUsingNgTemplate({ message, buttonText: 'VER PERSONAS' });
  }

  handleToastUsingNgTemplate() {
    this.showToastUsersUsingNgTemplate({ message: 'Toast creado usando ng-template.', buttonText: 'VER MÁS' });
  }

  handleToastUsingDynamicComponent() {
    this.showToastUsersUsingDynamicComponent({ message: 'Toast creado usando dynamic component.', buttonText: 'VER MÁS' });
  }

  handleToastUsingDynamicComponentWithTemplate() {
    this.showToastUsersUsingDynamicComponent({ message: 'Toast creado usando dynamic component y con template de acciones de botones.', buttonText: 'VER MÁS',  actionsTemplate: this.actionsTemplate });
  }

  // Tenemos nuevos usuarios para contactar.
  showToastUsersUsingNgTemplate({ message, buttonText }) {
     const ref = this.vcr.createEmbeddedView(this.toastUsersTemplate, { message, buttonText });
    ref.detectChanges();

    const toast = this.toastNotificationService.warning(
     '<div class="toast-template-message"></div>',
      '',
      {
        disableTimeOut: true,
        closeButton: true,
        enableHtml: true,
      }
    );

    this.activeToasts.push(toast);

    const toastEl = toast.portal.location.nativeElement as HTMLElement;

    toast.toastRef.afterActivate().subscribe(() => {
      const el = toastEl.querySelector('.toast-template-message');

      el.append(ref.rootNodes[0])
    })
  }

  showToastUsersUsingDynamicComponent({ message, buttonText, actionsTemplate = null }) {
    const ref = this.vcr.createComponent(ToastTemplateCustomComponent);

    ref.instance.buttonText = buttonText;
    ref.instance.message = message;

    if (actionsTemplate) {
      ref.instance.actionsTemplate = this.actionsTemplate;
    }

    ref.changeDetectorRef.detectChanges();

    const toast = this.toastNotificationService.warning(
     '<div class="toast-template-message"></div>',
      '',
      {
        disableTimeOut: true,
        closeButton: true,
        enableHtml: true,
      }
    );

    this.activeToasts.push(toast);

    const toastEl = toast.portal.location.nativeElement as HTMLElement;

    toast.toastRef.afterActivate().subscribe(() => {
      const el = toastEl.querySelector('.toast-template-message');

      el.append(ref.location.nativeElement)
    })

    ref.instance.handleClick.subscribe(() => {
      this.openModal();
    })
  }

  showToastWarning(): void {
    this.toastNotificationService.warning(
      'Este cliente tiene una actividad iniciada sin terminar desde el <strong>06/06/2023</strong>. Antes de empezar con una actividad debes terminar la actual.<a><strong>ABRIR MODAL</strong></a>',
      '',
      {
        disableTimeOut: true,
        closeButton: true,
        enableHtml: true,
      }
    );
  }

  showToastSuccess(): void {
    this.toastNotificationService.success(
      'Este cliente tiene una actividad iniciada sin terminar desde el <strong>06/06/2023</strong>. Antes de empezar con una actividad debes terminar la actual.',
      '',
      {
        closeButton: true,
        enableHtml: true,
        // progressBar: true
      }
    );
  }

  showToastError(): void {
    this.toastNotificationService.error(
      'Este cliente tiene una actividad iniciada sin terminar desde el <strong>06/06/2023</strong>. Antes de empezar con una actividad debes terminar la actual.',
      '',
      {
        closeButton: true,
        enableHtml: true,
        // progressBar: true
      }
    );
  }

  showToastInfo(): void {
    this.toastNotificationService.info(
      'Este cliente tiene una actividad iniciada sin terminar desde el <strong>06/06/2023</strong>. Antes de empezar con una actividad debes terminar la actual.',
      '',
      {
        timeOut: 100000000,
        closeButton: true,
        enableHtml: true,
        // progressBar: true
      }
    );

    
  }

  openModal(): void {
    this.activeToasts.forEach(({ toastRef }) => toastRef.manualClose());

    this.usersModal.present();
  }


  openToastDetails(): void {
    console.log('ACTION - ON TOAST DETAILS');

    this.openModal();
  }

  onReadAfter(): void {
    console.log('ACTION - ON READ AFTER');

    this.activeToasts.forEach(({ toastRef }) => toastRef.manualClose());
  }

}

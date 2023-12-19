import { Component, Input, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';


@Component({
  selector: 'app-toast-template-custom',
  templateUrl: './toast-template-custom.component.html',
  styleUrls: ['./toast-template-custom.component.scss']
})
export class ToastTemplateCustomComponent implements OnInit {

  @Input() buttonText: string;
  @Input() message: string;
  @Input() actionsTemplate: TemplateRef<any>

  @Output() handleClick = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onHandleClick() {
    this.handleClick.emit();
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ModalAttrs, Part } from 'src/app/models/part.model';

const MODAL_TITLE = {
  confirmDelete: {
    title: 'Delete',
    message: `Are you sure you want to delete?`,
  },
};

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.less'],
})
export class DialogComponent implements OnInit {
  @Input()
  type!: 'confirmDelete';

  modalAttrs!: ModalAttrs;

  constructor(protected ref: NbDialogRef<DialogComponent>) {}

  ngOnInit(): void {
    this.modalAttrs = MODAL_TITLE[this.type];
  }

  confirm() {
    this.ref.close(true);
  }
  reject() {
    this.ref.close(false);
  }
}

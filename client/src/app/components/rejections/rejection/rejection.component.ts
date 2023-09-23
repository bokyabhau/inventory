import { Component, OnDestroy, OnInit, Input, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { Rejection } from 'src/app/models/rejection.model';
import {
  DeleteRejectionActionStart,
  EditRejectionActionStart,
} from 'src/app/store/rejection/rejection.actions';
import { selectEditRejectionLoading } from 'src/app/store/rejection/rejection.selectors';
import { AppState } from 'src/app/store/store';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-rejection',
  templateUrl: './rejection.component.html',
  styleUrls: ['./rejection.component.less'],
})
export class RejectionComponent implements OnInit, OnDestroy {
  @Input() rejection!: Rejection;

  private store = inject(Store<AppState>);
  private dialog = inject(NbDialogService);

  editing = false;
  loading = false;

  loading$ = this.store
    .select(selectEditRejectionLoading)
    .subscribe((isLoading: boolean) => {
      this.loading = isLoading;
      if (!isLoading) {
        this.editing = false;
      }
    });

  rejectionForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.rejectionForm.setValue({ name: this.rejection.name });
  }

  update() {
    const updatedRejection: Rejection = {
      ...this.rejection,
      ...(this.rejectionForm.value as Rejection),
    };

    this.store.dispatch(
      EditRejectionActionStart({ rejection: updatedRejection })
    );
  }

  deleteRejection() {
    const dialogSubscription = this.dialog
      .open(DialogComponent, {
        hasBackdrop: true,
        context: {
          type: 'confirmDelete',
        },
      })
      .onClose.subscribe((confirm) => {
        if (confirm) {
          this.store.dispatch(
            DeleteRejectionActionStart({ rejection: this.rejection })
          );
        }
        dialogSubscription.unsubscribe();
      });
  }

  ngOnDestroy(): void {
    this.loading$.unsubscribe();
  }
}

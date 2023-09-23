import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Part } from '../../../models/part.model';
import { AppState } from '../../../store/store';
import {
  DeletePartActionStart,
  UpdatePartActionStart,
} from 'src/app/store/part/part.actions';
import { selectEditPartLoading } from 'src/app/store/part/part.selectors';
import { NbDialogService } from '@nebular/theme';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.less'],
})
export class PartComponent implements OnInit, OnDestroy {
  @Input() part!: Part;
  editing = false;
  loading = false;
  loading$ = this.store.select(selectEditPartLoading).subscribe((isLoading) => {
    this.loading = isLoading;
    if (!isLoading) {
      this.editing = false;
    }
  });

  partForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    private store: Store<AppState>,
    private dialog: NbDialogService
  ) {}

  ngOnInit(): void {
    this.partForm.setValue({ name: this.part.name });
  }

  update() {
    const updatedPart: Part = {
      ...this.part,
      ...(this.partForm.value as Part),
    };

    this.store.dispatch(UpdatePartActionStart({ part: updatedPart }));
  }

  deletePart() {
    const dialogSubscription = this.dialog
      .open(DialogComponent, {
        hasBackdrop: true,
        context: {
          type: 'confirmDelete',
        },
      })
      .onClose.subscribe((confirm) => {
        if (confirm) {
          this.store.dispatch(DeletePartActionStart({ part: this.part }));
        }
        dialogSubscription.unsubscribe();
      });
  }

  ngOnDestroy(): void {
    this.loading$.unsubscribe();
  }
}

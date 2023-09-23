import { Component, inject } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Part } from 'src/app/models/part.model';
import { AppState } from 'src/app/store/store';
import {
  selectFilteredRejections,
  selectRejectionStateLoading,
} from 'src/app/store/rejection/rejection.selectors';
import {
  GetRejectionsActionStart,
  SetRejectionStateQuery,
} from 'src/app/store/rejection/rejection.actions';
import { AddModalComponent } from '../add-modal/add-modal.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rejections',
  templateUrl: './rejections.component.html',
  styleUrls: ['./rejections.component.less'],
})
export class RejectionsComponent {
  query = '';
  private store = inject(Store<AppState>);
  private dialog = inject(NbDialogService);
  rejections$: Observable<Part[]> = this.store.select(selectFilteredRejections);
  loading = false;
  rejectionsLoading$ = this.store
    .select(selectRejectionStateLoading)
    .subscribe((value) => (this.loading = value));

  queryForm = new FormGroup({
    query: new FormControl(''),
  });

  ngOnInit(): void {
    this.store.dispatch(GetRejectionsActionStart());
  }

  ngOnDestroy(): void {
    this.rejectionsLoading$.unsubscribe();
  }

  handleChange() {
    this.store.dispatch(
      SetRejectionStateQuery({ query: this.queryForm.value.query || '' })
    );
  }

  clear() {
    this.queryForm.setValue({ query: '' });
    this.store.dispatch(SetRejectionStateQuery({ query: '' }));
  }

  addRejection() {
    this.dialog.open(AddModalComponent, { context: { type: 'rejection' } });
  }
}

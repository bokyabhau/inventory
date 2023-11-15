import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectRecordStateLoading,
  selectRecordStateRecords,
} from 'src/app/store/record/record.selectors';
import { AppState } from 'src/app/store/store';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.less'],
})
export class RecordListComponent {
  private store = inject(Store<AppState>);
  records$ = this.store.select(selectRecordStateRecords);
  loading!: boolean;
  loading$ = this.store
    .select(selectRecordStateLoading)
    .subscribe((loading) => {
      if (typeof this.loading === 'undefined' && this.loading !== loading)
        this.loading = loading;
    });
}

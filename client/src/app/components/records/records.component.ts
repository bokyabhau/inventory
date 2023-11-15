import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NbGetters,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
} from '@nebular/theme';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { PartRejections } from 'src/app/models/rejection.model';
import { GetRecordsActionStart } from 'src/app/store/record/record.actions';
import { Record } from 'src/app/store/record/record.config';
import { selectRecordStateRecords } from 'src/app/store/record/record.selectors';
import { AppState } from 'src/app/store/store';

type FSEntry = {
  name: string;
  size: string;
  kind: string;
  items?: number;
  childEntries?: FSEntry[];
  expanded?: boolean;
};

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.less'],
})
export class RecordsComponent implements OnInit, OnDestroy {
  columns = [
    'part',
    'rejections',
    'loadNumber',
    'numberOfParts',
    'numberOfRejections',
    'shift',
  ];
  source!: NbTreeGridDataSource<FSEntry>;
  subscription!: Subscription;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
    private store: Store<AppState>
  ) {
    const getters: NbGetters<FSEntry, FSEntry> = {
      dataGetter: (node: FSEntry) => node,
      childrenGetter: (node: FSEntry) => node.childEntries || [],
      expandedGetter: (node: FSEntry) => !!node.expanded,
    };
    this.subscription = this.store
      .select(selectRecordStateRecords)
      .subscribe((records) => {
        const data = records as unknown;
        console.log(data);
        this.source = this.dataSourceBuilder.create(data as FSEntry[], getters);
      });
  }

  ngOnInit(): void {
    this.store.dispatch(GetRecordsActionStart());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

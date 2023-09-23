import { TitleCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Part } from 'src/app/models/part.model';
import { Rejection } from 'src/app/models/rejection.model';
import {
  GetAllPartsActionStart,
  SetPartsStateQuery,
} from 'src/app/store/part/part.actions';
import { selectPartStateFilteredParts } from 'src/app/store/part/part.selectors';
import {
  GetRejectionsActionStart,
  SetRejectionStateQuery,
} from 'src/app/store/rejection/rejection.actions';
import { selectFilteredRejections } from 'src/app/store/rejection/rejection.selectors';
import { AppState } from 'src/app/store/store';

const SHIFTS = [
  { id: 1, title: '8am to 8pm' },
  { id: 2, title: '8pm to 8am' },
];

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.less'],
})
export class DataEntryComponent implements OnInit {
  dataEntryForm = new FormGroup({
    partName: new FormControl(''),
    rejectionName: new FormControl(''),
  });

  private store = inject(Store<AppState>);
  filteredParts$ = this.store.select(selectPartStateFilteredParts);
  filteredRejections$ = this.store.select(selectFilteredRejections);
  currentDate = moment().format('LL');
  shift!: { id: number; title: string };

  ngOnInit(): void {
    this.store.dispatch(GetAllPartsActionStart());
    this.store.dispatch(GetRejectionsActionStart());
    this.store.dispatch(SetPartsStateQuery({ query: '' }));
    this.store.dispatch(SetRejectionStateQuery({ query: '' }));

    const hour = moment().hour();
    this.shift = hour >= 8 || hour < 21 ? SHIFTS[0] : SHIFTS[1];

    // this.filteredParts$.subscribe(console.log);
    // this.filteredRejections$.subscribe(console.log);
  }

  filterParts() {
    this.store.dispatch(
      SetPartsStateQuery({ query: this.dataEntryForm.value.partName || '' })
    );
  }
  filterRejections() {
    this.store.dispatch(
      SetRejectionStateQuery({
        query: this.dataEntryForm.value.rejectionName || '',
      })
    );
  }

  onPartSelected(part: Part) {
    console.log(part);
    // this.selectedPart = part;
  }
  onRejectionSelected(rejection: Rejection) {
    console.log(rejection);
    // this.selectedRejection = rejection;
  }

  viewPart(part: Part) {
    return part.name;
  }

  viewRejection(rejection: Rejection) {
    return rejection.name;
  }
}

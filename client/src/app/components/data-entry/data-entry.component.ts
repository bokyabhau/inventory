import { TitleCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Part, Shift } from 'src/app/models/part.model';
import { PartRejections, Rejection } from 'src/app/models/rejection.model';
import {
  GetAllPartsActionStart,
  SetPartsStateQuery,
} from 'src/app/store/part/part.actions';
import { selectPartStateFilteredParts } from 'src/app/store/part/part.selectors';
import { AddRecordActionStart } from 'src/app/store/record/record.actions';
import { RecordDto } from 'src/app/store/record/record.config';
import {
  GetRejectionsActionStart,
  SetRejectionStateQuery,
} from 'src/app/store/rejection/rejection.actions';
import { selectFilteredRejections } from 'src/app/store/rejection/rejection.selectors';
import { AppState } from 'src/app/store/store';

const SHIFTS: Shift[] = [
  { id: 1, title: '8am to 8pm' },
  { id: 2, title: '8pm to 8am' },
];

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.less'],
})
export class DataEntryComponent implements OnInit {
  currentDate = moment().format('LL');
  part!: Part;
  partRejections: PartRejections[] = [];
  dataEntryForm = new FormGroup({
    partName: new FormControl<Part | null>(null),
    rejectionName: new FormControl<Rejection | null>(null),
    rejectionNumber: new FormControl(),
    date: new FormControl(this.currentDate),
    shift: new FormControl<Shift>(this.getShift()),
    loadNumber: new FormControl(),
    numberOfParts: new FormControl(),
  });

  private store = inject(Store<AppState>);
  filteredParts$ = this.store.select(selectPartStateFilteredParts);
  filteredRejections$ = this.store.select(selectFilteredRejections);

  shift!: { id: number; title: string };

  ngOnInit(): void {
    this.store.dispatch(GetAllPartsActionStart());
    this.store.dispatch(GetRejectionsActionStart());
    this.store.dispatch(SetPartsStateQuery({ query: '' }));
    this.store.dispatch(SetRejectionStateQuery({ query: '' }));

    const hour = moment().hour();
    this.shift = this.getShift();
  }

  filterParts() {
    this.store.dispatch(
      SetPartsStateQuery({
        query: this.dataEntryForm.value.partName?.name || '',
      })
    );
  }
  filterRejections() {
    this.store.dispatch(
      SetRejectionStateQuery({
        query: this.dataEntryForm.value.rejectionName?.name || '',
      })
    );
  }

  onPartSelected(part: Part) {
    this.part = part;
    // this.selectedPart = part;
  }
  onRejectionSelected(rejection: Rejection) {
    console.log(rejection);
    // this.selectedRejection = rejection;
  }

  viewPart(part: Part) {
    return part.name || '';
  }

  viewRejection(rejection: Rejection) {
    return rejection.name || '';
  }

  addRejection() {
    const { rejectionName, rejectionNumber } = this.dataEntryForm.value;

    const existingRejection = this.partRejections.find(
      (partRejection) => partRejection.rejection._id === rejectionName?._id
    );

    if (existingRejection) {
      existingRejection.numberOfRejections += rejectionNumber;
    } else {
      if (rejectionName) {
        this.partRejections.push({
          numberOfRejections: rejectionNumber,
          rejection: rejectionName,
        });
      }
    }

    this.clearRejection();
  }

  validateNumberOfRejections() {
    const { numberOfParts, rejectionNumber } = this.dataEntryForm.value;

    const addedRejections = this.getTotalRejections();

    const totalRejections = addedRejections + rejectionNumber;
    return totalRejections >= numberOfParts;
  }

  private getTotalRejections() {
    return this.partRejections.reduce((total, rejection) => {
      total += rejection.numberOfRejections;
      return total;
    }, 0);
  }

  clearRejection() {
    this.dataEntryForm.patchValue({
      rejectionName: null,
      rejectionNumber: '',
    });
  }

  save() {
    const record: RecordDto = {
      loadNumber: this.dataEntryForm.value.loadNumber,
      numberOfParts: this.dataEntryForm.value.numberOfParts,
      numberOfRejections: this.getTotalRejections(),
      part: this.part,
      rejections: this.partRejections,
      shift: this.dataEntryForm.value.shift?.id,
    };

    this.store.dispatch(AddRecordActionStart({ record }));
    this.dataEntryForm.reset();
    this.dataEntryForm.patchValue({
      shift: this.getShift(),
      date: this.currentDate,
    });
    this.partRejections = [];
  }

  removeRejection(rejection: PartRejections) {
    this.partRejections = this.partRejections.filter(
      (partRejection) => partRejection.rejection._id !== rejection.rejection._id
    );
  }

  private getShift(): Shift {
    return moment().hour() >= 8 && moment().hour() <= 19
      ? SHIFTS[0]
      : SHIFTS[1];
  }
}

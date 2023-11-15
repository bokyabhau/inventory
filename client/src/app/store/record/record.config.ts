import { Part, Shift } from 'src/app/models/part.model';
import { PartRejections } from 'src/app/models/rejection.model';

export type RecordDto = {
  part: Part;
  rejections: PartRejections[];
  loadNumber: number;
  numberOfParts: number;
  numberOfRejections: number;
  shift?: number;
};

export type Record = {
  _id: string;
} & RecordDto;

export type RecordState = {
  loading: boolean;
  addLoading: boolean;
  editLoading: boolean;
  deleteLoading: boolean;
  records: Record[];
  error: Error | null;
  query: string;
};

export const recordInitialState: RecordState = {
  loading: false,
  addLoading: false,
  editLoading: false,
  deleteLoading: false,
  records: [],
  error: null,
  query: '',
};

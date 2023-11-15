import { Part, PartDocument } from '../part/part.schema';
import { RejectionDocument } from '../rejection/rejection.schema';

export type RecordDto = {
  part: PartDocument;
  rejections: PartRejections[];
  loadNumber: number;
  numberOfParts: number;
  numberOfRejections: number;
  shift: number;
};

export type Record = {
  _id: string;
} & RecordDto;

export type PartRejections = {
  numberOfRejections: number;
  rejection: RejectionDocument;
};

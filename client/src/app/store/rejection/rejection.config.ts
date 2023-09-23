import { Rejection } from '../../models/rejection.model';

export type RejectionState = {
  loading: boolean;
  addLoading: boolean;
  editLoading: boolean;
  deleteLoading: boolean;
  rejections: Rejection[];
  error: Error | null;
  query: string;
};

export const rejectionInitialState: RejectionState = {
  loading: false,
  addLoading: false,
  editLoading: false,
  deleteLoading: false,
  rejections: [],
  error: null,
  query: '',
};

import { Part } from 'src/app/models/part.model';

export type PartState = {
  loading: boolean;
  addLoading: boolean;
  editLoading: boolean;
  deleteLoading: boolean;
  parts: Part[];
  error: Error | null;
  query: string;
};

export const partInitialState: PartState = {
  loading: false,
  addLoading: false,
  editLoading: false,
  deleteLoading: false,
  parts: [],
  error: null,
  query: '',
};

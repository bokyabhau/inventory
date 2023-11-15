import { PartState } from './part/part.config';
import { ProductReducer } from './part/part.reducer';
import { PartEffects } from './part/part.effects';
import { RejectionState } from './rejection/rejection.config';
import { RejectionReducer } from './rejection/rejection.reducer';
import { RejectionEffects } from './rejection/rejection.effects';
import { RecordEffects } from './record/record.effects';
import { RecordState } from './record/record.config';
import { RecordReducer } from './record/record.reducer';

export type AppState = {
  partState: PartState;
  rejectionState: RejectionState;
  recordState: RecordState;
};

export const appReducers = {
  partState: ProductReducer,
  rejectionState: RejectionReducer,
  recordState: RecordReducer,
};

export const appEffects = [PartEffects, RejectionEffects, RecordEffects];

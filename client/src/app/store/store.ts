import { PartState } from './part/part.config';
import { ProductReducer } from './part/part.reducer';
import { PartEffects } from './part/part.effects';
import { RejectionState } from './rejection/rejection.config';
import { RejectionReducer } from './rejection/rejection.reducer';
import { RejectionEffects } from './rejection/rejection.effects';

export type AppState = {
  partState: PartState;
  rejectionState: RejectionState;
};

export const appReducers = {
  partState: ProductReducer,
  rejectionState: RejectionReducer,
};

export const appEffects = [PartEffects, RejectionEffects];

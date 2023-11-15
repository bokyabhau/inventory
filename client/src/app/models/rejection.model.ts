export type RejectionDto = {
  name: string;
};

export type Rejection = {
  _id: string;
} & RejectionDto;

export type PartRejections = {
  numberOfRejections: number;
  rejection: Rejection;
};

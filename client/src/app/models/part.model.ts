export type PartDto = {
  name: string;
  description?: string;
  avatar?: string;
};

export type Part = {
  _id: string;
} & PartDto;

export type ModalAttrs = {
  title: string;
  message: string;
};

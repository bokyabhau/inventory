export type PartDto = {
  name: string;
  description?: string;
  avatar?: string;
};

export type Part = {
  id: string;
} & PartDto;

export type Parts = {
  parts: Part[];
};

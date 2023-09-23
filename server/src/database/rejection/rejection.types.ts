export type RejectionDto = {
    name: string;
  };
  
  export type Rejection = {
    id: string;
  } & RejectionDto;
  
  export type Rejections = {
    parts: Rejection[];
  };
  
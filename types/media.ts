interface IAttributes {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: IFormat;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string;
  provider: string;
  provider_metadata: string;
  createdAt: string;
  updatedAt: string;
}

interface IFormat {
  large?: ISize;
  medium?: ISize;
  small: ISize;
  thumbnail: ISize;
}

interface ISize {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string;
  size: number;
  width: number;
  height: number;
}

export interface IMedia extends IAttributes {
  id: number;
}

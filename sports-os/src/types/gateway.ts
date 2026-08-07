export type ViewState = 'CORE_INIT' | 'NODE_SELECTED' | 'SUBCHAPTER_VIEW';

export type SubChapter = {
  id: string;
  title: string;
  doctrines: string[];
};

export type ArtronNode = {
  id: number;
  nodeCode: string;
  title: string;
  shortDesc: string;
  subChapters: SubChapter[];
};

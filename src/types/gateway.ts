export type ViewState = 'CORE_INIT' | 'NODE_SELECTED' | 'SUBCHAPTER_VIEW';
export type PortalState = 'IDLE' | 'IGNITION' | 'EXPANDING' | 'ENTERED';
export type FacilityPreset = 'ALL' | 'GYM' | 'POOL' | 'STUDIO' | 'CLUB';

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


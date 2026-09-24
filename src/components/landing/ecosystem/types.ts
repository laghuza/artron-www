export type CoreGroup = "VENUE" | "FINTECH_IOT";
export type ViewMode = "GLOBE" | "GEORGIA_DETAIL";
export type FilterKey = "ALL" | "VENUE" | "FINTECH_IOT";

export interface EnneaCore {
  id: string;
  label: string;
  meta: string;
  group: CoreGroup;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface EnneaRegion {
  id: string;
  name: string;
  shapeNames: string[];
  city: string;
  live: boolean;
}

export interface VenueWorkingHours {
  monSat: string;
  sun: string;
  weekdayOpen: number;
  weekdayClose: number;
  weekendOpen: number;
  weekendClose: number;
  isSunClosed?: boolean;
}

export interface EnneaVenue {
  id: string;
  name: string;
  regionId: string;
  category: string;
  city: string;
  regionName?: string;
  regionCity?: string;
  lat: number;
  lon: number;
  accent: string;
  members: string;
  status: string;
  turnstile?: string;
  gateway?: string;
  logoSrc?: string;
  isPartner?: boolean;
  workingHours?: VenueWorkingHours;
}


export interface EnneaStrings {
  kicker: string;
  title: string;
  titleGeo?: string;
  subtitle: string;
  breadcrumbWorld: string;
  breadcrumbCountry: string;
  backToWorld: string;
  exploreGeorgia: string;
  filters: { all: string; venues: string; fintech: string };
  badgeTitle: string;
  badgeCoords: string;
  hint: string;
  hintDetail: string;
  zoomIn: string;
  zoomOut: string;
  resetView: string;
  soundOn: string;
  soundOff: string;
  regionsLabel: string;
  venuesLabel: string;
  membersLabel: string;
  techLabel: string;
  loadingMap: string;
  mapError: string;
  close: string;
  liveBadge: string;
  backToList: string;
  allHubs: string;
  venueList: string;
  siteLink: string;
  allCities: string;
  cityFilter: string;
  searchPlaceholder: string;
  notFound: string;
  networkStatus: string;
  venuesTab: string;
  partnersTab: string;
  partnerBadge: string;
  showOnMap: string;
  workingHoursTitle?: string;
  openNow?: string;
  closedNow?: string;
  closesAt?: string;
  opensAt?: string;
  monSatLabel?: string;
  sunLabel?: string;
  closedLabel?: string;
  verifiedVenue?: string;
  stats: {
    hubs: string;
    venues: string;
    members: string;
    integration: string;
    access: string;
    status: string;
    acquiring: string;
    installments: string;
  };
}

export interface ArtronEnneaEcosystemProps {
  cores?: EnneaCore[];
  stats?: HeroStat[];
  regions?: EnneaRegion[];
  venues?: EnneaVenue[];
  strings?: Partial<EnneaStrings>;
  coordinates?: { lat: number; lon: number };
  adm1Url?: string;
  accent?: string;
  pointCount?: number;
  autoRotate?: boolean;
  showStats?: boolean;
  className?: string;
  onCoreSelect?: (core: EnneaCore | null) => void;
  onBeaconSelect?: () => void;
  onViewModeChange?: (mode: ViewMode) => void;
  onVenueSelect?: (venue: EnneaVenue | null) => void;
}

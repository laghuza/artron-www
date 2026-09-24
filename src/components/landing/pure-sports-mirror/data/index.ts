import { MirrorDimension } from './mirrorDataTypes';
import { VENUES_MODULES } from './venuesDimensionData';
import { WORKFORCE_MODULES } from './workforceDimensionData';
import { MASTERY_MODULES } from './masteryDimensionData';

export * from './mirrorDataTypes';
export * from './venuesDimensionData';
export * from './workforceDimensionData';
export * from './masteryDimensionData';

export const ALL_DIMENSIONS: MirrorDimension[] = [
  {
    id: 'venues',
    numeral: 'I',
    name: 'სპორტული სივრცეები',
    subtitle: 'VENUES & INFRASTRUCTURE',
    accentColor: '#00FF88',
    modules: VENUES_MODULES,
  },
  {
    id: 'workforce',
    numeral: 'II',
    name: 'ადამიანური კაპიტალი',
    subtitle: 'WORKFORCE & PROFESSIONALS',
    accentColor: '#00F0FF',
    modules: WORKFORCE_MODULES,
  },
  {
    id: 'mastery',
    numeral: 'III',
    name: 'ოსტატობა და ტიტულები',
    subtitle: 'MASTERY & SPORTS RANKS',
    accentColor: '#FFD700',
    modules: MASTERY_MODULES,
  },
];

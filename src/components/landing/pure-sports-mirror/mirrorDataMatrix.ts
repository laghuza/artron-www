export * from './mirrorTypes';

import { MasterDimensionId, DimensionConfig } from './mirrorTypes';
import { VENUES_DIMENSION } from './mirrorVenuesData';
import { WORKFORCE_DIMENSION } from './mirrorWorkforceData';
import { MASTERY_DIMENSION } from './mirrorMasteryData';

export const MIRROR_DIMENSIONS: Record<MasterDimensionId, DimensionConfig> = {
  venues: VENUES_DIMENSION,
  workforce: WORKFORCE_DIMENSION,
  mastery: MASTERY_DIMENSION,
};

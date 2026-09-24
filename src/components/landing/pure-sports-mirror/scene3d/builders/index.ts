import { SceneVariantId } from '../../data/mirrorDataTypes';
import { SceneModelHandle, buildGym, buildPool, buildCourt, buildOctagon, buildArena } from './venueBuilders';
import { buildCoach, buildMed, buildGroup, buildOps, buildGuard } from './workforceBuilders';
import { buildTrophy, buildPodium, buildPassport, buildMedals, buildAcademy } from './masteryBuilders';

export type { SceneModelHandle };

export const buildSceneVariant = (variant: SceneVariantId, accentHex: string): SceneModelHandle => {
  const accentNum = parseInt(accentHex.replace('#', '0x'), 16) || 0x00a3ff;

  switch (variant) {
    case 'gym':
      return buildGym(accentNum);
    case 'pool':
      return buildPool(accentNum);
    case 'court':
      return buildCourt(accentNum);
    case 'octagon':
      return buildOctagon(accentNum);
    case 'arena':
      return buildArena(accentNum);
    case 'coach':
      return buildCoach(accentNum);
    case 'med':
      return buildMed(accentNum);
    case 'group':
      return buildGroup(accentNum);
    case 'ops':
      return buildOps(accentNum);
    case 'guard':
      return buildGuard(accentNum);
    case 'trophy':
      return buildTrophy(accentNum);
    case 'podium':
      return buildPodium(accentNum);
    case 'passport':
      return buildPassport(accentNum);
    case 'medals':
      return buildMedals(accentNum);
    case 'academy':
      return buildAcademy(accentNum);
    default:
      return buildGym(accentNum);
  }
};

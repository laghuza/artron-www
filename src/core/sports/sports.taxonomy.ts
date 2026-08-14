/**
 * ARTRON SPORTS OS // SPORTS TAXONOMY & DISCIPLINE HIERARCHY ENGINE
 * Defines core categories, sports, dynamic variations, and helper functions.
 * Soft Target: < 200 lines
 */

export type SportCategoryKey = 'TEAM_SPORTS' | 'INDIVIDUAL_SPORTS' | 'COMBAT_SPORTS' | 'WINTER_SPORTS';

export interface SportDisciplineVariation {
  id: string;
  name: string;
  code: string;
  playersPerSide?: number;
}

export interface SportDiscipline {
  id: string;
  name: string;
  variations: SportDisciplineVariation[];
}

export interface SportCategory {
  id: SportCategoryKey;
  name: string;
  isTeam: boolean;
  sports: SportDiscipline[];
}

export const SPORTS_TAXONOMY: Record<SportCategoryKey, SportCategory> = {
  TEAM_SPORTS: {
    id: 'TEAM_SPORTS',
    name: 'Team Sports',
    isTeam: true,
    sports: [
      {
        id: 'football',
        name: 'Football / Soccer',
        variations: [
          { id: 'football_11v11', name: '11x11 Standard', code: '11v11', playersPerSide: 11 },
          { id: 'football_futsal_5v5', name: '5x5 Futsal', code: '5v5', playersPerSide: 5 },
          { id: 'football_mini_7v7', name: '7x7 Mini Football', code: '7v7', playersPerSide: 7 }
        ]
      },
      {
        id: 'basketball',
        name: 'Basketball',
        variations: [
          { id: 'basketball_5v5', name: '5x5 Standard', code: '5v5', playersPerSide: 5 },
          { id: 'basketball_3v3', name: '3x3 Half Court', code: '3v3', playersPerSide: 3 }
        ]
      },
      {
        id: 'rugby',
        name: 'Rugby',
        variations: [
          { id: 'rugby_15s', name: 'Rugby Union (15s)', code: '15s', playersPerSide: 15 },
          { id: 'rugby_7s', name: 'Rugby Sevens (7s)', code: '7s', playersPerSide: 7 }
        ]
      },
      {
        id: 'volleyball',
        name: 'Volleyball',
        variations: [
          { id: 'volleyball_6v6', name: '6x6 Indoor Volleyball', code: '6v6', playersPerSide: 6 },
          { id: 'volleyball_beach_2v2', name: '2x2 Beach Volleyball', code: '2v2', playersPerSide: 2 }
        ]
      }
    ]
  },
  INDIVIDUAL_SPORTS: {
    id: 'INDIVIDUAL_SPORTS',
    name: 'Individual Sports',
    isTeam: false,
    sports: [
      {
        id: 'tennis',
        name: 'Tennis',
        variations: [
          { id: 'tennis_singles', name: 'Singles', code: '1v1', playersPerSide: 1 },
          { id: 'tennis_doubles', name: 'Doubles', code: '2v2', playersPerSide: 2 }
        ]
      },
      {
        id: 'athletics',
        name: 'Athletics & Track/Field',
        variations: [
          { id: 'athletics_sprint', name: 'Sprint (100m/200m/400m)', code: 'SPRINT', playersPerSide: 1 },
          { id: 'athletics_marathon', name: 'Marathon & Distance', code: 'DIST', playersPerSide: 1 },
          { id: 'athletics_field', name: 'Field Events (Jump/Throw)', code: 'FIELD', playersPerSide: 1 }
        ]
      },
      {
        id: 'swimming',
        name: 'Swimming',
        variations: [
          { id: 'swimming_freestyle', name: 'Freestyle & Stroke', code: 'STROKE', playersPerSide: 1 },
          { id: 'swimming_relay', name: 'Relay Team', code: 'RELAY', playersPerSide: 4 }
        ]
      }
    ]
  },
  COMBAT_SPORTS: {
    id: 'COMBAT_SPORTS',
    name: 'Combat Sports',
    isTeam: false,
    sports: [
      {
        id: 'judo',
        name: 'Judo',
        variations: [
          { id: 'judo_individual', name: 'Individual Weight Class', code: 'IND', playersPerSide: 1 },
          { id: 'judo_mixed_team', name: 'Mixed Team Event', code: 'TEAM', playersPerSide: 6 }
        ]
      },
      {
        id: 'wrestling',
        name: 'Wrestling',
        variations: [
          { id: 'wrestling_freestyle', name: 'Freestyle Wrestling', code: 'FREE', playersPerSide: 1 },
          { id: 'wrestling_greco_roman', name: 'Greco-Roman Wrestling', code: 'GRECO', playersPerSide: 1 }
        ]
      },
      {
        id: 'boxing',
        name: 'Boxing',
        variations: [
          { id: 'boxing_amateur', name: 'Olympic Amateur Boxing', code: 'OLYMPIC', playersPerSide: 1 },
          { id: 'boxing_pro', name: 'Professional Boxing', code: 'PRO', playersPerSide: 1 }
        ]
      }
    ]
  },
  WINTER_SPORTS: {
    id: 'WINTER_SPORTS',
    name: 'Winter Sports',
    isTeam: false,
    sports: [
      {
        id: 'skiing',
        name: 'Alpine Skiing',
        variations: [
          { id: 'skiing_slalom', name: 'Slalom & Giant Slalom', code: 'SLALOM', playersPerSide: 1 },
          { id: 'skiing_downhill', name: 'Downhill Speed', code: 'DOWNHILL', playersPerSide: 1 }
        ]
      },
      {
        id: 'ice_hockey',
        name: 'Ice Hockey',
        variations: [
          { id: 'ice_hockey_standard', name: '6x6 Standard Ice Hockey', code: '6v6', playersPerSide: 6 },
          { id: 'ice_hockey_3v3', name: '3x3 OT Ice Hockey', code: '3v3', playersPerSide: 3 }
        ]
      }
    ]
  }
};

/**
 * Returns the SportCategory object associated with a given sportId.
 */
export function getSportCategory(sportId: string): SportCategory | undefined {
  const normalizedId = sportId.toLowerCase();
  for (const categoryKey of Object.keys(SPORTS_TAXONOMY) as SportCategoryKey[]) {
    const category = SPORTS_TAXONOMY[categoryKey];
    if (category.sports.some((s) => s.id.toLowerCase() === normalizedId)) {
      return category;
    }
  }
  return undefined;
}

/**
 * Retrieves all disciplines/variations associated with a specific sportId.
 */
export function getDisciplinesBySport(sportId: string): SportDisciplineVariation[] {
  const normalizedId = sportId.toLowerCase();
  for (const categoryKey of Object.keys(SPORTS_TAXONOMY) as SportCategoryKey[]) {
    const category = SPORTS_TAXONOMY[categoryKey];
    const sport = category.sports.find((s) => s.id.toLowerCase() === normalizedId);
    if (sport) {
      return sport.variations;
    }
  }
  return [];
}

/**
 * Checks if a given sportId belongs to a team sport category.
 */
export function isTeamSport(sportId: string): boolean {
  const category = getSportCategory(sportId);
  return category ? category.isTeam : false;
}

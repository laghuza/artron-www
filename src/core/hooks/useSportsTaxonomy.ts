import { useState, useMemo } from 'react';
import {
  SPORTS_TAXONOMY,
  SportCategoryKey,
  SportCategory,
  SportDisciplineVariation,
  getSportCategory,
  getDisciplinesBySport,
  isTeamSport
} from '../sports/sports.taxonomy';

export function useSportsTaxonomy(initialSportId?: string) {
  const [selectedSportId, setSelectedSportId] = useState<string>(initialSportId || 'football');

  const categories = useMemo(() => Object.values(SPORTS_TAXONOMY), []);

  const activeCategory = useMemo<SportCategory | undefined>(() => {
    return getSportCategory(selectedSportId);
  }, [selectedSportId]);

  const activeDisciplines = useMemo<SportDisciplineVariation[]>(() => {
    return getDisciplinesBySport(selectedSportId);
  }, [selectedSportId]);

  const activeIsTeam = useMemo<boolean>(() => {
    return isTeamSport(selectedSportId);
  }, [selectedSportId]);

  const isValidCategory = (categoryKey: string): categoryKey is SportCategoryKey => {
    return categoryKey in SPORTS_TAXONOMY;
  };

  return {
    categories,
    selectedSportId,
    setSelectedSportId,
    activeCategory,
    activeDisciplines,
    activeIsTeam,
    isValidCategory,
    getSportCategory,
    getDisciplinesBySport,
    isTeamSport
  };
}

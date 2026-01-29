export interface DisneyCharacter {
  _id: number;
  name: string;
  films: string[];
  shortFilms: string[];
  tvShows: string[];
  videoGames: string[];
  parkAttractions: string[];
  allies: string[];
  enemies: string[];
  sourceUrl?: string;
  imageUrl?: string;
  url: string;
}

export interface DisneyApiResponse {
  info: {
    totalPages: number;
    count: number;
    previousPage: string | null;
    nextPage: string | null;
  };
  data: DisneyCharacter[];
}

export interface CharacterFilters {
  search: string;
  minTvShows: number;
  minVideoGames: number;
  hasAllies: boolean;
  hasEnemies: boolean;
  tvShowFilter: string;
}

export interface ChartData {
  name: string;
  y: number;
  color?: string;
}

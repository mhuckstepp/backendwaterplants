export interface BasePlant {
    nickname: string;
    user_id: number;
    species: string;
    img?: string;
    water_freq?: string;
    baseDate?: number;
  }
  
  export interface Plant extends BasePlant {
    id: number;
    species_id: number;
  }


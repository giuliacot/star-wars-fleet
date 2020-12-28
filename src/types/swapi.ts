export type ResourceUrl = string;

export type People = {
  birth_year: string;
  eye_color: string;
  films: ResourceUrl[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: ResourceUrl[];
  starships: ResourceUrl[];
  vehicles: ResourceUrl[];
};

export type Starships = {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: ResourceUrl[];
  films: ResourceUrl[];
};

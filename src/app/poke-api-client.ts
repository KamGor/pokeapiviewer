import { Injectable } from '@angular/core';
import { HttpClient } from './http-client';
import { PokemonMoves } from './pokemon-moves.interface';
import { PokemonForms } from './pokemon-forms.interface';
import { PokemonAbility, ShortAbility } from './pokemon-ability.interface';
import { PokemonAnswer } from './pokemon-answer.interface';
import { Pokemon } from './pokemon.interface';
import {
  ResponseHabitats,
  ResponseHabitatsList,
  ResponseHabitatData,
} from './api-habitat/ResponceHabitats';
import { PokemonHabitats } from './api-habitat/PokemonHabitats';
import { PrivateHabitats } from './api-habitat/PrivateHabitats';
import { berriesResponce } from './api-berries/berries-responce';
import { pokemonItems } from './api-berries/pokemon-items';
import { BerriesPrivate } from './api-berries/berries-private';
import { PokemonListResponse } from './list-page/pokemon-list-item';
import { PokemonSpecies } from './pokemon-species.interface';

@Injectable({
  providedIn: 'root',
})
export class PokeApiClient {
  private readonly BASE_URL = 'https://pokeapi.co/api/v2/';
  constructor(private httpClient: HttpClient) {}

  async getPokemon(name: string) {
    const response = await this.httpClient.get<PokemonAnswer>(`${this.BASE_URL}pokemon/${name}`);

    const abilityPromises: Promise<PokemonAbility>[] = [];
    const formPromises: Promise<PokemonForms>[] = [];
    const movePromises: Promise<PokemonMoves>[] = [];
    const speciePromises: Promise<PokemonSpecies>[] = [];

    const data = response.data;
    for (const ability of data.abilities) {
      const abilityPromise = this.httpClient.get<PokemonAbility>(ability.ability.url);
      abilityPromises.push(abilityPromise.then((response) => response.data));
    }

    for (const form of data.forms) {
      const formPromise = this.httpClient.get<PokemonForms>(form.url);
      formPromises.push(formPromise.then((response) => response.data));
    }

    for (const move of data.moves) {
      const movePromise = this.httpClient.get<PokemonMoves>(move.move.url);
      movePromises.push(movePromise.then((response) => response.data));
    }

    // for (const specie of data.species) {
    //   const speciePromise = this.httpClient.get<PokemonSpecies>(specie.url);
    //   speciePromises.push(speciePromise.then((response) => response.data));
    // }

    const moves = await Promise.all(movePromises);
    const abilities = await Promise.all(abilityPromises);
    const forms = await Promise.all(formPromises);
    // const species = await Promise.all(speciePromises);

    const pokemon: Pokemon = {
      name: data.name,
      id: data.id,
      imgSrc: data.sprites.front_default,
      imgSprite: data.sprites.front_default,
      imgSpriteBack: data.sprites.back_default,
      cries: data.cries,
      weight: data.weight,
      height: data.height,
      types: data.types,
      stats: data.stats,
      // species: data.species,

      // species: species.map((specie) => {
      //   return {
      //     description:
      //       specie.flavor_text_entries.find((entry) => entry.language.name === 'en')?.flavor_text ??
      //       '',
      //   };
      // }),

      forms: forms.map((form) => {
        return {
          name: form.name,
          frontDefault: form.sprites.front_default,
          backDefault: form.sprites.back_default,
        };
      }),

      moves: moves.map((move) => {
        return {
          name: move.names.find((name) => name.language.name === 'en')?.name ?? '',
          description:
            move.effect_entries.find((entry) => entry.language.name === 'en')?.effect ?? '',

          id: move.id,
        };
      }),

      abilities: abilities.map((ability) => {
        return {
          description:
            ability.effect_entries.find((entry) => entry.language.name === 'en')?.effect ?? '',
          isHidden: false,
          name: ability.names.find((name) => name.language.name === 'en')?.name ?? '',
        };
      }),
    };
    return pokemon;
  }

  async getPokemonShortData(name: string) {
    const response = await this.httpClient.get<PokemonAnswer>(`${this.BASE_URL}pokemon/${name}`);
    const data = response.data;
    // console.log(data);
    const abilityPromises: Promise<PokemonAbility>[] = [];
    const movePromises: Promise<PokemonMoves>[] = [];
    // const speciePromises: Promise<PokemonSpecies>[] = [];

    for (const ability of data.abilities) {
      const abilityPromise = this.httpClient.get<PokemonAbility>(ability.ability.url);
      abilityPromises.push(abilityPromise.then((response) => response.data));
    }

    for (const move of data.moves) {
      const movePromise = this.httpClient.get<PokemonMoves>(move.move.url);
      movePromises.push(movePromise.then((response) => response.data));
    }

    // for (const specie of data.species) {
    //   const speciePromise = this.httpClient.get<PokemonSpecies>(specie.url);
    //   speciePromises.push(speciePromise.then((response) => response.data));
    // }

    const abilities = await Promise.all(abilityPromises);
    const moves = await Promise.all(movePromises);
    // const species = await Promise.all(speciePromises);

    const pokemon: Pokemon = {
      name: data.name,
      id: data.id,
      weight: data.weight,
      height: data.height,
      imgSrc: data.sprites.front_default,
      imgSprite: data.sprites.front_default,
      imgSpriteBack: data.sprites.back_default,
      types: data.types,
      cries: data.cries,
      stats: data.stats,

      // species: data.species,

      // species: species.map((specie) => {
      //   return {
      //     description:
      //       specie.flavor_text_entries.find((entry) => entry.language.name === 'en')?.flavor_text ??
      //       '',
      //   };
      // }),

      abilities: abilities.map((ability) => {
        return {
          description:
            ability.effect_entries.find((entry) => entry.language.name === 'en')?.effect ?? '',
          name: ability.names.find((name) => name.language.name === 'en')?.name ?? '',
        };
      }),

      moves: moves.map((move) => {
        return {
          name: move.names.find((name) => name.language.name === 'en')?.name ?? '',
          description:
            move.effect_entries.find((entry) => entry.language.name === 'en')?.effect ?? '',

          id: move.id,
        };
      }),
    };
    return pokemon;
  }

  public async getAbility(name: string) {
    const response = await this.httpClient.get<ShortAbility>(`${this.BASE_URL}ability/${name}`);
    const data = response.data;
    const newData = {
      name: data.name,
      discription: data.effect_entries.find((entry) => entry.language.name === 'en')?.effect ?? '',
    };
    return newData;
  }

  public async getPokemonList(url: string, limit?: number): Promise<PokemonListResponse> {
    const _limit = limit ? limit : 20;
    const finalUrl = url.includes(this.BASE_URL) ? url : `${this.BASE_URL}pokemon/?limit=${_limit}`;
    const response = await this.httpClient.get<PokemonListResponse>(finalUrl);
    return response.data;
  }

  async getHabitatsList() {
    const { data } = await this.httpClient.get<ResponseHabitatsList>(
      `${this.BASE_URL}pokemon-habitat/`
    );
    return data;
  }
  async getHabitatsData(name: string) {
    const { data } = await this.httpClient.get<ResponseHabitatData>(
      `${this.BASE_URL}pokemon-habitat/${name}`
    );
    return data;
  }
  async getPokemonHabitat(name: string) {
    const { data } = await this.httpClient.get<ResponseHabitats>(
      `https://pokeapi.co/api/v2/pokemon-habitat/${name}`
    );
    const habitatPromises: Promise<PokemonHabitats>[] = [];
    for (const habitat of data.pokemon_species) {
      const habitatPromise = this.httpClient.get<PokemonHabitats>(habitat.url);
      habitatPromises.push(habitatPromise.then((response) => response.data));
    }

    const pokemonSpecies = await Promise.all(habitatPromises);
    const PokemonHabitats: PrivateHabitats = {
      id: data.id,
      name: data.name,
      pokemonSpecies: pokemonSpecies.map((specie) => {
        return {
          id: specie.id,
          name: specie.name,
          baseHappiness: specie.base_happiness,
          captureRate: specie.capture_rate,
          flavorText: specie.flavor_text_entries.map((entry) => {
            return {
              flavorText: entry.language.name === 'en' ? entry.flavor_text : '',
            };
          }),
        };
      }),
    };
    return PokemonHabitats;
  }
  async getPokemonBerries(name: string) {
    const { data } = await this.httpClient.get<berriesResponce>(
      `https://pokeapi.co/api/v2/berry/${name}/`
    );
    const berriesPromises: Promise<pokemonItems>[] = [];
    const berriesPromise = this.httpClient.get<pokemonItems>(data.item.url);
    berriesPromises.push(berriesPromise.then((response) => response.data));

    const item = await Promise.all(berriesPromises);
    const pokemonBerries: BerriesPrivate = {
      id: data.id,
      name: data.name,
      growthTime: data.growth_time,
      maxHarvest: data.max_harvest,
      naturalGiftPower: data.natural_gift_power,
      size: data.size,
      smoothness: data.smoothness,
      soilDryness: data.soil_dryness,

      item: item.map((entry) => {
        return {
          imgSprite: entry.sprites.default,
          description:
            entry.effect_entries.find((enter: any) => enter.language.name == 'en')?.effect ?? '',
          excerpt:
            entry.effect_entries.find((enter: any) => enter.language.name == 'en')?.short_effect ??
            '',
        };
      }),
    };
    return pokemonBerries;
  }

  /**
   *  Zakomentowalem to dla tego ze zrobilem ostatnia wkladke locations innym sposobem w funkcji
   * (loadDetails-ktora opisalem co za czym robilem(locations.ts 77 wiersz)) dla osobistego rozwoju.
   *
   * @param name
   * @returns object
   */

  // async getLocationData(name: string) {
  //   const { data } = await this.httpClient.get<LocationResponce>(
  //     `${this.BASE_URL}/location/${name}/`
  //   );
  //   const locationsPromises: Promise<PokemonAreas>[] = [];
  //   or (const location of data.areas) {
  //     const locationsPromise = this.httpClient.get<PokemonAreas>(form.url);
  //     locationsPromises.push(locationsPromise.then((response) => response.data));
  //   }
  //   const locationsPromise = this.httpClient.get<PokemonAreas>(data.url);
  //   locationsPromises.push(locationsPromise.then((response) => response.data));

  //   const locations = await Promise.all(locationsPromises);
  //   const pokemonBerries: LocationsPrivate = {
  //     id: data.id,
  //     name: data.name,
  //     location: locations.map((entry) => {
  //       return {
  //         id: entry.id,
  //         name: entry.name,
  //         gameIndex: entry.game_index,
  //         locationName: entry.location.find((aaa: any) => aaa.language.name == 'en')?.name ?? '',
  //       };
  //     }),
  //   };
  //   return pokemonBerries;
  // }

  async getLocations(url: string) {
    const finalUrl = url.includes(this.BASE_URL) ? url : `${this.BASE_URL}location/`;
    const { data } = await this.httpClient.get<any>(finalUrl);
    return data;
  }
  async getLocationData(name: string) {
    const { data } = await this.httpClient.get<any>(`${this.BASE_URL}location/${name}`);
    return data;
  }
  async getBerries(url: string) {
    const finalUrl = url.includes(this.BASE_URL) ? url : `${this.BASE_URL}berry/`;
    const { data } = await this.httpClient.get<any>(finalUrl);
    return data;
  }
  async getBerriesData(name: string) {
    const { data } = await this.httpClient.get<any>(`${this.BASE_URL}berry/${name}`);
    return data;
  }
  async getPokemonId(name: string) {
    const { data } = await this.httpClient.get<any>(`${this.BASE_URL}pokemon/${name}`);
    return data.id;
  }
}

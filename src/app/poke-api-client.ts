import { Injectable } from '@angular/core';
import { HttpClient } from './http-client';
import { PokemonMoves } from './pokemon-moves.interface';
import { PokemonForms } from './pokemon-forms.interface';
import { PokemonAbility, ShortAbility } from './pokemon-ability.interface';
import { PokemonAnswer } from './pokemon-answer.interface';
import { Pokemon, PokemonImage, PokemonImageNew } from './pokemon.interface';
import {
  ResponseHabitat,
  ResponseHabitatsList,
  ResponseHabitatData,
} from './api-habitat/responceHabitats';
import { PokemonHabitat } from './api-habitat/pokemonHabitats';
// import { PrivateHabitat } from './api-habitat/privateHabitats';
import { BerriesResponse } from './api-berries/berries-response';
import { pokemonItem } from './api-berries/pokemon-items';
import { Berry } from './api-berries/berries-private';
import { PokemonListResponse } from './list-page/pokemon-list-item';
import { PokemonSpecies } from './pokemon-species.interface';
import { PrivateHabitat } from './api-habitat/privateHabitats';

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

    const speciePromise = this.httpClient.get<PokemonSpecies>(data.species.url);
    speciePromises.push(speciePromise.then((response) => response.data));

    const moves = await Promise.all(movePromises);
    const abilities = await Promise.all(abilityPromises);
    const forms = await Promise.all(formPromises);
    const species = await Promise.all(speciePromises);

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

      species: species.map((specie) => {
        return {
          description:
            specie.flavor_text_entries.find((entry) => entry.language.name === 'en')?.flavor_text ??
            '',
        };
      }),

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
          name: ability.name,
          description:
            ability.effect_entries.find((entry) => entry.language.name === 'en')?.effect ?? '',
          isHidden: false,
          displayName: ability.names.find((name) => name.language.name === 'en')?.name ?? '',
        };
      }),
    };
    return pokemon;
  }

  async getPokemonImage(name: string) {
    const response = await this.httpClient.get<PokemonImage>(`${this.BASE_URL}pokemon/${name}`);
    const data = response.data;
    const pokemon = {
      cries: data.cries,
      name: data.name,
      id: data.id,
      images: [
        { url: data.sprites.front_default },
        { url: data.sprites.back_default },
        { url: data.sprites.front_shiny },
        { url: data.sprites.front_shiny },
      ],
    };
    return pokemon;
  }

  async getPokemonShortData(name: string) {
    const response = await this.httpClient.get<PokemonAnswer>(`${this.BASE_URL}pokemon/${name}`);
    const data = response.data;

    const abilityPromises: Promise<PokemonAbility>[] = [];
    const movePromises: Promise<PokemonMoves>[] = [];

    for (const ability of data.abilities) {
      const abilityPromise = this.httpClient.get<PokemonAbility>(ability.ability.url);
      abilityPromises.push(abilityPromise.then((response) => response.data));
    }

    for (const move of data.moves) {
      const movePromise = this.httpClient.get<PokemonMoves>(move.move.url);
      movePromises.push(movePromise.then((response) => response.data));
    }

    const abilities = await Promise.all(abilityPromises);
    const moves = await Promise.all(movePromises);

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

  public async getPokemonList(limit?: string, offset?: string): Promise<PokemonListResponse> {
    const _limit = '?limit=' + (limit ? limit : '20');
    const _offset = '&offset=' + (offset ? offset : '0');
    const url = `${this.BASE_URL}pokemon/${_limit}${_offset}`;
    const response = await this.httpClient.get<PokemonListResponse>(url);
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
    const { data } = await this.httpClient.get<ResponseHabitat>(
      `https://pokeapi.co/api/v2/pokemon-habitat/${name}`
    );
    const habitatPromises: Promise<PokemonHabitat>[] = [];
    for (const habitat of data.pokemon_species) {
      const habitatPromise = this.httpClient.get<PokemonHabitat>(habitat.url);
      habitatPromises.push(habitatPromise.then((response) => response.data));
    }

    const pokemonSpecies = await Promise.all(habitatPromises);
    const PokemonHabitats: PrivateHabitat = {
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
    const { data } = await this.httpClient.get<BerriesResponse>(
      `https://pokeapi.co/api/v2/berry/${name}/`
    );
    const berriesPromises: Promise<pokemonItem>[] = [];
    const berriesPromise = this.httpClient.get<pokemonItem>(data.item.url);
    berriesPromises.push(berriesPromise.then((response) => response.data));

    const item = await Promise.all(berriesPromises);
    const pokemonBerries: Berry = {
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

  async getLocations(limit?: string, offset?: string) {
    const _limit = '?limit=' + (limit ? limit : '20');
    const _offset = '&offset=' + (offset ? offset : '0');
    const url = `${this.BASE_URL}location/${_limit}${_offset}`;
    const { data } = await this.httpClient.get<any>(url);
    return data;
  }
  async getLocationData(name: string) {
    const { data } = await this.httpClient.get<any>(`${this.BASE_URL}location/${name}`);
    return data;
  }
  async getAreaData(name: string) {
    const { data } = await this.httpClient.get<any>(`${this.BASE_URL}location-area/${name}`);
    return data;
  }
  async getBerries(limit?: string, offset?: string) {
    const _limit = '?limit=' + (limit ? limit : '20');
    const _offset = '&offset=' + (offset ? offset : '0');
    const url = `${this.BASE_URL}berry/${_limit}${_offset}`;
    const { data } = await this.httpClient.get<any>(url);
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

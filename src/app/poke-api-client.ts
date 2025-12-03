import { effect, Injectable } from '@angular/core';
import { HttpClient } from './http-client';
import { PokemonMoves } from './pokemon-moves.interface';
import { PokemonForms } from './pokemon-forms.interface';
import { PokemonAbility } from './pokemon-ability.interface';
import { PokemonAnswer } from './pokemon-answer.interface';
import { Pokemon } from './pokemon.interface';
import { ResponseHabitats } from './api-habitat/responceHabitats';
import { PokemonHabitats } from './api-habitat/pokemonHabitats';
import { PrivateHabitats } from './api-habitat/privateHabitats';
import { berriesResponce } from './api-berries/berries-responce';
import { pokemonItems } from './api-berries/pokemon-items';
import { berriesPrivate } from './api-berries/berries-private';
import { PokemonListItem, PokemonListResponse } from './list-page/pokemon-list-item';

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

    const moves = await Promise.all(movePromises);
    const abilities = await Promise.all(abilityPromises);
    const forms = await Promise.all(formPromises);

    const pokemon: Pokemon = {
      name: data.name,
      id: data.id,
      imgSrc: data.sprites.front_default,
      imgSprite: data.sprites.front_default,
      imgSpriteBack: data.sprites.back_default,

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

  public async getPokemonList(url: string): Promise<PokemonListResponse> {
    // Проверяем, если передан полный URL, используем его, иначе используем BASE_URL + 'pokemon'
    const finalUrl = url.includes(this.BASE_URL) ? url : `${this.BASE_URL}pokemon/`;

    const response = await this.httpClient.get<PokemonListResponse>(finalUrl);
    return response.data;
  }

  async getPokemonHabitats(name: string) {
    const response = await this.httpClient.get<ResponseHabitats>(
      `https://pokeapi.co/api/v2/pokemon-habitat/${name}`
    );
    const habitatPromises: Promise<PokemonHabitats>[] = [];
    const data = response.data;
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
          baseHappiness: specie.base_happiness,
          captureRate: specie.capture_rate,
          flavorText: specie.flavor_text,
          name: specie.language.name,
        };
      }),
    };
    return PokemonHabitats;
  }
  async getPokemonBerries(name: string) {
    const response = await this.httpClient.get<berriesResponce>(
      `https://pokeapi.co/api/v2/berry/${name}/`
    );
    const berriesPromises: Promise<pokemonItems>[] = [];

    const data = response.data;

    for (const berries of data.item) {
      const berriesPromise = this.httpClient.get<pokemonItems>(berries.url);
      berriesPromises.push(berriesPromise.then((response) => response.data));
    }

    const item = await Promise.all(berriesPromises);
    const pokemonBerries: berriesPrivate = {
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
            entry.effect_entries.find((entry: any) => entry.language.name === 'en')?.language
              .name ?? '',
          effect: entry.effect_entries.map((entry: any) => {
            return {
              effect: entry.effect,
              shortEffect: entry.short_effect,
            };
          }),
        };
      }),
    };
    return pokemonBerries;
  }
}

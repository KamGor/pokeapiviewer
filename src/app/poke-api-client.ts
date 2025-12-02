import { Injectable } from '@angular/core';
import { HttpClient } from './http-client';
import { pokemonMoves } from './pokemon-moves.interface';
import { pokemonForms } from './pokemon-forms.interface';
import { pokemonAbility } from './pokemon-ability.interface';
import { pokemonAnswer } from './pokemon-answer.interface';
import { Pokemon } from './pokemon.interface';
import { responseHabitats } from './api-habitat/responceHabitats';
import { pokemonHabitats } from './api-habitat/pokemonHabitats';
import { privateHabitats } from './api-habitat/privateHabitats';

@Injectable({
  providedIn: 'root',
})
export class PokeApiClient {
  constructor(private httpClient: HttpClient) {}

  async getPokemon(name: string) {
    const response = await this.httpClient.get<pokemonAnswer>(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );

    const abilityPromises: Promise<pokemonAbility>[] = [];
    const formPromises: Promise<pokemonForms>[] = [];
    const movePromises: Promise<pokemonMoves>[] = [];

    const data = response.data;
    for (const ability of data.abilities) {
      const abilityPromise = this.httpClient.get<pokemonAbility>(ability.ability.url);
      abilityPromises.push(abilityPromise.then((response) => response.data));
    }

    for (const form of data.forms) {
      const formPromise = this.httpClient.get<pokemonForms>(form.url);
      formPromises.push(formPromise.then((response) => response.data));
    }

    for (const move of data.moves) {
      const movePromise = this.httpClient.get<pokemonMoves>(move.move.url);
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

  async getPokemonHabitats(name: string) {
    console.log('getPokemonHabitats');
    const response = await this.httpClient.get<responseHabitats>(
      `https://pokeapi.co/api/v2/pokemon-habitat/${name}`
    );
    console.log('response', response);
    const habitatPromises: Promise<pokemonHabitats>[] = [];

    const data = response.data;

    for (const habitat of data.pokemon_species) {
      const habitatPromise = this.httpClient.get<pokemonHabitats>(habitat.url);
      habitatPromises.push(habitatPromise.then((response) => response.data));
    }

    const pokemonSpecies = await Promise.all(habitatPromises);

    const pokemonHabitats: privateHabitats = {
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
    return pokemonHabitats;
  }
}

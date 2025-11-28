import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonResponce } from '../pokemoninterface';
import axios from 'axios';
import { Pokemono } from '../pokemon_interface';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
  RouterLinkActive,
} from '@angular/router';
import { PokeApiClient } from '../poke-api-client';

@Component({
  selector: 'app-pokemon',
  imports: [FormsModule, CommonModule, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './pokemon.html',
  styleUrl: './pokemon.scss',
})
export class Pokemon implements OnInit {
  pokemonName: string | undefined;
  public pokemonData!: Pokemono;
  pokemonId: any;

  pokemonNames: any = null;
  pokemon: any = null;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pokeApiClient: PokeApiClient
  ) {}

  async ngOnInit() {
    const idString = this.activatedRoute.snapshot.paramMap.get('name');
    this.pokemonId = idString ? idString : undefined;
    // console.log('this.pokemonId', this.pokemonId);
    if (this.pokemonId === null) return;
    this.pokemon = await this.pokeApiClient.getPokemon(this.pokemonId);
    // console.log('this.pokemon', this.pokemon);
  }

  async getPokemon() {
    // console.log('sdadasd');
    try {
      const { data } = await axios.get<PokemonResponce>(
        `https://pokeapi.co/api/v2/pokemon/${this.pokemonId}`
      );

      const promises: Promise<any>[] = [];

      for (const ability of data.abilities) {
        const promise = axios.get(ability.ability.url);
        promises.push(promise.then((response) => response.data));
      }
      const abilities = await Promise.all(promises);
      // console.log(abilities);
      this.pokemonData = {
        id: data.id,
        name: data.name,
        imgSrc: data.sprites.front_default,
        abilities: data.abilities.map((ability) => {
          const formability = abilities.find(
            (abilityDetails) => abilityDetails.name === ability.ability.name
          );
          const description = formability.effect_entries.find(
            (entry: any) => entry.language.name === 'en'
          );
          return {
            description: description.effect,
            id: formability.id,
            isHidden: ability.is_hidden,
            name: ability.ability.name,
          };
        }),
      };
      // console.log('ssadasd', this.pokemonData);
    } catch (error) {
      ('Pokemon not found');
    }
  }

  get isBaseRouteActive(): boolean {
    const urlParts = this.router.url.split('/');
    return urlParts.length <= 3;
  }
}

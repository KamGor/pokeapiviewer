import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { PokeApiClient } from '../poke-api-client';
import axios from 'axios';
import { PokemonListItem } from './pokemon-list-item';

@Component({
  selector: 'app-list',
  imports: [FormsModule, CommonModule, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class ListPage implements OnInit {
  pokemonName: string = '';
  prevPokemons: string | null = null;
  nextPokemons: string | null = null;
  listPokemons: PokemonListItem[] = [];
  mainQuery: string = 'https://pokeapi.co/api/v2/pokemon/';
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pokeApiClient: PokeApiClient
  ) {}

  async ngOnInit(): Promise<void> {
    // during first start use base URL 'https://pokeapi.co/api/v2/pokemon/'
    await this.getPokemonList(this.mainQuery);
  }

  async getPokemonList(url: string): Promise<void> {
    try {
      const data = await this.pokeApiClient.getPokemonList(url);
      this.listPokemons = data.results;
      this.nextPokemons = data.next;
      this.prevPokemons = data.previous;
    } catch (error) {
      console.error('error:', error);
      this.listPokemons = [];
      this.nextPokemons = null;
      this.prevPokemons = null;
    }
  }

  async paginationHandler(direction: 'prev' | 'next'): Promise<void> {
    const handler = direction === 'next' ? this.nextPokemons : this.prevPokemons;

    // if handler not empty
    if (handler) {
      await this.getPokemonList(handler);
    }
  }

  get isPrevDisabled(): boolean {
    // button is off (true), if prevPokemons === null
    return this.prevPokemons === null;
  }

  get isNextDisabled(): boolean {
    return this.nextPokemons === null;
  }

  navigateDetails(pokemonName: string) {
    this.router.navigate(['/pokemon', pokemonName]);
  }
}

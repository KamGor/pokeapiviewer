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
  constructor(private router: Router, private pokeApiClient: PokeApiClient) {}

  async ngOnInit(): Promise<void> {
    await this.getPokemonList();
  }

  async getPokemonList(limit?: string | undefined, offset?: string | undefined): Promise<void> {
    try {
      const data = await this.pokeApiClient.getPokemonList(limit, offset);
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

    if (handler) {
      const url = new URL(handler);
      const limit = url.searchParams.get('limit') ?? '';
      const offset = url.searchParams.get('offset') ?? '';
      await this.getPokemonList(limit, offset);
    }
  }

  get isPrevDisabled(): boolean {
    // button is off (true), if prevPokemons === null
    return this.prevPokemons === null;
  }

  get isNextDisabled(): boolean {
    return this.nextPokemons === null;
  }
  get isList(): boolean {
    const urlParts = this.router.url.split('/');
    return urlParts.length <= 2;
  }

  navigateDetails(pokemonName: string) {
    this.router.navigate(['/pokemon', pokemonName]);
  }
}

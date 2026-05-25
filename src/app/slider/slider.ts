import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ListPage } from '../list-page/list';

import { PokeApiClient } from '../poke-api-client';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonListItem } from '../list-page/pokemon-list-item';
import { PokemonImageNew } from '../pokemon.interface';

@Component({
  selector: 'app-slider',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './slider.html',
  styleUrl: './slider.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Slider implements OnInit {
  pokemonDetalis: PokemonImageNew[] = [];
  pokemonName: string = '';
  prevPokemons: string | null = null;
  nextPokemons: string | null = null;
  listPokemons: PokemonListItem[] = [];
  pageSize: number = 20;
  currentPage: number = 1;
  isLoading: boolean = false;
  pokemon: any;
  totalPokemons: number = 0;
  constructor(
    private router: Router,
    private pokeApiClient: PokeApiClient,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getPokemonList();
  }

  async getPokemonList(limit: string = '20', offset: string = '0'): Promise<void> {
    this.isLoading = true;
    try {
      const data = await this.pokeApiClient.getPokemonList((limit = '20'), offset);
      this.listPokemons = data.results;
      this.nextPokemons = data.next;
      this.prevPokemons = data.previous;
      this.totalPokemons = data.count; // save list of pokemons (around 1500) and count of them (around 1300)
      const currentOffset = parseInt(offset, 10) || 0;
      this.pageSize = parseInt(limit, 10);
      this.currentPage = Math.floor(currentOffset / this.pageSize) + 1;
    } catch (error) {
      console.error('error:', error);
      this.listPokemons = [];
      this.nextPokemons = null;
      this.prevPokemons = null;
      this.totalPokemons = 0;
    } finally {
      // const pokemonImages: Promise<{ name: string; images: { url: string | undefined }[] }>[] = [];
      this.isLoading = false;
      const pokemonImages: Promise<PokemonImageNew>[] = [];
      for (const pokemon of this.listPokemons) {
        const imagePromise = this.pokeApiClient.getPokemonImage(pokemon.name);
        pokemonImages.push(imagePromise);
      }
      this.pokemonDetalis = await Promise.all(pokemonImages);
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

  playCry(audioUrl: string | undefined) {
    if (!audioUrl) return;

    const audio = new Audio(audioUrl);
    audio.load();
    audio.play().catch((error) => {
      console.error('error', error);
    });
  }
  get totalPages(): number {
    return Math.ceil(this.totalPokemons / this.pageSize);
  }

  async goToPage(page: number): Promise<void> {
    const offset = (page - 1) * this.pageSize;
    await this.getPokemonList(this.pageSize.toString(), offset.toString());
  }

  get visiblePages(): number[] {
    const pages = [];
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, this.currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }
  navigateDetails(pokemonName: string) {
    this.router.navigate(['/pokemon', pokemonName]);
  }
}

import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ListPage } from '../list-page/list';
import { PokemonListItem } from '../list-page/pokemon-list-item';
import { Pokemon, PokemonImage, PokemonImageNew } from '../pokemon.interface';
import { PokeApiClient } from '../poke-api-client';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-slider',
  imports: [RouterLink, RouterOutlet, ListPage, CommonModule, FormsModule],
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
  constructor(private router: Router, private pokeApiClient: PokeApiClient) {}

  async ngOnInit(): Promise<void> {
    await this.getPokemonList();
  }

  async getPokemonList(limit?: string | undefined, offset?: string | undefined): Promise<void> {
    try {
      const data = await this.pokeApiClient.getPokemonList((limit = '100'), offset);
      this.listPokemons = data.results;
      this.nextPokemons = data.next;
      this.prevPokemons = data.previous;
    } catch (error) {
      console.error('error:', error);
      this.listPokemons = [];
      this.nextPokemons = null;
      this.prevPokemons = null;
    } finally {
      // const pokemonImages: Promise<{ name: string; images: { url: string | undefined }[] }>[] = [];
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

  navigateDetails(pokemonName: string) {
    this.router.navigate(['/pokemon', pokemonName]);
  }

  playCry(audioUrl: string | undefined) {
    if (!audioUrl) return;

    const audio = new Audio(audioUrl);
    audio.load(); // Предзагрузка
    audio.play().catch((error) => {
      console.error('Ошибка воспроизведения:', error);
    });
  }
}

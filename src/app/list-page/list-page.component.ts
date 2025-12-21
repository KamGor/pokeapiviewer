import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PokemonListItem, PokemonShortData } from '../interfaces/pokemon';
import { PokeApiClient } from '../app.api-client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
  ],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css',
})
export class ListPageComponent implements OnInit {
  prevButton: string | null = null;
  nextButton: string | null = null;
  listPokemons: PokemonListItem[] = [];
  pokemonData: PokemonShortData | null = null;
  constructor(private router: Router, private pokeApiClient: PokeApiClient) {}

  ngOnInit(): void {
    this.getPokemonList('https://pokeapi.co/api/v2/pokemon');
  }

  async getPokemonList(url: string): Promise<void> {
    try {
      this.pokeApiClient.getListPokemons(url).then((data) => {
        this.listPokemons = data.results;
        console.log(this.listPokemons);
        this.nextButton = data.next;
        this.prevButton = data.previous;
      });
    } catch (error) {
      console.error('error:', error);
      this.listPokemons = [];
      this.nextButton = null;
      this.prevButton = null;
    }
  }

  paginationHandler(direction: 'prev' | 'next'): void {
    const handler = direction === 'next' ? this.nextButton : this.prevButton;

    if (handler) {
      this.getPokemonList(handler);
    }
  }

  get isPrevDisabled(): boolean {
    // button is off (true), if prevPokemons === null
    return this.prevButton === null;
  }

  get isNextDisabled(): boolean {
    return this.nextButton === null;
  }

  async showDetails(url: string) {
    const { data } = await this.pokeApiClient.getPokemon(url);
    this.pokemonData = data;
  }
}

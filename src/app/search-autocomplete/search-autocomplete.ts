import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { PokeApiClient } from '../poke-api-client';
import { FilteredPokemonList, PokemonList } from '../pokemon.interface';

@Component({
  selector: 'app-search-autocomplete',
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './search-autocomplete.html',
  styleUrl: './search-autocomplete.scss',
  standalone: true,
})
export class SearchAutocomplete implements OnInit {
  pokemonName: string = '';
  allPokemons: PokemonList[] | null = null;
  pokemonList: FilteredPokemonList[] | null = null;

  constructor(private router: Router, private pokeApiClient: PokeApiClient) {}

  async ngOnInit(): Promise<void> {
    await this.getPokemonsData();
  }

  async searchPokemon() {
    const nameToSearch = this.pokemonName.toLowerCase().trim();
    if (!this.allPokemons || nameToSearch.length < 3) {
      this.pokemonList = null;
      return;
    }

    const list = this.allPokemons.filter((pokemon: any) => {
      return pokemon.name.includes(nameToSearch);
    });
    if (list.length > 0) {
      const promises = list.map((entry: any) => {
        return this.pokeApiClient.getPokemonShortData(entry.name).then((data) => {
          return {
            data: data,
            name: entry.name,
            url: entry.url,
          };
        });
      });

      this.pokemonList = await Promise.all(promises);
    } else {
      this.pokemonList = [];
    }
  }
  async getPokemonsData() {
    const response = await this.pokeApiClient.getPokemonList('1500');
    this.allPokemons = response.results;
  }

  selectPokemon() {
    const nameToSearch = this.pokemonName.toLowerCase().trim();
    if (this.allPokemons) {
      const current = this.allPokemons.filter((pokemon: any) => {
        return pokemon.name === nameToSearch;
      });
      if (current.length !== 0) {
        this.navigateDetails(nameToSearch);
      }
    }
    return;
  }

  navigateDetails(pokemonName: string) {
    this.router.navigate(['/pokemon', pokemonName]);
  }
}

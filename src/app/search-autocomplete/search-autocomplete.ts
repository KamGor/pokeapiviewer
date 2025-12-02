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
import { HttpClient } from '../http-client';

@Component({
  selector: 'app-search-autocomplete',
  imports: [FormsModule, CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './search-autocomplete.html',
  styleUrl: './search-autocomplete.scss',
})
export class SearchAutocomplete implements OnInit {
  pokemonName: string = '';
  pokemonData: any = null;
  pokemonList: any = null;
  constructor(private router: Router, private httpClient: HttpClient) {}
  ngOnInit(): void {
    this.getPokemonsData();
  }

  async searchPokemon() {
    const nameToSearch = this.pokemonName.toLowerCase().trim();
    if (nameToSearch.length >= 3) {
      const allPokemons = this.pokemonData.data.results;
      const list = allPokemons.filter((pokemon: any) => {
        return pokemon.name.includes(nameToSearch);
      });
      this.pokemonList = list;
    }
  }
  async getPokemonsData() {
    this.pokemonData = await this.httpClient.get<any>(
      `https://pokeapi.co/api/v2/pokemon/?limit=100`
    );
  }

  async selectPokemon() {
    const nameToSearch = this.pokemonName.toLowerCase().trim();
    const allPokemons = this.pokemonData.data.results;

    const current = allPokemons.filter((pokemon: any) => {
      return pokemon.name === nameToSearch;
    });
    if (current.length !== 0) {
      this.navigateDetails(nameToSearch);
    }
    return;
  }

  navigateDetails(pokemonName: string) {
    this.router.navigate(['/pokemon', pokemonName]);
  }
}

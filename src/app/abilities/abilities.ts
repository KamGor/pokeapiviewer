import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PokeApiClient } from '../poke-api-client';
import { Pokemon } from '../pokemon.interface';

@Component({
  selector: 'app-abilities',
  standalone: true, //Recommended for new Angular components
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterModule, FormsModule],
  templateUrl: './abilities.html',
  styleUrl: './abilities.scss',
})
export class Abilities implements OnInit {
  pokemonName: string | null = null;
  public pokemonData!: Pokemon; // Leave sign '!' if you are suare that variabl will be initialized.

  pokemon: Pokemon | null = null;

  constructor(private route: ActivatedRoute, private pokeApiClient: PokeApiClient) {}

  ngOnInit(): void {
    // Easiest acces to parent component.
    this.route.parent?.paramMap.subscribe((params) => {
      this.pokemonName = params.get('name');

      // Call the data fetcher after the name is received.
      if (this.pokemonName) {
        this.getThePokemon();
      }
    });
  }
  //Specifying the return type and error handling
  async getThePokemon(): Promise<void> {
    if (!this.pokemonName) {
      console.error('Имя покемона не определено.');
      return;
    }

    try {
      this.pokemon = await this.pokeApiClient.getPokemon(this.pokemonName);
      // If you need to save data in pokemonData.
      this.pokemonData = this.pokemon as Pokemon;
    } catch (error) {
      console.error('Ошибка при получении данных покемона:', error);
      this.pokemon = null; // Reset if you have an error.
    }
  }
}

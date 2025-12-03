import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLinkActive, RouterModule } from '@angular/router';
import { PokeApiClient } from '../poke-api-client';
import { PrivateHabitats } from '../api-habitat/privateHabitats';

@Component({
  selector: 'app-habitats',
  imports: [CommonModule, RouterLinkActive, RouterModule, FormsModule],
  templateUrl: './habitats.html',
  styleUrl: './habitats.scss',
})
export class HabitatsPage implements OnInit {
  pokemonName: string | null = null;
  public pokemonData!: PrivateHabitats; //Leave the '!' if you are sure it will be initialized.
  PokemonHabitats: PrivateHabitats | null = null;
  constructor(private route: ActivatedRoute, private pokeApiClient: PokeApiClient) {}

  ngOnInit(): void {
    // More secure access to parent
    this.route.parent?.paramMap.subscribe((params) => {
      this.pokemonName = params.get('name');

      // Call the data fetcher after the name of pokemon is received
      if (this.pokemonName) {
        this.getPokemonHabitats();
      }
    });
  }

  async getPokemonHabitats(): Promise<void> {
    if (!this.pokemonName) {
      console.error('Имя покемона не определено.');
      return;
    }
    try {
      this.PokemonHabitats = await this.pokeApiClient.getPokemonHabitats(this.pokemonName);
      // If you need to save data in pokemonData
      this.pokemonData = this.PokemonHabitats as PrivateHabitats;
    } catch (error) {
      console.error('Ошибка при получении данных покемона:', error);
      this.PokemonHabitats = null; // Reset if you have an error
    }
  }
}

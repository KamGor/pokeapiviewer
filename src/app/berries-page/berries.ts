import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { PokeApiClient } from '../poke-api-client';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { berriesPrivate } from '../api-berries/berries-private';

@Component({
  selector: 'app-berries',
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterModule, FormsModule],
  templateUrl: './berries.html',
  styleUrl: './berries.scss',
})
export class BerriesPage implements OnInit {
  pokemonName: string | null = null;
  public pokemonData!: berriesPrivate; // Leave sign '!' if you are suare that variabl will be initialized.

  public pokemonBerries: berriesPrivate | null = null;

  constructor(private route: ActivatedRoute, private pokeApiClient: PokeApiClient) {}

  ngOnInit(): void {
    // Easiest acces to parent component.
    this.route.parent?.paramMap.subscribe((params) => {
      this.pokemonName = params.get('name');

      // Call the data fetcher after the name is received.
      if (this.pokemonName) {
        this.getPokemonBerries();
      }
    });
  }
  //Specifying the return type and error handling
  async getPokemonBerries(): Promise<void> {
    if (!this.pokemonName) {
      console.error('Имя покемона не определено.');
      return;
    }

    const _id = await this.pokeApiClient.getPokemonId(this.pokemonName);
    if (!_id) return;

    try {
      this.pokemonBerries = await this.pokeApiClient.getPokemonBerries(_id);
      // If you need to save data in pokemonData.
      this.pokemonData = this.pokemonBerries as berriesPrivate;
    } catch (error) {
      console.error('Ошибка при получении данных покемона:', error);
      this.pokemonBerries = null; // Reset if you have an error.
    }
  }
}

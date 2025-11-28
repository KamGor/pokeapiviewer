import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLinkActive, RouterModule } from '@angular/router';
import { PokeApiClient } from '../poke-api-client';
import { privateHabitats } from '../api-habitat/privateHabitats';

@Component({
  selector: 'app-habitats',
  imports: [CommonModule, RouterLinkActive, RouterModule, FormsModule],
  templateUrl: './habitats.html',
  styleUrl: './habitats.scss',
})
export class Habitats implements OnInit {
  pokemonName: string | null = null;
  public pokemonData!: privateHabitats; // Оставим '!' если уверены, что будет инициализировано
  pokemonHabitats: privateHabitats | null = null;
  constructor(private route: ActivatedRoute, private pokeApiClient: PokeApiClient) {}

  ngOnInit(): void {
    // 4. Более безопасный доступ к родителю
    this.route.parent?.paramMap.subscribe((params) => {
      this.pokemonName = params.get('name');

      // 5. Вызываем получение данных после того, как имя получено
      if (this.pokemonName) {
        // this.getThePokemon();
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
      this.pokemonHabitats = await this.pokeApiClient.getPokemonHabitats(this.pokemonName);
      // Если нужно сохранить данные в pokemonData (зависит от логики)
      this.pokemonData = this.pokemonHabitats as privateHabitats;
    } catch (error) {
      console.error('Ошибка при получении данных покемона:', error);
      this.pokemonHabitats = null; // Сбросить, если произошла ошибка
    }
  }
}

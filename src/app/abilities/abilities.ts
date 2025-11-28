import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Pokemono } from '../pokemon_interface';
import { PokeApiClient } from '../poke-api-client';

@Component({
  selector: 'app-abilities',
  standalone: true, // Рекомендуется для новых компонентов Angular
  imports: [
    CommonModule, // Теперь нужен, если компонент автономный (Standalone)
    RouterLink,
    RouterLinkActive,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './abilities.html',
  styleUrl: './abilities.scss',
})
export class Abilities implements OnInit {
  pokemonName: string | null = null;
  public pokemonData!: Pokemono; // Оставим '!' если уверены, что будет инициализировано

  pokemon: Pokemono | null = null;

  constructor(private route: ActivatedRoute, private pokeApiClient: PokeApiClient) {}

  ngOnInit(): void {
    // 4. Более безопасный доступ к родителю
    this.route.parent?.paramMap.subscribe((params) => {
      this.pokemonName = params.get('name');

      // 5. Вызываем получение данных после того, как имя получено
      if (this.pokemonName) {
        this.getThePokemon();
      }
    });
  }

  // 6. Уточнение возвращаемого типа и обработка ошибок
  async getThePokemon(): Promise<void> {
    if (!this.pokemonName) {
      console.error('Имя покемона не определено.');
      return;
    }

    try {
      this.pokemon = await this.pokeApiClient.getPokemon(this.pokemonName);
      // Если нужно сохранить данные в pokemonData (зависит от логики)
      this.pokemonData = this.pokemon as Pokemono;
    } catch (error) {
      console.error('Ошибка при получении данных покемона:', error);
      this.pokemon = null; // Сбросить, если произошла ошибка
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { PokeApiClient } from '../poke-api-client';

@Component({
  selector: 'app-search-autocomplete',
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './search-autocomplete.html',
  styleUrl: './search-autocomplete.scss',
  standalone: true, // Добавьте standalone: true, если это автономный компонент
})
export class SearchAutocomplete implements OnInit {
  pokemonName: string = ''; // Используйте типизацию, если возможно (например, {name: string, url: string}[])
  allPokemons: any[] | null = null;
  pokemonList: any[] | null = null;

  constructor(private router: Router, private pokeApiClient: PokeApiClient) {}

  async ngOnInit(): Promise<void> {
    // 💡 СДЕЛАЙТЕ ngOnInit АСИНХРОННЫМ
    await this.getPokemonsData(); // Не вызывайте searchPokemon() здесь, так как он должен вызываться при вводе
  }

  async searchPokemon() {
    const nameToSearch = this.pokemonName.toLowerCase().trim(); // 1. Проверка инициализации и длины ввода
    if (!this.allPokemons || nameToSearch.length < 3) {
      this.pokemonList = null; // Очищаем список, если ввод короткий или данные не загружены
      return;
    } // 2. Фильтрация

    const list = this.allPokemons.filter((pokemon: any) => {
      return pokemon.name.includes(nameToSearch);
    }); // 3. Получение данных и обработка Промисов
    if (list.length > 0) {
      // 💡 ИСПРАВЛЕНИЕ: map возвращает массив промисов БЕЗ await внутри!
      const promises = list.map((entry: any) => {
        return this.pokeApiClient.getPokemonShortData(entry.name).then((data) => {
          // Когда Промис разрешится, форматируем результат
          return {
            data: data,
            name: entry.name,
            url: entry.url,
          };
        });
      }); // 4. Ожидание всех промисов

      this.pokemonList = await Promise.all(promises);
    } else {
      this.pokemonList = [];
    }
  } // 💡 ИСПРАВЛЕНИЕ: Сохраняем только массив результатов
  async getPokemonsData() {
    const response = await this.pokeApiClient.getPokemonList('', 1328); // Предполагаем, что response имеет свойство .results, как в API
    this.allPokemons = response.results;
    console.log('Total:', this.allPokemons?.length);
  }

  selectPokemon() {
    const nameToSearch = this.pokemonName.toLowerCase().trim(); // Используем allPokemons, который мы уже загрузили
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

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { PokeApiClient } from '../app.api-client';
import { PokemonListItem, PokemonShortData } from '../interfaces/pokemon';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  searchName: string = '';
  pokemonListResponse: PokemonShortData[] = [];
  pokemonList: PokemonListItem[] = [];
  pokemonListAll: PokemonListItem[] = [];
  filteredPokemon: PokemonListItem[] = [];

  countPokemon: number = 0;
  totalPages: number = 0;
  currentPageNumber: number = 1; // Используем только одну переменную для текущей страницы
  itemsPerPage: number = 20;

  loading: boolean = false;
  error: boolean = false;
  errorMessage: string = '';

  constructor(private pokeApiClient: PokeApiClient) {}

  async ngOnInit(): Promise<void> {
    await this.getPokemonList();
  }

  async getPokemonList() {
    this.loading = true;
    try {
      const responseAll = await this.pokeApiClient.getPokemonList(1500);
      this.pokemonListAll = responseAll.results;
      this.countPokemon = responseAll.count;

      // Изначально отфильтрованный список — это все покемоны
      this.filteredPokemon = this.pokemonListAll;

      this.updatePaginationMetadata();
      await this.loadCurrentPage();
    } catch (err) {
      this.error = true;
    } finally {
      this.loading = false;
    }
  }

  async updateList() {
    if (this.pokemonList && this.pokemonList.length > 0) {
      const pokemonPromises: Promise<PokemonShortData>[] = [];

      for (const pokemon of this.pokemonList) {
        const pokemonPromise = this.pokeApiClient.getPokemon(pokemon.url);
        pokemonPromises.push(pokemonPromise.then((response) => response.data));
      }
      this.pokemonListResponse = await Promise.all(pokemonPromises);
    }
  }

  async searchPokemon() {
    const nameToSearch = this.searchName.toLowerCase().trim();

    // Если поиск пустой — показываем всех покемонов
    if (nameToSearch.length === 0) {
      this.filteredPokemon = this.pokemonListAll;
    } else {
      // Фильтруем по имени
      this.filteredPokemon = this.pokemonListAll.filter((pokemon) =>
        pokemon.name.includes(nameToSearch)
      );
    }

    // Сбрасываем пагинацию на 1 страницу после каждого нового поиска
    this.currentPageNumber = 1;
    this.updatePaginationMetadata();
    this.loadCurrentPage();
  }

  // Выносим обновление метаданных в отдельную функцию
  updatePaginationMetadata() {
    this.totalPages = Math.ceil(
      this.filteredPokemon.length / this.itemsPerPage
    );
  }

  // Метод для загрузки данных конкретно для текущей страницы из отфильтрованного списка
  async loadCurrentPage() {
    const start = (this.currentPageNumber - 1) * this.itemsPerPage;
    console.log('start', start);
    const end = start + this.itemsPerPage;

    // Берем "кусок" из отфильтрованного списка
    this.pokemonList = this.filteredPokemon.slice(start, end);
    await this.updateList();
  }

  // Геттер для динамического расчета кнопок пагинации
  get visiblePages(): (number | string)[] {
    const total = this.totalPages;
    const current = this.currentPageNumber;
    const pages: (number | string)[] = [];

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    pages.push(1);

    if (current > 3) {
      pages.push('...');
    }

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < total - 2) {
      pages.push('...');
    }

    pages.push(total);

    return pages;
  }

  goToPage(page: number | string) {
    if (typeof page !== 'number') return;
    if (page < 1 || page > this.totalPages) return;

    this.currentPageNumber = page;
    this.loadCurrentPage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Методы "Вперед/Назад" теперь просто используют базовый метод goToPage
  goToNextPage() {
    this.goToPage(this.currentPageNumber + 1);
  }

  goToPreviousPage() {
    this.goToPage(this.currentPageNumber - 1);
  }
}

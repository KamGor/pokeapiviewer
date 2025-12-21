import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PokeApiClient } from '../poke-api-client';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Berry, BerriesListItem } from '../api-berries/berries-private';

@Component({
  selector: 'app-berries',
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './berries.html',
  styleUrl: './berries.scss',
})
export class BerriesPage implements OnInit {
  berryName: string | null = null;
  berriesList: BerriesListItem[] = [];
  berryDetails: Berry = {} as Berry;
  nextBerries: string | null = null;
  prevBerries: string | null = null;

  constructor(private router: Router, private pokeApiClient: PokeApiClient) {}

  async ngOnInit(): Promise<void> {
    this.getBerriesList();
  }

  async getBerriesList(limit?: string, offset?: string): Promise<void> {
    try {
      const data = await this.pokeApiClient.getBerries(limit, offset);
      console.log('data', data);
      this.berriesList = data.results;
      this.nextBerries = data.next;
      this.prevBerries = data.previous;
    } catch (error) {
      console.error('error:', error);
      this.berriesList = [];
      this.nextBerries = null;
      this.prevBerries = null;
    }
  }

  async paginationHandler(direction: 'prev' | 'next'): Promise<void> {
    const handler = direction === 'next' ? this.nextBerries : this.prevBerries;

    // if handler not empty
    if (handler) {
      const url = new URL(handler);
      const limit = url.searchParams.get('limit') ?? '';
      console.log('limit', limit);
      const offset = url.searchParams.get('offset') ?? '';
      await this.getBerriesList(limit, offset);
    }
  }

  get isPrevDisabled(): boolean {
    // button is off (true), if prevBerries === null
    return this.prevBerries === null;
  }

  get isNextDisabled(): boolean {
    return this.nextBerries === null;
  }
  get isList(): boolean {
    const urlParts = this.router.url.split('/');
    return urlParts.length <= 2;
  }

  navigateDetails(name: string) {
    this.router.navigate(['/pokemon', name]);
  }

  /**
   * funkjca loadDetails
   *
   * Po klikniecui na Berries robimy request do API
   * loctions i sprawdzamy czy jest w berry object area.
   * Jezeli jest area to robimy request na API area i zwracamy danne.
   * @param name
   */
  async loadDetails(name: string) {
    this.berryDetails = await this.pokeApiClient.getPokemonBerries(name);
  }
}

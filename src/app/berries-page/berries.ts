import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PokeApiClient } from '../poke-api-client';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BerriesPrivate, BerriesListItem } from '../api-berries/berries-private';

@Component({
  selector: 'app-berries',
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './berries.html',
  styleUrl: './berries.scss',
})
export class BerriesPage implements OnInit {
  mainQuery: string = 'https://pokeapi.co/api/v2/berry/';
  berryName: string | null = null;
  berriesList: BerriesListItem[] = [];
  berryDetails: BerriesPrivate = {} as BerriesPrivate;
  nextBerries: string | null = null;
  prevBerries: string | null = null;

  constructor(private router: Router, private pokeApiClient: PokeApiClient) {}

  async ngOnInit(): Promise<void> {
    this.getBerriesList(this.mainQuery);
  }

  async getBerriesList(url: string) {
    try {
      const data = await this.pokeApiClient.getBerries(url);
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
      await this.getBerriesList(handler);
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

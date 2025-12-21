import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  Item,
  ItemAttributes,
  ItemCategory,
  ItemDetails,
} from '../interfaces/pokemon';
import { PokeApiClient } from '../app.api-client';
import { RouterLink, RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-characteristic-page',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RouterOutlet],
  templateUrl: './characteristic-page.component.html',
  styleUrl: './characteristic-page.component.css',
})
export class CharacteristicPageComponent implements OnInit {
  listItems: Item[] = [];
  ItemData: ItemDetails | null = null;
  itemAtributes: ItemAttributes | null = null;
  itemCategories: ItemCategory | null = null;
  constructor(private router: Router, private pokeApiClient: PokeApiClient) {}
  ngOnInit(): void {
    this.getItemList('https://pokeapi.co/api/v2/item/');
  }

  async getItemList(url: string): Promise<void> {
    try {
      this.pokeApiClient.getListItem(url).then((data) => {
        this.listItems = data.results;
      });
    } catch (error) {
      console.error('error:', error);
      this.listItems = [];
    }
  }

  async showDetails(url: string) {
    const data = await this.pokeApiClient.getItemDetails(url);
    this.ItemData = data;
    console.log('ItemData', this.ItemData);
  }

  async showAtributes(url: string) {
    const data = await this.pokeApiClient.getItemAtributes(url);
    this.itemAtributes = data;
  }

  gotoPage(name: string) {
    this.router.navigate([name, '']);
  }

  async showCategory(url: string) {
    const data = await this.pokeApiClient.getItemCategory(url);
    this.itemCategories = data;
    console.log('itemCategories', this.itemCategories);
  }
}

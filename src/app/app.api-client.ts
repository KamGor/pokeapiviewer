import { Injectable } from '@angular/core';
import { HttpClient } from './app.http-client';
import {
  ItemAttributes,
  ItemCategory,
  ItemDetails,
  ItemList,
  PokemonCharacteristic,
  PokemonListResponse,
  PokemonShortData,
} from './interfaces/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokeApiClient {
  private readonly BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
  constructor(private httpClient: HttpClient) {}

  async getPokemonList(count?: number, offset?: number) {
    const URL = count
      ? this.BASE_URL + '/?limit=' + count + '&offset=' + offset
      : this.BASE_URL;
    const { data } = await this.httpClient.get<PokemonListResponse>(URL);
    return data;
  }

  async getListItem(url: string) {
    const { data } = await this.httpClient.get<ItemList>(url);
    console.log('item', data);
    return data;
  }

  async getItemDetails(url: string) {
    const { data } = await this.httpClient.get<ItemDetails>(url);
    return data;
  }

  async getItemAtributes(url: string) {
    const { data } = await this.httpClient.get<ItemAttributes>(url);
    console.log('getItemAtributes', data);
    return data;
  }

  async getItemCategory(url: string) {
    const { data } = await this.httpClient.get<ItemCategory>(url);
    console.log('getItemCategory', data);
    return data;
  }

  async getPokemon(url: string) {
    const data = await this.httpClient.get<PokemonShortData>(url);
    return data;
  }

  async getListPokemons(url: string) {
    const { data } = await this.httpClient.get<PokemonListResponse>(url);
    return data;
  }
}

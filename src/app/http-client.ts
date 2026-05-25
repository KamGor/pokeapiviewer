import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class HttpClient {
  get<PokemonAnswer>(url: string, params?: URLSearchParams) {
    return axios.get<PokemonAnswer>(url, {
      params,
    });
  }
}

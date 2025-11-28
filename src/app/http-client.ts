import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class HttpClient {
  get<pokemonAnswer>(url: string, params?: URLSearchParams) {
    return axios.get<pokemonAnswer>(url, {
      params,
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { PokeApiClient } from '../poke-api-client';
import axios from 'axios';

@Component({
  selector: 'app-list',
  imports: [FormsModule, CommonModule, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class ListPage implements OnInit {
  prevPokemons: any = '';
  nextPokemons: any = '';
  listPokemons: any = '';
  mainQuery: string = 'https://pokeapi.co/api/v2/pokemon/';
  isPrev: boolean = true;
  isNext: boolean = true;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pokeApiClient: PokeApiClient
  ) {}
  async ngOnInit() {
    this.getPokemonList(this.mainQuery);
  }

  async getPokemonList(handler: string) {
    const { data } = await axios.get<any>(handler);
    this.listPokemons = data.results;
    this.nextPokemons = data.next;
    this.prevPokemons = data.previous;
    this.isClickable();
  }

  async paginationHandler(handlerEvent: string) {
    const handler = handlerEvent === 'next' ? this.nextPokemons : this.prevPokemons;
    this.getPokemonList(handler);
  }

  async isClickable() {
    this.isPrev = this.prevPokemons ? false : true;
    this.isNext = this.nextPokemons ? false : true;
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { PokeApiClient } from '../poke-api-client';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../pokemonPrivate';

@Component({
  selector: 'app-search',
  imports: [FormsModule, CommonModule, RouterOutlet, RouterLink],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search implements OnInit {
  pokemonName: string | undefined = '';
  pokemon!: Pokemon | undefined;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pokeApiClient: PokeApiClient
  ) {}
  async ngOnInit() {
    const pokemonId = this.activatedRoute.snapshot.paramMap.get('name');
    if (pokemonId === null) return;
    this.pokemon = await this.pokeApiClient.getPokemon(pokemonId);
    // this.offBtn();
  }
}

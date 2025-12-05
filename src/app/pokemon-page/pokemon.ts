import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
  RouterLinkActive,
} from '@angular/router';
import { PokeApiClient } from '../poke-api-client';

@Component({
  selector: 'app-pokemon',
  imports: [FormsModule, CommonModule, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './pokemon.html',
  styleUrl: './pokemon.scss',
})
export class PokemonPage implements OnInit {
  pokemonName: string | undefined;
  pokemon: any = null;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pokeApiClient: PokeApiClient
  ) {}

  async ngOnInit() {
    const pokemonId = this.activatedRoute.snapshot.paramMap.get('name');
    if (pokemonId === null) return;
    this.pokemon = await this.pokeApiClient.getPokemon(pokemonId);
  }

  get isBaseRouteActive(): boolean {
    const urlParts = this.router.url.split('/');
    return urlParts.length <= 3;
  }
}

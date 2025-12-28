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
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemon',
  imports: [FormsModule, CommonModule, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './pokemon.html',
  styleUrl: './pokemon.scss',
})
export class PokemonPage implements OnInit {
  pokemonName: string | undefined;
  pokemon: any = null;
  pokemonList: any[] | null = null;
  public error: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pokeApiClient: PokeApiClient
  ) {}

  async ngOnInit() {
    try {
      const pokemonId = this.activatedRoute.snapshot.paramMap.get('name');
      if (pokemonId === null) return;
      this.pokemon = await this.pokeApiClient.getPokemon(pokemonId);
      console.log('pokemon', this.pokemon);
    } catch (error) {
      if (error) {
        this.error = true;
      }
    }
  }

  get isBaseRouteActive(): boolean {
    const urlParts = this.router.url.split('/');
    return urlParts.length <= 3;
  }

  get isDataLoaded(): boolean {
    if (this.pokemon?.id) {
      return true;
    }
    return false;
  }

  navigateDetails(abilityName: string) {
    this.router.navigate(['/abilities', abilityName]);
  }

  playCry(audioUrl: string | undefined) {
    if (!audioUrl) return;

    const audio = new Audio(audioUrl);
    audio.load(); // Предзагрузка
    audio.play().catch((error) => {
      console.error('Ошибка воспроизведения:', error);
    });
  }
  getStatColor(statName: string): string {
    switch (statName.toLowerCase()) {
      case 'hp':
        return '#4ade80'; // Green
      case 'attack':
        return '#f87171'; // Red
      case 'defense':
        return '#60a5fa'; // Blue
      case 'special-attack':
        return '#f472b6'; // Pink
      case 'special-defense':
        return '#a78bfa'; // Purple
      case 'speed':
        return '#fbbf24'; // Yellow
      default:
        return '#ffffff'; // Default color
    }
  }
}

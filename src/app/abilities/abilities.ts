import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PokeApiClient } from '../poke-api-client';

@Component({
  selector: 'app-abilities',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterModule, FormsModule],
  templateUrl: './abilities.html',
  styleUrl: './abilities.scss',
})
export class Abilities implements OnInit {
  ability: any | null = null;
  constructor(private route: ActivatedRoute, private pokeApiClient: PokeApiClient) {}

  ngOnInit(): void {
    const abilityName = this.route.snapshot.paramMap.get('name');

    if (abilityName) {
      this.getThePokemon(abilityName);
    }
  }
  //Specifying the return type and error handling
  async getThePokemon(name: string): Promise<void> {
    if (!name) {
      console.error('No ability name');
      return;
    }

    try {
      this.ability = await this.pokeApiClient.getAbility(name);
    } catch (error) {
      console.error('Ошибка при получении данных покемона:', error);
      this.ability = null; // Reset if you have an error.
    }
  }
}

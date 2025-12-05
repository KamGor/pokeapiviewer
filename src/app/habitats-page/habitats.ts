import { CommonModule } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PokeApiClient } from '../poke-api-client';
import { Habitat, HabitatsList } from '../api-habitat/PokemonHabitats';
import { PrivateHabitats } from '../api-habitat/PrivateHabitats';

@Component({
  selector: 'app-habitats',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './habitats.html',
  styleUrl: './habitats.scss',
})
export class HabitatsPage implements OnInit {
  habitatsList: HabitatsList | null = null;
  habitatData: Habitat | any; // I used any one, because the Habitat interface required so many properties.
  habitatSpecies: PrivateHabitats | null = null;

  constructor(
    private router: Router,
    private pokeApiClient: PokeApiClient,
    private activatedRoute: ActivatedRoute
  ) {}

  @ViewChildren('habitSection') habitSections!: QueryList<ElementRef>;

  async ngOnInit(): Promise<any> {
    this.habitatsList = await this.pokeApiClient.getHabitatsList();
    const habitatName = this.activatedRoute.snapshot.paramMap.get('name');
    if (habitatName) {
      this.habitatData = await this.pokeApiClient.getHabitatsData(habitatName);
      this.habitatSpecies = await this.pokeApiClient.getPokemonHabitat(habitatName);
    }
  }

  navigateDetails(habitatName: string) {
    this.router.navigate(['/habitats', habitatName]);
  }
  navigatePokemon(targetName: string) {
    if (!this.habitatSpecies) return;
    const targetIndex = this.habitatSpecies.pokemonSpecies.findIndex((s) => s.name === targetName);

    if (targetIndex >= 0) {
      // We get the ElementRef of the desired element by index
      const elementToScroll = this.habitSections.toArray()[targetIndex];

      if (elementToScroll) {
        // Call to method scrollIntoView()
        elementToScroll.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    } else {
      console.warn(`Element with name "${targetName}" not found`);
    }
  }

  get isList(): boolean {
    const urlParts = this.router.url.split('/');
    return urlParts.length > 3;
  }
}

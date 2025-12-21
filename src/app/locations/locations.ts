import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { PokeApiClient } from '../poke-api-client';
import { LocationsListItem, LocationsDetails, locationAreas } from './locations-interfaces';

@Component({
  selector: 'app-locations',
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './locations.html',
  styleUrl: './locations.scss',
})
export class Locations implements OnInit {
  locationName: string | null = null;
  locationList: LocationsListItem[] = [];
  locationDetails: LocationsDetails = {} as LocationsDetails;
  locationAreas: locationAreas[] = [];
  nextLocations: string | null = null;
  prevLocations: string | null = null;

  constructor(private router: Router, private pokeApiClient: PokeApiClient) {}

  async ngOnInit(): Promise<void> {
    this.getLocationList();
  }

  async getLocationList(limit?: string, offset?: string): Promise<void> {
    try {
      const data = await this.pokeApiClient.getLocations(limit, offset);
      this.locationList = data.results;
      this.nextLocations = data.next;
      this.prevLocations = data.previous;
    } catch (error) {
      console.error('error:', error);
      this.locationList = [];
      this.nextLocations = null;
      this.prevLocations = null;
    }
  }

  async paginationHandler(direction: 'prev' | 'next'): Promise<void> {
    const handler = direction === 'next' ? this.nextLocations : this.prevLocations;

    // if handler not empty
    if (handler) {
      const url = new URL(handler);
      const limit = url.searchParams.get('limit') ?? '';
      const offset = url.searchParams.get('offset') ?? '';

      await this.getLocationList(limit, offset);
    }
  }

  get isPrevDisabled(): boolean {
    // button is off (true), if prevLocations === null
    return this.prevLocations === null;
  }

  get isNextDisabled(): boolean {
    return this.nextLocations === null;
  }
  get isList(): boolean {
    const urlParts = this.router.url.split('/');
    return urlParts.length <= 2;
  }

  navigateDetails(name: string) {
    this.router.navigate(['/pokemon', name]);
  }

  /**
   * funkjca loadDetails
   *
   * Po klikniecui na locations robimy request do API
   * loctions i sprawdzamy czy jest w location object area.
   * Jezeli jest area to robimy request na API area i zwracamy danne.
   * @param name
   */
  async loadDetails(name: string) {
    this.locationDetails = await this.pokeApiClient.getLocationData(name);
    const areasList = [];
    if (this.locationDetails.areas.length > 0) {
      for (const area of this.locationDetails.areas) {
        const locationArea = await this.pokeApiClient.getAreaData(area.name);
        areasList.push(locationArea);
      }
    }
    this.locationAreas = areasList;
  }
}

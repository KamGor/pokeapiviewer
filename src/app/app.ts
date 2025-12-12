import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SearchAutocomplete } from './search-autocomplete/search-autocomplete';
import { NotFoundPage } from './notFound-page/not-found-page';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterOutlet,
    FormsModule,
    CommonModule,
    SearchAutocomplete,
    FormsModule,
    CommonModule,
    NotFoundPage,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('PokeAPIViewer');
  public isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SearchAutocomplete } from './search-autocomplete/search-autocomplete';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterOutlet, FormsModule, CommonModule, SearchAutocomplete],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('PokeAPIViewer');
}

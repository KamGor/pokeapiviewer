import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchAutocomplete } from '../search-autocomplete/search-autocomplete';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterOutlet,
    FormsModule,
    CommonModule,
    SearchAutocomplete,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.scss',
})
export class NotFoundPage {}

import { Component, OnInit } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.css']
})
export class ItemSearchComponent implements OnInit {

  items$!: Observable<Item[]>;
  noResults: boolean = false;
  
  private searchTerms = new Subject<string>();

  constructor(private itemService: ItemService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);

      // Set noResults to false immediately to hide any previous message
    this.noResults = false;

    // Set a timeout to hide the message after 3 seconds
    setTimeout(() => {
      this.noResults = false;
    }, 3000);
  }

  ngOnInit(): void {
    this.items$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.itemService.searchItems(term)),
    );

    this.items$.subscribe((results: Item[]) => {
      this.noResults = results.length === 0;
    });
  }
}

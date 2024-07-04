import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { Item } from '../models/item';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  //usar na entrega apenas :
  private itemsUrl = 'http://appserver.alunos.di.fc.ul.pt:3004/items';
  //private itemsUrl = 'http://localhost:3004/items';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    /** Log a ItemService message with the MessageService */
 private log(message: string) {
    this.messageService.add(`ItemService: ${message}`);
  } 


private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    console.error(error); // log to console instead

    this.log(`${operation} failed: ${error.message}`);

    return of(result as T);
  };
}


  /* GET all items*/
  getAllItems(): Observable<Item[]> {
    console.log("Getting all items from the server!");
    return this.http.get<Item[]>(`${this.itemsUrl}`, this.httpOptions)
      .pipe(
        tap(_=> this.log('fetched items')),
        catchError(this.handleError<Item[]>('getAllItems', []))
      );
  }

  /* GET item details by id */
  getItemDetail(id_item: string): Observable<Item> {
    console.log("ASKING FOR ITEM DETAIL IN SERVICE")
    const url = `${this.itemsUrl}/${id_item}/detail`;
    return this.http.get<Item>(url).pipe(
      tap(_ => this.log(`fetched item detail id=${id_item}`)),
      catchError(this.handleError<Item>(`getItemDetail id=${id_item}`))
    );
  }

   /* GET items whose description contains search term */
   searchItems(term: string): Observable<Item[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }

    const params = new HttpParams().set('description', term);

    return this.http.get<Item[]>(`${this.itemsUrl}`, { params }).pipe(
      map(items => items.filter(item => item.description.toLowerCase().includes(term.toLowerCase()))),
      tap(filteredItems => filteredItems.length ?
        this.log(`found items matching "${term}"`) :
        this.log(`no items matching "${term}"`)),
      catchError(this.handleError<Item[]>('searchItems', []))
    );
  }
}

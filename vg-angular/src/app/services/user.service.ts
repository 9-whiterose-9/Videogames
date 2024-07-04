import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../models/user';
import {Item} from '../models/item';

@Injectable({providedIn: 'root'})
export class UserService {
  //usar na entrega apenas e TROCAR DIRETAMENTE NO getUserListDetail:
  private usersURL = 'http://appserver.alunos.di.fc.ul.pt:3004/users';
  private createURL='http://appserver.alunos.di.fc.ul.pt:3004/users/create';

  //private usersURL = 'http://localhost:3004/users';
  //private createURL='http://localhost:3004/users/create';
  // private defaultPicURL= "/profilePics/defaultPfp.jpg";
  

  httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  //quem esta a fazer a US2 tem que adicionar a AuthService ao conjunto dos services
  constructor(private http: HttpClient/* ,  private authService: AuthService */) { }

  /**
   * GET users from server
   * 
   * @returns List of users saved in the server
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersURL);
  }

  
  getUser(name: String): Observable<User> {
    const url = `${this.usersURL}/name/${name}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user name=${name}`)),
      // catchError(this.handleError<User>(`getUser name=${name}`))
      catchError((error:HttpErrorResponse)=>{
        if (error.status === 404) {
          return throwError(() => new Error('User not found'));
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  getUserById(id:String):Observable<User>{
    const url = `${this.usersURL}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user with id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`)));
  }

  getUserItemsById(id:String):Observable<Item[]>{
    const url = `${this.usersURL}/${id}/items`;
    return this.http.get<Item[]>(url).pipe(
      tap(_ => this.log(`fetched user with id=${id}`)),
      catchError(this.handleError<Item[]>(`getUserItemsById id=${id}`)));
  }

  getUserFollowersById(id:String):Observable<User[]>{
    const url = `${this.usersURL}/${id}/followers`;
    return this.http.get<User[]>(url).pipe(
      tap(_ => this.log(`fetched user with id=${id}`)),
      catchError(this.handleError<User[]>(`getUserFollowersById id=${id}`)));
  }
  
  getUserFollowingById(id:String):Observable<User[]>{
    const url = `${this.usersURL}/${id}/following`;
    return this.http.get<User[]>(url).pipe(
      tap(_ => this.log(`fetched user with id=${id}`)),
      catchError(this.handleError<User[]>(`getUserFollowingById id=${id}`)));
  }

  getUserListsById(id:String):Observable<{ list_name: string, list_items: Item[] }[]>{
    const url = `${this.usersURL}/${id}/mylists`;
    return this.http.get<{ list_name: string, list_items: Item[] }[]>(url).pipe(
      tap(_ => this.log(`fetched user with id=${id}`)),
      catchError(this.handleError<{ list_name: string, list_items: Item[] }[]>(`getUserListsById id=${id}`)));
  }

  /* GET user lists details by id */
getUserListDetail(id: string, name_list: string): Observable<{ list_name: string, list_items: Item[]}> {
  console.log("ASKING FOR USERLIST DETAIL IN SERVICE")
  const url = `http://appserver.alunos.di.fc.ul.pt:3004/profile/${id}/mylists/${name_list}/detail`;
  return this.http.get<{ list_name: string, list_items: Item[]}>(url).pipe(
    tap(_ => this.log(`fetched userlist detail name=${name_list}`)),
    catchError(this.handleError<{ list_name: string, list_items: Item[]}>(`getUserListDetail name=${name_list}`))
  );
}

  /** POST: add a new user to the server */
  addUser(user: User): Observable<any> {
    console.log('POST: add a new user to the server');
    return this.http.post<User>(this.createURL, user, this.httpOptions).pipe(
      tap((newUser: User) => this.log(`added user w/ id=${newUser._id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  // getDefaultPfp():String{
  //   return this.defaultPicURL;
  // }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
    
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
    
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
    
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message)
  }

}

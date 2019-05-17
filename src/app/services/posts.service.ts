import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Post, User} from '../classes/classes';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {
  }


  getPosts(): Observable<Post[]> {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    return this.http.get<Post[]>(url).pipe();
  }

  getPostsByUser(userId: string): Observable<Post[]> {
    const url = 'https://jsonplaceholder.typicode.com/posts?userId=' + userId;
    return this.http.get<Post[]>(url).pipe();
  }


  getUsers(): Observable<User[]> {
    const url = 'https://jsonplaceholder.typicode.com/users';
    return this.http.get<User[]>(url).pipe();
  }

}



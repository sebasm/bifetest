import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Post, User} from '../classes/classes';
import {Injectable} from '@angular/core';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {
  }

  // posts

  getPost(id: string): Observable<Post> {
    const url = 'https://jsonplaceholder.typicode.com/posts?id=' + id;
    return this.http.get<Post>(url);
  }

  getPosts(): Observable<Post[]> {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    return this.http.get<Post[]>(url);
  }

  getPostsByUser(userId: string): Observable<Post[]> {
    const url = 'https://jsonplaceholder.typicode.com/posts?userId=' + userId;
    return this.http.get<Post[]>(url);
  }

  deletePost(id: string): Observable<{}> {
    const url = 'https://jsonplaceholder.typicode.com/posts/' + id;
    return this.http.delete(url);
  }

  // users

  getUsers(): Observable<User[]> {
    const url = 'https://jsonplaceholder.typicode.com/users';
    return this.http.get<User[]>(url);
  }

  // comments

  getCommentsByPost(id: string): Observable<Comment[]> {
    const url = 'https://jsonplaceholder.typicode.com/comments?postId=' + id;
    return this.http.get<Comment[]>(url);
  }

}



import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Post, User} from '../classes/classes';
import {PostsService} from '../services/posts.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  posts: Observable<Post[]>;
  users: Observable<User[]>;

  profileForm = new FormGroup({
    selectedUser: new FormControl('1'),
  });
  // selectedUser = '1';

  constructor(private postService: PostsService) { }

  ngOnInit() {
    this.posts = this.postService.getPosts();
    this.users = this.postService.getUsers();
  }

  filterUser(filterVal: string) {
    if (filterVal === '-1') {
      this.posts = this.postService.getPosts();
    } else {
      this.posts = this.postService.getPostsByUser(filterVal);
    }
  }

  deletePost(postId: string) {
    this.postService.deletePost(postId).subscribe(x => {
      alert('El post se borro satisftactoriamente');
      }, error1 => this.errorModal(error1));
  }

  errorModal(error) {
    // Manejo del tipo de error e info al usuario de una forma elegante.
    alert('Ocurrio un error intentando realizar la operacion');
  }

}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {Post, User} from '../classes/classes';
import {PostsService} from '../services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  id: string;
  users: Observable<User[]>;

  postSubscription: Subscription;
  commentsSubscription: Subscription;

  showComments = false;
  comments: Comment[];

  // Todos los campos del form son requeridos para el submit (el boton submit de habilita en la vista dependiendo del estaod valid del form)
  postForm = new FormGroup({
    user: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    body: new FormControl('', [Validators.required]),
  });

  constructor(
    private activateRoute: ActivatedRoute,
    private postService: PostsService) { }

  ngOnInit() {
    this.users = this.postService.getUsers();
    this.id = this.activateRoute.snapshot.paramMap.get('id');
    // Si viene el id en la URL estamos mostrando un post, traigo los datos del mismo y deshabilito el form para ser solo lectura
    if (this.id !== null) {
      this.postSubscription =  this.postService.getPost(this.id).subscribe((post: Post) => {
        this.postForm.get('title').setValue(post[0].title);
        this.postForm.get('body').patchValue(post[0].body);
        this.postForm.get('user').patchValue(post[0].userId);
      });
      this.postForm.disable();
    }
  }

  switchComments() {
    if (this.showComments) {
      this.showComments = false;
    } else {
      this.showComments = true;
      // Voy a buscarlos solo la primera vez
      if (!this.comments) {
        this.commentsSubscription = this.postService.getCommentsByPost(this.id).subscribe( comments => {
          this.comments = comments;
        });
      }
    }
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
    if (this.commentsSubscription) {
      this.commentsSubscription.unsubscribe();
    }
  }

  onSubmit() {
    // Obtengo los datos del formulario, creo un objeto con el formato que espera la api y lo envio en un POST
  }

}

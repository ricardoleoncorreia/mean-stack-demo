import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { Post } from '../shared/posts.interfaces';
import { PostsService } from '../shared/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  subscription: Subscription = new Subscription();

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    const savePosts = (posts: Post[]) => this.posts = posts;
    this.subscription.add(this.postsService.getPosts().subscribe(savePosts));
    this.subscription.add(this.postsService.getPostsUpdatedListener().subscribe(savePosts));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDelete(postId: string): void {
    this.subscription.add(this.postsService.deletePost(postId).subscribe());
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../shared/posts.interfaces';
import { PostsService } from '../shared/posts.service';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
    posts: Post[] = [];
    subscription: Subscription;

    constructor(private postsService: PostsService) {}

    ngOnInit(): void {
        this.posts = this.postsService.getPosts();
        this.subscription = this.postsService.getPostsUpdatedListener()
                                             .subscribe((posts: Post[]) => this.posts = posts);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}

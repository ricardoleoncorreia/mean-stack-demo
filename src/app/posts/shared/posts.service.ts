import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Post } from './posts.interfaces';

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated: Subject<Post[]> = new Subject<Post[]>();

    getPosts(): Post[] {
        return [...this.posts];
    }

    getPostsUpdatedListener(): Observable<Post[]> {
        return this.postsUpdated.asObservable();
    }

    addPost(title: string, content: string): void {
        const post: Post = { title, content };
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
    }
}
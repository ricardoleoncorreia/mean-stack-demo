import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Post, ServerData } from './posts.interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    private posts: Post[] = [];
    private postsUpdated: Subject<Post[]> = new Subject<Post[]>();

    constructor(private http: HttpClient) {}

    getPosts(): Observable<Post[]> {
        const extractPosts = map((response: ServerData<Post[]>) => response.body);
        const savePosts = tap((posts: Post[]) => this.posts = posts);
        return this.http.get<ServerData<Post[]>>('http://localhost:3000/api/posts').pipe(extractPosts, savePosts);
    }

    getPostsUpdatedListener(): Observable<Post[]> {
        return this.postsUpdated.asObservable();
    }

    addPost(title: string, content: string): Observable<ServerData> {
        const post: Post = { id: null, title, content };
        return this.http.post<ServerData>('http://localhost:3000/api/posts', post)
                        .pipe(tap(() => {
                            this.posts.push(post);
                            this.postsUpdated.next([...this.posts]);
                        }));
    }
}
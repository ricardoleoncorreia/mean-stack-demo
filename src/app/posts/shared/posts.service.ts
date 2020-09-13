import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';
import { MongoPost, Post, ServerData } from './posts.interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    private posts: Post[] = [];
    private postsUpdated: Subject<Post[]> = new Subject<Post[]>();

    constructor(private http: HttpClient) {}

    getPosts(): Observable<Post[]> {
        const extractPosts = map((response: ServerData<MongoPost[]>) => {
          return response.body.map(post => ({ id: post._id, title: post.title, content: post.content}))
        });
        const savePosts = tap((posts: Post[]) => this.posts = posts);
        return this.http.get<ServerData<MongoPost[]>>('http://localhost:3000/api/posts').pipe(extractPosts, savePosts);
    }

    getPostsUpdatedListener(): Observable<Post[]> {
        return this.postsUpdated.asObservable();
    }

    addPost(title: string, content: string): Observable<ServerData<string>> {
      const post: Post = { id: null, title, content };
      return this.http.post<ServerData<string>>('http://localhost:3000/api/posts', post)
                      .pipe(tap(createdPost => {
                        post.id = createdPost.body;
                        this.posts.push(post);
                        this.postsUpdated.next([...this.posts]);
                      }));
    }

    deletePost(postId: string): Observable<ServerData> {
      return this.http.delete<ServerData>(`http://localhost:3000/api/posts/${postId}`)
                      .pipe(tap(() => {
                        this.posts = this.posts.filter(post => post.id !== postId)
                        this.postsUpdated.next([...this.posts]);
                      }));
    }
}

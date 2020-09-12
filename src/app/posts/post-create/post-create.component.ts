import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../shared/posts.service';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.scss']
})

export class PostCreateComponent {

    constructor(private postsService: PostsService) {}

    onAddPost(postForm: NgForm): void {
        if (postForm.invalid) { return; }
        this.postsService.addPost(postForm.value.title, postForm.value.content);
        postForm.resetForm();
    }
}

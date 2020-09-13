import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PostsService } from '../shared/posts.service';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.scss']
})

export class PostCreateComponent implements OnDestroy {

    subscription: Subscription = new Subscription();

    constructor(private postsService: PostsService) {}

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onAddPost(postForm: NgForm): void {
        if (postForm.invalid) { return; }
        this.subscription.add(this.postsService.addPost(postForm.value.title, postForm.value.content).subscribe());
        postForm.resetForm();
    }
}

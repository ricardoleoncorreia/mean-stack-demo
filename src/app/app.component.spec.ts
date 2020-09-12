import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PostListMockComponent,
        PostCreateMockComponent,
        HeaderMockComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});

@Component({
  selector: 'app-post-list',
  template: 'app-post-list'
})
class PostListMockComponent {}

@Component({
  selector: 'app-post-create',
  template: 'app-post-create'
})
class PostCreateMockComponent {}

@Component({
  selector: 'app-header',
  template: 'app-header'
})
class HeaderMockComponent {}

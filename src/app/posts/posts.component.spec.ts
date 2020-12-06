import { PostsComponent } from './posts.component';
import { PostsService } from './posts.service';
import { EMPTY, of, throwError } from 'rxjs';

describe('PostsComponent', () => {
  let service: PostsService;
  let component: PostsComponent;

  beforeEach(() => {
    service = new PostsService(null);
    component = new PostsComponent(service);
  });

  it('should call fetch when OnInit', () => {
    const spy = spyOn(service, 'fetch').and.callFake(() => EMPTY);

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('should return array of posts', () => {
    spyOn(service, 'fetch').and.returnValue(of([1, 2, 3]));

    component.ngOnInit();

    expect(component.posts.length).toBeGreaterThan(0);
  });

  it('should add new post', () => {
    const post = { title: 'test' };
    const spy = spyOn(service, 'create').and.returnValue(of(post));

    component.add(post.title);
    expect(spy).toHaveBeenCalled();
    expect(component.posts.length).toBeGreaterThan(0);
    // expect(component.posts.includes(post)).toBeTruthy();
  });

  it('should return error message', () => {
    const error = 'Error message';
    spyOn(service, 'create').and.returnValue(throwError(error));
    component.add('Post title');
    expect(component.message).toBe(error);
  });

  it('should remove post if user confirms', () => {
    const spy = spyOn(service, 'remove').and.returnValue(EMPTY);
    spyOn(window, 'confirm').and.returnValue(true);

    component.delete(10);

    expect(spy).toHaveBeenCalledWith(10);
  });

  it('should NOT remove post if user doesn\'t confirm', () => {
    const spy = spyOn(service, 'remove').and.returnValue(EMPTY);
    spyOn(window, 'confirm').and.returnValue(false);

    component.delete(10);

    expect(spy).not.toHaveBeenCalled();
  });
});

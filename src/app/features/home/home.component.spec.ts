import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HomeComponent],
            providers: [
                provideRouter([]),
                provideHttpClient()
            ]
        }).compileComponents();
    });

    it('should create the component', () => {
        const fixture = TestBed.createComponent(HomeComponent);
        const component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });

    it('should render title', async () => {
        const fixture = TestBed.createComponent(HomeComponent);
        await fixture.whenStable();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('h1')?.textContent).toContain('Mongolian Learning');
    });
});

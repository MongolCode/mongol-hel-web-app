import { Component, inject, computed, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap, tap } from 'rxjs/operators';
import { CourseService } from '../../services/course.service';
import { VocabularyItem } from '../../models/course.model';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="course-detail-container">
      <header>
        <a routerLink="/" class="back-button btn-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          <span>Back to Courses</span>
        </a>
        <h1>Vocabulary</h1>
      </header>

      <div class="vocab-list">
        @for (item of vocabulary(); track item.mongolian) {
          <div class="vocab-card card" (click)="playAudio(item.mongolian_pronounce)">
            <div class="card-inner">
              <div class="image-wrapper">
                <img [src]="item.image_uri" [alt]="item.english" loading="lazy" onerror="this.style.display='none'">
              </div>
              
              <div class="text-content">
                <div class="mongolian-word mongolian-text">{{ item.mongolian }}</div>
                
                <div class="translations">
                  <div class="english">{{ item.english }}</div>
                  @if (item.chinese) {
                    <div class="chinese">{{ item.chinese }}</div>
                  }
                </div>
              </div>

              <button class="play-button btn-icon" aria-label="Play pronunciation">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background-color: var(--bg-color);
    }
    .course-detail-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 3rem;
      padding: 1rem 0;
    }
    .back-button {
      color: var(--text-secondary);
      font-weight: 600;
      gap: 0.5rem;
      padding: 0.75rem 1.25rem;
      border-radius: var(--radius-md);
      background: var(--surface-color);
      box-shadow: var(--shadow-sm);
    }
    .back-button:hover {
      color: var(--primary-color);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    h1 {
      font-size: 2.5rem;
      color: var(--primary-color);
    }
    .vocab-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 2rem;
    }
    .vocab-card {
      padding: 1.5rem;
      cursor: pointer;
      border: 1px solid transparent;
    }
    .vocab-card:hover {
      border-color: var(--primary-light);
    }
    .card-inner {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      position: relative;
    }
    .image-wrapper {
      width: 100px;
      height: 100px;
      border-radius: var(--radius-md);
      overflow: hidden;
      flex-shrink: 0;
      background: #f1f3f4;
      box-shadow: var(--shadow-sm);
    }
    .image-wrapper img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    .vocab-card:hover .image-wrapper img {
      transform: scale(1.1);
    }
    .text-content {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 2rem;
      height: 120px;
    }
    .mongolian-word {
      font-size: 2.5rem;
      color: var(--primary-color);
      height: 100%;
      display: flex;
      align-items: center;
    }
    .translations {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .english {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-primary);
    }
    .chinese {
      font-size: 1rem;
      color: var(--text-secondary);
    }
    .play-button {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--bg-color);
      color: var(--primary-color);
      position: absolute;
      right: 0;
      bottom: 0;
      opacity: 0;
      transform: scale(0.8);
    }
    .vocab-card:hover .play-button {
      opacity: 1;
      transform: scale(1);
      background: var(--primary-color);
      color: white;
      box-shadow: var(--shadow-md);
    }
  `]
})
export class CourseDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private courseService = inject(CourseService);

  // Get the course ID from the route
  courseId = toSignal(this.route.paramMap.pipe(
    map(params => params.get('id')),
    tap(id => {
      if (id === 'shulug') {
        this.router.navigate(['/poem']);
      }
    })
  ));

  // Fetch vocabulary based on the course ID
  vocabulary = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => {
        if (!id || id === 'shulug') return [];
        return this.courseService.getCourseVocabulary(id);
      })
    ),
    { initialValue: [] as VocabularyItem[] }
  );

  playAudio(path: string) {
    if (!path) return;
    const audioUrl = `http://localhost:3000/${path}`;
    const audio = new Audio(audioUrl);
    audio.play().catch(err => console.error('Error playing audio:', err));
  }
}

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
        <a routerLink="/" class="back-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to Courses
        </a>
        <h1>Vocabulary</h1>
      </header>

      <div class="vocab-list">
        @for (item of vocabulary(); track item.mongolian) {
          <div class="vocab-card" (click)="playAudio(item.mongolian_pronounce)">
            <div class="image-container">
              <img [src]="item.image_uri" [alt]="item.english" loading="lazy" onerror="this.style.display='none'">
            </div>
            
            <div class="content-wrapper">
              <div class="mongolian-word mongolian-text">{{ item.mongolian }}</div>
              
              <div class="translations">
                <div class="english">{{ item.english }}</div>
                @if (item.chinese) {
                  <div class="chinese">{{ item.chinese }}</div>
                }
              </div>
            </div>

            <button class="play-button" aria-label="Play pronunciation">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background-color: #f8f9fa;
    }
    .course-detail-container {
      padding: 2rem;
      max-width: 1000px;
      margin: 0 auto;
      font-family: 'Inter', sans-serif;
    }
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 3rem;
    }
    .back-button {
      text-decoration: none;
      color: #5f6368;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.25rem;
      border-radius: 12px;
      background: white;
      box-shadow: 0 2px 5px rgba(0,0,0,0.05);
      transition: all 0.2s ease;
    }
    .back-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      color: #1a73e8;
    }
    h1 {
      font-size: 2.5rem;
      margin: 0;
      background: linear-gradient(135deg, #1a73e8, #8ab4f8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 800;
    }
    .vocab-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 2rem;
    }
    .vocab-card {
      background: white;
      border-radius: 24px;
      padding: 1.5rem;
      box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.08);
      display: flex;
      align-items: center;
      gap: 1.5rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid rgba(255,255,255,0.5);
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .vocab-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px -10px rgba(26, 115, 232, 0.15);
      border-color: rgba(26, 115, 232, 0.1);
    }
    .image-container {
      width: 100px;
      height: 100px;
      border-radius: 18px;
      overflow: hidden;
      flex-shrink: 0;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      background: #f1f3f4;
    }
    .image-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    .vocab-card:hover .image-container img {
      transform: scale(1.1);
    }
    .content-wrapper {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 1.5rem;
      height: 140px; /* Increased height for vertical text */
    }
    .mongolian-word {
      font-size: 2.5rem;
      writing-mode: vertical-lr;
      text-orientation: mixed;
      height: 100%;
      color: #1a73e8;
      font-family: 'Noto Sans Mongolian', sans-serif;
      line-height: 1.2;
      /* Center vertically in its container */
      display: flex;
      align-items: center; 
    }
    .translations {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      justify-content: center;
    }
    .english {
      font-size: 1.4rem;
      font-weight: 700;
      color: #202124;
    }
    .chinese {
      font-size: 1.1rem;
      color: #5f6368;
      font-weight: 500;
    }
    .play-button {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: none;
      background: #e8f0fe;
      color: #1a73e8;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
      flex-shrink: 0;
    }
    .vocab-card:hover .play-button {
      background: #1a73e8;
      color: white;
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3);
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

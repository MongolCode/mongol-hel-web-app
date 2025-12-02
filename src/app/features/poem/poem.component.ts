import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-poem',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="poem-container">
      <header>
        <a routerLink="/" class="back-button btn-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          <span>Back to Home</span>
        </a>
        <h1>Poetry Collection</h1>
      </header>

      <div class="poem-list">
        @for (poem of poems$ | async; track poem.title) {
          <div class="poem-card card">
            <div class="poem-content">
              <h2 class="poem-title mongolian-text">{{ poem.title }}</h2>
              <div class="poem-lines">
                @for (line of poem.lines; track line) {
                  <div class="poem-line mongolian-text">{{ line }}</div>
                }
              </div>
            </div>
            
            <div class="poem-actions">
              <button class="play-button" (click)="playAudio(poem.mongolian_pronounce)">
                <span class="icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </span>
                <span class="label">Listen to Recitation</span>
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
    .poem-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 4rem;
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
    .poem-list {
      display: flex;
      flex-direction: column;
      gap: 3rem;
    }
    .poem-card {
      padding: 3rem;
      position: relative;
      overflow: hidden;
    }
    .poem-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
    }
    .poem-content {
      display: flex;
      gap: 4rem;
      overflow-x: auto;
      padding-bottom: 1rem;
      min-height: 300px;
    }
    .poem-title {
      font-size: 2.5rem;
      color: var(--primary-color);
      height: 80%;
      padding-right: 2rem;
      border-right: 2px solid var(--bg-color);
    }
    .poem-lines {
      display: flex;
      gap: 2.5rem;
    }
    .poem-line {
      font-size: 1.8rem;
      color: var(--text-primary);
    }
    .poem-actions {
      display: flex;
      justify-content: flex-end;
      padding-top: 2rem;
      border-top: 1px solid var(--bg-color);
      margin-top: 1rem;
    }
    .play-button {
      background: var(--primary-color);
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: var(--radius-md);
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      transition: var(--transition-base);
      box-shadow: var(--shadow-sm);
    }
    .play-button:hover {
      background: var(--primary-dark);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    .icon {
      display: flex;
      align-items: center;
    }
  `]
})
export class PoemComponent {
  private courseService = inject(CourseService);
  poems$ = this.courseService.getPoems();

  playAudio(path: string) {
    if (!path) return;
    const audioUrl = `http://localhost:3000/${path}`;
    const audio = new Audio(audioUrl);
    audio.play().catch(err => console.error('Error playing audio:', err));
  }
}

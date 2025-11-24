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
        <a routerLink="/" class="back-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to Home
        </a>
        <h1>Poetry Collection</h1>
      </header>

      <div class="poem-list">
        @for (poem of poems$ | async; track poem.title) {
          <div class="poem-card">
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
      background-color: #f8f9fa;
    }
    .poem-container {
      padding: 2rem;
      max-width: 1000px;
      margin: 0 auto;
      font-family: 'Inter', sans-serif;
    }
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 4rem;
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
    .poem-list {
      display: flex;
      flex-direction: column;
      gap: 3rem;
    }
    .poem-card {
      background: white;
      border-radius: 32px;
      padding: 2rem;
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.05);
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
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
      background: linear-gradient(90deg, #1a73e8, #8ab4f8);
    }
    .poem-content {
      display: flex;
      gap: 3rem;
      overflow-x: auto;
      padding-bottom: 0.5rem;
      min-height: 250px;
    }
    .poem-title {
      font-size: 2.5rem;
      color: #1a73e8;
      margin: 0;
      writing-mode: vertical-lr;
      font-family: 'Noto Sans Mongolian', sans-serif;
      height: 60%;
      padding-right: 2rem;
      border-right: 2px solid #f1f3f4;
    }
    .poem-lines {
      display: flex;
      gap: 2rem;
    }
    .poem-line {
      font-size: 1.8rem;
      writing-mode: vertical-lr;
      font-family: 'Noto Sans Mongolian', sans-serif;
      color: #202124;
      line-height: 2;
    }
    .poem-actions {
      display: flex;
      justify-content: flex-end;
      padding-top: 1rem;
      border-top: 1px solid #f1f3f4;
    }
    .play-button {
      background: #e8f0fe;
      color: #1a73e8;
      border: none;
      padding: 1rem 2rem;
      border-radius: 16px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      transition: all 0.2s ease;
    }
    .play-button:hover {
      background: #1a73e8;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(26, 115, 232, 0.2);
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

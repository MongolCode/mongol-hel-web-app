import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="home-container">
      <div class="hero-section">
        <div class="logo-wrapper">
          <img src="logo.svg" alt="Mongol App Logo" class="app-logo">
        </div>
        <div class="hero-content">
          <h1>{{ title }}</h1>
          <p class="subtitle">Master the traditional Mongolian script</p>
        </div>
      </div>
      
      <div class="course-grid">
        @for (course of courses$ | async; track course.id) {
          <a [routerLink]="['/course', course.id]" class="course-card card">
            <div class="card-content">
              <div class="mongolian-letter mongolian-text">{{ course.mongolian }}</div>
              <div class="english-letter">{{ course.english }}</div>
            </div>
            <div class="card-footer">
              <span class="start-label">Start Lesson</span>
              <div class="icon-circle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </div>
          </a>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: linear-gradient(180deg, var(--bg-color) 0%, #e8f4fd 100%);
    }
    .home-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 4rem 2rem;
    }
    .hero-section {
      text-align: center;
      margin-bottom: 4rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }
    .logo-wrapper {
      width: 120px;
      height: 120px;
      background: white;
      border-radius: 50%;
      padding: 1.5rem;
      box-shadow: var(--shadow-md);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .app-logo {
      width: 100%;
      height: 100%;
      filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
    }
    h1 {
      font-size: 3rem;
      margin: 0;
      color: var(--primary-color);
      font-weight: 800;
      letter-spacing: -0.02em;
    }
    .subtitle {
      font-size: 1.25rem;
      color: var(--text-secondary);
      margin: 0;
    }
    .course-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 2rem;
      justify-content: center;
    }
    .course-card {
      padding: 2.5rem 2rem;
      text-decoration: none;
      color: inherit;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 320px;
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.5);
    }
    .course-card:hover {
      border-color: var(--primary-light);
    }
    .card-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
    }
    .mongolian-letter {
      font-size: 6rem;
      color: var(--primary-color);
      height: 140px;
      transition: transform 0.3s ease;
    }
    .course-card:hover .mongolian-letter {
      transform: scale(1.1);
    }
    .english-letter {
      font-size: 2rem;
      font-weight: 800;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      opacity: 0.5;
    }
    .card-footer {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(0,0,0,0.05);
    }
    .start-label {
      font-weight: 600;
      color: var(--primary-color);
      font-size: 0.9rem;
    }
    .icon-circle {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--primary-color);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translateX(10px);
      opacity: 0;
      transition: all 0.3s ease;
    }
    .course-card:hover .icon-circle {
      transform: translateX(0);
      opacity: 1;
    }
  `]
})
export class HomeComponent {
  title = 'Mongolian Learning';
  private courseService = inject(CourseService);
  courses$ = this.courseService.getCourses();
}

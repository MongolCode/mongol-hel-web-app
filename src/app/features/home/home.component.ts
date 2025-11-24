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
        <h1>Mongolian Learning</h1>
        <p>Master the vertical script with interactive lessons</p>
      </div>
      
      <div class="course-grid">
        @for (course of courses$ | async; track course.id) {
          <a [routerLink]="['/course', course.id]" class="course-card">
            <div class="card-content">
              <div class="mongolian-letter mongolian-text">{{ course.mongolian }}</div>
              <div class="english-letter">{{ course.english }}</div>
            </div>
            <div class="card-footer">
              <span>Start Lesson</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
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
      background: linear-gradient(180deg, #f8f9fa 0%, #e8f0fe 100%);
    }
    .home-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 4rem 2rem;
      font-family: 'Inter', sans-serif;
    }
    .hero-section {
      text-align: center;
      margin-bottom: 5rem;
    }
    h1 {
      font-size: 4rem;
      margin: 0 0 1rem;
      background: linear-gradient(135deg, #1a73e8, #8ab4f8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 800;
      letter-spacing: -0.02em;
    }
    p {
      font-size: 1.5rem;
      color: #5f6368;
      margin: 0;
    }
    .course-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      justify-content: center;
    }
    .course-card {
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
      border-radius: 24px;
      padding: 2rem;
      box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.05);
      text-decoration: none;
      color: inherit;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 280px;
      border: 1px solid rgba(255, 255, 255, 0.5);
      position: relative;
      overflow: hidden;
    }
    .course-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 40px -10px rgba(26, 115, 232, 0.15);
      background: white;
      border-color: rgba(26, 115, 232, 0.1);
    }
    .card-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }
    .mongolian-letter {
      font-size: 5rem;
      color: #1a73e8;
      height: 120px;
      writing-mode: vertical-lr;
      text-orientation: mixed;
      font-family: 'Noto Sans Mongolian', sans-serif;
      transition: transform 0.3s ease;
    }
    .course-card:hover .mongolian-letter {
      transform: scale(1.1);
    }
    .english-letter {
      font-size: 1.5rem;
      font-weight: 700;
      color: #202124;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .card-footer {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      color: #1a73e8;
      font-weight: 600;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.3s ease;
    }
    .course-card:hover .card-footer {
      opacity: 1;
      transform: translateY(0);
    }
  `]
})
export class HomeComponent {
  private courseService = inject(CourseService);
  courses$ = this.courseService.getCourses();
}

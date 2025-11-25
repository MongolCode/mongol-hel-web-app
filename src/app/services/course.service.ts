import { Injectable, inject, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CourseIndex, VocabularyItem, Poem } from '../models/course.model';

export const API_URL = new InjectionToken<string>('API_URL');

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    private http = inject(HttpClient);
    private injectedApiUrl = inject(API_URL, { optional: true });
    private apiUrl = this.injectedApiUrl ?? environment.apiUrl;

    getCourses(): Observable<CourseIndex[]> {
        return this.http.get<CourseIndex[]>(`${this.apiUrl}/courses`);
    }

    getCourseVocabulary(courseId: string): Observable<VocabularyItem[]> {
        return this.http.get<VocabularyItem[]>(`${this.apiUrl}/course_${courseId}`);
    }

    getPoems(): Observable<Poem[]> {
        return this.http.get<Poem[]>(`${this.apiUrl}/course_shulug`);
    }
}

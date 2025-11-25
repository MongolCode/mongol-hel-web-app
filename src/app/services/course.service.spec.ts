import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { CourseService, API_URL } from './course.service';
import { CourseIndex, VocabularyItem, Poem } from '../models/course.model';

describe('CourseService', () => {
    let service: CourseService;
    let httpMock: HttpTestingController;
    const apiUrl = 'http://localhost:3000';

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                { provide: API_URL, useValue: apiUrl }
            ]
        });
        service = TestBed.inject(CourseService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch courses', () => {
        const mockCourses: CourseIndex[] = [
            { id: 'A', mongolian: 'Монгол', english: 'Mongol', image_uri: 'img.png', a_url: 'a.mp3', mongolian_pronounce: 'Mongol' },
            { id: 'B', mongolian: 'Бас', english: 'Bas', image_uri: 'img2.png', a_url: 'b.mp3', mongolian_pronounce: 'Bas' }
        ];

        service.getCourses().subscribe(courses => {
            expect(courses.length).toBe(2);
            expect(courses).toEqual(mockCourses);
        });

        const req = httpMock.expectOne(`${apiUrl}/courses`);
        expect(req.request.method).toBe('GET');
        req.flush(mockCourses);
    });

    it('should fetch course vocabulary', () => {
        const courseId = 'A';
        const mockVocabulary: VocabularyItem[] = [
            { mongolian: 'Сайн байна уу', english: 'Hello', image_uri: 'hello.png', mongolian_pronounce: 'Sain baina uu' }
        ];

        service.getCourseVocabulary(courseId).subscribe(vocabulary => {
            expect(vocabulary.length).toBe(1);
            expect(vocabulary).toEqual(mockVocabulary);
        });

        const req = httpMock.expectOne(`${apiUrl}/course_${courseId}`);
        expect(req.request.method).toBe('GET');
        req.flush(mockVocabulary);
    });

    it('should fetch poems', () => {
        const mockPoems: Poem[] = [
            { title: 'My Poem', lines: ['Line 1', 'Line 2'], image_uri: 'poem.png', mongolian_pronounce: 'Poem' }
        ];

        service.getPoems().subscribe(poems => {
            expect(poems.length).toBe(1);
            expect(poems).toEqual(mockPoems);
        });

        const req = httpMock.expectOne(`${apiUrl}/course_shulug`);
        expect(req.request.method).toBe('GET');
        req.flush(mockPoems);
    });
});

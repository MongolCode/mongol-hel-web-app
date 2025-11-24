import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'course/:id',
        loadComponent: () => import('./features/course-detail/course-detail.component').then(m => m.CourseDetailComponent)
    },
    {
        path: 'poem',
        loadComponent: () => import('./features/poem/poem.component').then(m => m.PoemComponent)
    }
];

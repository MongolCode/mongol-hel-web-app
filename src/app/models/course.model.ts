export interface CourseIndex {
    id: string;
    mongolian: string;
    english: string;
    image_uri: string;
    a_url: string;
    mongolian_pronounce: string;
}

export interface VocabularyItem {
    mongolian: string;
    chinese?: string;
    english: string;
    image_uri: string;
    mongolian_pronounce: string;
}

export interface Poem {
    title: string;
    lines: string[];
    image_uri: string;
    mongolian_pronounce: string;
}

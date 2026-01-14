export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  category: 'Filmes' | 'Séries' | 'Games' | 'Quadrinhos' | 'Tecnologia' | 'Literatura';
  author: string;
  publishedAt: string;
  imageUrl: string;
  isFeatured?: boolean;
}

export interface NavigationItem {
  label: string;
  href: string;
  category?: Article['category'];
}

export const CATEGORIES = ['Filmes', 'Séries', 'Games', 'Quadrinhos', 'Tecnologia', 'Literatura'] as const;
import { Article } from './types';

export const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'O Retorno dos X-Men: Marvel anuncia nova saga épica nos quadrinhos',
    excerpt: 'Uma nova era começa para os mutantes com equipe criativa estelar e retorno de personagens clássicos.',
    category: 'Quadrinhos',
    author: 'Lucas Silva',
    publishedAt: '14 de Março, 2024',
    imageUrl: 'https://picsum.photos/seed/xmen/800/600',
    isFeatured: true
  },
  {
    id: '2',
    title: 'GTA VI: Rumores apontam para mapa 2x maior que o anterior',
    excerpt: 'Vazamentos indicam que a vice city será apenas o começo de uma experiência massiva.',
    category: 'Games',
    author: 'Ana Costa',
    publishedAt: '13 de Março, 2024',
    imageUrl: 'https://picsum.photos/seed/gta/800/600',
    isFeatured: false
  },
  {
    id: '3',
    title: 'Review: Duna Parte 2 é a obra-prima da ficção científica moderna',
    excerpt: 'Denis Villeneuve entrega um espetáculo visual e narrativo que redefine o gênero.',
    category: 'Filmes',
    author: 'Roberto Mendes',
    publishedAt: '12 de Março, 2024',
    imageUrl: 'https://picsum.photos/seed/duna/800/600',
    isFeatured: false
  },
  {
    id: '4',
    title: 'Nintendo Switch 2 pode chegar ainda este ano',
    excerpt: 'Analistas da indústria apontam lançamento surpresa para o final de 2024.',
    category: 'Tecnologia',
    author: 'Carla Dias',
    publishedAt: '11 de Março, 2024',
    imageUrl: 'https://picsum.photos/seed/switch/800/600',
    isFeatured: false
  },
  {
    id: '5',
    title: 'O Problema dos 3 Corpos: O que esperar da adaptação da Netflix',
    excerpt: 'Dos criadores de Game of Thrones, a nova série promete explodir cabeças.',
    category: 'Séries',
    author: 'Felipe Neto',
    publishedAt: '10 de Março, 2024',
    imageUrl: 'https://picsum.photos/seed/netflix/800/600',
    isFeatured: false
  },
  {
    id: '6',
    title: 'Novo livro de George R.R. Martin finalmente tem data?',
    excerpt: 'Fãs encontram pistas em blog do autor sobre The Winds of Winter.',
    category: 'Literatura',
    author: 'Marina Ruy',
    publishedAt: '09 de Março, 2024',
    imageUrl: 'https://picsum.photos/seed/book/800/600',
    isFeatured: false
  }
];

export const NAV_ITEMS = [
  { label: 'Home', href: '#/' },
  { label: 'Filmes & Séries', href: '#/category/Filmes', category: 'Filmes' },
  { label: 'Games', href: '#/category/Games', category: 'Games' },
  { label: 'Quadrinhos', href: '#/category/Quadrinhos', category: 'Quadrinhos' },
  { label: 'Literatura', href: '#/category/Literatura', category: 'Literatura' },
  { label: 'Tecnologia', href: '#/category/Tecnologia', category: 'Tecnologia' },
];

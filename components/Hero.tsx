import React from 'react';
import { Article } from '../types';

interface HeroProps {
  article: Article;
}

const Hero: React.FC<HeroProps> = ({ article }) => {
  return (
    <div className="relative w-full h-[500px] mb-12 group overflow-hidden rounded-xl shadow-xl">
      <img 
        src={article.imageUrl} 
        alt={article.title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8 md:p-12">
        <span className="bg-[#be80ff] text-white text-xs font-bold px-3 py-1 rounded-sm w-fit mb-3 uppercase tracking-wider">
          {article.category}
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
          {article.title}
        </h1>
        <p className="text-gray-200 text-lg md:text-xl line-clamp-2 max-w-3xl mb-4">
          {article.excerpt}
        </p>
        <div className="flex items-center text-gray-300 text-sm font-medium">
          <span className="uppercase text-[#be80ff] mr-2">{article.author}</span>
          <span>• {article.publishedAt}</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
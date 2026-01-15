import React, { useState, useEffect } from 'react';
import { Article } from '../types';

interface HeroProps {
  articles: Article[];
}

const Hero: React.FC<HeroProps> = ({ articles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (articles.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [articles.length]);

  if (!articles.length) return null;

  const currentArticle = articles[currentIndex];

  return (
    <div className="relative w-full h-[500px] mb-12 group overflow-hidden rounded-xl shadow-xl bg-gray-900">
      {/* Slides */}
      {articles.map((article, index) => (
        <div
          key={article.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-8 md:p-12 pb-16 md:pb-20">
            <span className="bg-[#be80ff] text-white text-xs font-bold px-3 py-1 rounded-sm w-fit mb-3 uppercase tracking-wider">
              {article.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight max-w-4xl">
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
      ))}

      {/* Pagination Dots (Bolinhas circuladas de vermelho na referência) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-2 z-10">
        {articles.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex 
                ? 'w-4 h-2 bg-[#be80ff]' 
                : 'w-2 h-2 bg-white/50 hover:bg-white'
            }`}
            aria-label={`Ir para destaque ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows (Optional visual bonus) */}
      <button 
        onClick={() => setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={() => setCurrentIndex((prev) => (prev + 1) % articles.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Hero;
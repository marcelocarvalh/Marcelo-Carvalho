import React from 'react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  variant?: 'standard' | 'compact';
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, variant = 'standard' }) => {
  if (variant === 'compact') {
    return (
      <div className="flex gap-4 group cursor-pointer mb-6 items-start">
        <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md">
           <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="flex-1">
          <span className="text-[10px] font-bold text-[#be80ff] uppercase tracking-wide">
            {article.category}
          </span>
          <h4 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-[#be80ff] transition-colors mt-1 line-clamp-3">
            {article.title}
          </h4>
          <span className="text-xs text-gray-400 mt-2 block">{article.publishedAt}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="group cursor-pointer flex flex-col h-full bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className="relative h-48 overflow-hidden">
         <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4">
             <span className="bg-black text-white text-[10px] font-bold px-2 py-1 uppercase">
              {article.category}
             </span>
          </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#be80ff] transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {article.excerpt}
        </p>
        
        <div className="border-t border-gray-100 pt-4 mt-auto">
          <div className="flex justify-between items-center">
             <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-800 uppercase">{article.author}</span>
                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {article.publishedAt}
                </span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
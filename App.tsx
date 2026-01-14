import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ArticleCard from './components/ArticleCard';
import { fetchLatestNews } from './services/geminiService';
import { Article } from './types';

const App: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Initial Data Load
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchLatestNews();
        setArticles(data);
      } catch (e) {
        console.error("Critical error fetching news", e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleCategorySelect = (category: string | null) => {
    setActiveCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter Logic
  const filteredArticles = activeCategory
    ? articles.filter(a => a.category?.toLowerCase() === activeCategory.toLowerCase())
    : articles;

  const featuredArticle = filteredArticles.find(a => a.isFeatured) || filteredArticles[0];
  const gridArticles = filteredArticles.filter(a => a.id !== featuredArticle?.id);
  const sidebarArticles = articles.slice(0, 5); // Just pick first 5 for sidebar "Mais Lidas" mockup

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#be80ff]"></div>
         <p className="mt-4 text-gray-500 font-medium animate-pulse">Carregando notícias do universo Nerd AI...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Navbar onCategorySelect={handleCategorySelect} activeCategory={activeCategory} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb / Title */}
        <div className="mb-8 flex items-center">
            <h2 className="text-3xl font-extrabold text-gray-900 border-l-4 border-[#be80ff] pl-4">
              {activeCategory ? activeCategory : 'Destaques do Dia'}
            </h2>
        </div>

        {/* Featured Hero Section */}
        {featuredArticle && <Hero article={featuredArticle} />}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {gridArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
              
              {gridArticles.length === 0 && (
                <div className="col-span-full text-center py-20 text-gray-500">
                  <p className="text-xl">Nenhuma notícia encontrada nesta categoria.</p>
                  <button 
                    onClick={() => handleCategorySelect(null)}
                    className="mt-4 text-[#be80ff] underline"
                  >
                    Voltar para Home
                  </button>
                </div>
              )}
            </div>

            {/* Pagination Mockup */}
            {gridArticles.length > 0 && (
              <div className="flex justify-center mt-12 space-x-2">
                 <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">Anterior</button>
                 <button className="px-4 py-2 bg-black text-white rounded">1</button>
                 <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">2</button>
                 <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">3</button>
                 <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">Próxima</button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-12">
            
            {/* Mais Lidas Widget */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-[#be80ff] rounded-full"></span>
                Mais Lidas
              </h3>
              <div className="space-y-2">
                {sidebarArticles.map((article, idx) => (
                   <ArticleCard key={`sidebar-${article.id}-${idx}`} article={article} variant="compact" />
                ))}
              </div>
            </div>

            {/* Newsletter Widget */}
            <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-black p-8 rounded-xl text-white text-center">
              <h3 className="text-2xl font-bold mb-2">Nerd AI Insider</h3>
              <p className="text-purple-200 text-sm mb-6">Receba as notícias mais quentes diretamente no seu e-mail. Sem spam, apenas conteúdo geek.</p>
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Seu melhor e-mail" 
                  className="w-full px-4 py-3 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#be80ff]"
                />
                <button className="w-full bg-[#be80ff] text-white font-bold py-3 rounded hover:bg-purple-400 transition transform hover:scale-105">
                  INSCREVER-SE
                </button>
              </div>
            </div>

            {/* Socials / Tags Mockup */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold mb-4">Tags Populares</h3>
              <div className="flex flex-wrap gap-2">
                {['Marvel', 'DC Comics', 'PlayStation', 'Netflix', 'Anime', 'Tech', 'AI', 'Retro'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full hover:bg-purple-100 hover:text-[#be80ff] cursor-pointer transition">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

      <footer className="bg-black text-gray-400 py-12 border-t border-gray-800">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex justify-center items-center gap-1 mb-4">
             <span className="logo-font text-2xl font-extrabold text-white">Nerd</span>
             <span className="logo-font text-2xl font-extrabold text-[#be80ff]">AI</span>
            </div>
            <p className="mb-6 max-w-md mx-auto text-sm">O seu portal definitivo para tudo sobre cultura pop. Atualizado automaticamente por inteligência artificial.</p>
            <div className="flex justify-center space-x-6 text-sm font-medium">
               <a href="#" className="hover:text-white">Sobre nós</a>
               <a href="#" className="hover:text-white">Contato</a>
               <a href="#" className="hover:text-white">Privacidade</a>
               <a href="#" className="hover:text-white">Termos</a>
            </div>
            <div className="mt-8 text-xs text-gray-600">
              © 2024 Nerd AI. Todos os direitos reservados.
            </div>
         </div>
      </footer>
    </div>
  );
};

export default App;
import React from 'react';
import { ArrowRight } from 'lucide-react';

const blogs = [
  { title: "Prohibited & Restricted Items", date: "1 Oct" },
  { title: "Cashback Services in Asia", date: "3 Oct" },
  { title: "TOP 20 Chinese Stores to Buy Online with Delivery in 2025", date: "4 Oct" },
];

export const Blog: React.FC = () => {
  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {blogs.map((blog, idx) => (
            <div key={idx} className="bg-white rounded-[20px] overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
              <div className="h-[200px] bg-gray-200 m-5 rounded-xl group-hover:scale-[1.02] transition-transform duration-500" />
              <div className="px-6 pb-6">
                <h3 className="font-bold text-lg text-black mb-4 min-h-[3.5rem] line-clamp-2">
                  {blog.title}
                </h3>
                <div className="flex items-center justify-between text-gray-400 text-sm font-medium">
                  <span>📅 {blog.date}</span>
                  <div className="w-10 h-10 bg-brand-light rounded-full flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button className="bg-white px-10 py-4 rounded-full font-bold text-lg shadow-sm hover:shadow-md transition-all flex items-center gap-4">
            Other blog articles
            <div className="w-10 h-10 bg-brand-light rounded-full flex items-center justify-center text-brand-blue">
              <ArrowRight size={20} />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
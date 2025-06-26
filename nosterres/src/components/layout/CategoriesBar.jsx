import React from 'react';

const CategoriesBar = ({ categories }) => {
return (
    <div className="bg-white py-4">
    <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {categories.map((category, index) => (
            <div
            key={index}
            className="category-card bg-white rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(168,213,186,0.3)]"
            role="button"
            aria-label={`Voir la catégorie ${category.name}`}
            >
            <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-3">
                <i className={`fas ${category.icon} text-2xl text-primary`}></i>
            </div>
            <h3 className="font-medium">{category.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{category.description}</p>
            </div>
        ))}
        </div>
    </div>
    </div>
);
};

export default CategoriesBar;
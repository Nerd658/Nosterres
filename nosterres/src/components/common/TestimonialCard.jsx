import React from 'react';

const TestimonialCard = ({ testimonial }) => {
  // Générer les étoiles en fonction de la note
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star text-yellow-400"></i>);
    }
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt text-yellow-400"></i>);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<i key={i} className="far fa-star text-yellow-400"></i>);
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md text-center">
      <div className="flex justify-center mb-4">{renderStars(testimonial.rating)}</div>
      <p className="text-gray-600 italic mb-4">"{testimonial.text}"</p>
      <h4 className="font-semibold text-primary">{testimonial.name}</h4>
    </div>
  );
};

export default TestimonialCard;
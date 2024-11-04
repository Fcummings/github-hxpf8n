import React from 'react';

interface PortfolioCardProps {
  image: string;
  name: string;
  description: string;
  tags: string[];
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ image, name, description, tags }) => {
  return (
    <div className="glass-card overflow-hidden group">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-white/80 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="text-xs px-3 py-1 rounded-full bg-accent/20 text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
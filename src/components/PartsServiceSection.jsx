import { useState, useEffect } from 'react';

const PartsServiceSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    // Generate floating bubbles
    const newBubbles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 20 + 10,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }));
    setBubbles(newBubbles);
  }, []);

  const serviceCards = [
    {
      id: 'quotes',
      title: 'My Quotes',
      description: 'View & Manage',
      icon: '📋',
      color: 'from-blue-500 to-cyan-500',
      hoverColor: 'from-blue-600 to-cyan-600',
      link: '/quote'
    },
    {
      id: 'support',
      title: '24/7 Support',
      description: '1-800-PARTS-24',
      icon: '📞',
      color: 'from-green-500 to-emerald-500',
      hoverColor: 'from-green-600 to-emerald-600',
      link: 'tel:1-800-727-8724'
    },
    {
      id: 'shipping',
      title: 'Fast Shipping',
      description: 'Same-day available',
      icon: '🚚',
      color: 'from-orange-500 to-red-500',
      hoverColor: 'from-orange-600 to-red-600',
      link: '#shipping'
    },
    {
      id: 'warranty',
      title: 'Warranty',
      description: '1-year parts warranty',
      icon: '✅',
      color: 'from-purple-500 to-pink-500',
      hoverColor: 'from-purple-600 to-pink-600',
      link: '#warranty'
    }
  ];

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 overflow-hidden shadow-2xl">
      {/* Animated Background Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute rounded-full bg-gradient-to-br from-blue-400/10 to-purple-400/10 backdrop-blur-sm"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              animation: `float ${bubble.duration}s ease-in-out infinite`,
              animationDelay: `${bubble.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <span className="text-4xl">🔧</span>
            Parts & Service
          </h2>
          <p className="text-slate-300 text-lg">Professional support for all your equipment needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceCards.map((card) => (
            <div
              key={card.id}
              className={`
                relative group cursor-pointer transform transition-all duration-300 ease-out
                ${hoveredCard === card.id ? 'scale-105 -translate-y-2' : 'hover:scale-105 hover:-translate-y-2'}
              `}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => {
                if (card.link.startsWith('tel:')) {
                  window.location.href = card.link;
                } else if (card.link.startsWith('#')) {
                  // Handle anchor links or show info
                  console.log(`Navigate to ${card.link}`);
                } else {
                  window.location.href = card.link;
                }
              }}
            >
              {/* Card Background */}
              <div className={`
                relative bg-gradient-to-br ${hoveredCard === card.id ? card.hoverColor : card.color}
                rounded-xl p-6 shadow-lg border border-white/10
                backdrop-blur-sm transition-all duration-300
                ${hoveredCard === card.id ? 'shadow-2xl shadow-blue-500/25' : ''}
              `}>
                {/* Shine Effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12" />
                
                {/* Icon */}
                <div className="text-center mb-4">
                  <span className="text-5xl block transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    {card.icon}
                  </span>
                </div>

                {/* Content */}
                <div className="text-center text-white">
                  <h3 className="font-bold text-lg mb-2">{card.title}</h3>
                  <p className="text-sm text-white/80">{card.description}</p>
                </div>

                {/* Pulse Animation */}
                {hoveredCard === card.id && (
                  <div className="absolute inset-0 rounded-xl border-2 border-white/30 animate-pulse" />
                )}
              </div>

              {/* Floating Particles */}
              {hoveredCard === card.id && (
                <div className="absolute -inset-2 pointer-events-none">
                  {Array.from({ length: 6 }, (_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white/60 rounded-full animate-ping"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-8 pt-6 border-t border-slate-700/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="group">
              <div className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                <span className="counter" data-target="10000">0</span>+
              </div>
              <div className="text-slate-400 text-sm">Parts Available</div>
            </div>
            <div className="group">
              <div className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors">
                <span className="counter" data-target="24">0</span>/7
              </div>
              <div className="text-slate-400 text-sm">Support Available</div>
            </div>
            <div className="group">
              <div className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                <span className="counter" data-target="99">0</span>%
              </div>
              <div className="text-slate-400 text-sm">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(90deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
          75% { transform: translateY(-30px) rotate(270deg); }
        }
      `}</style>
    </div>
  );
};

export default PartsServiceSection;

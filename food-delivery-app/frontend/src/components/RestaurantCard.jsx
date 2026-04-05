import { useNavigate } from 'react-router-dom';

export default function RestaurantCard({ restaurant }) {
  const navigate = useNavigate();
  return (
    <div className="card" style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
      <img
        src={restaurant.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400'}
        alt={restaurant.name}
        style={{ width: '100%', height: '180px', objectFit: 'cover' }}
      />
      <div style={{ padding: '16px' }}>
        <h3 style={{ fontSize: '17px', marginBottom: '6px' }}>{restaurant.name}</h3>
        <p style={{ color: '#666', fontSize: '13px', marginBottom: '10px' }}>{restaurant.description}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
          <span style={{ background: '#e8f5e9', color: '#2e7d32', padding: '3px 8px', borderRadius: '6px', fontWeight: '600' }}>
            ⭐ {restaurant.rating}
          </span>
          <span style={{ color: '#666' }}>🕒 {restaurant.deliveryTime}</span>
          <span style={{ color: '#ff6b35', fontWeight: '600' }}>{restaurant.cuisine}</span>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../context/AuthContext';
import FoodItem from '../components/FoodItem';
import { useCart } from '../context/CartContext';

export default function RestaurantMenu() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const { itemCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/restaurants/${id}`).then(res => setRestaurant(res.data));
  }, [id]);

  if (!restaurant) return <p style={{ textAlign: 'center', padding: '60px', fontSize: '16px' }}>Loading...</p>;

  const categories = ['All', ...new Set((restaurant.menu || []).map(i => i.category))];
  const filtered = activeCategory === 'All' ? restaurant.menu : restaurant.menu.filter(i => i.category === activeCategory);

  return (
    <div style={{ padding: '30px 0' }}>
      <div className="container">
        <div className="card" style={{ marginBottom: '24px' }}>
          <img src={restaurant.image} alt={restaurant.name} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
          <div style={{ padding: '20px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>{restaurant.name}</h2>
            <p style={{ color: '#666', marginBottom: '12px' }}>{restaurant.description}</p>
            <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#555' }}>
              <span>⭐ {restaurant.rating}</span>
              <span>🕒 {restaurant.deliveryTime}</span>
              <span>🍽️ {restaurant.cuisine}</span>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {categories.map(c => (
            <button key={c} onClick={() => setActiveCategory(c)} className="btn"
              style={{ background: activeCategory === c ? '#ff6b35' : 'white', color: activeCategory === c ? 'white' : '#666', border: '1.5px solid #ddd' }}>
              {c}
            </button>
          ))}
        </div>

        <div className="card">
          {filtered?.map(item => <FoodItem key={item.id} item={item} restaurant={restaurant} />)}
        </div>

        {itemCount > 0 && (
          <div style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', zIndex: 99 }}>
            <button className="btn btn-primary" onClick={() => navigate('/cart')}
              style={{ padding: '14px 36px', borderRadius: '30px', fontSize: '16px', boxShadow: '0 4px 20px rgba(255,107,53,0.5)' }}>
              🛒 View Cart ({itemCount} items)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

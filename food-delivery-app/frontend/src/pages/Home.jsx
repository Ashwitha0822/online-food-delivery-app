import { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../context/AuthContext';
import RestaurantCard from '../components/RestaurantCard';

const cuisines = ['All', 'Indian', 'Italian', 'American', 'Japanese'];

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState('');
  const [cuisine, setCuisine] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchRestaurants(); }, [search, cuisine]);

  const fetchRestaurants = async () => {
    try {
      const params = {};
      if (search) params.search = search;
      if (cuisine !== 'All') params.cuisine = cuisine;
      const res = await axios.get(`${API}/restaurants`, { params });
      setRestaurants(res.data);
    } finally {
      setLoading(false);
    }
  };

  const seedData = async () => {
    try {
      await axios.post(`${API}/restaurants/seed`);
      fetchRestaurants();
    } catch {
      alert('Seed failed — make sure backend is running');
    }
  };

  return (
    <div style={{ padding: '30px 0' }}>
      <div className="container">
        {/* Hero */}
        <div style={{ background: 'linear-gradient(135deg, #ff6b35, #f7c59f)', borderRadius: '16px', padding: '40px 30px', marginBottom: '30px', textAlign: 'center', color: 'white' }}>
          <h1 style={{ fontSize: '34px', fontWeight: '700', marginBottom: '10px' }}>Order Food You Love 🍕</h1>
          <p style={{ fontSize: '16px', opacity: 0.9, marginBottom: '24px' }}>Fast delivery from the best restaurants</p>
          <input
            placeholder="🔍 Search restaurants..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ maxWidth: '400px', padding: '12px 18px', borderRadius: '30px', border: 'none', fontSize: '15px', outline: 'none' }}
          />
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
          {cuisines.map(c => (
            <button key={c} onClick={() => setCuisine(c)} className="btn"
              style={{ background: cuisine === c ? '#ff6b35' : 'white', color: cuisine === c ? 'white' : '#666', border: '1.5px solid #ddd' }}>
              {c}
            </button>
          ))}
          <button onClick={seedData} className="btn" style={{ marginLeft: 'auto', background: '#28a745', color: 'white', border: 'none' }}>
            🌱 Seed Sample Data
          </button>
        </div>

        {/* Restaurant Grid */}
        {loading ? (
          <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>Loading restaurants...</p>
        ) : restaurants.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#666' }}>
            <p style={{ fontSize: '52px' }}>🍽️</p>
            <p style={{ fontSize: '18px', marginTop: '12px' }}>No restaurants found.</p>
            <p style={{ fontSize: '14px', marginTop: '6px' }}>Click <strong>"🌱 Seed Sample Data"</strong> to get started!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
            {restaurants.map(r => <RestaurantCard key={r.id} restaurant={r} />)}
          </div>
        )}
      </div>
    </div>
  );
}

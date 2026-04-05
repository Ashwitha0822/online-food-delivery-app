import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth, API } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/orders/my`).then(res => setOrders(res.data));
  }, []);

  const totalSpent = orders.reduce((sum, o) => o.status !== 'cancelled' ? sum + o.totalAmount : sum, 0);
  const delivered = orders.filter(o => o.status === 'delivered').length;
  const active = orders.filter(o => !['delivered', 'cancelled'].includes(o.status)).length;

  const stats = [
    { label: 'Total Orders', value: orders.length, icon: '📦', color: '#e3f2fd', text: '#1976d2' },
    { label: 'Delivered', value: delivered, icon: '✅', color: '#e8f5e9', text: '#2e7d32' },
    { label: 'Active Orders', value: active, icon: '🚀', color: '#fff3e0', text: '#f57c00' },
    { label: 'Total Spent', value: `₹${totalSpent}`, icon: '💰', color: '#f3e5f5', text: '#7b1fa2' },
  ];

  return (
    <div style={{ padding: '30px 0' }}>
      <div className="container">

        {/* Welcome Banner */}
        <div style={{ background: 'linear-gradient(135deg, #ff6b35, #f7c59f)', borderRadius: '16px', padding: '28px 30px', marginBottom: '28px', color: 'white' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '6px' }}>Welcome back, {user?.name}! 👋</h2>
          <p style={{ opacity: 0.9 }}>{user?.email}</p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          {stats.map(s => (
            <div key={s.label} className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>
                {s.icon}
              </div>
              <div>
                <p style={{ fontSize: '26px', fontWeight: '700', color: s.text }}>{s.value}</p>
                <p style={{ color: '#888', fontSize: '13px' }}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '17px' }}>Recent Orders</h3>
            <button className="btn btn-secondary" style={{ padding: '7px 16px', fontSize: '13px' }} onClick={() => navigate('/orders')}>
              View All
            </button>
          </div>

          {orders.slice(0, 3).map(order => (
            <div key={order.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', borderBottom: '1px solid #f0f0f0' }}>
              <div>
                <p style={{ fontWeight: '600', marginBottom: '3px' }}>{order.restaurantName}</p>
                <p style={{ color: '#888', fontSize: '13px' }}>{(order.items || []).length} item(s) • ₹{order.totalAmount}</p>
              </div>
              <span className={`badge badge-${order.status}`}>{order.status.replace('_', ' ').toUpperCase()}</span>
            </div>
          ))}

          {orders.length === 0 && (
            <div style={{ textAlign: 'center', padding: '30px', color: '#888' }}>
              <p style={{ fontSize: '36px', marginBottom: '8px' }}>🍕</p>
              <p>No orders yet. Start ordering!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

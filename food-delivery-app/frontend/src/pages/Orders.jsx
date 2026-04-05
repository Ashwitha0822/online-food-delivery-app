import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API } from '../context/AuthContext';

const statusSteps = ['placed', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'];

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/orders/my`);
      setOrders(res.data);
    } finally { setLoading(false); }
  };

  const cancelOrder = async (id) => {
    try {
      await axios.patch(`${API}/orders/${id}/cancel`);
      toast.success('Order cancelled');
      fetchOrders();
    } catch { toast.error('Cannot cancel this order'); }
  };

  if (loading) return <p style={{ textAlign: 'center', padding: '60px' }}>Loading...</p>;

  return (
    <div style={{ padding: '30px 0' }}>
      <div className="container">
        <h2 style={{ marginBottom: '24px', fontSize: '24px' }}>📦 My Orders</h2>

        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#666' }}>
            <p style={{ fontSize: '52px' }}>📭</p>
            <p style={{ fontSize: '18px', marginTop: '12px' }}>No orders yet. Start ordering!</p>
          </div>
        ) : orders.map(order => (
          <div key={order.id} className="card" style={{ padding: '20px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '17px', marginBottom: '4px' }}>{order.restaurantName}</h3>
                <p style={{ color: '#888', fontSize: '13px' }}>
                  {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <span className={`badge badge-${order.status}`}>{order.status.replace('_', ' ').toUpperCase()}</span>
            </div>

            {/* Progress bar */}
            {order.status !== 'cancelled' && (
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                {statusSteps.map((step, i) => {
                  const currentIdx = statusSteps.indexOf(order.status);
                  const done = i <= currentIdx;
                  return (
                    <div key={step} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                      <div style={{ width: '13px', height: '13px', borderRadius: '50%', background: done ? '#ff6b35' : '#ddd', flexShrink: 0, transition: 'background 0.3s' }} />
                      {i < statusSteps.length - 1 && (
                        <div style={{ height: '3px', flex: 1, background: i < currentIdx ? '#ff6b35' : '#ddd', transition: 'background 0.3s' }} />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Items */}
            <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '12px' }}>
              {(order.items || []).map((item, i) => (
                <p key={i} style={{ fontSize: '14px', color: '#555', marginBottom: '4px' }}>
                  {item.name} × {item.quantity} — ₹{item.price * item.quantity}
                </p>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                <span style={{ fontWeight: '700', color: '#ff6b35', fontSize: '16px' }}>Total: ₹{order.totalAmount}</span>
                {order.status === 'placed' && (
                  <button className="btn btn-danger" style={{ padding: '7px 16px', fontSize: '13px' }} onClick={() => cancelOrder(order.id)}>
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

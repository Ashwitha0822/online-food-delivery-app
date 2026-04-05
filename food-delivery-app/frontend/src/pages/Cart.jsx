import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useAuth, API } from '../context/AuthContext';

export default function Cart() {
  const { cart, cartRestaurant, updateQty, removeFromCart, clearCart, total } = useCart();
  const { user } = useAuth();
  const [address, setAddress] = useState(user?.address || '');
  const [payment, setPayment] = useState('cod');
  const navigate = useNavigate();

  const placeOrder = async () => {
    if (!address.trim()) { toast.error('Enter delivery address'); return; }
    try {
      await axios.post(`${API}/orders`, {
        restaurant: cartRestaurant.id,
        restaurantName: cartRestaurant.name,
        items: cart.map(i => ({ foodItemId: i.id, name: i.name, price: i.price, quantity: i.qty })),
        totalAmount: total + 40,
        deliveryAddress: address,
        paymentMethod: payment,
      });
      clearCart();
      toast.success('Order placed successfully! 🎉');
      navigate('/orders');
    } catch {
      toast.error('Failed to place order');
    }
  };

  if (cart.length === 0) return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <p style={{ fontSize: '60px' }}>🛒</p>
      <h3 style={{ fontSize: '22px', margin: '16px 0 8px' }}>Your cart is empty</h3>
      <p style={{ color: '#666', marginBottom: '24px' }}>Add items from a restaurant to get started</p>
      <button className="btn btn-primary" onClick={() => navigate('/')}>Browse Restaurants</button>
    </div>
  );

  return (
    <div style={{ padding: '30px 0' }}>
      <div className="container">
        <h2 style={{ marginBottom: '24px', fontSize: '24px' }}>🛒 Your Cart</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '24px' }}>

          {/* Cart Items */}
          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ marginBottom: '16px', color: '#ff6b35' }}>{cartRestaurant?.name}</h3>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #f0f0f0' }}>
                <div>
                  <p style={{ fontWeight: '600', marginBottom: '4px' }}>{item.name}</p>
                  <p style={{ color: '#ff6b35', fontWeight: '700' }}>₹{item.price} × {item.qty} = ₹{item.price * item.qty}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f8f9fa', borderRadius: '8px', padding: '5px 12px' }}>
                    <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#ff6b35' }}>−</button>
                    <span style={{ fontWeight: '700', minWidth: '16px', textAlign: 'center' }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#ff6b35' }}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}>🗑️</button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="card" style={{ padding: '20px' }}>
              <h3 style={{ marginBottom: '16px' }}>Order Summary</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Subtotal</span><span>₹{total}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Delivery Fee</span><span>₹40</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '16px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                  <span>Total</span><span style={{ color: '#ff6b35' }}>₹{total + 40}</span>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: '20px' }}>
              <h3 style={{ marginBottom: '14px' }}>Delivery Details</h3>
              <textarea placeholder="Delivery address..." value={address} onChange={e => setAddress(e.target.value)}
                style={{ height: '80px', resize: 'none', marginBottom: '12px' }} />
              <select value={payment} onChange={e => setPayment(e.target.value)} style={{ marginBottom: '16px' }}>
                <option value="cod">Cash on Delivery</option>
                <option value="card">Card Payment</option>
                <option value="upi">UPI</option>
              </select>
              <button className="btn btn-primary" onClick={placeOrder} style={{ width: '100%', padding: '13px', fontSize: '15px' }}>
                Place Order • ₹{total + 40}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

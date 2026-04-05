import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function FoodItem({ item, restaurant }) {
  const { cart, addToCart, updateQty } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const cartItem = cart.find(i => i.id === item.id);

  const handleAdd = () => {
    if (!user) { navigate('/login'); return; }
    addToCart(item, restaurant);
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
      <div style={{ flex: 1 }}>
        <h4 style={{ fontSize: '15px', marginBottom: '4px' }}>{item.name}</h4>
        <p style={{ color: '#888', fontSize: '13px', marginBottom: '6px' }}>{item.description}</p>
        <span style={{ color: '#ff6b35', fontWeight: '700', fontSize: '16px' }}>₹{item.price}</span>
      </div>
      <div style={{ marginLeft: '16px' }}>
        {!cartItem ? (
          <button className="btn btn-primary" style={{ padding: '7px 18px' }} onClick={handleAdd}>Add</button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#ff6b35', borderRadius: '8px', padding: '5px 12px' }}>
            <button onClick={() => updateQty(item.id, cartItem.qty - 1)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer', lineHeight: 1 }}>−</button>
            <span style={{ color: 'white', fontWeight: '700', minWidth: '16px', textAlign: 'center' }}>{cartItem.qty}</span>
            <button onClick={() => updateQty(item.id, cartItem.qty + 1)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer', lineHeight: 1 }}>+</button>
          </div>
        )}
      </div>
    </div>
  );
}

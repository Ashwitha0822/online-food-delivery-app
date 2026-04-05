import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav style={{ background: '#ff6b35', padding: '14px 0', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 10px rgba(0,0,0,0.15)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '22px', fontWeight: '700' }}>
          🍔 FoodRush
        </Link>
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>Home</Link>
          {user ? (
            <>
              <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>Dashboard</Link>
              <Link to="/orders" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>Orders</Link>
              <Link to="/cart" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>
                🛒 Cart {itemCount > 0 && (
                  <span style={{ background: 'white', color: '#ff6b35', borderRadius: '50%', padding: '1px 6px', fontSize: '11px', fontWeight: '700', marginLeft: '4px' }}>
                    {itemCount}
                  </span>
                )}
              </Link>
              <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>Hi, {user.name?.split(' ')[0]}</span>
              <button onClick={handleLogout} className="btn" style={{ background: 'white', color: '#ff6b35', padding: '7px 16px' }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login"><button className="btn" style={{ background: 'white', color: '#ff6b35', padding: '7px 16px' }}>Login</button></Link>
              <Link to="/register"><button className="btn" style={{ background: 'transparent', color: 'white', border: '2px solid white', padding: '7px 16px' }}>Sign Up</button></Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

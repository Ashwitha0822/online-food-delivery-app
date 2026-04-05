import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth, API } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', address: '', phone: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/auth/register`, form);
      login(res.data);
      toast.success('Account created!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="card" style={{ width: '100%', maxWidth: '420px', padding: '40px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '8px', color: '#ff6b35', fontSize: '24px' }}>Create Account</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '28px' }}>Join FoodRush today</p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <input placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          <input placeholder="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          <input placeholder="Delivery Address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
          <button type="submit" className="btn btn-primary" style={{ padding: '12px', fontSize: '15px' }}>Create Account</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
          Have account? <Link to="/login" style={{ color: '#ff6b35', fontWeight: '600' }}>Login</Link>
        </p>
      </div>
    </div>
  );
}

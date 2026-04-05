import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth, API } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/auth/login`, form);
      login(res.data);
      toast.success('Welcome back!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="card" style={{ width: '100%', maxWidth: '420px', padding: '40px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '8px', color: '#ff6b35', fontSize: '26px' }}>🍔 FoodRush</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '28px' }}>Sign in to your account</p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          <button type="submit" className="btn btn-primary" style={{ padding: '12px', fontSize: '15px' }}>Login</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
          No account? <Link to="/register" style={{ color: '#ff6b35', fontWeight: '600' }}>Register</Link>
        </p>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [form, setForm] = useState({ email: '', password: '', nombre: '', confirm: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Correo no válido';
    if (form.password.length < 6) errs.password = 'Mínimo 6 caracteres';
    if (tab === 'register' && !form.nombre.trim()) errs.nombre = 'Ingresa tu nombre';
    if (tab === 'register' && form.password !== form.confirm) errs.confirm = 'Las contraseñas no coinciden';
    setErrors(errs);
  };

  const inputStyle = (field) => ({
    width: '100%',
    padding: '.75rem 1rem',
    borderRadius: 10,
    border: `2px solid ${errors[field] ? 'var(--rojo)' : 'rgba(44,26,14,.15)'}`,
    fontFamily: 'Nunito, sans-serif',
    fontSize: '.95rem',
    background: '#fdfaf5',
    color: 'var(--oscuro)',
    outline: 'none',
    marginTop: '.3rem',
    boxSizing: 'border-box',
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--morado-o) 0%, #1a0820 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 24,
        padding: '2.5rem 2rem',
        width: '100%',
        maxWidth: 420,
        boxShadow: '0 30px 80px rgba(0,0,0,.4)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <img src="/img/logo-chinchitirapie.webp" alt="Logo" style={{ width: 80, height: 80, borderRadius: '50%', marginBottom: '.5rem' }} />
          <h1 style={{ fontFamily: 'Bangers, cursive', fontSize: '1.8rem', letterSpacing: 3, color: 'var(--morado-o)' }}>Chinchintirapie</h1>
          <p style={{ color: '#6f6259', fontSize: '.85rem' }}>Portal de la Escuela Carnavalera</p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '2px solid rgba(44,26,14,.1)', marginBottom: '1.5rem' }}>
          {[['login', 'Ingresar'], ['register', 'Registrarse']].map(([key, label]) => (
            <button key={key} onClick={() => { setTab(key); setErrors({}); }}
              style={{
                flex: 1, padding: '.6rem', border: 'none', background: 'transparent',
                fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: '.95rem',
                cursor: 'pointer',
                color: tab === key ? 'var(--rojo)' : '#999',
                borderBottom: `3px solid ${tab === key ? 'var(--rojo)' : 'transparent'}`,
                marginBottom: -2, transition: 'all .2s',
              }}>
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {tab === 'register' && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontWeight: 700, fontSize: '.88rem', color: 'var(--oscuro)' }}>Nombre completo</label>
              <input type="text" value={form.nombre} onChange={handleChange('nombre')} placeholder="Tu nombre" style={inputStyle('nombre')} />
              {errors.nombre && <span style={{ color: 'var(--rojo)', fontSize: '.75rem' }}>{errors.nombre}</span>}
            </div>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontWeight: 700, fontSize: '.88rem', color: 'var(--oscuro)' }}>Correo Electrónico</label>
            <input type="email" value={form.email} onChange={handleChange('email')} placeholder="tu@email.com" style={inputStyle('email')} />
            {errors.email && <span style={{ color: 'var(--rojo)', fontSize: '.75rem' }}>{errors.email}</span>}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontWeight: 700, fontSize: '.88rem', color: 'var(--oscuro)' }}>Contraseña</label>
            <input type="password" value={form.password} onChange={handleChange('password')} placeholder="••••••••" style={inputStyle('password')} />
            {errors.password && <span style={{ color: 'var(--rojo)', fontSize: '.75rem' }}>{errors.password}</span>}
          </div>

          {tab === 'register' && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontWeight: 700, fontSize: '.88rem', color: 'var(--oscuro)' }}>Confirmar contraseña</label>
              <input type="password" value={form.confirm} onChange={handleChange('confirm')} placeholder="••••••••" style={inputStyle('confirm')} />
              {errors.confirm && <span style={{ color: 'var(--rojo)', fontSize: '.75rem' }}>{errors.confirm}</span>}
            </div>
          )}

          {tab === 'login' && (
            <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
              <button type="button" onClick={() => {}} style={{ background: 'none', border: 'none', color: 'var(--rojo)', fontSize: '.82rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'Nunito, sans-serif', padding: 0 }}>¿Olvidaste tu contraseña?</button>
            </div>
          )}

          <button type="submit" style={{
            width: '100%', padding: '.85rem',
            background: 'var(--morado-o)', color: 'var(--amarillo-e)',
            border: 'none', borderRadius: 12,
            fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: '1rem',
            cursor: 'pointer', letterSpacing: 1, transition: 'background .2s',
          }}>
            {tab === 'login' ? '🎭 Ingresar' : '🥁 Crear cuenta'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '.85rem', color: '#999' }}>
          <Link to="/" style={{ color: 'var(--rojo)', fontWeight: 700 }}>← Volver al inicio</Link>
        </p>
      </div>
    </div>
  );
}

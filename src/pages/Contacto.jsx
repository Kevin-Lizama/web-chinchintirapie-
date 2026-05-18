import { useState } from 'react';
import Ticker from '../components/Ticker';

const CHIPS = ['Inscripción a taller', 'Información general', 'Prensa', 'Donaciones', 'Colaboración artística', 'Otro'];

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' });
  const [selectedChip, setSelectedChip] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = 'Por favor, ingresa tu nombre completo.';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Ingresa un correo electrónico válido.';
    if (!form.asunto.trim()) e.asunto = 'El asunto es obligatorio.';
    if (!form.mensaje.trim()) e.mensaje = 'Por favor escribe tu mensaje.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSubmitted(true);
  };

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

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
    transition: 'border-color .2s',
    marginTop: '.3rem',
    boxSizing: 'border-box',
  });

  return (
    <>
      <Ticker text="🎭 Contáctanos · Escríbenos · La fiesta empieza con un mensaje · Chinchintirapie" />

      <div style={{
        background: 'linear-gradient(135deg, var(--morado-o), var(--purpura))',
        padding: '4rem 2rem 3rem',
        textAlign: 'center',
        borderBottom: '4px solid var(--cian)',
      }}>
        <h1 style={{ fontFamily: 'Boogaloo, cursive', fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: '#fff', marginBottom: '.4rem' }}>
          Chinchintirapie
        </h1>
        <p style={{ color: 'rgba(255,255,255,.7)', fontSize: '1.05rem' }}>
          Escuela carnavalera · Escríbenos, que la fiesta empieza con un mensaje
        </p>
      </div>

      <main style={{ background: 'var(--crema)', padding: '3rem 1.5rem 5rem' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          {/* Info box */}
          <div style={{
            background: '#fff4ea',
            border: '1px solid rgba(192,57,43,.2)',
            borderRadius: 14,
            padding: '.9rem 1.2rem',
            marginBottom: '1.5rem',
            fontSize: '.9rem',
          }}>
            📧 Correo:{' '}
            <a href="mailto:chinchintirapie@gmail.com" style={{ color: 'var(--rojo)', fontWeight: 700 }}>
              chinchintirapie@gmail.com
            </a>
          </div>

          {submitted ? (
            <div style={{
              background: '#fff',
              borderRadius: 20,
              padding: '3rem 2rem',
              textAlign: 'center',
              boxShadow: '0 8px 30px rgba(0,0,0,.08)',
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
              <h2 style={{ fontFamily: 'Boogaloo, cursive', fontSize: '2rem', color: 'var(--oscuro)', marginBottom: '.5rem' }}>
                ¡Mensaje enviado!
              </h2>
              <p style={{ color: '#6f6259' }}>Nos pondremos en contacto pronto. ¡Gracias!</p>
            </div>
          ) : (
            <div style={{
              background: '#fff',
              border: '1px solid rgba(63,45,34,.1)',
              borderRadius: 20,
              padding: '2rem',
              boxShadow: '0 8px 24px rgba(63,45,34,.07)',
            }}>
              <h2 style={{ fontFamily: 'Boogaloo, cursive', fontSize: '1.45rem', marginBottom: '.3rem', color: 'var(--oscuro)' }}>
                🎭 Formulario de Contacto
              </h2>
              <p style={{ fontSize: '.85rem', color: '#6f6259', marginBottom: '1.2rem' }}>
                Cuéntanos sobre tu consulta
              </p>

              {/* Chips de asunto */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', marginBottom: '1.4rem' }}>
                {CHIPS.map((chip) => (
                  <button key={chip} type="button"
                    onClick={() => { setSelectedChip(chip); setForm((f) => ({ ...f, asunto: chip })); }}
                    style={{
                      fontSize: '.78rem', fontWeight: 700,
                      padding: '.3rem .75rem', borderRadius: 999,
                      border: `1px solid ${selectedChip === chip ? 'rgba(192,57,43,.5)' : 'rgba(63,45,34,.15)'}`,
                      background: selectedChip === chip ? 'rgba(192,57,43,.1)' : '#fffaf5',
                      color: selectedChip === chip ? 'var(--rojo)' : '#6f6259',
                      cursor: 'pointer', transition: 'all 140ms',
                      fontFamily: 'Nunito, sans-serif',
                    }}>
                    {chip}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontWeight: 700, fontSize: '.88rem', color: 'var(--oscuro)' }}>Nombre Completo</label>
                    <input type="text" value={form.nombre} onChange={handleChange('nombre')} placeholder="Tu nombre" style={inputStyle('nombre')} required />
                    {errors.nombre && <span style={{ color: 'var(--rojo)', fontSize: '.78rem' }}>{errors.nombre}</span>}
                  </div>
                  <div>
                    <label style={{ fontWeight: 700, fontSize: '.88rem', color: 'var(--oscuro)' }}>Correo Electrónico</label>
                    <input type="email" value={form.email} onChange={handleChange('email')} placeholder="tu@email.com" style={inputStyle('email')} required />
                    {errors.email && <span style={{ color: 'var(--rojo)', fontSize: '.78rem' }}>{errors.email}</span>}
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontWeight: 700, fontSize: '.88rem', color: 'var(--oscuro)' }}>Teléfono (Opcional)</label>
                  <input type="tel" value={form.telefono} onChange={handleChange('telefono')} placeholder="+56 9 1234 5678" style={inputStyle('telefono')} />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontWeight: 700, fontSize: '.88rem', color: 'var(--oscuro)' }}>Asunto</label>
                  <input type="text" value={form.asunto} onChange={handleChange('asunto')} placeholder="Escribe el asunto" style={inputStyle('asunto')} required />
                  {errors.asunto && <span style={{ color: 'var(--rojo)', fontSize: '.78rem' }}>{errors.asunto}</span>}
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontWeight: 700, fontSize: '.88rem', color: 'var(--oscuro)' }}>Mensaje</label>
                  <textarea value={form.mensaje} onChange={handleChange('mensaje')} rows={5} placeholder="Escribe tu mensaje..."
                    style={{ ...inputStyle('mensaje'), resize: 'vertical' }} required />
                  {errors.mensaje && <span style={{ color: 'var(--rojo)', fontSize: '.78rem' }}>{errors.mensaje}</span>}
                </div>

                <button type="submit" style={{
                  width: '100%',
                  padding: '.85rem',
                  background: 'var(--rojo)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: '1rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  letterSpacing: 1,
                  transition: 'background .2s',
                }}>
                  🎭 Enviar Mensaje
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

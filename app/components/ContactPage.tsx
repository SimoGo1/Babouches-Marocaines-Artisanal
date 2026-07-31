import { useState } from 'react';

export function ContactPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'bespoke'>('general');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        color: '#1a1a1a',
        backgroundColor: '#fff',
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          backgroundColor: '#1d2a36',
          color: '#ffffff',
          padding: '6rem 2rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 400,
            fontFamily: "'Playfair Display', serif",
            margin: '0 0 1.5rem',
            letterSpacing: '0.02em',
          }}
        >
          Get in Touch
        </h1>
        <p
          style={{
            fontSize: '1.1rem',
            lineHeight: 1.6,
            maxWidth: '600px',
            margin: 0,
            color: 'rgba(255, 255, 255, 0.9)',
            fontWeight: 400,
          }}
        >
          We look forward to discussing how we can serve you.
        </p>
      </section>

      {/* Info Cards Section */}
      <section
        style={{
          backgroundColor: '#f5f1eb',
          padding: '4rem 2rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            width: '100%',
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '3rem 2rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={{ color: '#b8a05a', marginBottom: '1rem' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <h3
              style={{
                fontSize: '1.4rem',
                fontFamily: "'Playfair Display', serif",
                margin: '0 0 1rem',
                fontWeight: 400,
              }}
            >
              Visit Us
            </h3>
            <p style={{ margin: 0, color: '#555', fontSize: '0.95rem', lineHeight: 1.6 }}>
              123 Artisan Street<br />
              New York, NY 10001<br />
              United States
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '3rem 2rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={{ color: '#b8a05a', marginBottom: '1rem' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3
              style={{
                fontSize: '1.4rem',
                fontFamily: "'Playfair Display', serif",
                margin: '0 0 1rem',
                fontWeight: 400,
              }}
            >
              Atelier Hours
            </h3>
            <p style={{ margin: 0, color: '#555', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Monday - Friday<br />
              10:00 AM - 6:00 PM EST<br />
              Call any time
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '3rem 2rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={{ color: '#b8a05a', marginBottom: '1rem' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <h3
              style={{
                fontSize: '1.4rem',
                fontFamily: "'Playfair Display', serif",
                margin: '0 0 1rem',
                fontWeight: 400,
              }}
            >
              Contact
            </h3>
            <p style={{ margin: 0, color: '#555', fontSize: '0.95rem', lineHeight: 1.6 }}>
              atelier@cadence.com<br />
              +1 (888) 123-4567<br />
              Response within 24 hours
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section
        style={{
          padding: '6rem 2rem 8rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div style={{ maxWidth: '800px', width: '100%' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 mb-12">
            <button
              onClick={() => setActiveTab('general')}
              style={{
                padding: '1.25rem',
                fontSize: '1rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeTab === 'general' ? '#1d2a36' : '#f5f1eb',
                color: activeTab === 'general' ? '#ffffff' : '#4a4a4a',
                transition: 'all 0.3s ease',
              }}
            >
              General Inquiry
            </button>
            <button
              onClick={() => setActiveTab('bespoke')}
              style={{
                padding: '1.25rem',
                fontSize: '1rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeTab === 'bespoke' ? '#1d2a36' : '#f5f1eb',
                color: activeTab === 'bespoke' ? '#ffffff' : '#4a4a4a',
                transition: 'all 0.3s ease',
              }}
            >
              Bespoke Services
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', color: '#555' }}>First Name</label>
                <input
                  type="text"
                  required
                  style={{
                    padding: '0.85rem 1rem',
                    border: '1px solid #d0c8bc',
                    borderRadius: '2px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    width: '100%',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#1a1a1a')}
                  onBlur={(e) => (e.target.style.borderColor = '#d0c8bc')}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', color: '#555' }}>Last Name</label>
                <input
                  type="text"
                  required
                  style={{
                    padding: '0.85rem 1rem',
                    border: '1px solid #d0c8bc',
                    borderRadius: '2px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    width: '100%',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#1a1a1a')}
                  onBlur={(e) => (e.target.style.borderColor = '#d0c8bc')}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#555' }}>Email Address</label>
              <input
                type="email"
                required
                style={{
                  padding: '0.85rem 1rem',
                  border: '1px solid #d0c8bc',
                  borderRadius: '2px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  width: '100%',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#1a1a1a')}
                onBlur={(e) => (e.target.style.borderColor = '#d0c8bc')}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#555' }}>Phone Number (Optional)</label>
              <input
                type="tel"
                style={{
                  padding: '0.85rem 1rem',
                  border: '1px solid #d0c8bc',
                  borderRadius: '2px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  width: '100%',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#1a1a1a')}
                onBlur={(e) => (e.target.style.borderColor = '#d0c8bc')}
              />
            </div>

            {activeTab === 'bespoke' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', color: '#555' }}>Service Interested In</label>
                <select
                  style={{
                    padding: '0.85rem 1rem',
                    border: '1px solid #d0c8bc',
                    borderRadius: '2px',
                    fontSize: '1rem',
                    outline: 'none',
                    background: '#fff',
                    transition: 'border-color 0.2s',
                    width: '100%',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#1a1a1a')}
                  onBlur={(e) => (e.target.style.borderColor = '#d0c8bc')}
                >
                  <option>Custom Fitting</option>
                  <option>One-of-a-Kind Design</option>
                  <option>Bridal / Event Consultation</option>
                  <option>Other</option>
                </select>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#555' }}>Message</label>
              <textarea
                rows={6}
                required
                style={{
                  padding: '0.85rem 1rem',
                  border: '1px solid #d0c8bc',
                  borderRadius: '2px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  resize: 'vertical',
                  width: '100%',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#1a1a1a')}
                onBlur={(e) => (e.target.style.borderColor = '#d0c8bc')}
              />
            </div>

            <button
              type="submit"
              style={{
                marginTop: '1rem',
                padding: '1.2rem',
                backgroundColor: '#1d2a36',
                color: '#ffffff',
                border: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: '0.05em',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#111820')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1d2a36')}
            >
              Send Message
            </button>
          </form>
          {submitted && (
            <div
              style={{
                marginTop: '1.5rem',
                padding: '1rem 1.25rem',
                backgroundColor: '#f5f1eb',
                border: '1px solid #d0c8bc',
                borderRadius: '4px',
                color: '#1a1a1a',
                fontSize: '0.95rem',
                textAlign: 'center',
              }}
            >
              Thank you for your message. We'll be in touch shortly.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

import React, {useState} from 'react'
import api from '../services/api'

export default function Planner(){
  const [form, setForm] = useState({
    source: '',
    destination: '', 
    start_date: '2025-12-01', 
    end_date: '2025-12-07', 
    budget: 1500,
    travelers: 1,
    trip_type: 'leisure'
  })
  
  // Popular destinations with high-quality images and AI insights
  const popularDestinations = [
    { 
      name: 'Paris, France', 
      image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=400&h=250&fit=crop&auto=format',
      description: 'City of Light & Romance',
      bestFor: 'Art, Culture, Romance',
      season: 'Apr-Jun, Sep-Oct',
      budget: '€80-150/day',
      highlights: ['Eiffel Tower', 'Louvre', 'Seine River']
    },
    { 
      name: 'Tokyo, Japan', 
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=250&fit=crop&auto=format',
      description: 'Modern Metropolis Meets Tradition',
      bestFor: 'Technology, Food, Culture',
      season: 'Mar-May, Sep-Nov',
      budget: '¥8000-15000/day',
      highlights: ['Shibuya Crossing', 'Temples', 'Sushi']
    },
    { 
      name: 'New York, USA', 
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=250&fit=crop&auto=format',
      description: 'The City That Never Sleeps',
      bestFor: 'Business, Entertainment, Shopping',
      season: 'Apr-Jun, Sep-Nov',
      budget: '$100-200/day',
      highlights: ['Times Square', 'Central Park', 'Broadway']
    },
    { 
      name: 'London, England', 
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=250&fit=crop&auto=format',
      description: 'Royal Heritage & Modern Charm',
      bestFor: 'History, Museums, Royal Sites',
      season: 'May-Sep',
      budget: '£70-120/day',
      highlights: ['Big Ben', 'British Museum', 'Thames']
    },
    { 
      name: 'Bali, Indonesia', 
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=250&fit=crop&auto=format',
      description: 'Tropical Paradise & Spiritual Haven',
      bestFor: 'Beaches, Wellness, Adventure',
      season: 'Apr-Oct',
      budget: '$30-60/day',
      highlights: ['Rice Terraces', 'Temples', 'Beaches']
    },
    { 
      name: 'Dubai, UAE', 
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=250&fit=crop&auto=format',
      description: 'Luxury Desert Oasis',
      bestFor: 'Luxury, Shopping, Architecture',
      season: 'Nov-Mar',
      budget: '$80-150/day',
      highlights: ['Burj Khalifa', 'Desert Safari', 'Malls']
    },
    { 
      name: 'Santorini, Greece', 
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=250&fit=crop&auto=format',
      description: 'Aegean Island Paradise',
      bestFor: 'Romance, Sunsets, Wine',
      season: 'Apr-Oct',
      budget: '€60-120/day',
      highlights: ['Blue Domes', 'Sunsets', 'Wineries']
    },
    { 
      name: 'Rome, Italy', 
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=250&fit=crop&auto=format',
      description: 'Eternal City of Ancient Wonders',
      bestFor: 'History, Art, Cuisine',
      season: 'Apr-Jun, Sep-Oct',
      budget: '€70-130/day',
      highlights: ['Colosseum', 'Vatican', 'Trevi Fountain']
    }
  ]
  
  // Popular source cities
  const popularSources = [
    'New York, USA', 'Los Angeles, USA', 'Chicago, USA', 'Miami, USA',
    'London, England', 'Manchester, England', 'Birmingham, England',
    'Paris, France', 'Lyon, France', 'Marseille, France',
    'Berlin, Germany', 'Munich, Germany', 'Frankfurt, Germany',
    'Mumbai, India', 'Delhi, India', 'Bangalore, India', 'Chennai, India',
    'Tokyo, Japan', 'Osaka, Japan', 'Kyoto, Japan',
    'Sydney, Australia', 'Melbourne, Australia', 'Brisbane, Australia',
    'Toronto, Canada', 'Vancouver, Canada', 'Montreal, Canada',
    'Dubai, UAE', 'Abu Dhabi, UAE',
    'Singapore', 'Hong Kong', 'Seoul, South Korea'
  ]
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  // Validate form inputs
  function validateForm() {
    const newErrors = {}
    
    if (!form.source.trim()) {
      newErrors.source = 'Please enter your departure city'
    }
    
    if (!form.destination.trim()) {
      newErrors.destination = 'Please enter your destination'
    }
    
    if (!form.start_date) {
      newErrors.start_date = 'Please select start date'
    }
    
    if (!form.end_date) {
      newErrors.end_date = 'Please select end date'
    }
    
    if (form.start_date && form.end_date) {
      const startDate = new Date(form.start_date)
      const endDate = new Date(form.end_date)
      const today = new Date()
      
      if (startDate < today) {
        newErrors.start_date = 'Start date cannot be in the past'
      }
      
      if (endDate <= startDate) {
        newErrors.end_date = 'End date must be after start date'
      }
    }
    
    if (!form.budget || form.budget < 100) {
      newErrors.budget = 'Budget must be at least $100'
    }
    
    if (!form.travelers || form.travelers < 1) {
      newErrors.travelers = 'Number of travelers must be at least 1'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function submit(e){
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    setResult(null)
    
    try{
      const res = await api.planTrip(form)
      setResult(res.data)
    }catch(e){
      setResult({error: 'Failed to plan trip. Please try again.'})
    } finally {
      setLoading(false)
    }
  }

  // Calculate trip duration
  function getTripDuration() {
    if (form.start_date && form.end_date) {
      const start = new Date(form.start_date)
      const end = new Date(form.end_date)
      const diffTime = Math.abs(end - start)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays
    }
    return 0
  }

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: '#2563eb', marginBottom: '0.5rem' }}>🌍 AI Trip Planner</h2>
        <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
          Plan your perfect getaway with AI-powered recommendations
        </p>
      </div>

      {/* AI-Powered Destination Showcase */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '2rem', color: '#1f2937', marginBottom: '0.5rem', fontWeight: '700' }}>
            🤖 AI-Recommended Destinations
          </h3>
          <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
            Discover amazing places with AI-powered insights and recommendations
          </p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '1.5rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {popularDestinations.slice(0, 6).map((dest, index) => (
            <div 
              key={index}
              onClick={() => setForm({...form, destination: dest.name})}
              style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                background: '#fff',
                height: '280px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)'
              }}
            >
              {/* Image Section */}
              <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
                <img 
                  src={dest.image} 
                  alt={dest.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                  onError={(e) => {
                    e.target.src = `https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop&auto=format`
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(255,255,255,0.9)',
                  borderRadius: '20px',
                  padding: '4px 12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#2563eb'
                }}>
                  {dest.season}
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
                  color: 'white',
                  padding: '2rem 1rem 1rem 1rem'
                }}>
                  <h4 style={{ 
                    margin: '0 0 4px 0', 
                    fontSize: '18px', 
                    fontWeight: '700',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                  }}>
                    {dest.name}
                  </h4>
                  <p style={{ 
                    margin: 0, 
                    fontSize: '13px', 
                    opacity: 0.9,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                  }}>
                    {dest.description}
                  </p>
                </div>
              </div>
              
              {/* Info Section */}
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ 
                    fontSize: '14px', 
                    color: '#059669', 
                    fontWeight: '600',
                    background: '#ecfdf5',
                    padding: '4px 8px',
                    borderRadius: '12px'
                  }}>
                    {dest.budget}
                  </span>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>
                    Best for: {dest.bestFor}
                  </span>
                </div>
                
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {dest.highlights.map((highlight, idx) => (
                    <span 
                      key={idx}
                      style={{
                        fontSize: '11px',
                        background: '#f3f4f6',
                        color: '#374151',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        border: '1px solid #e5e7eb'
                      }}
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* AI Recommendation Badge */}
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                color: 'white',
                borderRadius: '20px',
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                🤖 AI Pick
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Planning Form */}
        <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#1f2937' }}>✈️ Trip Details</h3>
          
          <form onSubmit={submit} className="form">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              
              {/* Source */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  📍 From (Your City)
                </label>
                <select 
                  value={form.source} 
                  onChange={e=>setForm({...form,source:e.target.value})}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    border: errors.source ? '2px solid #ef4444' : '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="">Select your departure city</option>
                  {popularSources.map((city, index) => (
                    <option key={index} value={city}>{city}</option>
                  ))}
                </select>
                {errors.source && <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>{errors.source}</p>}
              </div>

              {/* Destination */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  🎯 To (Destination)
                </label>
                <select 
                  value={form.destination} 
                  onChange={e=>setForm({...form,destination:e.target.value})}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    border: errors.destination ? '2px solid #ef4444' : '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="">Select your destination</option>
                  {popularDestinations.map((dest, index) => (
                    <option key={index} value={dest.name}>{dest.name}</option>
                  ))}
                </select>
                {errors.destination && <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>{errors.destination}</p>}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              
              {/* Start Date */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  📅 Departure Date
                </label>
                <input 
                  type="date" 
                  value={form.start_date} 
                  onChange={e=>setForm({...form,start_date:e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    border: errors.start_date ? '2px solid #ef4444' : '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                />
                {errors.start_date && <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>{errors.start_date}</p>}
              </div>

              {/* End Date */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  📅 Return Date
                </label>
                <input 
                  type="date" 
                  value={form.end_date} 
                  onChange={e=>setForm({...form,end_date:e.target.value})}
                  min={form.start_date || new Date().toISOString().split('T')[0]}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    border: errors.end_date ? '2px solid #ef4444' : '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                />
                {errors.end_date && <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>{errors.end_date}</p>}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              
              {/* Budget with AI Suggestions */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  💰 Budget (USD)
                </label>
                <input 
                  type="number" 
                  value={form.budget} 
                  onChange={e=>setForm({...form,budget:parseFloat(e.target.value) || 0})}
                  placeholder="1500"
                  min="100"
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    border: errors.budget ? '2px solid #ef4444' : '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                />
                {errors.budget && <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>{errors.budget}</p>}
                
                {/* AI Budget Suggestions */}
                {form.destination && getTripDuration() > 0 && (
                  <div style={{ marginTop: '8px' }}>
                    <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '6px' }}>
                      🤖 AI Budget Suggestions for {getTripDuration()} days:
                    </p>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {[
                        { label: 'Budget', amount: getTripDuration() * 50, color: '#059669' },
                        { label: 'Mid-range', amount: getTripDuration() * 100, color: '#2563eb' },
                        { label: 'Luxury', amount: getTripDuration() * 200, color: '#7c3aed' }
                      ].map((suggestion, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setForm({...form, budget: suggestion.amount})}
                          style={{
                            fontSize: '11px',
                            background: form.budget === suggestion.amount ? suggestion.color : '#f3f4f6',
                            color: form.budget === suggestion.amount ? 'white' : '#374151',
                            border: `1px solid ${suggestion.color}`,
                            padding: '4px 8px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          {suggestion.label}: ${suggestion.amount}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Travelers */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  👥 Travelers
                </label>
                <select 
                  value={form.travelers} 
                  onChange={e=>setForm({...form,travelers:parseInt(e.target.value)})}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    border: errors.travelers ? '2px solid #ef4444' : '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                >
                  {[1,2,3,4,5,6,7,8].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                  ))}
                </select>
                {errors.travelers && <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>{errors.travelers}</p>}
              </div>

              {/* Trip Type */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  🎭 Trip Type
                </label>
                <select 
                  value={form.trip_type} 
                  onChange={e=>setForm({...form,trip_type:e.target.value})}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                >
                  <option value="leisure">🏖️ Leisure</option>
                  <option value="business">💼 Business</option>
                  <option value="adventure">🏔️ Adventure</option>
                  <option value="cultural">🏛️ Cultural</option>
                  <option value="romantic">💕 Romantic</option>
                  <option value="family">👨‍👩‍👧‍👦 Family</option>
                </select>
              </div>
            </div>

            {/* AI Trip Insights */}
            {form.destination && (
              <div style={{ 
                background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', 
                padding: '1.5rem', 
                borderRadius: '12px', 
                marginBottom: '1.5rem',
                border: '2px solid #bae6fd'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '20px' }}>🤖</span>
                  <h4 style={{ margin: '0', color: '#0c4a6e', fontWeight: '600' }}>AI Travel Insights</h4>
                </div>
                
                {(() => {
                  const selectedDest = popularDestinations.find(d => d.name === form.destination)
                  if (selectedDest) {
                    return (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#0369a1' }}>
                            <strong>Best Season:</strong> {selectedDest.season}
                          </p>
                          <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#0369a1' }}>
                            <strong>Daily Budget:</strong> {selectedDest.budget}
                          </p>
                        </div>
                        <div>
                          <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#0369a1' }}>
                            <strong>Perfect For:</strong> {selectedDest.bestFor}
                          </p>
                          <p style={{ margin: '0', fontSize: '14px', color: '#0369a1' }}>
                            <strong>Must-See:</strong> {selectedDest.highlights.join(', ')}
                          </p>
                        </div>
                      </div>
                    )
                  }
                  return null
                })()}
              </div>
            )}

            {/* Trip Summary */}
            {getTripDuration() > 0 && (
              <div style={{ 
                background: '#f3f4f6', 
                padding: '1rem', 
                borderRadius: '8px', 
                marginBottom: '1.5rem',
                border: '1px solid #d1d5db'
              }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#374151' }}>📋 Trip Summary</h4>
                <p style={{ margin: '0', color: '#6b7280' }}>
                  <strong>{getTripDuration()} days</strong> trip from <strong>{form.source || 'Your city'}</strong> to <strong>{form.destination}</strong> 
                  {form.travelers > 1 && ` for ${form.travelers} people`}
                  {form.budget && ` with $${form.budget} budget`}
                </p>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                width: '100%', 
                padding: '16px', 
                backgroundColor: loading ? '#9ca3af' : '#2563eb',
                color: 'white', 
                border: 'none', 
                borderRadius: '8px', 
                fontSize: '18px', 
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              {loading ? '🔄 Planning Your Trip...' : '🚀 Plan My Trip'}
            </button>
          </form>
        </div>

        {/* Results */}
        {result && (
          <div style={{ 
            background: result.error ? '#fef2f2' : '#f0f9ff', 
            padding: '2rem', 
            borderRadius: '12px', 
            border: result.error ? '2px solid #fca5a5' : '2px solid #93c5fd'
          }}>
            {result.error ? (
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ color: '#dc2626', marginBottom: '1rem' }}>❌ Oops! Something went wrong</h3>
                <p style={{ color: '#dc2626', fontSize: '16px' }}>{result.error}</p>
                <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '1rem' }}>
                  Please check your details and try again.
                </p>
              </div>
            ) : (
              <>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <h3 style={{ color: '#059669', marginBottom: '0.5rem' }}>🎉 Your Trip is Planned!</h3>
                  <p style={{ color: '#6b7280' }}>Here's your personalized itinerary</p>
                </div>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '1rem', 
                  marginBottom: '2rem' 
                }}>
                  <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', marginBottom: '0.5rem' }}>🎯</div>
                    <div style={{ fontWeight: '600', color: '#374151' }}>Destination</div>
                    <div style={{ color: '#6b7280' }}>{result.destination}</div>
                  </div>
                  
                  <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', marginBottom: '0.5rem' }}>📅</div>
                    <div style={{ fontWeight: '600', color: '#374151' }}>Duration</div>
                    <div style={{ color: '#6b7280' }}>{result.start_date} to {result.end_date}</div>
                  </div>
                  
                  <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', marginBottom: '0.5rem' }}>💰</div>
                    <div style={{ fontWeight: '600', color: '#374151' }}>Budget</div>
                    <div style={{ color: '#6b7280' }}>${result.budget || 'Not specified'}</div>
                  </div>
                  
                  <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', marginBottom: '0.5rem' }}>🆔</div>
                    <div style={{ fontWeight: '600', color: '#374151' }}>Trip ID</div>
                    <div style={{ color: '#6b7280' }}>#{result.id}</div>
                  </div>
                </div>

                {result.title && (
                  <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', marginBottom: '1rem' }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#374151' }}>📝 Trip Title</h4>
                    <p style={{ margin: '0', color: '#6b7280', fontSize: '16px' }}>{result.title}</p>
                  </div>
                )}
                
                {Array.isArray(result.itinerary_json) && result.itinerary_json.length > 0 && (
                  <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px' }}>
                    <h4 style={{ margin: '0 0 1rem 0', color: '#374151' }}>🗓️ Your Itinerary</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {result.itinerary_json.map((day, idx) => (
                        <div key={idx} style={{ 
                          display: 'flex', 
                          gap: '1rem', 
                          padding: '1rem', 
                          background: '#f9fafb', 
                          borderRadius: '8px',
                          border: '1px solid #e5e7eb'
                        }}>
                          <div style={{ 
                            minWidth: '40px', 
                            height: '40px', 
                            background: '#2563eb', 
                            color: 'white', 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            fontWeight: '600'
                          }}>
                            {day.day}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: '600', color: '#374151', marginBottom: '0.25rem' }}>
                              Day {day.day}
                            </div>
                            <div style={{ color: '#6b7280', lineHeight: '1.5' }}>
                              {day.plan}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

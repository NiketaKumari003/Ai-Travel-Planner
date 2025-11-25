import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Planning',
      description: 'Get personalized trip recommendations based on your preferences, budget, and travel style.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
    },
    {
      icon: '💬',
      title: 'Smart Chat Assistant',
      description: 'Ask questions and get instant travel advice from our intelligent AI assistant.',
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=300&fit=crop'
    },
    {
      icon: '📋',
      title: 'Detailed Itineraries',
      description: 'Receive comprehensive day-by-day plans with activities, tips, and recommendations.',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop'
    },
    {
      icon: '💰',
      title: 'Budget Optimization',
      description: 'Plan amazing trips within your budget with cost-effective suggestions and alternatives.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop'
    }
  ]

  const quickActions = [
    {
      title: 'Plan a New Trip',
      description: 'Start planning your next adventure',
      link: '/planner',
      icon: '✈️',
      color: '#2563eb'
    },
    {
      title: 'Ask AI Assistant',
      description: 'Get instant travel advice',
      link: '/chat',
      icon: '💬',
      color: '#059669'
    }
  ]

  return (
    <div className="container">
      {/* Hero Section with Background Image */}
      <div style={{ 
        position: 'relative',
        textAlign: 'center', 
        marginBottom: '4rem',
        borderRadius: '20px',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.9), rgba(29, 78, 216, 0.8)), url("https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop") center/cover',
        color: 'white',
        padding: '4rem 2rem',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✈️</div>
          <h1 style={{ 
            fontSize: '3.5rem', 
            marginBottom: '1rem',
            fontWeight: '700',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            AI Traveler Planner
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: 'rgba(255,255,255,0.9)', 
            maxWidth: '600px', 
            margin: '0 auto 2rem auto',
            lineHeight: '1.6',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
          }}>
            Your intelligent travel companion that helps you discover amazing destinations, 
            plan perfect itineraries, and make the most of your adventures with AI-powered recommendations.
          </p>
        
        {/* Quick Action Buttons */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '1.5rem',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              style={{
                display: 'block',
                padding: '1.5rem',
                backgroundColor: action.color,
                color: 'white',
                textDecoration: 'none',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 8px 15px rgba(0,0,0,0.2)'
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{action.icon}</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                {action.title}
              </div>
              <div style={{ fontSize: '0.95rem', opacity: 0.9 }}>
                {action.description}
              </div>
            </Link>
          ))}
        </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ marginBottom: '4rem' }}>
        <h2 style={{ 
          textAlign: 'center', 
          fontSize: '2.5rem', 
          color: '#1f2937', 
          marginBottom: '3rem',
          fontWeight: '600'
        }}>
          Why Choose AI Traveler?
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          {features.map((feature, index) => (
            <div key={index} style={{
              background: '#fff',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb',
              transition: 'transform 0.2s, box-shadow 0.2s',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.15)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  fontSize: '2rem',
                  background: 'rgba(255,255,255,0.9)',
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {feature.icon}
                </div>
              </div>
              <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  color: '#1f2937', 
                  marginBottom: '1rem',
                  fontWeight: '600'
                }}>
                  {feature.title}
                </h3>
                <p style={{ 
                  color: '#6b7280', 
                  lineHeight: '1.6',
                  fontSize: '1rem'
                }}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div style={{ 
        background: '#f9fafb', 
        padding: '3rem 2rem', 
        borderRadius: '16px',
        marginBottom: '4rem'
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          fontSize: '2.5rem', 
          color: '#1f2937', 
          marginBottom: '3rem',
          fontWeight: '600'
        }}>
          How It Works
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '2rem',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {[
            { step: '1', title: 'Tell Us Your Preferences', desc: 'Share your destination, dates, budget, and travel style' },
            { step: '2', title: 'AI Creates Your Plan', desc: 'Our AI analyzes your preferences and creates a personalized itinerary' },
            { step: '3', title: 'Enjoy Your Trip', desc: 'Follow your custom plan and make amazing memories' }
          ].map((item, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#2563eb',
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: '700',
                margin: '0 auto 1rem auto'
              }}>
                {item.step}
              </div>
              <h3 style={{ 
                fontSize: '1.25rem', 
                color: '#1f2937', 
                marginBottom: '0.5rem',
                fontWeight: '600'
              }}>
                {item.title}
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.5' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div style={{ 
        textAlign: 'center',
        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
        color: 'white',
        padding: '3rem 2rem',
        borderRadius: '16px',
        marginBottom: '2rem'
      }}>
        <h2 style={{ 
          fontSize: '2.5rem', 
          marginBottom: '1rem',
          fontWeight: '600'
        }}>
          Ready to Start Your Adventure?
        </h2>
        <p style={{ 
          fontSize: '1.25rem', 
          marginBottom: '2rem',
          opacity: 0.9,
          maxWidth: '600px',
          margin: '0 auto 2rem auto'
        }}>
          Join thousands of travelers who trust AI Traveler Planner to create unforgettable experiences.
        </p>
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link
            to="/planner"
            style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              backgroundColor: 'white',
              color: '#2563eb',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '1.125rem',
              fontWeight: '600',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            🚀 Plan Your Trip Now
          </Link>
          <Link
            to="/chat"
            style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              backgroundColor: 'transparent',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '1.125rem',
              fontWeight: '600',
              border: '2px solid white',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = 'white'
              e.target.style.color = '#2563eb'
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent'
              e.target.style.color = 'white'
            }}
          >
            💬 Ask AI Assistant
          </Link>
        </div>
      </div>
    </div>
  )
}

import React, {useState, useRef, useEffect} from 'react'
import api from '../services/api'

export default function Chat(){
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      from: 'bot', 
      text: 'Hello! 👋 I\'m your AI Travel Assistant. I can help you with:\n\n• Trip recommendations and planning\n• Destination information\n• Travel tips and advice\n• Budget planning\n• Best times to visit places\n\nWhat would you like to know about your next adventure?',
      timestamp: new Date()
    }
  ])
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const suggestedQuestions = [
    "What are the best destinations for a $2000 budget?",
    "When is the best time to visit Japan?",
    "What should I pack for a European trip?",
    "How can I find cheap flights?",
    "What are some hidden gems in Southeast Asia?",
    "Travel tips for first-time solo travelers"
  ]

  async function send(messageText = input){
    if(!messageText.trim() || loading) return
    
    const userMsg = {
      from: 'user', 
      text: messageText,
      timestamp: new Date()
    }
    
    setMessages(m=>[...m, userMsg])
    setInput('')
    setLoading(true)
    
    try{
      const res = await api.chat({message: messageText})
      const reply = res.data.reply || 'I apologize, but I couldn\'t process your request right now. Please try asking again!'
      
      // Simulate thinking time for better UX
      setTimeout(() => {
        setMessages(m=>[...m, {
          from: 'bot', 
          text: reply,
          timestamp: new Date()
        }])
        setLoading(false)
      }, 1000)
      
    }catch(e){
      setTimeout(() => {
        setMessages(m=>[...m, {
          from: 'bot', 
          text: 'Sorry, I\'m having trouble connecting right now. Please check your internet connection and try again! 🔄',
          timestamp: new Date()
        }])
        setLoading(false)
      }, 1000)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const formatMessage = (text) => {
    // Convert markdown-like formatting to JSX elements
    const lines = text.split('\n')
    return lines.map((line, index) => {
      // Handle headers with **text**
      if (line.includes('**') && line.includes('**')) {
        const parts = line.split('**')
        return (
          <div key={index} style={{ marginBottom: '8px' }}>
            {parts.map((part, i) => 
              i % 2 === 1 ? 
                <strong key={i} style={{ color: '#1f2937', fontSize: '16px' }}>{part}</strong> : 
                <span key={i}>{part}</span>
            )}
          </div>
        )
      }
      // Handle bullet points
      else if (line.startsWith('• ')) {
        return (
          <div key={index} style={{ 
            marginLeft: '16px', 
            marginBottom: '4px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px'
          }}>
            <span style={{ color: '#2563eb', fontWeight: 'bold' }}>•</span>
            <span>{line.substring(2)}</span>
          </div>
        )
      }
      // Handle emojis and regular text
      else if (line.trim()) {
        return (
          <div key={index} style={{ marginBottom: line.includes('🎒') || line.includes('💰') || line.includes('🇫🇷') || line.includes('🇯🇵') || line.includes('🇬🇧') || line.includes('🇮🇩') || line.includes('🍽️') || line.includes('✈️') || line.includes('🌤️') || line.includes('🤖') ? '12px' : '6px' }}>
            {line}
          </div>
        )
      }
      // Empty lines for spacing
      else {
        return <div key={index} style={{ height: '8px' }} />
      }
    })
  }

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: '#2563eb', marginBottom: '0.5rem' }}>🤖 AI Travel Assistant</h2>
        <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
          Get instant travel advice and personalized recommendations
        </p>
      </div>

      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        
        {/* Chat Messages */}
        <div style={{ 
          height: '500px', 
          overflowY: 'auto', 
          padding: '1.5rem',
          background: '#f9fafb'
        }}>
          {messages.map((m, i) => (
            <div key={i} style={{ 
              display: 'flex', 
              justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '1rem'
            }}>
              <div style={{ 
                maxWidth: '70%',
                padding: '12px 16px',
                borderRadius: '18px',
                backgroundColor: m.from === 'user' ? '#2563eb' : '#fff',
                color: m.from === 'user' ? 'white' : '#374151',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                border: m.from === 'bot' ? '1px solid #e5e7eb' : 'none'
              }}>
                <div style={{ 
                  whiteSpace: 'pre-wrap', 
                  lineHeight: '1.6',
                  fontSize: '15px'
                }}>
                  {formatMessage(m.text)}
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  marginTop: '4px',
                  opacity: 0.7,
                  textAlign: 'right'
                }}>
                  {formatTime(m.timestamp)}
                </div>
              </div>
            </div>
          ))}
          
          {/* Loading indicator */}
          {loading && (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-start',
              marginBottom: '1rem'
            }}>
              <div style={{ 
                padding: '12px 16px',
                borderRadius: '18px',
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  color: '#6b7280'
                }}>
                  <div style={{ 
                    width: '8px', 
                    height: '8px', 
                    borderRadius: '50%', 
                    backgroundColor: '#2563eb',
                    animation: 'pulse 1.5s ease-in-out infinite'
                  }}></div>
                  <div style={{ 
                    width: '8px', 
                    height: '8px', 
                    borderRadius: '50%', 
                    backgroundColor: '#2563eb',
                    animation: 'pulse 1.5s ease-in-out infinite 0.2s'
                  }}></div>
                  <div style={{ 
                    width: '8px', 
                    height: '8px', 
                    borderRadius: '50%', 
                    backgroundColor: '#2563eb',
                    animation: 'pulse 1.5s ease-in-out infinite 0.4s'
                  }}></div>
                  <span style={{ fontSize: '14px' }}>AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div style={{ 
            padding: '1rem 1.5rem',
            borderTop: '1px solid #e5e7eb',
            background: '#fff'
          }}>
            <div style={{ 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#374151', 
              marginBottom: '0.75rem' 
            }}>
              💡 Try asking about:
            </div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '0.5rem' 
            }}>
              {suggestedQuestions.slice(0, 4).map((question, index) => (
                <button
                  key={index}
                  onClick={() => send(question)}
                  style={{
                    padding: '8px 12px',
                    fontSize: '13px',
                    backgroundColor: '#f3f4f6',
                    border: '1px solid #d1d5db',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: '#374151',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#e5e7eb'
                    e.target.style.borderColor = '#9ca3af'
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#f3f4f6'
                    e.target.style.borderColor = '#d1d5db'
                  }}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div style={{ 
          padding: '1.5rem',
          borderTop: '1px solid #e5e7eb',
          background: '#fff'
        }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <textarea
                value={input} 
                onChange={e=>setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about travel... (Press Enter to send)"
                disabled={loading}
                style={{ 
                  width: '100%',
                  minHeight: '44px',
                  maxHeight: '120px',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '22px',
                  fontSize: '16px',
                  resize: 'none',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
            <button 
              onClick={() => send()}
              disabled={!input.trim() || loading}
              style={{ 
                padding: '12px 24px',
                backgroundColor: (!input.trim() || loading) ? '#9ca3af' : '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '22px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: (!input.trim() || loading) ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              {loading ? '⏳' : '📤 Send'}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

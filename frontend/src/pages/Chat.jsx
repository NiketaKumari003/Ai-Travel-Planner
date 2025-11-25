import React, {useState} from 'react'
import api from '../services/api'

export default function Chat(){
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])

  async function send(){
    if(!input) return
    const userMsg = {from:'user', text: input}
    setMessages(m=>[...m, userMsg])
    setInput('')
    try{
      const res = await api.chat({message: input})
      const reply = res.data.reply || 'No reply'
      setMessages(m=>[...m, {from:'bot', text: reply}])
    }catch(e){
      setMessages(m=>[...m, {from:'bot', text: 'Error contacting backend'}])
    }
  }

  return (
    <div className="container">
      <h2>Chat with AI Travel Agent</h2>
      <div className="chatbox">
        {messages.map((m, i)=>(
          <div key={i} className={'msg ' + m.from}>{m.text}</div>
        ))}
      </div>
      <div className="row">
        <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask something..." />
        <button onClick={send}>Send</button>
      </div>
    </div>
  )
}

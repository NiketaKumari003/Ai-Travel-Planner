import React, {useState} from 'react'
import api from '../services/api'

export default function Planner(){
  const [form, setForm] = useState({destination:'Paris', start_date:'2025-12-01', end_date:'2025-12-07', budget:1500})
  const [result, setResult] = useState(null)

  async function submit(e){
    e.preventDefault()
    try{
      const res = await api.planTrip(form)
      setResult(res.data)
    }catch(e){
      setResult({error: 'Failed to plan trip'})
    }
  }

  return (
    <div className="container">
      <h2>Trip Planner</h2>
      <form onSubmit={submit} className="form">
        <label>Destination<input value={form.destination} onChange={e=>setForm({...form,destination:e.target.value})} /></label>
        <label>Start Date<input type="date" value={form.start_date} onChange={e=>setForm({...form,start_date:e.target.value})} /></label>
        <label>End Date<input type="date" value={form.end_date} onChange={e=>setForm({...form,end_date:e.target.value})} /></label>
        <label>Budget<input type="number" value={form.budget} onChange={e=>setForm({...form,budget:parseFloat(e.target.value)})} /></label>
        <button type="submit">Plan Trip</button>
      </form>
      {result && <pre className="result">{JSON.stringify(result, null, 2)}</pre>}
    </div>
  )
}

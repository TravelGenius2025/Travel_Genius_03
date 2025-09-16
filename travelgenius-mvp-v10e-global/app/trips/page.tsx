'use client'
import Poll from '@/components/Poll'; import SavedList from '@/components/SavedList'
export default function Trips(){
  return (<div className="space-y-8">
    <section className="space-y-2">
      <h1 className="text-3xl font-bold h-serif">My Trips & Group Polls</h1>
      <p className="text-[rgba(59,47,42,0.7)]">Create a quick poll and share a link with friends. If Supabase is configured, polls persist across devices.</p>
      <Poll/>
    </section>
    <section className="space-y-2">
      <h2 className="text-2xl font-bold h-serif">Saved Experiences</h2>
      <SavedList/>
    </section>
  </div>)
}

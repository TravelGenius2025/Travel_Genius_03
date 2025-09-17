import Link from 'next/link'
export default function Home(){ return (
  <div className='space-y-10'>
    <section className='rounded-2xl overflow-hidden'>
      <div className='brand p-10'>
        <h1 className='text-4xl font-bold mb-2'>TravelGenius</h1>
        <p className='opacity-90 mb-6'>Global search, instant ideas, quick links.</p>
        <Link href='/search' className='bg-white text-black px-4 py-2 rounded-xl inline-block'>Start searching</Link>
      </div>
    </section>
  </div>
)}

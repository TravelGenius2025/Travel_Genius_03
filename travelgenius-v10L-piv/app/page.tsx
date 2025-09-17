import Link from 'next/link'
export default function Home(){
  return (
    <div className="space-y-10">
      <section className="rounded-2xl overflow-hidden">
        <div className="brand-gradient p-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold h-serif mb-2">TravelGenius</h1>
            <p className="opacity-90 mb-6">Global search, instant ideas, quick booking links — all without accounts or paywalls.</p>
            <Link href="/search" className="button bg-white text-ink-700">Start searching</Link>
          </div>
        </div>
      </section>
      <section className="section p-6">
        <h2 className="text-xl font-semibold mb-4">Popular destinations</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {['paris','tokyo','london','new-york','dubai','rome','barcelona','bali'].map(slug=>(
            <a key={slug} className="card overflow-hidden group" href={`/dest/${slug}`}>
              <img src={`https://source.unsplash.com/featured/?${slug}&sig=${slug}`} alt={slug} className="h-28 w-full object-cover group-hover:scale-105 transition-transform"/>
              <div className="p-3 font-medium capitalize">{slug.replace('-',' ')}</div>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}

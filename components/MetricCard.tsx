'use client'
export default function MetricCard({data}:{data:any}){
  if(!data) return <div className="border rounded-xl p-4 text-gray-500">Fill the form and hit “Search & Build Links”.</div>
  const tei = Math.round(data.tei||0)
  const bar = Math.max(0, Math.min(100, tei))
  const color = tei>=75 ? 'bg-green-500' : tei>=55 ? 'bg-yellow-500' : 'bg-red-500'
  return (
    <div className="border rounded-xl p-4">
      <div className="flex items-end gap-3">
        <div className="text-5xl font-extrabold">{tei}</div>
        <div className="text-sm text-gray-500">/ 100</div>
      </div>
      <div className="mt-3 h-3 w-full bg-gray-100 rounded-full overflow-hidden">
        <div className={color + " h-3"} style={{width: bar + '%'}}/>
      </div>
      <ul className="mt-4 text-sm text-gray-700 space-y-1">
        <li><span className="font-medium">Distance:</span> {Math.round(data.distance_km)} km</li>
        <li><span className="font-medium">CO₂:</span> {Math.round(data.co2_kg)} kg (RF {Math.round(data.co2_rf_kg)} kg)</li>
        <li><span className="font-medium">Jet lag:</span> {Math.round(Math.abs(data.tz_diff_hours))} h time shift</li>
        <li><span className="font-medium">Weather risk:</span> {data.weather?.risk?.join(', ')||'low'}</li>
      </ul>
      {Array.isArray(data.notes)&&data.notes.length>0 && (
        <div className="mt-3 text-xs text-gray-500">
          {data.notes.map((n:string,i:number)=>(<div key={i}>• {n}</div>))}
        </div>
      )}
    </div>
  )
}

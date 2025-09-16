import type { Config } from 'tailwindcss'
const config: Config = { content: ['./app/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme:{extend:{colors:{ivory:'#F4EFE6',cocoa:'#3B2F2A',gold:{400:'#D8C38F',500:'#C6A667',600:'#AD8D4A'}},
  boxShadow:{soft:'0 10px 30px rgba(0,0,0,0.08)'},borderRadius:{'2xl':'1rem'}}}, plugins:[]}
export default config

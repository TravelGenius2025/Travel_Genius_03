/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme:{extend:{
    colors:{ brandPink:'#EC4899', brandIndigo:'#6366F1', brandViolet:'#8B5CF6', ink:'#2E2A27', ivory:'#F9F7F3' },
    boxShadow:{soft:'0 10px 30px rgba(0,0,0,0.08)'},
  }},
  plugins:[]
};

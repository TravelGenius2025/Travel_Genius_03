/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme:{extend:{
    colors:{
      ivory:'#F4EFE6', cocoa:'#2E2A27',
      brandPink:'#EC4899', brandIndigo:'#6366F1', brandViolet:'#8B5CF6',
      ink:{600:'#2E2A27',700:'#1f1b18'}
    },
    boxShadow:{soft:'0 10px 30px rgba(0,0,0,0.08)'},
    borderRadius:{'2xl':'1rem'}
  }},
  plugins:[]
};

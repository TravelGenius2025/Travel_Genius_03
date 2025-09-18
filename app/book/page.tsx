'use client'
import { useState } from 'react'
import BookingHub from '@/components/BookingHub'

export default function BookPage(){
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-500 via-indigo-500 to-violet-600 bg-clip-text text-transparent">
        Plan & Book
      </h1>
      <p className="text-gray-600 mb-6">Search flights and hotels across top sites, and see your unique Trip Ease Index™ instantly.</p>
      <BookingHub/>
    </div>
  )
}

'use client'

import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'

const DigitalClockPage = () => {
    //states
    const [time, setTime] = useState<Date>(new Date())
    const [is24Hour, setIs24Hour] = useState<boolean>(true)
    const [mounted, setMounted] = useState<boolean>(true)
    //methods
    useEffect(() => {
      setMounted(true)
      const interval = setInterval(() => setTime(new Date()), 1000);
    
      return () => clearInterval(interval)
    }, []);

    const formattedTime = useMemo<string>(() => {
        if (!mounted) {
            return "";
        }
        const hours = is24Hour ? time.getHours().toString().padStart(2, "0") : (time.getHours() % 12 || 12 ).toString().padStart(2, "0")
        const minutes = time.getMinutes().toString().padStart(2, "0")
        const seconds = time.getSeconds().toString().padStart(2, "0")
        return `${hours}:${minutes}:${seconds}`
    },[time, is24Hour, mounted])
    



  return (
    <>
    {/* <Button>hello world</Button>
    <Card>this is card</Card> */}

<div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500">
  <Card className="p-8 shadow-2xl rounded-3xl bg-white bg-opacity-80 backdrop-blur-md">
    <div className="flex flex-col items-center justify-center">
      <div className="text-4xl font-extrabold text-gray-900 mb-2 animate-pulse">
        Digital Clock
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center tracking-wider">
        Displaying the current time in hours, minutes, and seconds.
      </div>
      <div className="text-7xl font-extrabold tracking-wider text-gray-800 mb-4 animate-fade-in">
        {formattedTime}
      </div>
      <div className="mt-6 flex space-x-4">
        <Button
          variant={is24Hour ? "default" : "outline"}
          onClick={() => setIs24Hour(true)}
          className={`mr-2 font-bold px-4 py-2 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${is24Hour ? "bg-indigo-500 text-white" : "border border-indigo-500 text-indigo-500"}`}
        >
          24-Hour Format
        </Button>
        <Button
          variant={!is24Hour ? "default" : "outline"}
          onClick={() => setIs24Hour(false)}
          className={`mr-2 font-bold px-4 py-2 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${!is24Hour ? "bg-indigo-500 text-white" : "border border-indigo-500 text-indigo-500"}`}
        >
          12-Hour Format
        </Button>
      </div>
    </div>
  </Card>
</div>

    </>
  )
}

export default DigitalClockPage
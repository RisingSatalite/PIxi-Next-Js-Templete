'use client'
import { useEffect, useRef } from 'react'

import { Application } from '@pixi/app'
import { Graphics } from '@pixi/graphics'
import { Ticker } from '@pixi/ticker'
import { Container } from '@pixi/display'
import '@pixi/events'

export default function PixiCanvas() {
  const containerRef = useRef(null)
  const appRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const app = new Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x1099bb,
      antialias: true,
      autoDensity: true,
      resolution: window.devicePixelRatio || 1,
    })

    containerRef.current.appendChild(app.view)
    appRef.current = app

    const stage = new Container()
    app.stage = stage

    const square = new Graphics()
    square.beginFill(0xde3249)
    square.drawRect(-50, -50, 100, 100)
    square.endFill()
    stage.addChild(square)

    // ✅ Named tick function
    const tick = () => {
      square.rotation += 0.01
      app.render()
    }

    Ticker.shared.add(tick)

    const onResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      app.renderer.resize(width, height)
      square.x = width / 2
      square.y = height / 2
    }

    //Imediately makes sure the square is in the middle
    onResize()

    window.addEventListener('resize', onResize)

    return () => {
      Ticker.shared.stop()
      Ticker.shared.remove(tick) // ✅ remove named function instead of removeAll()
      window.removeEventListener('resize', onResize)
      app.destroy(true)
    }
  }, [])

  return <div ref={containerRef} style={{ width: '100vw', height: '100vh' }} />
}

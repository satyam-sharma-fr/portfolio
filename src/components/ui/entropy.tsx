'use client'
import { useEffect, useRef } from 'react'

interface EntropyProps {
  className?: string
  hoveredSide?: "personal" | "work" | null
}

export function Entropy({ className = "", hoveredSide = null }: EntropyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Get container size for full-screen
    const updateSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const dpr = window.devicePixelRatio || 1
      
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)
      
      return { width, height }
    }

    let { width, height } = updateSize()

    // Color based on hovered side
    const getParticleColor = (isOrder: boolean) => {
      if (hoveredSide === "personal" && isOrder) return '#FF6B35' // Warm for personal/order
      if (hoveredSide === "work" && !isOrder) return '#64C8FF' // Cool for work/chaos
      return '#ffffff'
    }

    class Particle {
      x: number
      y: number
      size: number
      order: boolean
      velocity: { x: number; y: number }
      originalX: number
      originalY: number
      influence: number
      neighbors: Particle[]

      constructor(x: number, y: number, order: boolean) {
        this.x = x
        this.y = y
        this.originalX = x
        this.originalY = y
        this.size = 1.5
        this.order = order
        this.velocity = {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2
        }
        this.influence = 0
        this.neighbors = []
      }

      update(width: number, height: number) {
        if (this.order) {
          // Ordered particles - try to return to grid position
          const dx = this.originalX - this.x
          const dy = this.originalY - this.y

          // Get influenced by nearby chaotic particles
          const chaosInfluence = { x: 0, y: 0 }
          this.neighbors.forEach(neighbor => {
            if (!neighbor.order) {
              const distance = Math.hypot(this.x - neighbor.x, this.y - neighbor.y)
              const strength = Math.max(0, 1 - distance / 150)
              chaosInfluence.x += (neighbor.velocity.x * strength)
              chaosInfluence.y += (neighbor.velocity.y * strength)
              this.influence = Math.max(this.influence, strength)
            }
          })

          this.x += dx * 0.05 * (1 - this.influence) + chaosInfluence.x * this.influence
          this.y += dy * 0.05 * (1 - this.influence) + chaosInfluence.y * this.influence
          this.influence *= 0.99
        } else {
          // Chaotic particles - random movement
          this.velocity.x += (Math.random() - 0.5) * 0.5
          this.velocity.y += (Math.random() - 0.5) * 0.5
          this.velocity.x *= 0.95
          this.velocity.y *= 0.95
          this.x += this.velocity.x
          this.y += this.velocity.y

          // Boundary - stay in right half but can touch center
          const centerLine = width / 2
          if (this.x < centerLine || this.x > width) this.velocity.x *= -1
          if (this.y < 0 || this.y > height) this.velocity.y *= -1
          this.x = Math.max(centerLine, Math.min(width, this.x))
          this.y = Math.max(0, Math.min(height, this.y))
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        const particleColor = getParticleColor(this.order)
        const alpha = this.order ? 0.6 - this.influence * 0.3 : 0.6
        ctx.fillStyle = `${particleColor}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particle grid based on screen size
    // Particles fill entire screen - left half = order, right half = chaos
    // (hover zones are separate from particle zones)
    const particles: Particle[] = []
    const gridSize = Math.min(30, Math.floor(Math.min(width, height) / 30))
    const spacingX = width / gridSize
    const spacingY = height / gridSize

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = spacingX * i + spacingX / 2
        const y = spacingY * j + spacingY / 2
        // Left half = order, Right half = chaos (connected in middle)
        const order = x < width / 2
        particles.push(new Particle(x, y, order))
      }
    }

    function updateNeighbors() {
      particles.forEach(particle => {
        particle.neighbors = particles.filter(other => {
          if (other === particle) return false
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y)
          return distance < 150
        })
      })
    }

    let time = 0
    let animationId: number
    
    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)

      if (time % 30 === 0) {
        updateNeighbors()
      }

      particles.forEach(particle => {
        particle.update(width, height)
        particle.draw(ctx)

        // Draw connection lines
        particle.neighbors.forEach(neighbor => {
          const distance = Math.hypot(particle.x - neighbor.x, particle.y - neighbor.y)
          if (distance < 80) {
            const alpha = 0.15 * (1 - distance / 80)
            const lineColor = particle.order ? 
              (hoveredSide === "personal" ? '#FF6B35' : '#ffffff') : 
              (hoveredSide === "work" ? '#64C8FF' : '#ffffff')
            ctx.strokeStyle = `${lineColor}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(neighbor.x, neighbor.y)
            ctx.stroke()
          }
        })
      })

      // Very subtle center line where order meets chaos
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(width / 2, 0)
      ctx.lineTo(width / 2, height)
      ctx.stroke()

      time++
      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      const newSize = updateSize()
      width = newSize.width
      height = newSize.height
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [hoveredSide])

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />
    </div>
  )
}

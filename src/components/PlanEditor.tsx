'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ImageIcon } from 'lucide-react'
import { TopBar } from './editor/TopBar'
import { SideMenu } from './editor/SideMenu'
import { Transform } from '@/types/editor'

export default function PlanEditor() {
  // États principaux
  const [transform, setTransform] = useState<Transform>({
    scale: 1,
    rotation: 0,
    translateX: 0,
    translateY: 0
  })
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })
  const [placedIcons, setPlacedIcons] = useState<any[]>([])

  // Refs
  const editorRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Prévenir le scroll pendant le zoom
  useEffect(() => {
    const preventDefault = (e: WheelEvent) => {
      if (editorRef.current?.contains(e.target as Node)) {
        e.preventDefault()
      }
    }
    document.addEventListener('wheel', preventDefault, { passive: false })
    return () => document.removeEventListener('wheel', preventDefault)
  }, [])

  // Gestionnaires d'événements principaux
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = -e.deltaY * 0.001
    const newScale = Math.min(Math.max(0.1, transform.scale * (1 + delta)), 5)
    
    const rect = editorRef.current?.getBoundingClientRect()
    if (rect) {
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      
      setTransform(prev => ({
        ...prev,
        scale: newScale,
        translateX: mouseX - (mouseX - prev.translateX) * (newScale / prev.scale),
        translateY: mouseY - (mouseY - prev.translateY) * (newScale / prev.scale)
      }))
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsPanning(true)
      setPanStart({
        x: e.clientX - transform.translateX,
        y: e.clientY - transform.translateY
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setTransform(prev => ({
        ...prev,
        translateX: e.clientX - panStart.x,
        translateY: e.clientY - panStart.y
      }))
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    try {
      const icon = JSON.parse(e.dataTransfer.getData('application/json'))
      const rect = editorRef.current?.getBoundingClientRect()
      if (!rect) return

      const x = (e.clientX - rect.left - transform.translateX) / transform.scale
      const y = (e.clientY - rect.top - transform.translateY) / transform.scale

      const newIcon = {
        ...icon,
        id: `${icon.id}-${Date.now()}`,
        x,
        y,
        rotation: -transform.rotation
      }

      setPlacedIcons(prev => [...prev, newIcon])
    } catch (error) {
      console.error('Error dropping icon:', error)
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F7F8] flex">
      {/* Menu latéral */}
      <SideMenu onIconDragStart={() => {}} />

      {/* Zone principale */}
      <div className="flex-1 flex flex-col">
        {/* Barre d'outils supérieure */}
        <TopBar 
          transform={transform}
          onTransformChange={setTransform}
        />

        {/* Zone d'édition */}
        <div
          ref={editorRef}
          className="flex-1 relative overflow-hidden bg-gray-50"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={() => setIsPanning(false)}
          onMouseLeave={() => setIsPanning(false)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <div
            className="absolute inset-0"
            style={{
              transform: `translate(${transform.translateX}px, ${transform.translateY}px) scale(${transform.scale})`,
              transformOrigin: '0 0',
              cursor: isPanning ? 'grabbing' : 'grab'
            }}
          >
            {uploadedImage ? (
              <img
                src={uploadedImage}
                alt="Plan"
                className="w-full h-full object-contain"
                style={{
                  transform: `rotate(${transform.rotation}deg)`,
                  transformOrigin: 'center'
                }}
                draggable={false}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onload = (e) => {
                        setUploadedImage(e.target?.result as string)
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                  className="hidden"
                  accept="image/*"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center p-8 rounded-2xl hover:bg-gray-100 transition-colors"
                >
                  <ImageIcon className="w-12 h-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    Importer votre plan
                  </h3>
                  <p className="text-sm text-gray-500">
                    Cliquez pour sélectionner un fichier
                  </p>
                </button>
              </div>
            )}

            {/* Affichage des icônes placées */}
            {placedIcons.map(icon => (
              <div
                key={icon.id}
                className="absolute"
                style={{
                  left: `${icon.x}px`,
                  top: `${icon.y}px`,
                  transform: `rotate(${icon.rotation}deg)`,
                  cursor: 'move',
                  fontSize: '2rem'
                }}
              >
                {icon.icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
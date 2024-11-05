import { Transform } from '@/types/editor'
import { Minus, Plus, RotateCw } from 'lucide-react'

interface TopBarProps {
  transform: Transform
  onTransformChange: (transform: Transform) => void
}

export const TopBar = ({ transform, onTransformChange }: TopBarProps) => {
  return (
    <div className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onTransformChange({
              ...transform,
              scale: Math.max(0.1, transform.scale - 0.1)
            })}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-sm w-16 text-center">
            {Math.round(transform.scale * 100)}%
          </span>
          <button
            onClick={() => onTransformChange({
              ...transform,
              scale: Math.min(5, transform.scale + 0.1)
            })}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={() => onTransformChange({
            ...transform,
            rotation: (transform.rotation + 90) % 360
          })}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <RotateCw className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
import React from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

const SAFETY_ICONS = {
  evacuation: [
    { id: 'exit', icon: '🚪', name: 'Sortie de secours' },
    { id: 'assembly', icon: '👥', name: 'Point de rassemblement' },
    { id: 'stairs', icon: '🪜', name: 'Escalier de secours' },
    { id: 'direction', icon: '⬆️', name: 'Direction d\'évacuation' },
    { id: 'vous-etes-ici', icon: '📍', name: 'Vous êtes ici' }
  ],
  equipment: [
    { id: 'extinguisher', icon: '🧯', name: 'Extincteur' },
    { id: 'alarm', icon: '🔔', name: 'Alarme incendie' },
    { id: 'fire_hose', icon: '💧', name: 'RIA' },
    { id: 'first_aid', icon: '🏥', name: 'Premiers secours' },
    { id: 'defibrillator', icon: '❤️', name: 'Défibrillateur' }
  ],
  utilities: [
    { id: 'electricity', icon: '⚠️', name: 'Électricité' },
    { id: 'gas', icon: '🔥', name: 'Gaz' },
    { id: 'water', icon: '🚰', name: 'Eau' },
    { id: 'ventilation', icon: '💨', name: 'Ventilation' }
  ]
}

interface IconLibraryProps {
  onIconDragStart: (icon: any) => void
}

export const IconLibrary = ({ onIconDragStart }: IconLibraryProps) => {
  const [openCategories, setOpenCategories] = React.useState<Record<string, boolean>>({
    evacuation: true,
    equipment: true,
    utilities: true
  })

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }))
  }

  return (
    <div className="mt-4">
      {Object.entries(SAFETY_ICONS).map(([category, icons]) => (
        <div key={category} className="border-b border-gray-100">
          <button
            onClick={() => toggleCategory(category)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium capitalize">{category}</span>
            </div>
            {openCategories[category] ? 
              <ChevronDown className="w-4 h-4" /> : 
              <ChevronRight className="w-4 h-4" />
            }
          </button>

          {openCategories[category] && (
            <div className="p-2">
              <div className="grid grid-cols-3 gap-2">
                {icons.map(icon => (
                  <div
                    key={icon.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('application/json', JSON.stringify({
                        ...icon,
                        category
                      }))
                      onIconDragStart(icon)
                    }}
                    className="flex flex-col items-center p-2 bg-white rounded-lg border
                             border-gray-200 hover:border-purple-500 cursor-move
                             transition-all hover:shadow-sm group"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      {icon.icon}
                    </span>
                    <span className="text-xs text-gray-600 mt-1 text-center">
                      {icon.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
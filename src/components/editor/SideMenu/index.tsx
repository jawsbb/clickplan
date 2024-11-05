import React, { useState, ReactNode } from 'react'
import { IconLibrary } from './IconLibrary'
import { ChevronDown, ChevronRight, PenTool, Layout, Eye } from 'lucide-react'

// Types locaux
interface MenuItem {
  id: string
  label: string
  icon: ReactNode
  action?: () => void
  shortcut?: string
}

interface MenuSection {
  id: string
  title: string
  icon?: ReactNode
  items: MenuItem[]
}

interface SideMenuProps {
  onIconDragStart: (icon: any) => void
}

// Configuration du menu
const MENU_SECTIONS: MenuSection[] = [
  {
    id: 'edit-tools',
    title: 'Outils d\'édition',
    icon: <PenTool className="w-4 h-4" />,
    items: [
      {
        id: 'select',
        label: 'Sélection',
        icon: <PenTool className="w-4 h-4" />,
      },
      // ... autres items
    ]
  },
  // ... autres sections
]

export const SideMenu = ({ onIconDragStart }: SideMenuProps) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    MENU_SECTIONS.reduce((acc, section) => ({ ...acc, [section.id]: true }), {})
  )
  const [selectedTool, setSelectedTool] = useState<string>('select')

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Outils</h2>
      </div>
      
      {MENU_SECTIONS.map(section => (
        <div key={section.id} className="border-b border-gray-100">
          <button
            onClick={() => toggleSection(section.id)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50"
          >
            <div className="flex items-center gap-2">
              {section.icon}
              <span className="font-medium text-sm">{section.title}</span>
            </div>
            {openSections[section.id] ? 
              <ChevronDown className="w-4 h-4" /> : 
              <ChevronRight className="w-4 h-4" />
            }
          </button>

          {openSections[section.id] && (
            <div className="px-2 pb-2">
              {section.items.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedTool(item.id)
                    item.action?.()
                  }}
                  className={`
                    w-full p-2 rounded-lg flex items-center justify-between text-sm
                    ${selectedTool === item.id ? 'bg-purple-50 text-purple-700' : 'hover:bg-gray-50'}
                  `}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 flex items-center justify-center">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.shortcut && (
                    <span className="text-xs text-gray-400">{item.shortcut}</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Bibliothèque d'icônes */}
      <IconLibrary onIconDragStart={onIconDragStart} />
    </div>
  )
}
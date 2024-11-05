import React from 'react'
import { MenuSection } from '../types/editor'
import { Layout, PenTool, Settings, Eye } from 'lucide-react'
import { SAFETY_ICONS } from './safetyIcons'

export const MENU_SECTIONS: MenuSection[] = [
  {
    id: 'safety-icons',
    title: 'Bibliothèque d\'icônes',
    icon: React.createElement(Layout, { className: "w-4 h-4" }),
    items: Object.entries(SAFETY_ICONS).map(([category, icons]) => ({
      id: `${category}-icons`,
      label: category.charAt(0).toUpperCase() + category.slice(1),
      icon: icons[0].icon,
      items: icons
    }))
  },
  {
    id: 'edit-tools',
    title: 'Outils d\'édition',
    icon: React.createElement(PenTool, { className: "w-4 h-4" }),
    items: [
      {
        id: 'select',
        label: 'Sélection',
        icon: '👆'
      },
      {
        id: 'draw',
        label: 'Dessin',
        icon: '✏️'
      }
    ]
  },
  {
    id: 'view',
    title: 'Affichage',
    icon: React.createElement(Eye, { className: "w-4 h-4" }),
    items: [
      {
        id: 'grid',
        label: 'Grille',
        icon: '📏'
      }
    ]
  }
]
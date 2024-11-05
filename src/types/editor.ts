import { ReactNode } from 'react'

export interface Transform {
  scale: number
  rotation: number
  translateX: number
  translateY: number
}

export interface EditorState {
  selectedTool: string
  isPanning: boolean
  uploadedImage: string | null
}

export interface MenuItem {
  id: string
  label: string
  icon: ReactNode | string
  action?: () => void
  shortcut?: string
  items?: any[] // Pour les sous-items des catégories d'icônes
}

export interface MenuSection {
  id: string
  title: string
  icon?: ReactNode
  items: MenuItem[]
}
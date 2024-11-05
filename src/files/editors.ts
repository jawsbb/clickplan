import { ReactNode } from 'react'

export interface Transform {
  scale: number
  rotation: number
  translateX: number
  translateY: number
}

export interface MenuItem {
  id: string
  label: string
  icon: ReactNode
  action?: () => void
  shortcut?: string
}

export interface MenuSection {
  id: string
  title: string
  icon?: ReactNode
  items: MenuItem[]
}

export interface Icon {
  id: string
  icon: string
  name: string
  category?: string
  x?: number
  y?: number
  rotation?: number
}

export interface PlacedIcon extends Icon {
  x: number
  y: number
  rotation: number
}

export interface TopBarProps {
  transform: Transform
  onTransformChange: (transform: Transform) => void
}

export interface SideMenuProps {
  onIconDragStart: (icon: Icon) => void
}

export interface IconLibraryProps {
  onIconDragStart: (icon: Icon) => void
}
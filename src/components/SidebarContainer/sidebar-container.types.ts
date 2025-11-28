import type { Navigation } from '../../models/nav'

export interface SidebarContainerProps {
  title: string
  collapsed: boolean
  navItems: Navigation[]
}

export interface SidebarNavItemProps {
  collapsed: boolean
  item: Navigation
}


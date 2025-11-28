export interface Navigation {
  id: string
  title: string
  icon?: string
  url?: string
  active?: boolean
  items?: Navigation[]
}


export interface DefaultTableFilter {
  pagination: boolean
  page: number
  itemsPerPage: number
}

export interface TableProps {
  id: string
  headers: TableHeader[]
  items: any[]
  totalItems: number
  sortBy: SortItem[]
  loading: boolean
  filter: DefaultTableFilter
  hideFooter: boolean
  showSelect: boolean
  flexible: boolean
  showExpand: boolean
  rowProps: Record<string, any> | ((item: any) => Record<string, any>)
}

export interface TableFooterProps {
  totalItems: number
  hideNextPage: boolean
  loading: boolean
  filter: DefaultTableFilter
}

export interface TableSettingColumnsProps {
  id: string
  headers: TableHeader[]
}

export interface TableHeader {
  title: string
  align?: 'start' | 'center' | 'end'
  sortable?: boolean
  key: string
  value?: any
  cellProps?: {
    class: string[]
  }
  headerProps?: {
    class: string[]
  }
  selected?: boolean
}

export interface TableUpdateOptions {
  groupBy: string
  itemsPerPage: number
  page: number
  search: string
  sortBy: SortItem[]
}

export interface SortItem {
  key: string
  order?: boolean | Order
}

export enum Order {
  ASC = 'asc',
  DESC = 'desc'
}


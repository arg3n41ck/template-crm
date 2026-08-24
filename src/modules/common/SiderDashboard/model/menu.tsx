import {
  Banknote,
  BookOpen,
  ChartNoAxesCombined,
  Clock3,
  Download,
  Headphones,
  History,
  Home,
  Library,
  List,
  MapPin,
  MapPinned,
  ReceiptText,
  Settings,
  UserCog,
  Users,
} from 'lucide-react'

import { ReactNode } from 'react'

import { UserRoleTypes } from '@modules/User'

export interface SideMenuChild {
  label: string
  key: string
}

export interface SideMenuItem {
  label: string
  key: string
  icon: ReactNode
  accessRole?: UserRoleTypes[]
  children?: SideMenuChild[]
}

export interface SideMenuSection {
  title?: string
  items: SideMenuItem[]
  showChevron?: boolean
  showPlus?: boolean
}

const iconProps = { size: 20, strokeWidth: 1.8 }

export const mainMenu: SideMenuItem[] = [
  { label: 'Главная', key: 'home', icon: <Home {...iconProps} /> },
  { label: 'Сотрудники', key: 'employees', icon: <Users {...iconProps} /> },
  {
    label: 'Статистика',
    key: 'statistics',
    icon: <ChartNoAxesCombined {...iconProps} />,
    children: [
      { label: 'Label', key: 'statistics-1' },
      { label: 'Label', key: 'statistics-2' },
      { label: 'Label', key: 'statistics-3' },
      { label: 'Label', key: 'statistics-4' },
      { label: 'Label', key: 'statistics-5' },
    ],
  },
  { label: 'Смены', key: 'shifts', icon: <Clock3 {...iconProps} /> },
  { label: 'Транзакции', key: 'transactions', icon: <List {...iconProps} /> },
  { label: 'Библиотека', key: 'library', icon: <Library {...iconProps} /> },
  {
    label: 'Торговые точки',
    key: 'locations',
    icon: <MapPin {...iconProps} />,
  },
  {
    label: 'Выдача наличных',
    key: 'cash-out',
    icon: <Banknote {...iconProps} />,
  },
  {
    label: 'Детальная выписка',
    key: 'statement',
    icon: <ReceiptText {...iconProps} />,
  },
  { label: 'Загрузки', key: 'downloads', icon: <Download {...iconProps} /> },
  { label: 'История', key: 'history', icon: <History {...iconProps} /> },
]

export const secondMenu: SideMenuItem[] = [
  { label: 'Управление', key: 'management', icon: <UserCog {...iconProps} /> },
  {
    label: 'Отслеживание',
    key: 'tracking',
    icon: <MapPinned {...iconProps} />,
  },
]

export const helpMenu: SideMenuItem[] = [
  { label: 'Настройки', key: 'settings', icon: <Settings {...iconProps} /> },
  { label: 'Словарь', key: 'dictionary', icon: <BookOpen {...iconProps} /> },
  {
    label: 'Служба поддержки',
    key: 'support',
    icon: <Headphones {...iconProps} />,
  },
]

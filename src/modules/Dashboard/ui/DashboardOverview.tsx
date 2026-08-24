import {
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  CalendarDays,
  Download,
  ShoppingBag,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  XAxis,
} from 'recharts'

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  Progress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@shared/ui'

const metrics: Array<{
  label: string
  value: string
  change: string
  positive: boolean
  icon: LucideIcon
}> = [
  {
    label: 'Выручка',
    value: '₽ 2 480 600',
    change: '+12,4%',
    positive: true,
    icon: Banknote,
  },
  {
    label: 'Новые сделки',
    value: '146',
    change: '+8,2%',
    positive: true,
    icon: ShoppingBag,
  },
  {
    label: 'Клиенты',
    value: '1 284',
    change: '+5,1%',
    positive: true,
    icon: Users,
  },
  {
    label: 'Просрочено',
    value: '18',
    change: '-3,6%',
    positive: false,
    icon: CalendarDays,
  },
]

const revenueData = [
  { month: 'Янв', revenue: 1280 },
  { month: 'Фев', revenue: 1560 },
  { month: 'Мар', revenue: 1490 },
  { month: 'Апр', revenue: 1980 },
  { month: 'Май', revenue: 2140 },
  { month: 'Июн', revenue: 2480 },
]

const deals = [
  {
    company: 'Север Трейд',
    owner: 'Алия',
    value: '₽ 420 000',
    status: 'Согласование',
  },
  {
    company: 'Nova Retail',
    owner: 'Руслан',
    value: '₽ 315 000',
    status: 'Новая',
  },
  {
    company: 'Точка роста',
    owner: 'Диана',
    value: '₽ 280 000',
    status: 'Переговоры',
  },
  {
    company: 'Atlas Group',
    owner: 'Тимур',
    value: '₽ 198 000',
    status: 'Закрыта',
  },
]

const teamProgress = [
  { name: 'Отдел продаж', value: 84 },
  { name: 'Аккаунт-менеджеры', value: 72 },
  { name: 'Поддержка', value: 91 },
]

export function DashboardOverview() {
  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 p-4 sm:p-6 lg:p-10">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            24 августа 2026
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            Обзор бизнеса
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Демонстрационные данные для стартового CRM-дашборда.
          </p>
        </div>
        <Button
          variant="outline"
          className="w-full sm:w-auto"
        >
          <Download />
          Скачать отчет
        </Button>
      </section>

      <section
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        aria-label="Ключевые показатели"
      >
        {metrics.map((metric) => {
          const Icon = metric.icon
          const ChangeIcon = metric.positive ? ArrowUpRight : ArrowDownRight

          return (
            <Card
              key={metric.label}
              className="gap-4 py-5 shadow-none"
            >
              <CardHeader className="flex grid-cols-none flex-row items-center justify-between gap-4 px-5">
                <p className="text-sm font-medium text-muted-foreground">
                  {metric.label}
                </p>
                <span className="flex size-9 items-center justify-center rounded-lg bg-muted">
                  <Icon
                    className="size-4"
                    aria-hidden="true"
                  />
                </span>
              </CardHeader>
              <CardContent className="flex items-end justify-between gap-3 px-5">
                <p className="text-2xl font-bold tracking-tight">
                  {metric.value}
                </p>
                <Badge
                  variant={metric.positive ? 'secondary' : 'outline'}
                  className="gap-1"
                >
                  <ChangeIcon aria-hidden="true" />
                  {metric.change}
                </Badge>
              </CardContent>
            </Card>
          )
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.8fr)]">
        <Card className="min-w-0 shadow-none">
          <CardHeader>
            <div>
              <h3 className="font-semibold">Динамика выручки</h3>
              <CardDescription className="mt-1">
                Помесячный результат, тыс. ₽
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="h-[280px] min-w-0 pl-2 sm:h-[320px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
              minWidth={0}
              initialDimension={{ width: 800, height: 320 }}
            >
              <AreaChart
                data={revenueData}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="revenue-fill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="var(--chart-2)"
                      stopOpacity={0.32}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--chart-2)"
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  stroke="var(--border)"
                  strokeDasharray="4 4"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={12}
                />
                <RechartsTooltip
                  cursor={{ stroke: 'var(--border)' }}
                  formatter={(value) => [`${value} тыс. ₽`, 'Выручка']}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--chart-2)"
                  strokeWidth={2.5}
                  fill="url(#revenue-fill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <h3 className="font-semibold">Выполнение плана</h3>
            <CardDescription>Результат команд за текущий месяц</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {teamProgress.map((team) => (
              <div
                className="space-y-2"
                key={team.name}
              >
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="font-medium">{team.name}</span>
                  <span className="text-muted-foreground">{team.value}%</span>
                </div>
                <Progress
                  value={team.value}
                  aria-label={`${team.name}: ${team.value}%`}
                />
              </div>
            ))}
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm font-medium">Общий результат</p>
              <p className="mt-1 text-2xl font-bold">82%</p>
              <p className="mt-1 text-xs text-muted-foreground">
                На 6% выше прошлого месяца
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card className="gap-4 shadow-none">
        <CardHeader className="flex grid-cols-none flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold">Последние сделки</h3>
            <CardDescription className="mt-1">
              Актуальные возможности команды продаж
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
          >
            Все сделки
          </Button>
        </CardHeader>
        <CardContent className="overflow-x-auto px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Компания</TableHead>
                <TableHead>Ответственный</TableHead>
                <TableHead>Сумма</TableHead>
                <TableHead className="pr-6 text-right">Статус</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deals.map((deal) => (
                <TableRow key={deal.company}>
                  <TableCell className="pl-6 font-medium">
                    {deal.company}
                  </TableCell>
                  <TableCell>{deal.owner}</TableCell>
                  <TableCell>{deal.value}</TableCell>
                  <TableCell className="pr-6 text-right">
                    <Badge
                      variant={
                        deal.status === 'Закрыта' ? 'secondary' : 'outline'
                      }
                    >
                      {deal.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

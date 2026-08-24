import { LoaderCircle } from 'lucide-react'

import { FormEvent, useState } from 'react'

import { Login } from '@modules/Auth'

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  LogoMain,
} from '@shared/ui'

export type FormState = Login

export function SignIn() {
  const [formData, setFormData] = useState<FormState>({
    username: '',
    password: '',
  })

  const mockDate = false

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // TODO: Implement authentication logic
    // Example: dispatch(loginUser(formData))
  }

  return (
    <Card className="relative w-full max-w-[370px] min-w-[320px] gap-0 overflow-hidden">
      {mockDate && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80">
          <LoaderCircle
            className="size-6 animate-spin"
            aria-label="Загрузка"
          />
        </div>
      )}

      <CardHeader>
        <LogoMain className="-ml-4 justify-start px-0 py-0" />
        <CardTitle className="mt-4">Авторизация</CardTitle>
        <CardDescription>Введите данные вашей учетной записи</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="username">Логин</Label>
            <Input
              id="username"
              name="username"
              placeholder="login@cbk.kg"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              autoComplete="username"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              autoComplete="current-password"
              required
            />
          </div>

          <div className="pt-1">
            <Button
              className="w-full"
              type="submit"
            >
              Войти
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

import { Component, ErrorInfo, ReactNode } from 'react'

import { notification } from '@shared/libs'
import { Button, Card, LogoMain, Separator } from '@shared/ui'

interface Props {
  children?: ReactNode
  path?: string
}

interface State {
  errorText: string | null
  crashData: string | null
  isOpenDetail: boolean
}

export class ErrorHoc extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      errorText: null,
      crashData: null,
      isOpenDetail: false,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      errorText: error.message,
      crashData: errorInfo.componentStack ?? null,
    })
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.path !== this.props.path) {
      this.setState({
        errorText: null,
        crashData: null,
        isOpenDetail: false,
      })
    }
  }

  toggleIsOpenDetail = () => {
    this.setState((prev) => ({
      isOpenDetail: !prev.isOpenDetail,
    }))
  }

  onReload = () => {
    window.location.reload()
  }

  onCopyError = () => {
    const { errorText, crashData } = this.state
    const { path } = this.props
    const text = `
Error: ${errorText}
Path: ${path || window.location.pathname}
Browser: ${navigator.appVersion}
Screen: ${window.screen.width}x${window.screen.height}
Stack: ${crashData}
    `.trim()

    navigator.clipboard.writeText(text).then(() => {
      notification.success({ message: 'Информация скопирована' })
    })
  }

  render() {
    const { errorText, crashData, isOpenDetail } = this.state
    const { path } = this.props

    if (errorText) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 p-6">
          <Card className="w-full max-w-2xl gap-0 overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex justify-center mb-8">
                <LogoMain />
              </div>

              <div className="text-center space-y-4 mb-10">
                <h1 className="text-3xl font-bold text-foreground leading-tight">
                  Упс! Кажется, что-то пошло не так
                </h1>
                <p className="text-lg text-muted-foreground max-w-md mx-auto">
                  Не беспокойтесь, баги случаются крайне редко. Попробуйте
                  обновить страницу или сообщите нам об ошибке.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <Button
                  onClick={this.onReload}
                  className="w-full sm:w-auto px-8 py-3 h-auto text-base font-semibold"
                >
                  Обновить страницу
                </Button>
                <Button
                  variant="outline"
                  onClick={this.toggleIsOpenDetail}
                  className="w-full sm:w-auto px-8 py-3 h-auto text-base font-semibold"
                >
                  {isOpenDetail ? 'Скрыть детали' : 'Технические детали'}
                </Button>
              </div>

              {isOpenDetail && (
                <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="rounded-xl border bg-muted/40 p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold text-foreground">
                        Информация об ошибке
                      </h3>
                      <button
                        onClick={this.onCopyError}
                        className="text-sm font-medium text-primary underline underline-offset-4"
                      >
                        Копировать всё
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
                      <div className="space-y-1">
                        <span className="text-muted-foreground block text-xs uppercase tracking-wider font-bold">
                          Браузер и ОС
                        </span>
                        <span className="text-foreground break-all">
                          {navigator.appVersion}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-muted-foreground block text-xs uppercase tracking-wider font-bold">
                          Разрешение
                        </span>
                        <span className="text-foreground">
                          {window.screen.width} × {window.screen.height}
                        </span>
                      </div>
                      <div className="space-y-1 md:col-span-2">
                        <span className="text-muted-foreground block text-xs uppercase tracking-wider font-bold">
                          Путь
                        </span>
                        <span className="text-foreground break-all font-mono">
                          {path || window.location.pathname}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-muted-foreground block text-xs uppercase tracking-wider font-bold">
                        Текст ошибки
                      </span>
                      <div className="max-h-32 overflow-auto rounded-lg border border-destructive/20 bg-destructive/10 p-4 font-mono text-sm text-destructive">
                        {errorText}
                      </div>
                    </div>

                    {crashData && (
                      <div className="mt-6 space-y-2">
                        <span className="text-muted-foreground block text-xs uppercase tracking-wider font-bold">
                          Стек вызовов
                        </span>
                        <pre className="max-h-64 overflow-auto rounded-lg bg-foreground p-4 font-mono text-xs leading-relaxed text-background">
                          {crashData}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Separator />
            <div className="bg-muted/40 px-8 py-4 text-center">
              <span className="text-muted-foreground text-xs">
                © {new Date().getFullYear()} Все права защищены
              </span>
            </div>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

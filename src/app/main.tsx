import ReactDOM from 'react-dom/client'

import { App } from './App'

const RootElementId = 'root'

const rootElement = document.getElementById(RootElementId)

if (!rootElement) {
  throw new Error(`Root element with id "${RootElementId}" not found`)
}

ReactDOM.createRoot(rootElement).render(<App />)

const preloader = document.getElementById('preloader')
if (preloader) {
  preloader.remove()
}

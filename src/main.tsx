/** GSAP React 플러그인을 등록하고 학습 앱을 브라우저에 마운트한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { createRoot } from 'react-dom/client'
import { App } from './app/App'
import './styles/global.css'
import './app/app.css'

gsap.registerPlugin(useGSAP)

createRoot(document.getElementById('root')!).render(
  <App />,
)

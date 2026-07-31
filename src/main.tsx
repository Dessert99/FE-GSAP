import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { createRoot } from 'react-dom/client'
import { App } from './app/App'
import './styles/global.css'

gsap.registerPlugin(useGSAP)

createRoot(document.getElementById('root')!).render(
    <App />

)

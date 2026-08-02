/** React 학습 앱을 Vite 개발 서버와 프로덕션 빌드에서 동일하게 처리한다. */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})

/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import * as React from 'react'
import * as ReactDOMClient from 'react-dom/client'
// import { Provider } from 'react-redux'
// import FontFaceObserver from 'fontfaceobserver'

// Use consistent styling
// import 'sanitize.css/sanitize.css'

import { App } from './app'

//TODO
import { HelmetProvider } from 'react-helmet-async'

//TODO
// import { configureAppStore } from './store/configureStore'

//TODO
// import { ThemeProvider } from './styles/theme/ThemeProvider'

//TODO
// import reportWebVitals from 'reportWebVitals'

// Initialize languages
// import './locales/i18n'

// import * as dotenv from 'dotenv'
// dotenv.config()

// Observe loading of Inter (to remove 'Inter', remove the <link> tag in
// the index.html file and this observer)
// const openSansObserver = new FontFaceObserver('Inter', {})

// When Inter is loaded, add a font-family using Inter to the body
// openSansObserver.load().then(() => {
//   document.body.classList.add('fontLoaded')
// })

// const store = configureAppStore()
const MOUNT_NODE = document.getElementById('root') as HTMLElement

ReactDOMClient.createRoot(MOUNT_NODE!).render(
  // <Provider store={store}>
  // <ThemeProvider>
  <HelmetProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HelmetProvider>,
  // </ThemeProvider>,
  // </Provider>,
)

// Hot reloadable translation json files

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()

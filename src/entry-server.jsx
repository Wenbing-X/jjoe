import { renderToStaticMarkup } from 'react-dom/server'
import App from './App'

// Render the same content that visitors see; interactions mount in the browser.
export function renderPage(initialHash) {
  return renderToStaticMarkup(<App initialHash={initialHash} />)
}

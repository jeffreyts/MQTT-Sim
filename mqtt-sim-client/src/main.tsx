import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux';
import store from './store/store.tsx';
import ThemeContainer from './components/ThemeContainer.tsx';

//This is from Boostrap 5.3 to use dark mode according to browser perference
// const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
// document.body.setAttribute('data-bs-theme', prefersDark ? 'dark' : 'light');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeContainer>
        <App />
      </ThemeContainer>
    </Provider>
  </StrictMode>,
)

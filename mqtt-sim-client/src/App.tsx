import { useState } from 'react';
import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from './components/Header'
import TopicList from './components/TopicList'
import Broker from './components/Broker'
import Sidebar from './components/Sidebar'

export default function App() {
  const [activePanel, setActivePanel] = useState<'broker' | null>(null);

  return (
    <>
      <Header/>
      <div className="app-content-row">
        <Sidebar activePanel={activePanel} setActivePanel={setActivePanel} />
        {activePanel === 'broker' && (
          <div className="side-panel-container">
            <Broker />
          </div>
        )}
        <div className={activePanel === 'broker' ? "main-content-with-panel" : "main-content-full"}>
          <TopicList/>
        </div>
      </div>
    </>
  )
}
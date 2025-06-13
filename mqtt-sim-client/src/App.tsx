import { useState } from 'react';
import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from './components/Header'
import TopicList from './components/TopicList'
import Broker from './components/Broker'
import Sidebar from './components/Sidebar'
import TopicEditor from './components/TopicEditor';
import { Resizable } from 're-resizable';

export default function App() {
  const [activePanel, setActivePanel] = useState<'broker' | null>(null);

  return (
    <>
      <Header/>
      <div className="d-flex flex-row flex-grow-1 min-vh-100 min-vw-100">
        <div className="d-flex flex-column p-0">
          <Sidebar activePanel={activePanel} setActivePanel={setActivePanel} />
        </div>
        {activePanel === 'broker' && (
          <div className="d-flex flex-column p-0 h-100 border-end border-secondary-subtle border-1">
            <Broker />
          </div>
        )}
        <Resizable
          defaultSize={{ width: 320, height: '100%' }}
          minWidth={200}
          maxWidth={600}
          enable={{ right: true }}
          style={{ overflow: 'auto', height: '100%' }}
          className="border-end"
        >
          <TopicList />
        </Resizable>
        <div className="bg-body-tertiary d-flex flex-column flex-grow-1 p-0 h-100">
          <TopicEditor />
        </div>
      </div>
    </>
  )
}
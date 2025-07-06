import { createContext, useState } from 'react';
import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from './components/Header'
import TopicList from './components/TopicList'
import Broker from './components/sidebar/Broker'
import Sidebar from './components/sidebar/Sidebar'
import TopicEditor from './components/editor/TopicEditor';
import { Resizable } from 're-resizable';
import TopicDefinition from './models/TopicDefinition';
import { TopicContext } from './context/TopicContext';
import PublishControls from './components/sidebar/PublishControls';
import TopicErrorBoundary from './components/TopicErrorBoundary';

export default function App() {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<TopicDefinition | null>(null);
  
  return (
    <div className="w-100 h-100 d-flex flex-column">
      <TopicContext.Provider value={selectedTopic}>
        <Header/>
        <div className="d-flex flex-row flex-grow-1 w-100" style={{ minHeight: 0 }}>
          <div className="d-flex flex-column p-0">
            <Sidebar activePanel={activePanel} setActivePanel={setActivePanel} />
          </div>
          {activePanel === 'broker' && (
            <div className="d-flex bg-body flex-column p-0 border-end border-secondary-subtle border-1"
              style={{ minWidth: 225, maxWidth: 600, width: '320px' }}>
              <Broker />
            </div>
          )}
          {activePanel === 'controls' && (
            <div className="d-flex bg-body flex-column p-0 border-end border-secondary-subtle border-1"
              style={{ minWidth: 200, maxWidth: 300, width: '200px' }}>
              <PublishControls />
            </div>
          )}

            <Resizable
              defaultSize={{ width: 320, height: '100%' }}
              minWidth={200}
              maxWidth={600}
              enable={{ right: true }}
              style={{ overflow: 'hidden', height: '100%' }}
              className="border-end bg-body m-0"
              handleStyles={{ right: { width: '10px' } }}
            >
              <TopicList setSelectedTopic={setSelectedTopic}/>
            </Resizable>
            <div className="bg-body-tertiary d-flex flex-column flex-grow-1 p-0">
              <TopicErrorBoundary key={selectedTopic?.uid}>
                <TopicEditor />
              </TopicErrorBoundary>
            </div>
          
        </div>
      </TopicContext.Provider>
    </div>
  )
}
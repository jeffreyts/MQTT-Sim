import { useState } from 'react';
import './App.css'
import Header from './components/Header'
import TopicList from './components/TopicList'
import Broker from './components/Broker'

function App() {
  const [brokerExpanded, setBrokerExpanded] = useState(true);

  return (
    <>
      <Header/>
      <div className="app-content-row">
        {brokerExpanded && (
          <div className="col-md-3 p-0">
            <Broker />
          </div>
        )}
        <div className="col-md-1 sidebar-toggle-container">
          <button 
            className="btn btn-outline-secondary mb-2 expand-button" 
            onClick={() => setBrokerExpanded(!brokerExpanded)}
          >
            {brokerExpanded ? '<' : '>'}
          </button>
        </div>
        <div className={brokerExpanded ? "col-md-8 topic-list-col" : "col-md-11 topic-list-col"}>
          <TopicList/>
        </div>
      </div>
    </>
  )
}

export default App

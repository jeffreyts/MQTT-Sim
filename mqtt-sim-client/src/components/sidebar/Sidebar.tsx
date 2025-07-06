import SidebarProps from '../../interfaces/SidebarProps'

export default function Sidebar({ activePanel, setActivePanel }: SidebarProps){
  return (
    <nav className="d-flex flex-column align-items-center bg-body border-end border-2 pt-2" 
        style={{width: 48, minWidth: 48, maxWidth: 48, height: '100vh', zIndex: 2}}>
      <button
        className={`w-100 d-flex align-items-center justify-content-center btn p-0 mb-1 border-0 ${activePanel === 'broker' ? 'bg-primary bg-opacity-10 border-start border-4 border-primary' : ''}`}
        style={{opacity: activePanel === 'broker' ? 1 : 0.7, borderRadius: 0}}
        onClick={() => setActivePanel(activePanel === 'broker' ? null : 'broker')}
        title="Broker Panel"
      >
        <i className="bi bi-plug" style={{fontSize: 24, color: 'var(--bs-body-color)'}}></i>
      </button>
      <button
        className={`w-100 d-flex align-items-center justify-content-center btn p-0 mb-1 border-0 ${activePanel === 'controls' ? 'bg-primary bg-opacity-10 border-start border-4 border-primary' : ''}`}
        style={{opacity: activePanel === 'controls' ? 1 : 0.7, borderRadius: 0}}
        onClick={() => setActivePanel(activePanel === 'controls' ? null : 'controls')}
        title="Publishing Controls"
      >
        <i className="bi bi-controller" style={{fontSize: 24, color: 'var(--bs-body-color)'}}></i>
      </button>
    </nav>
  );
};
import styles from './Sidebar.module.css';
import SidebarProps from '../interfaces/SidebarProps'

export default function Sidebar({ activePanel, setActivePanel }: SidebarProps){
  return (
    <nav className={styles.sidebar}>
      <button
        className={activePanel === 'broker' ? styles.active : styles.menuButton}
        onClick={() => setActivePanel(activePanel === 'broker' ? null : 'broker')}
        title="Broker Panel"
      >
        <i className={`bi bi-plug ${styles.icon}`}></i>
      </button>
    </nav>
  );
};
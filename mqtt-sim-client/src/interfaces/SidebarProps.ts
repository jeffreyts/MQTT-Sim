export default interface SidebarProps {
    activePanel: 'broker' | null;
    setActivePanel: (panel: 'broker' | null) => void;
}
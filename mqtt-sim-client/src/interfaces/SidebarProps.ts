export default interface SidebarProps {
    activePanel: string | null;
    setActivePanel: (panel: string | null) => void;
}
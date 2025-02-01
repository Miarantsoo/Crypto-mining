import SidebarMenuElement, { SidebarMenuElementProps } from "./SidebaMenuElement";

interface SidebarMenu {
    menu: SidebarMenuElementProps[]
}

const SidebarMenu: React.FC<SidebarMenu> = ({menu}) => {
  return (
    <ul className="list-none px-1 py-3">
        {menu.map((item, index) => (
            <SidebarMenuElement 
                key={index} 
                icon={item.icon} 
                text={item.text} 
                direction={item.direction}
            />
        ))}
    </ul>
  );
};

export default SidebarMenu;
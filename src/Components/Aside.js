import React from 'react';
import 'react-pro-sidebar/dist/css/styles.css';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from 'react-pro-sidebar';
import { FaBuilding, FaTablet } from 'react-icons/fa';
import { MdDashboard, MdApps, MdShoppingBasket } from 'react-icons/md';
import StarWars from '../assets/img/starwars.png';
import {Link} from "react-router-dom";


const Aside = ({ collapsed, toggled, handleToggleSidebar, pageName }) => {

    const open = false;
    const anchorRef = React.useRef(null);
  
    // const handleToggle = () => {
    //   setOpen((prevOpen) => !prevOpen);
    // };
  
    // const handleClose = (event) => {
    //   if (anchorRef.current && anchorRef.current.contains(event.target)) {
    //     return;
    //   }
  
    //   setOpen(false);
    // };
  
    // function handleListKeyDown(event) {
    //   if (event.key === 'Tab') {
    //     event.preventDefault();
    //     setOpen(false);
    //   }
    // }
  
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }
  
      prevOpen.current = open;
    }, [open]);
  

    return (
        <ProSidebar
            image={false}
            collapsed={collapsed}
            toggled={toggled}
            breakPoint="md"
            onToggle={handleToggleSidebar}
        >
            <SidebarHeader>
                <div
                    style={{
                        padding: '10px 20px',
                        marginTop: '5px',
                        overflow: 'auto',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        display: 'flex',
                    }}
                >
                    <img src={StarWars} alt={`starwars`} className="mt-2" style={{height: '60px'}} />
                </div>
            </SidebarHeader>

            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem {...(pageName === "Dashboard" ? {active: 'true'} : {})} icon={<MdDashboard />}><Link to="/dashboard">Dashboard</Link></MenuItem>
                    <MenuItem {...(pageName === "Starships" ? {active: 'true'} : {})}  icon={<FaBuilding />}><Link to="/starships">Starships</Link></MenuItem>
                    <MenuItem {...(pageName === "People" ? {active: 'true'} : {})}  icon={<MdShoppingBasket />}><Link to="/people">People</Link></MenuItem>
                    <MenuItem {...(pageName === "Vehicles" ? {active: 'true'} : {})}  icon={<FaTablet />}><Link to="/vehicles">Vehicles</Link></MenuItem>
                    <MenuItem {...(pageName === "Species" ? {active: 'true'} : {})}  icon={<MdApps />}><Link to="/species">Species</Link></MenuItem>
                </Menu>
            </SidebarContent>

        </ProSidebar>
  );
};

export default Aside;
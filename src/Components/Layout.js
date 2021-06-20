import React, {useState} from 'react';
import Aside from './Aside';
import Main from './Main';


const Layout = (props) =>{
    const [collapsed, setCollapsed] = useState(false);
    const [toggled, setToggled] = useState(false);

    const handleCollapsedChange = (checked) => {
        setCollapsed(checked);
    };

    const handleToggleSidebar = (value) => {
        console.log("value", value);
        setToggled(value);
    };

    return(
        <div className={`app rtl ${toggled ? 'toggled' : ''}`}>
            <Aside
                collapsed={collapsed}
                toggled={toggled}
                handleToggleSidebar={handleToggleSidebar}
                pageName={props.pageName}
            />
            <Main
                toggled={toggled}
                collapsed={collapsed}
                handleToggleSidebar={handleToggleSidebar}
                handleCollapsedChange={handleCollapsedChange}
                mainContent = {props.children}
                pageName={props.pageName}
            />
      </div>
    )
}

export default Layout
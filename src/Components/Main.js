import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: '#F4F8FB',
      height: '100%',
    },
}));


const Main = ({handleToggleSidebar, toggled, mainContent, pageName }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Header handleToggleSidebar={handleToggleSidebar} toggled={toggled} pageName={pageName} />
            {mainContent}
        </div>
    );
};

export default Main;


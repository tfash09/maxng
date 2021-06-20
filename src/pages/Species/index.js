import React, {useEffect, useState} from 'react';
import Layout from '../../Components/Layout';
import {Link} from "react-router-dom";
import {FaAngleLeft} from 'react-icons/fa';
import { Col } from 'reactstrap';
import {fetchJSON} from '../../Helper/api';
import LoadingOverlay from "react-loading-overlay";

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
    
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  
  const headCells = [
    { id: 'Name', numeric: false, disablePadding: true, label: 'Vehicle Name' },
    { id: 'Classification', numeric: false, disablePadding: false, label: 'Classification' },
    { id: 'Designation', numeric: false, disablePadding: false, label: 'Designation' },
    { id: 'Height', numeric: false, disablePadding: false, label: 'Average Height' },
    { id: 'Lifespan', numeric: true, disablePadding: false, label: 'Average Lifespan' },
    { id: 'Eye', numeric: false, disablePadding: false, label: 'Eye colors' },
    { id: 'Hair', numeric: true, disablePadding: false, label: 'Hair colors' },
    { id: 'Language', numeric: true, disablePadding: false, label: 'Language' },
  ];
  
  function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
      
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      background: '#FAFAFA 0% 0% no-repeat padding-box',
      border: 'border',
      borderRadius: '4px',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
      },
      iconButton: {
        padding: 10,
      },
      divider: {
        height: 28,
        margin: 4,
      },
  }));
   
  

const Species = () => {
    const [starshipsData, setStarshipsData] = useState([]);
    const [starships, setStarships] = useState([]);
    const [totalStarships, setTotalStarships] = useState(0);
    const [loader, setLoader] = useState(false);

    const classes = useStyles();
    const [order, setOrder] = React.useState('');
    const [orderBy, setOrderBy] = React.useState('');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const dense = false;
    const rowsPerPage = 20;
  
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelecteds = starships.map((n) => n.name);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };
  
    const handleClick = (event, name) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
  
      setSelected(newSelected);
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
      
    const isSelected = (name) => selected.indexOf(name) !== -1;
  
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, starships.length - page * rowsPerPage);
  

    useEffect(() => {

        fetchData(); 
    }, [])    

    const fetchData = async () => {
        try {
            setLoader(true);
            const starships = await fetchJSON('species/', null, 'GET');
            setLoader(false);
            setStarships(starships.results);
            setStarshipsData(starships.results);
            setTotalStarships(starships.results.length);
            console.log("starships", starships.results);
        } catch (error) {
            console.log("error", error);
        }

    }

    return(
        <Layout pageName={`Species`}>
            <div className="content">
        	    <div className="head" style={{justifyContent: 'space-between'}}>
                    <Col xs={12} sm={12} md={4} lg={3} style={{marginRight: '8px'}}>
                        <Paper component="form" className={classes.root}>
                            <InputBase
                                className={classes.input}
                                placeholder="Search for Species"
                                style={{width: '83%'}}
                                onChange={(e) => {
                                    const val = e.target.value;                                    
                                    if(val === '' || val === null){
                                        setStarships(starshipsData);
                                        setTotalStarships(starshipsData.length);
                                    }else{
                                        let temp = starshipsData.filter(data => (data.name.indexOf(val) !== -1 || data.classification.indexOf(val) !== -1 || data.designation.indexOf(val) !== -1 ))  
                                        setStarships(temp);
                                        setTotalStarships(temp.length);
                                    }
                                }}
                            />
                            <IconButton type="submit" className={classes.iconButton} aria-label="search" style={{width: '10%'}}>
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Col>
                    <Col xs={12} sm={12} md={8} lg={8} style={{marginRight: '8px', display:'flex', flexDirection: 'row'}}>
                        <span style={{marginTop: '0.6em', marginRight: '2em'}}><Link to="/dashboard"><FaAngleLeft style={{fontSize: 'larger'}} /> Back </Link></span>
                        <span style={{marginTop: '0.6em', marginRight: '2em'}}>{totalStarships} Total</span>
                        <span style={{marginTop: '0.6em'}}>Showing &nbsp;</span>
                        <TablePagination
                            rowsPerPageOptions={[]}
                            component="div"
                            count={starships.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                        />

                    </Col>

                </div>

                <LoadingOverlay active={loader} spinner text="Fetching Data">
                    <div style={{margin: '2.5em 0.8em', height: 'auto'}}>
                        <div className={classes.root}>
                            <Paper className={classes.paper}>
                                <TableContainer>
                                    <Table
                                        className={classes.table}
                                        aria-labelledby="tableTitle"
                                        size={dense ? 'small' : 'medium'}
                                        aria-label="enhanced table"
                                    >
                                        <EnhancedTableHead
                                            classes={classes}
                                            numSelected={selected.length}
                                            order={order}
                                            orderBy={orderBy}
                                            onSelectAllClick={handleSelectAllClick}
                                            onRequestSort={handleRequestSort}
                                            rowCount={starships.length}
                                        />
                                        <TableBody>
                                                {stableSort(starships, getComparator(order, orderBy))
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row, index) => {
                                                    const isItemSelected = isSelected(row.name);
                                                    const labelId = `enhanced-table-checkbox-${index}`;
                                                    return (
                                                        <TableRow
                                                            hover
                                                            onClick={(event) => handleClick(event, row.name)}
                                                            role="checkbox"
                                                            aria-checked={isItemSelected}
                                                            tabIndex={-1}
                                                            key={row.name}
                                                            selected={isItemSelected}
                                                        >
                                                            <TableCell padding="checkbox">
                                                                <Checkbox
                                                                    checked={isItemSelected}
                                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                                />
                                                            </TableCell>
                                                            <TableCell align="right">{row.name}</TableCell>
                                                            <TableCell align="right">{row.classification}</TableCell>
                                                            <TableCell align="right">{row.designation}</TableCell>
                                                            <TableCell align="right">{row.average_height}</TableCell>
                                                            <TableCell align="right">{row.average_lifespan}</TableCell>
                                                            <TableCell align="right">{row.eye_colors}</TableCell>
                                                            <TableCell align="right">{row.hair_colors}</TableCell>
                                                            <TableCell align="right">{row.language}</TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            {emptyRows > 0 && (
                                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                                    <TableCell colSpan={6} />
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </div>
                    </div>
                </LoadingOverlay>

            </div>
        </Layout>
    )
}

export default Species
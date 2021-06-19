import React, {useEffect, useState} from 'react';
import Layout from '../../Components/Layout';
import {Link} from "react-router-dom";
import { Col, FormGroup, Row, CustomInput } from 'reactstrap';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import img1 from '../../assets/img/phylogenetics.svg';
import img2 from '../../assets/img/video.svg';
import img3 from '../../assets/img/ufo.svg';
import img4 from '../../assets/img/taxi.svg';
import img5 from '../../assets/img/students.svg';
import UserAvatar from '../../assets/img/avatar.png'
import {fetchJSON} from '../../Helper/api';
import LoadingOverlay from "react-loading-overlay";
import Avatar from '@material-ui/core/Avatar';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}
  
const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const Dashboard = () => {
    const [films, setFilms] = useState([]);
    const [totalFilm, setTotalFilm] = useState(0);
    const [totalStarshps, setTotalStarshps] = useState(0);
    const [totalPeople, setTotalPeople] = useState(0);
    const [totalVehicle, setTotalVehicle] = useState(0);
    const [totalSpecies, setTotalSpecies] = useState(0);
    const [loader, setLoader] = useState(false);
    const headers = ['Film Title', 'Director', 'Producer', 'Release Date', 'Episode ID', 'Characters'];

    useEffect(() => {

        fetchData(); 
    }, [])    

    const fetchData = async () => {
        try {
            setLoader(true);
            const films = await fetchJSON('films/', null, 'GET');
            const people = await fetchJSON('people/', null, 'GET');
            const species = await fetchJSON('species/', null, 'GET');
            const starships = await fetchJSON('starships/', null, 'GET');
            const vehicles = await fetchJSON('vehicles/', null, 'GET');
            setLoader(false);

            setTotalFilm(films.count);
            setTotalStarshps(starships.count);
            setTotalPeople(people.count);
            setTotalVehicle(vehicles.count);
            setTotalSpecies(species.count);
            setFilms(films.results);
            console.log("films", films);

        } catch (error) {
            console.log("error", error);
        }

    }

    return(
        <Layout pageName={`Dashboard`}>
            <div className="content">
        	    <div className="head">
                    <Col xs={6} sm={6} md={4} lg={2} style={{marginRight: '8px'}}>
                        <FormGroup>
                            <CustomInput type="select" id="currentWeek" name="currentWeek">
                                <option value="">Current Week</option>
                                <option>Week 1</option>
                                <option>Week 2</option>
                                <option>Week 3</option>
                                <option>Week 4</option>
                                <option>Week 5</option>
                            </CustomInput>
                        </FormGroup>
                    </Col>
                    <Col xs={6} sm={6} md={4} lg={2} style={{marginRight: '8px'}}>
                        <FormGroup>
                            <CustomInput type="select" id="currentYear" name="currentYear">
                                <option value="">Current Year</option>
                                <option>2021</option>
                                <option>2022</option>
                                <option>2023</option>
                                <option>2024</option>
                                <option>2025</option>
                            </CustomInput>
                        </FormGroup>
                    </Col>

                </div>

                <div className="row cards">
                    <div className="col">
                        <Link to="/dashboard">
                            <div className="card">
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <h5>Films</h5>
                                    <img src={img2} alt="img2" />
                                </div>

                                <div>
                                    <h5>{totalFilm}</h5>
                                    <p><span>↑ 20</span> More than yesterday</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col">
                        <Link to="/starships">
                            <div className="card">
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <h5>Starships</h5>
                                <img src={img3} alt="img3" />
                            </div>

                            <div>
                                <h5>{totalStarshps}</h5>
                                <p><span>↑ 20</span> More than yesterday</p>
                            </div>
                        </div>
                        </Link>
                    </div>
                    <div className="col">
                        <Link to="/people">
                            <div className="card">
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <h5>People</h5>
                                    <img src={img5} alt="img5" />
                                </div>

                                <div>
                                    <h5>{totalPeople}</h5>
                                    <p><span>↑ 20</span> More than yesterday</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col">
                        <Link to="/vehicles">
                            <div className="card">
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <h5>Vehicles</h5>
                                    <img src={img4} alt="img4" />
                                </div>

                                <div>
                                    <h5>{totalVehicle}</h5>
                                    <p><span>↑ 20</span> More than yesterday</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col">
                        <Link to="/species">
                            <div className="card">
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <h5>Species</h5>
                                    <img src={img1} alt="img1" />
                                </div>

                                <div>
                                    <h5>{totalSpecies}</h5>
                                    <p><span>↑ 20</span> More than yesterday</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                <div style={{margin: '2.5em 0.8em', height: 'auto'}}>
                    <Row>
                        <Col md={12}>
                            <Card style={{height: 'auto'}}>
                                <LoadingOverlay active={loader} spinner text="Fetching Data">
                                    <CardBody style={{minWidth: '250px !important'}}>
                                        <CardTitle tag="h5">Films</CardTitle>
                                            <TableContainer>
                                            <Table style={{minWidth: '250px'}} aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        {headers.map((head, i) => <TableCell key={i}>{head}</TableCell> )}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {films.map((row, i) => (
                                                        <TableRow key={i}>
                                                            <TableCell align="right"><img src={img2} alt={'video'} /> {row.title}</TableCell>
                                                            <TableCell align="right">{row.director}</TableCell>
                                                            <TableCell align="right">{row.producer}</TableCell>
                                                            <TableCell align="right">{row.release_date}</TableCell>
                                                            <TableCell align="right">{row.episode_id}</TableCell>
                                                            <TableCell align="right" style={{color: 'rgb(23, 137, 36)'}}>{row.characters[0]}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </CardBody>
                                </LoadingOverlay>                        
                            </Card>
                        </Col>
                    </Row>
                </div>

            </div>
        </Layout>
    )
}

export default Dashboard
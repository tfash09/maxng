import '../../assets/css/login.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import image1 from '../../assets/img/stars.svg';
import image2 from '../../assets/img/Astronaut.svg';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory} from "react-router-dom"; 


const Signin = () => {
    let history = useHistory();

    return(
        <>
            <Container fluid style={{height: '100vh'}}>
                <Row style={{height: '100%'}}>
                    <Col lg={4} style={{ padding: '0px' }}>
                        <div className="leftside">
                            <h3 className="w-75">Welcome to Star Wars the Clone Wars</h3>
                            <img src={image1} alt="plane-up" />
                        </div>
                    </Col>
                    <Col lg={8} style={{ padding: '0px' }}>
                        <div className="rightside">
                            <img src={image2} alt="Astronaut" />
                            <div className="form-container">
                                <h4>Sign in to continue to your account.</h4>
                                <Form className="mt-4" onSubmit={(e) => {
                                    e.preventDefault();
                                    history.push('/dashboard');
                                }}>
                                    <FormGroup>
                                        <Label for="exampleEmail">Email address</Label>
                                        <Input type="email" name="email" id="exampleEmail" placeholder="Email address" required />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="examplePassword">Password</Label>
                                        <Input type="password" name="password" id="examplePassword" required placeholder="Enter strong password" />
                                    </FormGroup>
                                    <Button>Submit</Button>
                                </Form>
                            </div>
                            <ul>
                                <li>All rights reserved © 2020 STAR WARS</li>
                                <li>Privacy | Terms</li>
                                <li>English</li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )

}

export default Signin
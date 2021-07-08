import '../../assets/css/login.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import image1 from '../../assets/img/stars.svg';
import image2 from '../../assets/img/Astronaut.svg';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory} from "react-router-dom"; 
import React, {useState} from 'react';


const Signin = () => {
    let history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (evt) => {
        evt.preventDefault();
        if(CheckPassword(password)){
            history.push('/dashboard');
        }
    }

    const CheckPassword = (inputtxt) => {
        var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
        if (inputtxt.match(paswd)) {
            return true;
        }
        else {
            alert('Password is not secure')
            return false;
        }
    }

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
                                <Form className="mt-4" onSubmit={(e) => handleLogin(e) }>
                                    <FormGroup>
                                        <Label for="exampleEmail">Email address</Label>
                                        <Input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="exampleEmail" placeholder="Email address" required />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="examplePassword">Password</Label>
                                        <Input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="examplePassword" required placeholder="Enter strong password" />
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
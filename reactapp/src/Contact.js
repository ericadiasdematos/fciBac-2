import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Col, Popover, Input, PopoverBody, Button  } from 'reactstrap';
import photo from './images/PageContacts.png'
import logo from './images/logo.png'
import { Link } from 'react-router-dom';


function Contact() {

  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  var BackgroundImage = {
    display: 'flex',
    flexDirection: 'column',
    height:'100vh',
    backgroundImage: `url(${photo})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    maxWidth: '100%',
  }

  var navBarRow ={
    backgroundColor: 'white',
    height: '15vh',
    diplay: 'flex',
    flexDirection: 'row',
    justifySelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'space-between'
}

  return (
    <Container style={BackgroundImage}>

      <Row style={navBarRow}>

        <Col xs='1' style={{paddingLeft: '0.6vh'}}>
          <Link to='/'>
            <img src={logo} alt='logo' style={{width: '20vh'}}/>
          </Link>
        </Col>

        <Col xs='10' style={{display: 'flex', justifyContent: 'center'}}>
            <span style={{color: '#206A37', fontSize: '6vh'}}>
                C O N T A C T
            </span>
        </Col>

        <Col xs='1' style={{display: 'flex', justifyContent:'flex-end', paddingRight: '5vh'}}>
            <FontAwesomeIcon style={{display: 'flex', color: '#206A37' }} icon={faUser} size='lg' id="Popover1" type="button" />
            <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle} >
                    <PopoverBody style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <span style={{padding: '1vh', color: '#206A37', fontWeight: 'bold'}}>Sign In</span>
                        <Input type="email" placeholder="Email" style={{marginBottom: '1vh', width:'auto'}}></Input>
                        <Input type="password" placeholder="Password" style={{marginBottom: '1vh', width:'auto'}}></Input>
                        <Button style={{width: '28vh', marginBottom: '1vh', backgroundColor: '#206A37'}}>Sign In</Button>
                        <Button style={{width: '28vh', backgroundColor: '#206A37'}}>Créer un compte</Button>
                    </PopoverBody>
            </Popover>
        </Col>

      </Row>

      <Row>
        <Col>
        </Col>
      </Row>

    </Container>
  );
}

export default Contact;
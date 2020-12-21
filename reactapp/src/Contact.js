import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Popover, Input, PopoverBody, Button  } from 'reactstrap';
import photo from './images/PageContacts.png'
import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import user from './images/user.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import './PageContactStyle.css'



function Contact() {

  const [raison, setRaison] = useState("Raison");

  function handleRaisonClick(e) {
    setRaison(e)
    console.log(raison)
  }

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

  

var contactezNous = {
    display: 'flex', 
    justifySelf: 'center',
    alignSelf: 'center',
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: '0.5vw'
    
 }

 var contactBoxes = {
  display: 'flex', 
  flexDirection: 'column', 
  justifyContent: 'center', 
  alignItems: 'center', 
  textAlign: 'center',
  border: 'solid 1px #206A37',
  borderRadius: 10,
  margin: 3,
  padding: 1,
  fontSize: 'calc(0.4em + 0.5vw)'
 }

 const [value,setValue]=useState('Raison');
  const handleSelect=(e)=>{
    console.log(e);
    setValue(e)
  }

  return (
    <Container style={BackgroundImage}>

      <Row id='navBarRow'>

        <Col xs='2' lg='1' style={{paddingLeft: '0.6vh'}}>
          <Link to='/'>
            <img src={logo} alt='logo' style={{width: 'calc(1em + 9vw)'}}/>
          </Link>
        </Col>

        <Col xs='8' lg='10' style={{display: 'flex', justifyContent: 'center'}}>
            <span style={{color: '#206A37', fontSize: 'calc(1em + 2vw)'}}>
                C O N T A C T
            </span>
        </Col>

        <Col xs='2' lg='1' style={{display: 'flex', justifyContent:'flex-end', paddingRight: '5vh'}}>
          <img src={user} id="Popover1" style={{width: 'calc(1em + 2vw)'}} type="button" ></img>
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

      <Row className='firstRow'>

        <Row className='rowContactezNous'>
          <Col xs='12' id='contactezNous'>
            <span id='spanContactezNous'>CONTACTEZ NOUS</span>
          </Col>
        </Row>

          
        <Row style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '100%', flexDirection: 'row'}}>
          <Col xs='5' lg='2' style={contactBoxes}>
            <span>FCI Houdan</span>
            <span>houdan@fcimmo.com</span>
            <span>Tél. : 01.78.90.51.51</span>
          </Col>
          <Col xs='5' lg='2' style={contactBoxes}>
            <span>FCI Paris</span>
            <span>mozart@fcimmo.com</span>
            <span>Tél. : 01.40.50.20.20</span>
          </Col>
          <Col xs='5' lg='2' style={contactBoxes}>
            <span>FCI Syndic</span>
            <span>contact@fcisyndic.com</span>
            <span>Tél. : 01.86.22.96.96</span>
          </Col>
          <Col xs='5' lg='2' style={contactBoxes}>
            <span>FCI Maule</span>
            <span>maule@fcimmo.com</span>
            <span>Tél. : 01.34.75.08.08</span>
          </Col>
        </Row>
        
      </Row>

      <Row className='firstRow'>

        <Row>
          <Col xs='12' style={contactezNous}>
            <span style={{color: '#206A37', fontSize: 'calc(1em + 0.5vw)'}}>LAISSEZ NOUS UNE MESSAGE</span>
          </Col>
        </Row>


        <Row style={{width: '100%', margin:'1vw'}}>
          <Col xs='6'>
            <DropdownButton
                alignCenter
                title={value}
                id="dropdown"
                className="myDropdown"
                size="sm"
                variant="secondary"
                onSelect={handleSelect}
                style={{color: '#206A37'}}
            >
                <Dropdown.Item as="button" eventKey="Je veux acheter" style={{}}>Je veux acheter</Dropdown.Item>
                <Dropdown.Item as="button" eventKey="Je veux vendre mon bien">Je veux vendre mon bien</Dropdown.Item>
                <Dropdown.Item as="button" eventKey="Je cherche une location">Je cherche une location</Dropdown.Item>
                <Dropdown.Item as="button" eventKey="Je veux louer mon bien">Je veux louer mon bien</Dropdown.Item>
                <Dropdown.Item as="button" eventKey="Je veux changer de syndic">Je veux changer de syndic</Dropdown.Item>
                <Dropdown.Item as="button" eventKey="Je cherche un viager">Je cherche un viager</Dropdown.Item>
                <Dropdown.Item as="button" eventKey="Autre raison">Autre raison</Dropdown.Item>
            </DropdownButton>
          </Col>

          <Col xs='6'>
            <Input size="sm" placeholder='Votre email'></Input>
          </Col>
        </Row>

        <Row style={{width: '100%', margin:'1vw'}}>
          <Col xs='6'>
            <Input size="sm" placeholder='Nom et Prénom' style={{marginBottom: '1vw'}}></Input>
            <Input size="sm" placeholder='Téléphone'></Input>
          </Col>
          <Col xs='6'>
            <Input size="sm" placeholder='Message' type="textarea" style={{height: '12vw'}}></Input>
          </Col>
        </Row>

        <Row style={{width: '100%', margin:'1vw'}}>
          <Col xs='1'>
            <Button size="sm" >Envoyer</Button>
          </Col>
        </Row>
        
      </Row>

      

    </Container>
  );
}



export default Contact;
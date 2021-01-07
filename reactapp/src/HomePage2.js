import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import photo from './images/HomePageFond.png'
import photo2 from './images/ActualitéesFonds.png'
import { Container, Row, Col, Popover, Input, PopoverBody, Button, Media } from 'reactstrap';
import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import user from './images/user.png'
 




function HomePage() {

    const [popoverOpen, setPopoverOpen] = useState(false);

    const toggle = () => setPopoverOpen(!popoverOpen);


    


    return(

<span>

    <Container style={BackgroundImage1}>
            
        <Row style={navBarRow}>

            <Col xs='12' lg='2' style={{paddingLeft: '0.6vh', display: 'flex', justifyContent: 'center'}}>
                <img src={logo} alt='logo' style={{width: 'calc(1em + 9vw)'}}/>
            </Col>
            <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center'}}>
                <span style={{color: '#206A37', fontSize: 'calc(1em + 0.5vw)'}}>
                    <Link to='/quisommesnous' style={{color: '#206A37'}}>QUI SOMMES NOUS</Link>
                </span>
            </Col>
            <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center'}}>
                <span style={{color: '#206A37', fontSize: 'calc(1em + 0.5vw)'}}>
                    <Link to='/nosagences' style={{color: '#206A37'}}>NOS AGENCES</Link>
                </span>
            </Col>
            <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center'}}>
                <span style={{color: '#206A37', fontSize: 'calc(1em + 0.5vw)'}}>
                    <Link to='/outils' style={{color: '#206A37'}}>OUTILS</Link>
                </span>
            </Col>
            <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center'}}>
                <span style={{color: '#206A37', fontSize: 'calc(1em + 0.5vw)'}}>
                    <Link to='/contact' style={{color: '#206A37'}}>CONTACT</Link>
                </span>
            </Col>
            <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center', fontSize: '1vw'}}>
                {/* <FontAwesomeIcon style={{display: 'flex', color: '#206A37', width: '15vw' }} icon={faUser} size='2x' id="Popover1" type="button" /> */}
                <img src={user} id="Popover1" style={{width: 'calc(1em + 2vw)'}} type="button" ></img>
                <Popover placement="auto" isOpen={popoverOpen} target="Popover1" toggle={toggle} >
                    <PopoverBody style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <span style={{padding: '1vh', color: '#206A37', fontWeight: 'bold'}}>Sign In</span>
                        <Input type="email" placeholder="Email" style={{marginBottom: '1vh', width:'auto'}}></Input>
                        <Input type="password" placeholder="Password" style={{marginBottom: '1vh', width:'auto'}}></Input>
                        <Button style={{width: '28vh', marginBottom: '1vh', backgroundColor: '#206A37'}}>Sign In</Button>
                        <Button style={{width: '28vh', backgroundColor: '#206A37'}}><Link to='/creationdecompte' style={{color: 'white'}}>Créer un compte</Link></Button>
                    </PopoverBody>
                </Popover>
            </Col>
        </Row>
        

        <Row style={nameWhiteBlock}>
            <Col xs='12' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <h1 style={{color: '#206A37', fontSize: 'calc(1em + 2vw)'}}>Agence Immobiliere FCI</h1>
                <h5 style={{color: '#206A37', fontSize: 'calc(1em + 0.5vw)'}}>Françoise Combes Immobilier</h5>
            </Col>
        </Row>

        <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <span style={littlewhiteboxes}>
                    <span>
                        <Link to='/estimer' style={{color: '#206A37'}}>Mettre en Location</Link>
                    </span>
                </span>
                <span style={littlewhiteboxes}>
                    <span>
                        <Link to='/recherche' style={{color: '#206A37'}}>Louer un bien</Link>
                    </span>
                </span>
            </Col>
            <Col  xs='12' lg='2' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <span style={littlewhiteboxes}>
                    <span>
                        <Link to='/recherche' style={{color: '#206A37'}}>Acheter</Link>
                    </span>
                </span>
                <span style={littlewhiteboxes}>
                    <span>
                        <Link to='/estimer' style={{color: '#206A37'}}>Vendre mon bien</Link>
                    </span>
                </span>
                <span style={littlewhiteboxes}>
                    <span>
                        <Link to='/estimer' style={{color: '#206A37'}}>Estimer mon bien</Link>
                    </span>
                </span>
                <span style={littlewhiteboxes}>
                    <span>
                        <Link to='/recherche' style={{color: '#206A37'}}>Viager</Link>
                    </span>
                </span>
            </Col>
            <Col  xs='12' lg='2' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <span style={littlewhiteboxes}>
                    <span>
                        <Link to='/estimer' style={{color: '#206A37'}}>Changer de Syndic</Link>
                    </span>
                </span>
            </Col>

        </Row>

        <Row style={barContacts}>
            <Col xs='3' lg='3' style={colContacts}>
                <span style={spanContacts}>
                    <span>FCI Houdan</span>
                    <span>17 Grande rue</span>
                    <span>78550 HOUDAN</span>
                    <span>Tél. : 01.78.90.51.51</span>
                </span>
            </Col>
            <Col xs='3' lg='3' style={colContacts}>
                <span style={spanContacts}>
                    <span>FCI Paris</span>
                    <span>53 avenue Mozart</span>
                    <span>75016 PARIS</span>
                    <span>Tél. : 01.40.50.20.20</span>
                </span>
            </Col>
            <Col xs='3' lg='3' style={colContacts}>
                <span style={spanContacts}>
                    <span>FCI Syndic</span>
                    <span>53 avenue Mozart</span>
                    <span>75016 PARIS</span>
                    <span>Tél. : 01.86.22.96.96</span>
                </span>
            </Col>
            <Col xs='3' lg='3' style={colContacts}>
                <span style={spanContacts}>
                    <span>FCI Maule</span>
                    <span>2 place de la mairie</span>
                    <span>78580 MAULE</span>
                    <span>Tél. : 01.34.75.08.08</span>
                </span>
            </Col>

        </Row>


    </Container>

    <Container style={BackgroundImage2}>

        <Row style={navBarRow}>
            <Col xs='12' style={{display: 'flex', justifyContent: 'center'}}>
                <span style={{color: '#206A37', fontSize: '4vw'}}>
                     A C T U A L I T E S
                </span>
            </Col>
        </Row>


        <Row style={{justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center'}}>
            <Col xs='11' lg='6' style={newsRow}>
                <Col xs='4' lg='3'>
                    <img src={photo2} style={{width: 'calc(1em + 15vw)', height: 'auto'}} fluid />
                </Col>
                <Col xs='7' lg='8'  style={{display: 'flex', justifySelf: 'center', alignSelf: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <span style={{fontSize: 'calc(1em + 0.5vw)'}}>Title of the news!</span>
                    <span style={{textAlign: 'justify', fontSize: 'calc(0.5em + 0.2vw)'}}>Lorem ipsum quis non adipiscing id arcu porta nisl, consectetur non class suscipit et in fusce risus aenean, cras scelerisque ultricies purus eget nulla nisl. tristique euismod eget orci tincidunt non porttitor cras vestibulum porttitor hac blandittristique euismod eget orci tincidunt non porttitor cras vestibulum porttitor hac blandit</span>
                </Col>
            </Col>
        </Row>

        <Row style={{justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center'}}>
            <Col xs='11' lg='6' style={newsRow}>
                <Col xs='3'>
                    <img src={photo2} style={{width: 'calc(1em + 15vw)', height: 'auto'}} fluid />
                </Col>
                <Col xs='8' style={{display: 'flex', justifySelf: 'center', alignSelf: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <span style={{fontSize: 'calc(1em + 0.5vw)'}}>Title of the news!</span>
                    <span style={{textAlign: 'justify', fontSize: 'calc(0.5em + 0.2vw)'}}>Lorem ipsum quis non adipiscing id arcu porta nisl, consectetur non class suscipit et in fusce risus aenean, cras scelerisque ultricies purus eget nulla nisl. tristique euismod eget orci tincidunt non porttitor cras vestibulum porttitor hac blandittristique euismod eget orci tincidunt non porttitor cras vestibulum porttitor hac blandit</span>
                </Col>
            </Col>
        </Row>

        <Row style={{justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center'}}>
            <Col xs='11' lg='6' style={newsRow}>
                <Col xs='3' >
                    <img src={photo2} style={{width: 'calc(1em + 15vw)', height: 'auto'}} fluid />
                </Col>
                <Col xs='8' style={{display: 'flex', justifySelf: 'center', alignSelf: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <span style={{fontSize: 'calc(1em + 0.5vw)'}}>Title of the news!</span>
                    <span style={{textAlign: 'justify',fontSize: 'calc(0.5em + 0.2vw)'}}>Lorem ipsum quis non adipiscing id arcu porta nisl, consectetur non class suscipit et in fusce risus aenean, cras scelerisque ultricies purus eget nulla nisl. tristique euismod eget orci tincidunt non porttitor cras vestibulum porttitor hac blandittristique euismod eget orci tincidunt non porttitor cras vestibulum porttitor hac blandit</span>
                </Col>
            </Col>
        </Row>

        
    </Container>


</span>
    )
}

var BackgroundImage1 = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height:'100vh',
    backgroundImage: `url(${photo})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    maxWidth: '100%',
  }

var navBarRow ={
    backgroundColor: 'white',
    height: 'auto',
    diplay: 'flex',
    flexDirection: 'row',
    justifySelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1vw',
    opacity: '90%'
}

var nameWhiteBlock = {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifySelf: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: '80%',
    borderRadius: 10,
    padding: '1vw'
}

var littlewhiteboxes = {
    backgroundColor: 'white',
    width: 'calc(7em + 9vw)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0.5vw',
    padding: '0.5vw',
    fontSize: '2vh',
    opacity: '80%',
    borderRadius: 10,
    color: '#206A37'
}

var barContacts = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '1vh',
    opacity: '70%'

    
}

var colContacts = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    
}

var spanContacts = {
    backgroundColor: '#206A37',
    width: 'calc(7em + 9vw)',
    color: 'white',
    padding: '1vh',
    borderRadius: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 'calc(0.3em + 0.3vw)'
}

var BackgroundImage2 = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height:'100vh',
    backgroundImage: `url(${photo2})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    maxWidth: '100%',
}

var newsRow = {
    backgroundColor: 'rgba(255,255,255, 0.7)',
    display: 'flex',
    flexDirection: 'row',
    padding: 0, 
    alignItems: 'center', 
    justifyContent: 'space-between',
    alignSelf: 'center',
    justifySelf: 'center',
    borderRadius: 10,
    marginBottom: 'calc(0.3em + 0.3vw)',
    
}


export default HomePage;
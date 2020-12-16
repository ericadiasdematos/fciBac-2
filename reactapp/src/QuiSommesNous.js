import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Col, Popover, Input, PopoverBody, Button  } from 'reactstrap';
import photo from './images/PageQuiSommesNous.png'
import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import user from './images/user.png'



function QuiSommesNous() {

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
    height: 'auto',
    diplay: 'flex',
    flexDirection: 'row',
    justifySelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1vw',
    opacity: '90%'
}

  var descRow = {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifySelf: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: '80%',
    borderRadius: 10,
    width: 'auto',
    margin: 'calc(1em + 5vw)'
  }

  return (
    <Container style={BackgroundImage}>

      <Row style={navBarRow}>

        <Col xs='2' lg='1' style={{paddingLeft: '0.6vh'}}>
          <Link to='/'>
            <img src={logo} alt='logo' style={{width: 'calc(1em + 9vw)'}}/>
          </Link>
        </Col>

        <Col xs='8' lg='10' style={{display: 'flex', justifyContent: 'center'}}>
            <span style={{color: '#206A37', fontSize: 'calc(1em + 2vw)'}}>
                QUI SOMMES NOUS
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

      <Row style={descRow}>

        <Col xs='12' style={{display: 'flex', justifySelf: 'center', alignSelf: 'center', flexDirection: 'column'}}>
          <h2 style={{display: 'flex', justifySelf: 'center', alignSelf: 'center', padding: '2vh', color: '#206A37', paddingTop: '4vh', fontSize: 'calc(1em + 2vw)', textAlign: 'center'}}>Agence Immobiliere FCI</h2>
          <span style={{display: 'flex', justifySelf: 'center', alignSelf: 'center', padding: '2vh', textAlign: 'justify', fontSize: 'calc(0.4em + 0.5vw)'}}>F.C.I  Françoise Combes Immobilier est une histoire de famille depuis plus de 25 ans.
                Notre réputation depuis 1995 est l’assurance de la réussite de vos projets immobiliers qu’il soit personnel ou d’investissements. 
                Tout d’abord implantés à Houdan 78, nous avons élargi notre cercle d’action à Paris et petite couronne, 78, 28,27. 
                Les membres de notre équipe commerciale sont chez F.C.I depuis de nombreuses années. Cette stabilité est rassurante.
                Nous avons développé le Syndic d’Immeuble et la gestion locative dans la même perspective.
                Notre réussite est la preuve de notre professionnalisme et sérieux. 3 axes dirigent notre travail :
                
                
          </span>
          <span style={{display: 'flex', justifySelf: 'center', alignSelf: 'center', padding: '1vh', textAlign: 'justify', fontSize: 'calc(0.4em + 0.5vw)'}}>
            <ul>
              <li>Efficacité</li>
              <li>Rapidité</li>
              <li>Savoir-faire</li>
            </ul>
          </span>
          <span style={{display: 'flex', justifySelf: 'center', alignSelf: 'center', paddingRight: '2vh', paddingLeft: '2vh', paddingBottom: '2vh', textAlign: 'justify', fontSize: 'calc(0.4em + 0.5vw)'}}>
            Ces trois points permettent un bon suivi de votre dossier et un véritable accompagnement.
            Pour la transaction immobilière nos estimations sont justes, suivants des critères précis, nos visites sont toujours ciblées et qualifiées.
            Pour le syndic notre disponibilité et notre professionnalisme encadrent le quotidien de votre copropriété. 
            Pour la gestion locative, oubliez-le suivi qui vous cause des soucis. Nous prenons tout en charge.
          </span>

        </Col>

      </Row>

    </Container>
  );
}

export default QuiSommesNous;
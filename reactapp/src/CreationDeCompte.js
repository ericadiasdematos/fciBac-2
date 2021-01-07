import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Col, Popover, Input, PopoverBody, Button, Label  } from 'reactstrap';
import photo from './images/PageCreationDeCompte.png'
import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import user from './images/user.png'

function CreationDeCompte() {

    const [popoverOpen, setPopoverOpen] = useState(false);

    const toggle = () => setPopoverOpen(!popoverOpen);

    const [genre, setGenre] = useState('')
    const [nom, setNom] = useState('')
    const [prenom, setprenom] = useState('')
    const [email, setEmail] = useState('')
    const [telephone, setTelephone] = useState('')
    const [password, setPassword] = useState('')

    const [tableauErreurs, setTableauErreurs] = useState([]);
    const [userCreated, setUserCreated] = useState(false)

   var handleConfirmer = async ()  =>  {

    var rawData = await fetch('/signUp', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `genreFromFront=${genre}&nomFromFront=${nom}&prenomFromFront=${prenom}&emailFromFront=${email}&telephoneFromFront=${telephone}&passwordFromFront=${password}`
});

    var data = await rawData.json();
    console.log(data.errors);

    if(data.result == true){
      userCreated(true)
    }else{
      setTableauErreurs(data.errors)

    }

   }

   var listOfErrors = tableauErreurs.map((error, i)=>{
     return(<span>{error}</span>)
   })

  return (
    <Container style={BackgroundImage}>

      <Row style={navBarRow}>

        <Col xs='2' lg='1' style={{paddingLeft: '0.6vh'}}>
          <Link to='/'>
            <img src={logo} alt='logo' style={{width: 'calc(1em + 9vw)'}}/>
          </Link>
        </Col>

        <Col xs='7' lg='10' style={{display: 'flex', justifyContent: 'center'}}>
            <span style={{color: '#206A37', fontSize: 'calc(1em + 2vw)', textAlign: 'center'}}>
                C R É E R &nbsp; U N E &nbsp; C O M P T E
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

        <Row style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'calc(1em + 2vw)'}}>
            <Col style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Label check style={{marginRight: '25px'}}>
                    <Input type="radio" name="radio1" value="Madame" onChange={(e) => setGenre(e.target.value)} />{' '}
                    Mme.
                </Label>
                <Label check>
                    <Input type="radio" name="radio1" value="Monsieur" />{' '}
                    M.
                </Label>
            </Col>
        </Row>
        <Row style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'calc(0.2em + 0.2vw)'}}>
            <Col xs='12' lg='5'>
                <Input placeholder="Nom" style={{border: '2px solid #206A37', borderRadius: 10}} onChange={(e) => setNom(e.target.value)}/>
            </Col>
            <Col xs='12' lg='5'>
                <Input placeholder="Prénom" style={{border: '2px solid #206A37', borderRadius: 10}} onChange={(e) => setprenom(e.target.value)}/>
            </Col>
        </Row>
        <Row style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'calc(0.2em + 0.2vw)'}}>
            <Col xs='12' lg='5'>
                <Input placeholder="Email" style={{border: '2px solid #206A37', borderRadius: 10}} onChange={(e) => setEmail(e.target.value)}/>
            </Col>
            <Col xs='12' lg='5'>
                <Input placeholder="Telephone" style={{border: '2px solid #206A37', borderRadius: 10}} onChange={(e) => setTelephone(e.target.value)}/>
            </Col>
        </Row>
        <Row style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'calc(1em + 2vw)'}}>
            <Col xs='12' lg='5'>
                <Input placeholder="Mot de passe" style={{border: '2px solid #206A37', borderRadius: 10}} />
            </Col>
            <Col xs='12' lg='5'>
                <Input placeholder="Confirmer me mot de passe" style={{border: '2px solid #206A37', borderRadius: 10}} onChange={(e) => setPassword(e.target.value)}/>
            </Col>
        </Row>
        <Row style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'red', flexDirection: 'column'}}>
              {listOfErrors}
            </span>
            <Button style={{color: 'white', backgroundColor: '#206A37', marginTop: '5px'}} onClick={()=>handleConfirmer()}>Confirmer</Button>
        </Row>

      </Row>

    </Container>
  );
}

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
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    justifySelf: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'calc(1em + 5vw)',
    backgroundColor: 'rgba(255,255,255, 0.7)',
    borderRadius: 10,
    paddingTop: 'calc(1em + 1vw)',
    paddingBottom: 'calc(1em + 1vw)'
  }
  
  var col1 = {
    display: 'flex', 
    justifySelf: 'center', 
    alignSelf: 'center', 
    flexDirection: 'column', 
    backgroundColor: 'rgba(255,255,255, 0.7)', 
    justifyContent: 'center', 
    alignItems: 'center',
     borderRadius: 10,
  }
  
  var titleStyle = {
    display: 'flex', 
    justifySelf: 'center', 
    alignSelf: 'center', 
    padding: '2vh', 
    color: '#206A37', 
    paddingTop: '4vh', 
    fontSize: 'calc(1em + 2vw)', 
    textAlign: 'center'
  }
  
  var span1Style = {
    display: 'flex', 
    justifySelf: 'center', 
    alignSelf: 'center', 
    padding: '2vh', 
    textAlign: 'justify', 
    fontSize: 'calc(0.4em + 0.5vw)'
  }
  
  var span2Style = {
    display: 'flex', 
    justifySelf: 'center', 
    alignSelf: 'center', 
    padding: '1vh', 
    textAlign: 'justify', 
    fontSize: 'calc(0.4em + 0.5vw)'
  }
  
  var span3Style = {
    display: 'flex', 
    justifySelf: 'center', 
    alignSelf: 'center', 
    paddingRight: '2vh', 
    paddingLeft: '2vh', 
    paddingBottom: '2vh', 
    textAlign: 'justify', 
    fontSize: 'calc(0.4em + 0.5vw)'
  }

export default CreationDeCompte;
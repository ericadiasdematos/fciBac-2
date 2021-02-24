import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Popover, Input, PopoverBody, Button, Label  } from 'reactstrap';
import photo from './images/PageRechercher1.png'
import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import user from './images/user.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Divider } from 'antd';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPencilRuler} from '@fortawesome/free-solid-svg-icons'
import {faHistory} from '@fortawesome/free-solid-svg-icons'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import Footer from './Footer'
import { motion } from 'framer-motion'





function Recherche() {

  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const [logInMessage, setLogInMessage] = useState([])

  const [logInAccepted, setLogInAccepted] = useState(false)

  const [userGenre, setUserGenre] = useState('')
  const [usersName, setUsersName] = useState('')

  const [userFoundFromToken, setUserFoundFromToken] = useState(localStorage.getItem('usersToken'))

  var handleLogout = () => {
      localStorage.removeItem('usersToken')
      setLogInAccepted(false)
  }
  
      
  useEffect(async() => {

      console.log('localstotage',userFoundFromToken);

      if(userFoundFromToken != null){

          
      var rawData = await fetch('/sendToken', {
          method: 'POST',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body: `tokenFromFront=${userFoundFromToken}`
    }); 
    
        var data = await rawData.json()
        
        if(data.result === true){
          setLogInAccepted(true)
          setUsersName(data.user.prenom)
          setUserGenre(data.user.genre)
        }

      }


       
    },[]);



  var handleSignIn = async () => {

      console.log(password)

        var rawData = await fetch('/signIn', {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `emailFromFront=${email}&passwordFromFront=${password}`
      });

      var data = await rawData.json()
      console.log('data: ', data)
      if(data.result == true){
        setLogInAccepted(true)
        setUsersName(data.usersName)
        localStorage.setItem('usersToken', data.token)
      }else{
        setLogInMessage(data.errors)

      }

  }

  var userBoard = <PopoverBody style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                      <span style={{padding: '1vh', color: '#206A37', fontWeight: 'bold'}}>Se connecter</span>
                      <Input type="email" placeholder="Email" style={{marginBottom: '1vh', width:'auto'}} onChange={(e) => setEmail(e.target.value)}></Input>
                      <Input type="password" placeholder="Password" style={{marginBottom: '1vh', width:'auto'}} onChange={(e) => setPassword(e.target.value)}></Input>
                      <span style={{padding: '1vh', color: '#206A37', fontWeight: 'bold'}}>{logInMessage}</span>
                      <Button style={{width: '28vh', marginBottom: '1vh', backgroundColor: '#206A37'}} onClick={()=>handleSignIn()}>Confirmer</Button>
                      <Button style={{width: '28vh', backgroundColor: '#206A37'}}><Link to='/creationdecompte' style={{color: 'white'}}>Créer un compte</Link></Button>
                  </PopoverBody>

  if(logInAccepted === true){
    userBoard = <PopoverBody style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <span style={{padding: '1vh', color: '#206A37', fontWeight: 'bold'}}>Bienvenue {userGenre} {usersName} !</span>
                    <Button size='sm' style={{width: '28vh', marginBottom: '1vh', backgroundColor: '#206A37'}}><Link to='/wishlist' style={{color: 'white'}}>Voir mes favoris</Link></Button>
                    <Button size='sm' style={{width: '28vh', marginBottom: '1vh', backgroundColor: '#206A37'}}><Link to='/mesrecherches' style={{color: 'white'}}>Voir mes dernieres recherches</Link></Button>
                    <Button size='sm' style={{width: '28vh', backgroundColor: '#206A37'}} onClick={()=>handleLogout()}>Se déconecter</Button>
                </PopoverBody>
  }

  return (

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{opacity: 0 }}
>

      <Container style={BackgroundImage}>

        <Row style={navBarRow}>

          <Col xs='2' lg='1' style={{paddingLeft: '0.6vh'}}>
            <Link to='/'>
              <img src={logo} alt='logo' style={{width: 'calc(1em + 9vw)'}}/>
            </Link>
          </Col>

          <Col xs='8' lg='10' style={{display: 'flex', justifyContent: 'center'}}>
              <span style={{color: '#206A37', fontSize: 'calc(1em + 2vw)'}}>
                  R E C H E R C H E
              </span>
          </Col>

          <Col xs='2' lg='1' style={{display: 'flex', justifyContent:'flex-end', paddingRight: '5vh'}}>
            <img src={user} id="Popover1" style={{width: 'calc(1em + 2vw)'}} type="button" ></img>
              <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle} >
                  {userBoard}
              </Popover>
          </Col>

        </Row>

        <Row style={firstRow}>

        
          <Row>
            <Col xs='12' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
              <span style={spanContactezNous}>FILTRES DE RECHERCHE SIMPLE</span>
            </Col>
          </Row>
          
          <Divider style={{width: '100%', backgroundColor: '#206A37', height: '0.7px'}} />


          <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', marginTop: '15px'}}>
            <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
              <span style={{color: '#206A37', textAlign: 'center'}}>Dans quelle ville? Quartier?</span>
              <Input size='sm'/>
            </Col>
            <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
              <span style={{color: '#206A37', textAlign: 'center'}}>Votre budget Max?</span>
              <Input size='sm'/>
            </Col>
          </Row>

          <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', marginTop: '15px'}}>
            <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
              <Button size='sm' style={{backgroundColor: '#206A37'}}><Link to='/map' style={{color: 'white'}}><FontAwesomeIcon icon={faPencilRuler} style={{color: 'white', margin: '2px'}}/>Dessiner sur la map</Link></Button>
            </Col>
          </Row>

          <Row style={{diplay:'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', marginTop: '15px'}}>
            <Col xs='12' lg='2' style={styleColRadio}>
              <Label check style={radioButtonsStyle}>
                <Input type="radio" name="Appartement" />
                Appartement
              </Label>
            </Col>
            <Col xs='12' lg='2' style={styleColRadio}>
              <Label check style={radioButtonsStyle}>
                <Input type="radio" name="Appartement" />
                Maison
              </Label>
            </Col>
            <Col xs='12' lg='2' style={styleColRadio}>
              <Label check style={radioButtonsStyle}>
                <Input type="radio" name="Appartement" />
                Loft
              </Label>
            </Col>
            <Col xs='12' lg='2' style={styleColRadio}>
              <Label check style={radioButtonsStyle}>
                <Input type="radio" name="Appartement" />
                Bureau
              </Label>
            </Col>
          </Row>

          <Row style={{diplay:'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', marginTop: '15px'}}>
            <Col xs='12' lg='2' style={styleColRadio}>
              <Label check style={radioButtonsStyle}>
                <Input type="radio" name="Appartement" />
                Hôtel particulier
              </Label>
            </Col>
            <Col xs='12' lg='2' style={styleColRadio}>
              <Label check style={radioButtonsStyle}>
                <Input type="radio" name="Appartement" />
                Parking / Box
              </Label>
            </Col>
            <Col xs='12' lg='2' style={styleColRadio}>
              <Label check style={radioButtonsStyle}>
                <Input type="radio" name="Appartement" />
                Battiment / Immeuble
              </Label>
            </Col>
            <Col xs='12' lg='2' style={styleColRadio}>
              <Label check style={radioButtonsStyle}>
                <Input type="radio" name="Appartement" />
                Terrain
              </Label>
            </Col>
          </Row>


          <Row style={{width: '100%', marginTop:'1vw', marginBottom: '1vw'}}>
            <Col xs='12' lg='4' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Button size="sm" style={{backgroundColor: '#206A37', fontSize: 'calc(0.5em + 0.4vw)'}}><Link style={{color: 'white'}} to="/mesrecherches"><FontAwesomeIcon icon={faHistory} style={{color: 'white', margin: '2px'}}/>Voir mes dérnieres recherches</Link></Button>
            </Col>
            <Col xs='12' lg='4'>
              <span type='button' style={{textDecoration: 'underline', color: '#206A37'}}>Voir la derniere recherche efectué</span>
            </Col>
            <Col xs='12' lg='4'  style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Button size="sm" style={{backgroundColor: '#206A37',fontSize: 'calc(0.5em + 0.4vw)'}}><Link style={{color: 'white'}} to="/rechercheavances"><FontAwesomeIcon icon={faPlus} style={{color: 'white', margin: '2px'}}/>Recherche Avancé</Link></Button>
            </Col>
          </Row>

        </Row>

        <Row style={secondRow}>
          <Col xs='8' lg='2' style={{diplay:'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', fontSize: 'calc(1em + 0.4vw)', color: '#206A37', fontWeight: 'bold'}}>
            <Link to='/resultats' type='button' style={{color: '#206A37', fontSize: 'calc(1em + 0.6vw)'}}>Valider</Link>
          </Col>
        </Row>

      </Container>
      <Footer/>

</motion.div>
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

 var navBarRow = {
  backgroundColor: 'white',
  height: 'auto',
  display: 'flex',
  flexDirection: 'row',
  justifySelf: 'flex-start',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1vw',
  opacity: '90%',
}

var firstRow = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(255,255,255, 0.7)',
  width: '60%',
  justifySelf: 'center',
  alignSelf: 'center',
  marginTop: 'calc(1em + 5vw)',
  borderRadius: '10px',
  border: 0
}

var secondRow = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(255,255,255, 0.7)',
  width: '60%',
  justifySelf: 'center',
  alignSelf: 'center',
  borderRadius: '10px',
  paddingBottom: '10px',
  paddingTop: '7px',
  border: 0,
  marginTop: '7px'
}


 var spanContactezNous = {
  display: 'flex',
  justifySelf: 'center',
  alignSelf: 'center',
  color: '#206A37',
  fontSize: 'calc(1em + 0.6vw)',
  marginBottom: '5px',
  textAlign: 'center'
}


var radioButtonsStyle = {
  textAlign: 'center',
  color: '#206A37'
  
}

var styleColRadio = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

export default Recherche;
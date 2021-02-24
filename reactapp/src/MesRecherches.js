import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Popover, Input, PopoverBody, Button, Badge   } from 'reactstrap';
import photo from './images/PageMesRecherches.png'
import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import user from './images/user.png'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import Footer from './Footer'
import { motion } from 'framer-motion'

function MesRecherches() {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
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
                    <Button size='sm' style={{width: '28vh', marginBottom: '1vh', backgroundColor: '#206A37'}}><Link to='/mesrecherches'>Voir mes dernieres recherches</Link></Button>
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
              <span style={{color: '#206A37', fontSize: 'calc(1em + 2vw)', textAlign: 'center'}}>
                  M E S &nbsp; R E C H E R C H E S
              </span>
          </Col>
          
          <Col xs='2' lg='1' style={{display: 'flex', justifyContent:'flex-end', paddingRight: '5vh'}}>
            <img src={user} id="Popover1" style={{width: 'calc(1em + 2vw)'}} type="button" ></img>
              <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle} >
                {userBoard}
              </Popover>
          </Col>

        </Row>

        <Row style={descRow}>

          <Row style={styleRow1}>
            Voici vos dernieres recherches :
          </Row>

          <Row style={styleRow2}>

            <Row style={styleRowInside}>
              <Col xs='3' style={{display: 'flex', justifySelf: 'flex-start', alignSelf: 'flex-start', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                <span>Faite le : 08/11/2020.</span>
              </Col>
            </Row>
            <Row style={{display:'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
              <Col xs='11' style={{display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center',}}>
                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Filtres :</span>
                <Col xs='10' style={styleFiltres}>
                  <Col xs='12' lg='2'><Badge size='sm' style={styleButtons}>Appartement</Badge></Col>
                  <Col xs='12' lg='2'><Badge size='sm' style={styleButtons}>5 piéces</Badge></Col>
                  <Col xs='12' lg='2'><Badge size='sm' style={styleButtons}>2 chambres</Badge></Col> 
                  <Col xs='12' lg='2'><Badge size='sm' style={styleButtons}>Paris 17éme</Badge></Col>
                  <Col xs='12' lg='2'><Badge size='sm' style={styleButtons}>Budget Max: 700 000</Badge></Col>
                  <Col xs='12' lg='2'><Badge size='sm' style={styleButtons}>Garage</Badge></Col>
                </Col>
              </Col>
              <Col xs='1' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 0}}>
                <FontAwesomeIcon size='lg' icon={faTrash} style={{color: '#206A37'}} type='button'/>
              </Col>
            </Row>

            <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '15px'}}>
              <span type='button' style={{textDecoration: 'underline'}} >Utiliser ces filtres de recherche</span>
            </Row>

          </Row>


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
  display: 'flex',
  flexDirection: 'column',
  justifySelf: 'center',
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '16px',
  width: '70%'
}

var styleRow1 = {
  width: 'auto',
  backgroundColor: 'rgba(255,255,255, 0.7)',
  borderRadius: 10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '15px',
  fontSize: 'calc(0.6em + 0.6vw)'
}

var styleRow2 = {
  width: 'auto',
  backgroundColor: 'rgba(255,255,255, 0.7)',
  borderRadius: 10,
  padding: '15px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '15px'
}

var styleRowInside = {
  width: '100%',
}

var styleFiltres = {
  display: 'flex',
  justifyContent: 'center',
  justifySelf: 'center',
  alignSelf: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 5,
  borderRadius: 5
}

var styleButtons = {
  marginLeft: '5px',
  backgroundColor: '#206A37'
}




export default MesRecherches;
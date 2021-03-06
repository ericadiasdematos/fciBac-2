import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Popover, Input, PopoverBody, Button,  } from 'reactstrap';
import photo from './images/PageQuiSommesNous.png'
import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import user from './images/user.png'
import Footer from './Footer'
import {AnimatePresence, motion} from 'framer-motion'
import { FaUserCircle } from 'react-icons/fa';
import NavBar from "./NavBar"




function QuiSommesNous() {

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
                      <Button style={{width: '28vh', backgroundColor: '#206A37'}}><Link to='/creationdecompte' style={{color: 'white'}}>Cr??er un compte</Link></Button>
                  </PopoverBody>

  if(logInAccepted === true){
    userBoard = <PopoverBody style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <span style={{padding: '1vh', color: '#206A37', fontWeight: 'bold'}}>Bienvenue {userGenre} {usersName} !</span>
                    <Button size='sm' style={{width: '28vh', marginBottom: '1vh', backgroundColor: '#206A37'}}><Link to='/wishlist' style={{color: 'white'}}>Voir mes favoris</Link></Button>
                    <Button size='sm' style={{width: '28vh', marginBottom: '1vh', backgroundColor: '#206A37'}}><Link to='/mesrecherches' style={{color: 'white'}}>Voir mes dernieres recherches</Link></Button>
                    <Button size='sm' style={{width: '28vh', backgroundColor: '#206A37'}} onClick={()=>handleLogout()}>Se d??conecter</Button>
                </PopoverBody>
  }

  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{opacity: 0 }}
    >
      <Container style={BackgroundImage}>

        <NavBar pageName="Q U I &nbsp; S O M M E S &nbsp; N O U S" />


        <Row style={descRow}>

          <Col xs='11' lg='6' style={col1}>
            <h2 style={titleStyle}>Agence Immobiliere FCI</h2>
            <span style={span1Style}>F.C.I  Fran??oise Combes Immobilier est une histoire de famille depuis plus de 25 ans.
                  Notre r??putation depuis 1995 est l???assurance de la r??ussite de vos projets immobiliers qu???il soit personnel ou d???investissements. 
                  Tout d???abord implant??s ?? Houdan 78, nous avons ??largi notre cercle d???action ?? Paris et petite couronne, 78, 28,27. 
                  Les membres de notre ??quipe commerciale sont chez F.C.I depuis de nombreuses ann??es. Cette stabilit?? est rassurante.
                  Nous avons d??velopp?? le Syndic d???Immeuble et la gestion locative dans la m??me perspective.
                  Notre r??ussite est la preuve de notre professionnalisme et s??rieux. 3 axes dirigent notre travail :
                  
                  
            </span>
            <span style={span2Style}>
              <ul>
                <li>Efficacit??</li>
                <li>Rapidit??</li>
                <li>Savoir-faire</li>
              </ul>
            </span>
            <span style={span3Style}>
              Ces trois points permettent un bon suivi de votre dossier et un v??ritable accompagnement.
              Pour la transaction immobili??re nos estimations sont justes, suivants des crit??res pr??cis, nos visites sont toujours cibl??es et qualifi??es.
              Pour le syndic notre disponibilit?? et notre professionnalisme encadrent le quotidien de votre copropri??t??. 
              Pour la gestion locative, oubliez-le suivi qui vous cause des soucis. Nous prenons tout en charge.
            </span>

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
}

var col1 = {
  display: 'flex', 
  justifySelf: 'center', 
  alignSelf: 'center', 
  flexDirection: 'column', 
  backgroundColor: 'rgba(255,255,255, 0.9)', 
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

export default QuiSommesNous;
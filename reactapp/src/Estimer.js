import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Popover, Input, PopoverBody, Button  } from 'reactstrap';
import photo from './images/EstimerMonBienFonds.png'
import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import user from './images/user.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { Divider } from 'antd';
import {connect} from 'react-redux';
import emailjs from 'emailjs-com';
import Footer from './Footer'
import { motion } from 'framer-motion'
import { FaUserCircle } from 'react-icons/fa';
import NavBar from "./NavBar"







function Estimer(props) {

  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const [logInMessage, setLogInMessage] = useState([])

  const [logInAccepted, setLogInAccepted] = useState(false)

  const [userGenre, setUserGenre] = useState('')
  const [usersName, setUsersName] = useState('')

  const [nomClient, setNomClient] = useState('')
  const [prenomClient, setPrenomClient] = useState('')
  const [telClient, setTelClient] = useState('')
  const [emailClient, setEmailClient] = useState('')
  const [messageResult, setMessageResult] = useState('')
  
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
                      <Button size='sm' style={{width: '28vh', marginBottom: '1vh', backgroundColor: '#206A37'}}>Voir mes dernieres recherches</Button>
                      <Button size='sm' style={{width: '28vh', backgroundColor: '#206A37'}} onClick={()=>handleLogout()}>Se déconecter</Button>
                  </PopoverBody>
    }


    const sendEmail=()=> {
      
      emailjs.send('service_k47enb9', 'template_3zyynoq', {raison_message: props.reasonToDisplay, nom_client: nomClient, premon_client: prenomClient, tel_client: telClient, email_client: emailClient}, 'user_TImKxpycj1WcmG7hCooDa')
        .then((result) => {
            console.log(result.text);
            setMessageResult(result.text)
        }, (error) => {
            console.log(error.text);
        });
    }


  var infoShown = 
      <span style={{width: '100%'}}>
        <Row>
          <Col xs='12' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
            <span style={spanContactezNous}>LAISSEZ-NOUS VOS COORDONNEES</span>
          </Col>
        </Row>
        
        <Divider style={{width: '100%', backgroundColor: '#206A37', height: '0.7px', margin: 2}} />

        <Row style={raisonStyle}>
          <Col xs='12' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            Vous serez contacté sous 24 heures.
          </Col>
        </Row>


        <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', marginTop: '15px'}}>
          <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
            <span style={{color: '#206A37',}}>Nom :</span>
            <Input size='sm' onChange={(e)=>setNomClient(e.target.value)}/>
          </Col>
          <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
            <span style={{color: '#206A37',}}>Email :</span>
            <Input size='sm' onChange={(e)=>setEmailClient(e.target.value)}/>
          </Col>
        </Row>

        <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
          <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
            <span style={{color: '#206A37',}}>Prénom :</span>
            <Input size='sm' onChange={(e)=>setPrenomClient(e.target.value)}></Input>
          </Col>
          <Col xs='12' lg='4'  style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
            <span style={{color: '#206A37',}}>Téléphone :</span>
            <Input size='sm' onChange={(e)=>setTelClient(e.target.value)}></Input>
          </Col>
        </Row>

        <Row style={raisonStyle}>
          <Col xs='12' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              Raison : {props.reasonToDisplay}
          </Col>
        </Row>

        <Row style={{width: '100%', marginTop:'1vw', marginBottom: '1vw'}}>
          <Col xs='12' lg='1' lg={{offset: 4}} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Button size="sm" style={{backgroundColor: '#206A37'}} onClick={sendEmail}>Confirmer</Button>
          </Col>
        </Row>

      </span>

if(messageResult === 'OK'){

  infoShown = <span style={{fontSize: 25, color: '#206A37', textAlign: 'center', padding: 10}}>Votre demande a été envoyé! Nous vous répondrons dans les plus brefs délais.</span>
}

  return (
<motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{opacity: 0 }}
>

      <Container style={BackgroundImage}>

        <NavBar pageName="C O N T A C T" />


        <Row style={firstRow}>
          {infoShown}
        </Row>

      </Container>

      <Footer/>

</motion.div>
  );
}

function mapStateToProps(state){
  return {reasonToDisplay: state.reason, tokenToDisplay: state.token}
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
  padding: 0,
  border: 0
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

var raisonStyle = {
  display: 'flex',
  justifySelf: 'center',
  alignSelf: 'center',
  color: '#206A37',
  fontSize: 'calc(0.8em + 0.3vw)',
  marginBottom: '5px',
  width: '100%',
  marginTop: '15px'
}



export default connect(
  mapStateToProps,
  null
)(Estimer)
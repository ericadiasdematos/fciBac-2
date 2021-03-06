import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Popover, Input, PopoverBody, Button  } from 'reactstrap';
import photo from './images/NosAgencesFonds.png'
import { Link } from 'react-router-dom';
import logo from './images/logo.png'
import user from './images/user.png'
import agenceParis from './images/AgenceParis.jpg'
import agenceMaule from './images/AgenceMaule.jpg'
import agenceHoudan from './images/AgenceHoudan.jpg'
import agenceSyndic from './images/AgenceSyndic.jpg'
import Footer from './Footer'
import { motion } from 'framer-motion'
import { FaUserCircle } from 'react-icons/fa';
import NavBar from "./NavBar"




function NosAgences() {

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

        <NavBar pageName="N O S &nbsp; A G E N C E S" />


        <Row style={agenceRow}>
          <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column', marginTop: '1%', marginBottom: '1%'}}>
            <img src={agenceParis} style={{width: '100%', height: '100%'}} fluid />
          </Col>
          <Col xs='12' lg='7' style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column'}}>
            <span style={{fontSize:'calc(1em + 0.5vw)'}}>FCI Paris</span>
            <span style={{fontSize: 'calc(0.7em + 0.2vw)', textAlign: 'justify'}}>L'avantage d'une agence de quartier est sa r??putation. Notre ??quipe vous attend et vous accompagnera dans vos projets. Sp??cialistes du 16 eme nous vous offrons des appartements calme et lumineux. Vastes, ou petits, pour tous les budgets!</span>
          </Col>
          <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column', marginBottom: '1%', marginTop: '1%'}}>
            <span style={contactInfo}>
              <span>T??l. : 01.40.50.20.20</span>
              <span>53 avenue Mozart</span>
              <span>75016 PARIS</span>
            </span>
          </Col>
        </Row>

        <Row style={agenceRow}>
          <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column', marginTop: '1%', marginBottom: '1%'}}>
            <img src={agenceHoudan} style={{width: '100%', height: '100%'}} fluid />
          </Col>
          <Col xs='12' lg='7' style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column'}}>
            <span style={{fontSize:'calc(1em + 0.5vw)'}}>FCI Houdan</span>
            <span style={{fontSize: 'calc(0.7em + 0.2vw)', textAlign: 'justify'}}>Christelle MENELEC, Fran??ois CHOQUET et Fran??oise GARDENT DELAMARRE ont le plaisir de vous accueillir dans notre agence de Houdan, bourgade vivante et commer??ante. La gare SNCF ?? pied du village permet un acc??s vers Paris rapidement. Nous offrons un choix de 150 maisons anciennes, de charme, traditionnelles ou contemporaine, du centre bourg ?? la p??riph??rie ou campagne. Nombreuses ventes de maisons, propri??t??s, domaines.</span>
          </Col>
          <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column', marginBottom: '1%', marginTop: '1%'}}>
            <span style={contactInfo}>
              <span>T??l. : 01.78.90.51.51</span>
              <span>17 Grande rue</span>
              <span>78550 HOUDAN</span>
            </span>
          </Col>
        </Row>

        <Row style={agenceRow}>
          <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column', marginTop: '1%', marginBottom: '1%'}}>
            <img src={agenceMaule} style={{width: '100%', height: '100%'}} fluid />
          </Col>
          <Col xs='12' lg='7' style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column'}}>
            <span style={{fontSize:'calc(1em + 0.5vw)'}}>FCI Maule</span>
            <span style={{fontSize: 'calc(0.7em + 0.2vw)', textAlign: 'justify'}}>Aurore LEFEBVRE et V??ronique MONTEIRO ont le plaisir de vous accueillir dans notre agence de Maule appr??ci??e car proche de Paris et de La D??fense, gare Sncf, commerces, ??coles ?? pieds! L???acc??s A13 est imm??diat. Vous trouverez votre maison individuelle: vous voulez une chambre en rez de jardin? Familiale? Vous aimez les ambiances contemporaines ou le cachet de l'ancien? Nous avons tout pour vous!</span>
          </Col>
          <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column', marginBottom: '1%', marginTop: '1%'}}>
            <span style={contactInfo}>
              <span>T??l. : 01.34.75.08.08</span>
              <span>2 place de la mairie</span>
              <span>78580 MAULE</span>
            </span>
          </Col>
        </Row>

        <Row style={agenceRow}>
          <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column', marginTop: '1%', marginBottom: '1%'}}>
            <img src={agenceSyndic} style={{width: '100%', height: '100%'}} fluid />
          </Col>
          <Col xs='12' lg='7' style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column'}}>
            <span style={{fontSize:'calc(1em + 0.5vw)'}}>FCI Syndic</span>
            <span style={{fontSize: 'calc(0.7em + 0.2vw)', textAlign: 'justify'}}>FCI Syndic est n?? de l'attente et de la demande des clients, apr??s avoir constat?? le besoin d'efficacit?? dans la gestion des co??ts, l'acc??s simplifi?? aux documents, comptes et op??rations, la rapidit?? de r??ponse des interlocuteurs d??di??s, et la proximit?? et l'??coute de l'??quipe.</span>
          </Col>
          <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column', marginBottom: '1%', marginTop: '1%'}}>
            <span style={contactInfo}>
              <span>T??l. : 01.86.22.96.96</span>
              <span>53 avenue Mozart</span>
              <span>75016 PARIS</span>
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
  height:'100%',
  backgroundImage: `url(${photo})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'repeat-y',
  backgroundSize: 'cover',
  maxWidth: '100%',
  paddingBottom: 10
}

var navBarRow ={
  backgroundColor: 'rgba(255,255,255, 0.9)',
  height: 'auto',
  diplay: 'flex',
  flexDirection: 'row',
  justifySelf: 'flex-start',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1vw',

}


var contactInfo = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  justifySelf: 'center',
  alignSelf: 'center',
  flexDirection:'column',
  border: '2px solid #206A37',
  borderRadius: 10,
  padding: 0,
  fontSize: '0.8em',
  paddingLeft: 'calc(1em + 1vw)',
  paddingRight: 'calc(1em + 1vw)',
  paddingTop: 'calc(0.6em + 0.3vw)',
  paddingBottom: 'calc(0.6em + 0.3vw)'
 
  
}

var agenceRow = {
  backgroundColor: 'rgba(255,255,255, 0.9)',  
  borderRadius: 10, 
  width: '85%', 
  justifySelf: 'center', 
  alignSelf: 'center', 
  justifyContent:'space-between', 
  alignItems: 'center', 
  marginTop: '1%'}

export default NosAgences;
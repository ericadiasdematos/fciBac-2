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
              <span style={{color: '#206A37', fontSize: 'calc(1em + 1.5vw)'}}>
                <span>N O S &nbsp; A G E N C E S </span>   
              </span>
          </Col>

          <Col xs='2' lg='1' style={{display: 'flex', justifyContent:'flex-end', paddingRight: '5vh'}}>
            <img src={user} id="Popover1" style={{width: 'calc(1em + 2vw)'}} type="button" ></img>
              <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle} >
                {userBoard}
              </Popover>
          </Col>

        </Row>

        <Row style={agenceRow}>
          <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column', marginTop: '1%', marginBottom: '1%'}}>
            <img src={agenceParis} style={{width: 'calc(1em + 9vw)', height: 'calc(1em + 10vw)'}} fluid />
          </Col>
          <Col xs='12' lg='7' style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column'}}>
            <span style={{fontSize:'calc(1em + 0.5vw)'}}>FCI Paris</span>
            <span style={{fontSize: 'calc(0.7em + 0.2vw)', textAlign: 'justify'}}>L'avantage d'une agence de quartier est sa réputation. Notre équipe vous attend et vous accompagnera dans vos projets. Spécialistes du 16 eme nous vous offrons des appartements calme et lumineux. Vastes, ou petits, pour tous les budgets!</span>
          </Col>
          <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column', marginBottom: '1%', marginTop: '1%'}}>
            <span style={contactInfo}>
              <span>Tél. : 01.40.50.20.20</span>
              <span>53 avenue Mozart</span>
              <span>75016 PARIS</span>
            </span>
            <Button style={{marginTop: '0.5em', backgroundColor: '#206A37', width: 'auto', fontSize: '0.8em',}}>VOIR LES ANNOUNCES</Button>
          </Col>
        </Row>

        <Row style={agenceRow}>
          <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column', marginTop: '1%', marginBottom: '1%'}}>
            <img src={agenceHoudan} style={{width: 'calc(1em + 9vw)', height: 'calc(1em + 10vw)'}} fluid />
          </Col>
          <Col xs='12' lg='7' style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column'}}>
            <span style={{fontSize:'calc(1em + 0.5vw)'}}>FCI Houdan</span>
            <span style={{fontSize: 'calc(0.7em + 0.2vw)', textAlign: 'justify'}}>Christelle MENELEC, François CHOQUET et Françoise GARDENT DELAMARRE ont le plaisir de vous accueillir dans notre agence de Houdan, bourgade vivante et commerçante. La gare SNCF à pied du village permet un accès vers Paris rapidement. Nous offrons un choix de 150 maisons anciennes, de charme, traditionnelles ou contemporaine, du centre bourg à la périphérie ou campagne. Nombreuses ventes de maisons, propriétés, domaines.</span>
          </Col>
          <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column', marginBottom: '1%', marginTop: '1%'}}>
            <span style={contactInfo}>
              <span>Tél. : 01.78.90.51.51</span>
              <span>17 Grande rue</span>
              <span>78550 HOUDAN</span>
            </span>
            <Button style={{marginTop: '0.5em', backgroundColor: '#206A37', width: 'auto', fontSize: '0.8em',}}>VOIR LES ANNOUNCES</Button>
          </Col>
        </Row>

        <Row style={agenceRow}>
          <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column', marginTop: '1%', marginBottom: '1%'}}>
            <img src={agenceMaule} style={{width: 'calc(1em + 9vw)', height: 'calc(1em + 10vw)'}} fluid />
          </Col>
          <Col xs='12' lg='7' style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column'}}>
            <span style={{fontSize:'calc(1em + 0.5vw)'}}>FCI Maule</span>
            <span style={{fontSize: 'calc(0.7em + 0.2vw)', textAlign: 'justify'}}>Aurore LEFEBVRE et Véronique MONTEIRO ont le plaisir de vous accueillir dans notre agence de Maule appréciée car proche de Paris et de La Défense, gare Sncf, commerces, écoles à pieds! L’accès A13 est immédiat. Vous trouverez votre maison individuelle: vous voulez une chambre en rez de jardin? Familiale? Vous aimez les ambiances contemporaines ou le cachet de l'ancien? Nous avons tout pour vous!</span>
          </Col>
          <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column', marginBottom: '1%', marginTop: '1%'}}>
            <span style={contactInfo}>
              <span>Tél. : 01.34.75.08.08</span>
              <span>2 place de la mairie</span>
              <span>78580 MAULE</span>
            </span>
            <Button style={{marginTop: '0.5em', backgroundColor: '#206A37', width: 'auto', fontSize: '0.8em',}}>VOIR LES ANNOUNCES</Button>
          </Col>
        </Row>

        <Row style={agenceRow}>
          <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column', marginTop: '1%', marginBottom: '1%'}}>
            <img src={agenceSyndic} style={{width: 'calc(1em + 9vw)', height: 'calc(1em + 10vw)'}} fluid />
          </Col>
          <Col xs='12' lg='7' style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column'}}>
            <span style={{fontSize:'calc(1em + 0.5vw)'}}>FCI Syndic</span>
            <span style={{fontSize: 'calc(0.7em + 0.2vw)', textAlign: 'justify'}}>FCI Syndic est né de l'attente et de la demande des clients, après avoir constaté le besoin d'efficacité dans la gestion des coûts, l'accès simplifié aux documents, comptes et opérations, la rapidité de réponse des interlocuteurs dédiés, et la proximité et l'écoute de l'équipe.</span>
          </Col>
          <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column', marginBottom: '1%', marginTop: '1%'}}>
            <span style={contactInfo}>
              <span>Tél. : 01.86.22.96.96</span>
              <span>53 avenue Mozart</span>
              <span>75016 PARIS</span>
            </span>
            <Button style={{marginTop: '0.5em', backgroundColor: '#206A37', width: 'auto', fontSize: '0.8em',}}><Link to='/syndic' style={{color: 'white'}}>VOIR SERVICES</Link></Button>
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
  backgroundColor: 'rgba(255,255,255, 0.7)',  
  borderRadius: 10, 
  width: '85%', 
  justifySelf: 'center', 
  alignSelf: 'center', 
  justifyContent:'space-between', 
  alignItems: 'center', 
  marginTop: '1%'}

export default NosAgences;
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Col, Popover, Input, PopoverBody, Button,  } from 'reactstrap';
import photo from './images/PageSyndic.png'
import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import user from './images/user.png'
import Img1 from './images/SyndicCaroussel1.png'
import Img2 from './images/SyndicCaroussel2.png'
import Img3 from './images/SyndicCaroussel3.png'
import Img4 from './images/SyndicCaroussel4.png'
import Img5 from './images/SyndicCaroussel5.png'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {connect} from 'react-redux'
import Footer from './Footer'
import Car from './car'
import { UncontrolledCarousel } from 'reactstrap';
import { motion } from 'framer-motion'


function Syndic(props) {

    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;
  
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


    const items = [
      {
        src: "https://i.imgur.com/b3xdn1x.jpg"
      },
      {
        src: "https://i.imgur.com/b3xdn1x.jpg"
      },
      {
        src: "https://i.imgur.com/b3xdn1x.jpg"
      },
      {
        src: "https://i.imgur.com/b3xdn1x.jpg"
      },
      {
        src: "https://i.imgur.com/b3xdn1x.jpg"
      }
    ]
   
    
  
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
                    F C I &nbsp; S Y N D I C
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

              <Col xs='12' lg='6' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', }}>

                <UncontrolledCarousel items={items} />

              </Col>
    
          </Row>

          <Row style={{display:'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: 'calc(1em + 3vw)'}}>
              <Col xs='12' lg='6' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0}}>
                  <Button style={{width: '100%', backgroundColor: '#206A37'}}><Link to='/estimer' style={{color: 'white'}} onClick={()=>props.onContactClick('Je veux changer de Syndic.')}>Demander un devis</Link></Button>
              </Col>
          </Row>

        </Container>
        <Footer/>

</motion.div>
    );


  }


  function mapDispatchToProps(dispatch) {
    return {
        onContactClick: function(reason) {
            dispatch( {type: 'addReason', whatReason: reason})
        }
    }
}
  var carouselImages = {
      width: 'auto',
      display: 'flex',
      justifySelf: 'center',
      justifyItems: 'center',
      alignSelf: 'center', 
      alignItems: 'center'
  }
  
  var BackgroundImage = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    height:'auto',
    backgroundImage: `url(${photo})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat-y',
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
    justifySelf: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'calc(1em + 3vw)',
    marginBottom: 'calc(1em + 1vw)',
    width: '100%'
  }
  


export default connect (
    null,
    mapDispatchToProps
) (Syndic);
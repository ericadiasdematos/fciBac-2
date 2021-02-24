import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import photo from './images/HomePageFond.png'
import photo2 from './images/testBackgrund.jpg'
import { Container, Row, Col, Input,Popover, PopoverHeader, PopoverBody, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import user from './images/user.png'
import {connect} from 'react-redux'
import { Media } from 'reactstrap';
import Footer from './Footer'
import Car from './car'
import { FaRegUserCircle } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import { motion } from 'framer-motion'








function HomePage(props) {

   
    

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const [logInMessage, setLogInMessage] = useState([])

    const [logInAccepted, setLogInAccepted] = useState(false)

    const [userGenre, setUserGenre] = useState('')
    const [usersName, setUsersName] = useState('')
    const [userIconState, setUserIconState] = useState(false)
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
    
function changeWeight(e) {
    e.target.style.fontWeight = 'bolder';
}

function changeBackWeight(e) {
    e.target.style.fontWeight = 'normal';
}
function changeIcon() {
    setUserIconState(true)
    
}

function changeBackIcon() {
    setUserIconState(false)
}

const [popoverOpen, setPopoverOpen] = useState(false);

const toggle = () => setPopoverOpen(!popoverOpen);




    return(

<motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{opacity: 0 }}
>

    <Container style={BackgroundImage1}>
            
        <Row style={navBarRow}>

            <Col xs='12' lg='2' style={{paddingLeft: '0.6vh', display: 'flex', justifyContent: 'center'}}>
                <img src={logo} alt='logo' style={{width: 'calc(1em + 9vw)'}}/>
            </Col>
            <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center'}}>
                <span style={{color: '#206A37', fontSize: 'calc(1em + 0.5vw)'}}>
                    <Link to='/quisommesnous' style={{color: '#206A37'}} onMouseOver={changeWeight} onMouseOut={changeBackWeight}>QUI SOMMES NOUS</Link>
                </span>
            </Col>
            <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center'}}>
                <span style={{color: '#206A37', fontSize: 'calc(1em + 0.5vw)'}}>
                    <Link to='/nosagences' style={{color: '#206A37'}} onMouseOver={changeWeight} onMouseOut={changeBackWeight}>NOS AGENCES</Link>
                </span>
            </Col>
            <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center'}}>
                <span style={{color: '#206A37', fontSize: 'calc(1em + 0.5vw)'}}>
                    <Link to='/outils' style={{color: '#206A37'}} onMouseOver={changeWeight} onMouseOut={changeBackWeight}>OUTILS</Link>
                </span>
            </Col>
            <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center'}}>
                <span style={{color: '#206A37', fontSize: 'calc(1em + 0.5vw)'}}>
                    <Link to='/contact' style={{color: '#206A37'}} onMouseOver={changeWeight} onMouseOut={changeBackWeight}>CONTACT</Link>
                </span>
            </Col>
            <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center', fontSize: '1vw'}}>
                <img src={user} id="Popover1" style={{width: 'calc(1em + 2vw)'}} type="button" ></img>
                {/* { userIconState?
                    <FaUserCircle id="Popover1" type="button" onMouseOver={changeIcon} onMouseOut={changeBackIcon} size='2x' style={{width: '40px', color: '#206A37'}} type="button"/>:
                    <FaRegUserCircle  type="button" onMouseOver={changeIcon} onMouseOut={changeBackIcon} size='2x' style={{width: '40px', color: '#206A37'}} type="button"/>

                } */}
                <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle} >
                    {userBoard}
                </Popover>
            </Col>
        </Row>
        

        <Row style={nameWhiteBlock}>
            <Col xs='12' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <h1 style={{color: '#206A37', fontSize: 'calc(1em + 2vw)', fontWeight: 'bold'}}>Agence Immobiliere FCI</h1>
                <h5 style={{color: '#206A37', fontSize: 'calc(1em + 0.5vw)'}}>Françoise Combes Immobilier</h5>
            </Col>
        </Row>

        <Row style={{marginTop: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
            <Row  style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                <Col xs='hidden' lg='6' style={{backgroundColor: 'white', opacity: '80%', borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0.5vw',fontSize: 15, color: '#206A37', fontWeight: 'bold'}}>
                    <Col xs='4' lg='4' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <span>GESTION LOCATIVE</span>
                    </Col>
                    <Col xs='4' lg='4' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <span>TRANSACTION</span>
                    </Col>
                    <Col xs='4' lg='4' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <span>SYNDIC</span>
                    </Col>
                </Col>
            </Row>
            <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%'}}>
                <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <span style={littlewhiteboxes}>
                        <span>
                            <Link to='/estimer' onMouseOver={changeWeight} onMouseOut={changeBackWeight} style={{color: '#206A37'}} onClick={()=>props.onContactClick('Je veux mettre mon bien en location.')}>Mettre en Location</Link>
                        </span>
                    </span>
                    <span style={littlewhiteboxes}>
                        <span>
                            <Link to='/recherche' onMouseOver={changeWeight} onMouseOut={changeBackWeight} style={{color: '#206A37'}}>Louer un bien</Link>
                        </span>
                    </span>
                </Col>
                <Col  xs='12' lg='2' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <span style={littlewhiteboxes}>
                        <span>
                            <Link to='/recherche' onMouseOver={changeWeight} onMouseOut={changeBackWeight} style={{color: '#206A37'}}>Acheter</Link>
                        </span>
                    </span>
                    <span style={littlewhiteboxes}>
                        <span>
                            <Link to='/estimer' onMouseOver={changeWeight} onMouseOut={changeBackWeight} style={{color: '#206A37'}} onClick={()=>props.onContactClick('Je veux vendre mon bien.')}>Vendre mon bien</Link>
                        </span>
                    </span>
                    <span style={littlewhiteboxes}>
                        <span>
                            <Link to='/estimer' onMouseOver={changeWeight} onMouseOut={changeBackWeight} style={{color: '#206A37'}} onClick={()=>props.onContactClick('Je veux estimer mon bien.')}>Estimer mon bien</Link>
                        </span>
                    </span>
                    <span style={littlewhiteboxes}>
                        <span>
                            <Link to='/recherche' onMouseOver={changeWeight} onMouseOut={changeBackWeight} style={{color: '#206A37'}}>Viager</Link>
                        </span>
                    </span>
                </Col>
                <Col  xs='12' lg='2' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <span style={littlewhiteboxes}>
                        <span>
                            <Link to='/syndic' onMouseOver={changeWeight} onMouseOut={changeBackWeight} style={{color: '#206A37'}} onClick={()=>props.onContactClick('Je veux changer de Syndic.')}>Changer de Syndic</Link>
                        </span>
                    </span>
                </Col>

            </Row>


        </Row>

        <Row style={barContacts}>


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

        <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '60%', justifySelf: 'center', alignSelf: 'center', marginTop: '20px', marginBottom: '20px'}}>
            <Car/>
        </Row>

        
        
    </Container>

    <Footer/>


</motion.div>
    )
}



function mapDispatchToProps(dispatch) {
    return {
        onContactClick: function(reason) {
            dispatch( {type: 'addReason', whatReason: reason})
        }
    }
}

var iconsStyle = {
    margin: 7
}

var footerStyle = {
    backgroundColor: 'rgb(32, 106, 55)',
    width: '100%',
    margin: 0,
    padding: 10
}


var BackgroundImage1 = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    height:'auto',
    backgroundImage: `url(${photo})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat-y',
    backgroundSize: 'cover',
    maxWidth: '100%',
    fontFamily: 'roboto, sans-serif',
    fontStyle: 'normal', 
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
    padding: '1vw',
    marginTop: 60
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



var BackgroundImage2 = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    height:'auto',
    backgroundImage: `url(${photo2})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat-y',
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


export default connect (
    null,
    mapDispatchToProps
) (HomePage);


{/* <Row onClick={toggle2} type="button" style={{justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', backgroundColor: 'rgba(255,255,255, 0.7)', width: '70%', borderRadius: 10, marginBottom: 10, marginTop: 30}}>
<Col xs='10' lg='3' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <img src={photo2} style={{width: 'inherit', height: 'inherit'}} fluid />
</Col>
<Col xs='10' lg='8'  style={{display: 'flex', justifySelf: 'center', alignSelf: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
    <span style={{fontSize: 'calc(1em + 0.5vw)'}}>Title of the news!</span>
    <span style={{textAlign: 'justify', fontSize: 'calc(0.5em + 0.2vw)'}}>Lorem ipsum quis non adipiscing id arcu porta nisl, consectetur non class suscipit et in fusce risus aenean, cras scelerisque ultricies purus eget nulla nisl. tristique euismod eget orci tincidunt non porttitor cras vestibulum porttitor hac blandittristique euismod eget orci tincidunt non porttitor cras vestibulum porttitor hac blandit</span>
</Col>
</Row>
<Modal isOpen={modal} toggle={toggle2} className={className} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
<ModalHeader toggle={toggle2}>Title of the news!</ModalHeader>
<ModalBody>
    <img src={photo2} style={{width: '100%'}}/>
    <snap>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</snap>
</ModalBody>
</Modal>

<Row style={{justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', backgroundColor: 'rgba(255,255,255, 0.7)', width: '70%', borderRadius: 10, marginBottom: 10, marginTop: 30}}>
<Col xs='10' lg='3' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <img src={photo2} style={{width: 'inherit', height: 'inherit'}} fluid />
</Col>
<Col xs='10' lg='8'  style={{display: 'flex', justifySelf: 'center', alignSelf: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
    <span style={{fontSize: 'calc(1em + 0.5vw)'}}>Title of the news!</span>
    <span style={{textAlign: 'justify', fontSize: 'calc(0.5em + 0.2vw)'}}>Lorem ipsum quis non adipiscing id arcu porta nisl, consectetur non class suscipit et in fusce risus aenean, cras scelerisque ultricies purus eget nulla nisl. tristique euismod eget orci tincidunt non porttitor cras vestibulum porttitor hac blandittristique euismod eget orci tincidunt non porttitor cras vestibulum porttitor hac blandit</span>
</Col>
</Row>

<Row style={{justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', backgroundColor: 'rgba(255,255,255, 0.7)', width: '70%', borderRadius: 10, marginBottom: 10, marginTop: 30}}>
<Col xs='10' lg='3' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <img src={photo2} style={{width: 'inherit', height: 'inherit'}} fluid />
</Col>
<Col xs='10' lg='8'  style={{display: 'flex', justifySelf: 'center', alignSelf: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
    <span style={{fontSize: 'calc(1em + 0.5vw)'}}>Title of the news!</span>
    <span style={{textAlign: 'justify', fontSize: 'calc(0.5em + 0.2vw)'}}>Lorem ipsum quis non adipiscing id arcu porta nisl, consectetur non class suscipit et in fusce risus aenean, cras scelerisque ultricies purus eget nulla nisl. tristique euismod eget orci tincidunt non porttitor cras vestibulum porttitor hac blandittristique euismod eget orci tincidunt non porttitor cras vestibulum porttitor hac blandit</span>
</Col>
</Row> */}
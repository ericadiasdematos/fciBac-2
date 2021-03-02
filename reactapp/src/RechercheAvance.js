import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Popover, Input, PopoverBody, Label, Button, ButtonGroup  } from 'reactstrap';
import photo from './images/PageRecherche2.png'
import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import user from './images/user.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { Divider } from 'antd';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPencilRuler} from '@fortawesome/free-solid-svg-icons'
import Appartement from './images/AppIcon.png'
import House from './images/maisonIcon.png'
import Loft from './images/loft.png'
import Hotel from './images/hotelIcon.png'
import Bureau from './images/oficceIcon.png'
import Parking from './images/garageIcon.png'
import Immeuble from './images/ImmeubleIcon.png'
import Terrain from './images/terrainIcon.png'
import Footer from './Footer'
import { motion } from 'framer-motion'
import { FaUserCircle } from 'react-icons/fa';






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

  const [clickApp, setClickApp] = useState(false)
  const [clickMaison, setClickMaison] = useState(false)
  const [clickLoft, setClickLoft] = useState(false)
  const [clickHotel, setClickHotel] = useState(false)
  const [clickBureau, setClickBureau] = useState(false)
  const [clickParking, setClickParking] = useState(false)
  const [clickImmeuble, setClickImmeuble] = useState(false)
  const [clickTerrain, setClickTerrain] = useState(false)

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
                  R E C H E R C H E &nbsp; A V A N C É
              </span>
          </Col>

          <Col xs='2' lg='1' style={{display: 'flex', justifyContent:'flex-end', paddingRight: '5vh'}}>
            <Button style={{backgroundColor: 'white', border: 'white', borderRadius: 100}}><FaUserCircle id="Popover1" size='2x' style={{width: '40px', color: '#206A37'}}/></Button>
              <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle} >
                  {userBoard}
              </Popover>
          </Col>

        </Row>

        <Row style={firstRow}>

        
          <Row>
            <Col xs='12' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
              <span style={spanContactezNous}>Type de bien:</span>
            </Col>
          </Row>
          
          <Divider style={{width: '100%', backgroundColor: '#206A37', height: '0.7px'}} />


          <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', marginTop: '15px', marginBottom: '15px'}}>

            <Col xs='12' lg='1'style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', margin: '15px',textAlign: 'center', fontSize: 'calc(0.5em + 0.3vw)'}}>
              <img src={Appartement}  style={iconsStyle}/>
              <Label check style={radioButtonsStyle}>
                <Input type="checkbox" name="Appartement" />
                Appartement
              </Label>
            </Col>
            <Col xs='12' lg='1'  style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', margin: '15px',textAlign: 'center', fontSize: 'calc(0.5em + 0.3vw)'}}>
              <img src={House}  style={iconsStyle}/>
              <Label check style={radioButtonsStyle}>
                <Input type="checkbox" name="Appartement" />
                Maison
              </Label>
            </Col>
            <Col xs='12' lg='1'   style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', margin: '15px',textAlign: 'center', fontSize: 'calc(0.5em + 0.3vw)'}}>
              <img src={Loft}  style={iconsStyle}/>
              <Label check style={radioButtonsStyle}>
                <Input type="checkbox" name="Appartement" />
                Loft
              </Label>
            </Col>
            <Col xs='12' lg='1'  style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', margin: '15px',textAlign: 'center', fontSize: 'calc(0.5em + 0.3vw)'}}>
              <img src={Hotel}  style={iconsStyle}/>
              <Label check style={radioButtonsStyle}>
                <Input type="checkbox" name="Appartement" />
                Hôtel particulier
              </Label>
            </Col>
            <Col xs='12' lg='1'  style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', margin: '15px',textAlign: 'center', fontSize: 'calc(0.5em + 0.3vw)'}}>
              <img src={Bureau}  style={iconsStyle}/>
              <Label check style={radioButtonsStyle}>
                <Input type="checkbox" name="Appartement" />
                Bureau
              </Label>
            </Col>
            <Col xs='12' lg='1'   style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', margin: '15px',textAlign: 'center', fontSize: 'calc(0.5em + 0.3vw)'}}>
              <img src={Parking}  style={iconsStyle}/>
              <Label check style={radioButtonsStyle}>
                <Input type="checkbox" name="Appartement" />
                Parking
              </Label>
            </Col>
            <Col xs='12' lg='1'   style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', margin: '15px',textAlign: 'center', fontSize: 'calc(0.5em + 0.3vw)'}}>
              <img src={Immeuble}  style={iconsStyle}/>
              <Label check style={radioButtonsStyle}>
                <Input type="checkbox" name="Appartement" />
                Immeuble
              </Label>
            </Col>
            <Col xs='12' lg='1'  style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', margin: '15px',textAlign: 'center', fontSize: 'calc(0.5em + 0.3vw)'}}>
              <img src={Terrain}  style={iconsStyle}/>
              <Label check style={radioButtonsStyle}>
                <Input type="checkbox" name="Appartement" />
                Terrain
              </Label>
            </Col>

          </Row>

        </Row>

        <Row style={firstRow}>

          <Row>
            <Col xs='12' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
              <span style={spanContactezNous}>A quelle endroit ?</span>
            </Col>
          </Row>
          
          <Divider style={{width: '100%', backgroundColor: '#206A37', height: '0.7px'}} />

          <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', marginTop: '15px', marginBottom: '15px'}}>
            
            <Col xs='12' lg='6' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
              <Input placeholder='Ville? Quartier?'/>
            </Col>
            <Col xs='12' lg='6' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
              <Button size='sm' style={{backgroundColor:'#206A37', color:'white', width: '100%'}}><FontAwesomeIcon icon={faPencilRuler} style={{color: 'white', margin: '2px'}}/>En dessinant sur la map</Button>
            </Col>
            
          </Row>

          
        </Row>


        <Row style={firstRow}>

          <Row>
            <Col xs='12' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
              <span style={spanContactezNous}>Pour quelle budget ?</span>
            </Col>
          </Row>
          
          <Divider style={{width: '100%', backgroundColor: '#206A37', height: '0.7px'}} />

          <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', marginTop: '15px', marginBottom: '15px'}}>
            
            <Col xs='12' lg='6' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
              <Input placeholder='Min'/>
            </Col>
            <Col xs='12' lg='6' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
              <Input placeholder='Max'></Input>
            </Col>
            
          </Row>

          
        </Row>

        <Row style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',width: '60%'}}>

          <Col xs='12' lg='6' style={{display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center',backgroundColor: 'rgba(255,255,255, 0.7)',justifySelf: 'center',alignSelf: 'center',marginTop: 'calc(1em + 1vw)',borderRadius: '10px',border: 0}}>

            <Row>
              <Col xs='12' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
                <span style={spanContactezNous}>Quelle surface habitable?</span>
              </Col>
            </Row>
            
            <Divider style={{width: '100%', backgroundColor: '#206A37', height: '0.7px'}} />

            <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', marginTop: '15px', marginBottom: '15px'}}>
            
              <Col xs='6' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Input placeholder='Min'/>
              </Col>
              <Col xs='6' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Input placeholder='Max'></Input>
              </Col>
            
            </Row>  

          </Col>

          <Col xs='12' lg='6' style={{display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center',backgroundColor: 'rgba(255,255,255, 0.7)',justifySelf: 'center',alignSelf: 'center',marginTop: 'calc(1em + 1vw)',borderRadius: '10px',border: 0}}>

            <Row>
              <Col xs='12' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
                <span style={spanContactezNous}>Surface du terrain ?</span>
              </Col>
            </Row>
            
            <Divider style={{width: '100%', backgroundColor: '#206A37', height: '0.7px'}} />

            <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', marginTop: '15px', marginBottom: '15px'}}>
            
              <Col xs='6' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Input placeholder='Min'/>
              </Col>
              <Col xs='6' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Input placeholder='Max'></Input>
              </Col>
            
            </Row>

          </Col>

        </Row>

        
        <Row style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center', width: '60%'}}>

          <Col xs='12' lg='6' style={{display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center',backgroundColor: 'rgba(255,255,255, 0.7)',justifySelf: 'center',alignSelf: 'center',marginTop: 'calc(1em + 1vw)',borderRadius: '10px',border: 0}}>

            <Row>
              <Col xs='12' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
                <span style={spanContactezNous}>Combien de piéces ?</span>
              </Col>
            </Row>
            
            <Divider style={{width: '100%', backgroundColor: '#206A37', height: '0.7px'}} />

            <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: '15px', marginBottom: '15px'}}>
            
              <Col xs='4' lg='2' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  Studio
                </Label>
              </Col>
              <Col xs='4' lg='2' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  2
                </Label>
              </Col>
              <Col xs='4' lg='2' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  3
                </Label>
              </Col>
              <Col xs='4' lg='2' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  4
                </Label>
              </Col>
              <Col xs='4' lg='2' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  5
                </Label>
              </Col>
            
            </Row>  

          </Col>

          <Col xs='12' lg='6' style={{display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center',backgroundColor: 'rgba(255,255,255, 0.7)',width: '60%',justifySelf: 'center',alignSelf: 'center',marginTop: 'calc(1em + 1vw)',borderRadius: '10px',border: 0}}>

            <Row>
              <Col xs='12' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
                <span style={spanContactezNous}>Combien de chambres ?</span>
              </Col>
            </Row>
            
            <Divider style={{width: '100%', backgroundColor: '#206A37', height: '0.7px'}} />

            <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', marginTop: '15px', marginBottom: '15px'}}>
            
            <Col xs='2' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  1
                </Label>
              </Col>
              <Col xs='2' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  2
                </Label>
              </Col>
              <Col xs='2' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  3
                </Label>
              </Col>
              <Col xs='2' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  4
                </Label>
              </Col>
              <Col xs='2' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  5
                </Label>
              </Col>
            </Row>

          </Col>

        </Row>

        <Row style={firstRow}>

          <Row>
            <Col xs='12' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
              <span style={spanContactezNous}>Type d’achats :</span>
            </Col>
          </Row>
          
          <Divider style={{width: '100%', backgroundColor: '#206A37', height: '0.7px'}} />

          <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', marginTop: '5px', marginBottom: '5px'}}>
            
              <Col xs='6' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  Ancien
                </Label>
              </Col>
              <Col xs='6' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  Projet de Construction
                </Label>
              </Col>
            
          </Row>

          <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', marginTop: '5px', marginBottom: '5px'}}>
            
              <Col xs='6' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  Neuf
                </Label>
              </Col>
              <Col xs='6' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  Ancien
                </Label>
              </Col>
            
          </Row>

          
        </Row>


        <Row style={firstRow}>

          <Row>
            <Col xs='12' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
              <span style={spanContactezNous}>Commoditées :</span>
            </Col>
          </Row>

          <Divider style={{width: '100%', backgroundColor: '#206A37', height: '0.7px'}} />

          <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', marginTop: '5px', marginBottom: '5px'}}>
            
              <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  Parking Ouvert
                </Label>
              </Col>
              <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  Parket
                </Label>
              </Col>
              <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  Box
                </Label>
              </Col>
            
          </Row>

          <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', marginTop: '5px', marginBottom: '5px'}}>
            
              <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  Alarme
                </Label>
              </Col>
              <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  Placard
                </Label>
              </Col>
              <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  Accès handicapé
                </Label>
              </Col>
            
          </Row>
          <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', marginTop: '5px', marginBottom: '5px'}}>
            
              <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  Dernier étage
                </Label>
              </Col>
              <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  Garage
                </Label>
              </Col>
              <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                &nbsp;
              </Col>
            
          </Row>


        </Row>


        <Row style={firstRow}>

          <Row>
            <Col xs='12' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
              <span style={spanContactezNous}>Chauffage :</span>
            </Col>
          </Row>

          <Divider style={{width: '100%', backgroundColor: '#206A37', height: '0.7px'}} />

          <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', marginTop: '5px', marginBottom: '5px'}}>
            
              <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  Individuel
                </Label>
              </Col>
              <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  Central
                </Label>
              </Col>
              <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  Gaz
                </Label>
              </Col>
            
          </Row>

          <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', marginTop: '5px', marginBottom: '5px'}}>
            
              <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  Eletrique
                </Label>
              </Col>
              <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  Sol
                </Label>
              </Col>
              <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                &nbsp;
              </Col>
            
          </Row>

        </Row>

        <Row style={firstRow}>

          <Row>
            <Col xs='12' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
              <span style={spanContactezNous}>Cuisine :</span>
            </Col>
          </Row>

          <Divider style={{width: '100%', backgroundColor: '#206A37', height: '0.7px'}} />

          <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', marginTop: '5px', marginBottom: '5px'}}>
            
              <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  Cuisine séparée
                </Label>
              </Col>
              <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  Cuisine équipée
                </Label>
              </Col>
            
          </Row>

          <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', marginTop: '5px', marginBottom: '5px'}}>
            
              <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  Coin cuisine
                </Label>
              </Col>
              <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  Cuisine Americaine
                </Label>
              </Col>
            
          </Row>


        </Row>

        <Row style={firstRow}>

          <Row>
            <Col xs='12' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
              <span style={spanContactezNous}>Autres piéces :</span>
            </Col>
          </Row>

          <Divider style={{width: '100%', backgroundColor: '#206A37', height: '0.7px'}} />

          <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', marginTop: '5px', marginBottom: '5px'}}>
            
              <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  Toilettes Séparées
                </Label>
              </Col>
              <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  Salle d’eau (douche)
                </Label>
              </Col>
              <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  Sejour
                </Label>
              </Col>
            
          </Row>

          <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', marginTop: '5px', marginBottom: '5px'}}>
            
              <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  Entrée Séparée
                </Label>
              </Col>
              <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  Salle de bain (beignoire)
                </Label>
              </Col>
              <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  Salle à manger
                </Label>
              </Col>
            
          </Row>


        </Row>

        <Row style={firstRow}>

          <Row>
            <Col xs='12' lg='4' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
              <span style={spanContactezNous}>Affichage des announces :</span>
            </Col>
          </Row>

          <Divider style={{width: '100%', backgroundColor: '#206A37', height: '0.7px'}} />

          <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', marginTop: '5px', marginBottom: '5px'}}>
            
              <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  Announce avec photos
                </Label>
              </Col>
              <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  Dont le prix à evolué
                </Label>
              </Col>
              <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  Exclusivité
                </Label>
              </Col>
            
          </Row>

          <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', marginTop: '5px', marginBottom: '5px'}}>
            
              <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  Announce avec visite virtuelle
                </Label>
              </Col>
              <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                <Label check style={radioButtonsStyle}>
                  <Input type="checkbox" name="Appartement" />
                  Announces avec vidéo commenté
                </Label>
              </Col>
              <Col xs='12' lg='4' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                &nbsp;
              </Col>
            
          </Row>


        </Row>

        <Row style={lastRow}>
          <Link to='/resultats' type='button' style={{color: '#206A37', fontSize: 'calc(1em + 0.6vw)', padding: '5px'}}>Valider</Link>
        </Row>

      </Container>
      <Footer/>
</motion.div>
  );
}

var BackgroundImage = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    height:'auto',
    backgroundImage: `url(${photo})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat-y',
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
  backgroundColor: 'rgba(255,255,255, 0.8)',
  width: '60%',
  justifySelf: 'center',
  alignSelf: 'center',
  marginTop: 'calc(1em + 1vw)',
  borderRadius: '10px',
  border: 0
}

var lastRow = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(255,255,255, 0.8)',
  width: '60%',
  justifySelf: 'center',
  alignSelf: 'center',
  marginTop: 'calc(1em + 1vw)',
  borderRadius: '10px',
  border: 0,
  marginBottom: 'calc(1em + 1vw)'
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

var iconsStyle = {
  margin: '5px', 
  border: '2px solid #206A37', 
  borderRadius: 100, 
  padding: 10, 
  width: '70px'
}

var radioButtonsStyle = {
  textAlign: 'center',
  color: '#206A37'
  
}



export default Recherche;
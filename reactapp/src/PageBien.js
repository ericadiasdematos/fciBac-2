import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Col, Popover, Input, PopoverBody, Button, Badge, ButtonGroup } from 'reactstrap';
import photo from './images/PageWishlist.png'
import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import user from './images/user.png'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Example from './carosel'
import { FaRegHeart } from 'react-icons/fa';
import { FaMap } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { Table } from 'reactstrap';
import energy from './images/energieExample.gif'
import { Radio, Form } from 'antd';



function PageBien() {

  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const [logInMessage, setLogInMessage] = useState([])

  const [logInAccepted, setLogInAccepted] = useState(false)

  const [userGenre, setUserGenre] = useState('')
  const [usersName, setUsersName] = useState('')
  const [deleteFav, setDeleteFav] = useState(false)

  const [buttonClicked, setButtonClicked] = useState('Général')
  const [bienAVendre, setBienAVendre] = useState(null);
  const [heart, setHeart] = useState(false)
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
                    <Button size='sm' style={{width: '28vh', marginBottom: '1vh', backgroundColor: '#206A37'}}>Voir mes favoris</Button>
                    <Button size='sm' style={{width: '28vh', marginBottom: '1vh', backgroundColor: '#206A37'}}><Link to='/mesrecherches' style={{color: 'white'}}>Voir mes dernieres recherches</Link></Button>
                    <Button size='sm' style={{width: '28vh', backgroundColor: '#206A37'}} onClick={()=>handleLogout()}>Se déconecter</Button>
                </PopoverBody>
  }

  var infoShown;

  if(buttonClicked === 'Général'){

    infoShown = 
      <span>
        <Row style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Row style={{display: 'flex', justifySelf: 'center', alignSelf: 'flex-start', marginLeft: '5px', fontSize: 25, color: '#206A37'}}><strong>Général :</strong></Row>
          <Row style={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
            <Col xs='6'>
              <ul>
                <li>Surface de 154m</li>
                <li>5 pieces</li>
                <li>3 etages</li>
              </ul>
            </Col>
            <Col xs='6'>
              <ul>
                <li>Année de construction: 2001</li>
                <li>Jardin de 50m</li>
                <li>Piscine</li>
              </ul>
            </Col>
          </Row>
        </Row>
        <Row style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Row style={{display: 'flex', justifySelf: 'center', alignSelf: 'flex-start', marginLeft: '5px', fontSize: 25, color: '#206A37'}}><strong>Description :</strong></Row>
          <Row style={{display: 'flex', width: '98%', textAlign: 'start'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum sit ornare varius libero, nec, id massa tellus turpis. Euismod pellentesque aenean vulputate nibh tristique nunc cursus cursus massa. Eget nam habitasse donec blandit consectetur. Pellentesque risus lectus neque, in vitae facilisis morbi in placerat. Ut feugiat amet luctus cras dui. Ornare pulvinar porta nulla erat aliquam iaculis lorem tortor libero. Pretium risus adipiscing risus libero et est lectus tellus. Viverra aliquam blandit dignissim molestie velit diam ut sit enim. Libero mauris, ullamcorper facilisis nunc. Nec lacus tristique augue erat at lectus. Amet diam mauris eget pellentesque eget vel. Adipiscing proin lacus, lacus ut at consequat diam. Ac pharetra quis quisque turpis libero at. Ac in proin donec vel at laoreet arcu molestie egestas. Mollis leo in integer donec tortor. Est ipsum mauris urna enim. Donec nunc, lorem nisl condimentum lacus netus tempus. Nibh blandit pharetra venenatis viverra eleifend nisl pharetra. Tempus massa nisl in felis vitae nunc fames vitae.</Row>
        </Row>
      </span>
    
  }

  if(buttonClicked === 'Localisation'){
    infoShown = 
      <Col xs='6' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
        <Row style={{width: '100%'}}>
          <Table striped style={{border: '2px solid white'}}>
            <tbody>
              <tr>
                <th scope="row">VILLE :</th>
                <td>Issy Les Moulineaux</td>
              </tr>
              <tr>
                <th scope="row">VILLE :</th>
                <td>Issy Les Moulineaux</td>
              </tr>
              <tr>
                <th scope="row">VILLE :</th>
                <td>Issy Les Moulineaux</td>
              </tr>
            </tbody>
          </Table>
        </Row>
        <Row style={{width: '100%'}}>
          <Button style={{width: '100%', backgroundColor: '#206A37', color: 'white'}}><FaMap style={{color:'white', width: 20, height: 20, marginRight: '2px'}}/>Voir quartier sur la map</Button>
        </Row>
        
      </Col>
  }

  if(buttonClicked === 'Energie'){

    infoShown =
    <Col xs='12' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <img src={energy} />
    </Col>

  }

  if(buttonClicked === 'Coproriete'){

    infoShown = 
    <Col>
      <Row style={{fontSize: 25, color: '#206A37'}}><strong>À propos de la copropriété :</strong></Row>
      <Row>La copropriété inclut 225 lots pour un montant annuel de la quote-part du budget prévisionnel des dépenses courantes de 8 858 €.</Row>
    </Col>

  }

  if(buttonClicked === 'Visiter'){

    infoShown = 

    <Col xs='12' lg='4'>
          <Row style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#206A37',flexDirection: 'column', marginBottom: 2}}>
            <Row style={{fontSize: 20}}><strong>Envie de visiter ?</strong></Row>
            <Row style={{fontSize: 20, textAlign: 'center'}}><strong>Une question sur cet appartement ?</strong></Row>
          </Row>
          <Row>
            <Input placeholder='Nom' style={styleInput}></Input>
          </Row>
          <Row>
            <Input placeholder='Prénom' style={styleInput}></Input>
          </Row>
          <Row>
            <Input placeholder='Téléphone' style={styleInput}></Input>
          </Row>
          <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: 3}}>
            <Row>Avez-vous un bien à vendre?</Row>
            <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
              <ButtonGroup style={{width: '100%'}}>
                <Button color="success" onClick={() => setBienAVendre(1)} active={bienAVendre === 1}>Oui</Button>
                <Button color="success" onClick={() => setBienAVendre(2)} active={bienAVendre === 2}>Non</Button>
               </ButtonGroup>
            </Row>
          </Row>
          <Row ><Button color="success" style={{color: 'white', width: '100%'}}>Contacter l’agence</Button></Row>
    </Col>
  }

 var heartIcon =  <FaRegHeart type='button' onClick={()=> setHeart(!heart)} style={{color:'white', width: 40, height: 40}}/>
  
  if(heart === true){
    heartIcon = <FaHeart type='button' onClick={()=> setHeart(!heart)} style={{color:'white', width: 40, height: 40}}/>
  }


  return (
    <Container style={BackgroundImage}>

      <Row style={navBarRow}>

        <Col xs='2' lg='1' style={{paddingLeft: '0.6vh'}}>
          <Link to='/'>
            <img src={logo} alt='logo' style={{width: 'calc(1em + 9vw)'}}/>
          </Link>
        </Col>

        <Col xs='8' lg='10' style={{display: 'flex', justifyContent: 'center'}}>
            <span style={{color: '#206A37', fontSize: 'calc(1em + 2vw)', textAlign: 'center'}}>
                &nbsp; 
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

        <Col xs='12' lg='6' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', alignSelf: 'center', justifySelf: 'center'}}>
          <Example/>
        </Col>

      </Row>

      <Row style={descRow2}>
        <Col xs='12' lg='6'>
          <Row style={{marginLeft: '3px', fontSize: 25}}><strong>Maison</strong></Row>
          <Row style={{marginLeft: '3px'}}>7 p - 4 ch -  300m²</Row>
          <Row style={{marginLeft: '3px'}}>Quartier Pasteur Montparnasse, Paris 15ème</Row>
        </Col>

        <Col xs='12' lg='6' style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-end', flexDirection: 'column'}}>
          <Row style={{marginRight: '3px', fontSize: 25}}>4 000 000 €</Row>
          <Row style={{marginRight: '3px'}}>{heartIcon}</Row>
        </Col>
      </Row>

      <Row style={descRow3}>
        <Col xs='12' lg='2' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Button style={styleButton} onClick={()=> setButtonClicked('Général')}>Général</Button>
        </Col>
        <Col xs='12' lg='2' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Button style={styleButton} onClick={()=> setButtonClicked('Localisation')}>Localisation</Button>
        </Col>
        <Col xs='12' lg='2' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Button style={styleButton} onClick={()=> setButtonClicked('Energie')}>Energie</Button>
        </Col>
        <Col xs='12' lg='2' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Button style={styleButton} onClick={()=> setButtonClicked('Coproriete')}>Coproriete</Button>
        </Col>
        <Col xs='12' lg='2' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Button style={styleButton} onClick={()=> setButtonClicked('Visiter')}>Visiter</Button>
        </Col>
      </Row>

      <Row style={descRow4}>
        {infoShown}
      </Row>

      
    </Container>
  );
}

var styleInput = {
  border: '2px solid #206A37',
  margin: 3
}

var styleButton = {
  backgroundColor: '#206A37',
  color: 'white',
  width: 150,
  border: 0
}

var BackgroundImage = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  height:'auto',
  backgroundColor: 'rgba(13,42,26, 0.4)',
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
  marginBottom: 'calc(1em + 0.5vw)',
  width: '100%'
}

var descRow2 = {
  display: 'flex',
  justifySelf: 'center',
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'space-between',
  marginTop: 'calc(1em + 1vw)',
  marginBottom: 20,
  width: '80%',
  backgroundColor: 'rgba(32.0, 106.0, 55.0, 1.0)',
  borderRadius: 10,
  color: 'white',
  padding: '5px'
}

var descRow3 = {
  display: 'flex',
  justifySelf: 'center',
  alignSelf: 'center',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 10,
  width: '80%',
  backgroundColor: '#206A37',
  borderRadius: 10
}

var descRow4 = {
  display: 'flex',
  justifySelf: 'center',
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 1,
  marginBottom: 'calc(1em + 0.5vw)',
  width: '80%',
  border: '2px solid #206A37',
  borderRadius: 10,
  padding: '15px'
}



export default PageBien;
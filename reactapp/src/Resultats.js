import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons'
import {faBell} from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Col, Popover, Input, PopoverBody, Badge, Label, Button, ButtonGroup  } from 'reactstrap';
import photo from './images/PageWishlist.png'
import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import user from './images/user.png'
import { Divider } from 'antd';
import { FaRegHeart } from 'react-icons/fa';




function Resultats() {

  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const [logInMessage, setLogInMessage] = useState([])

  const [logInAccepted, setLogInAccepted] = useState(false)

  const [userGenre, setUserGenre] = useState('')
  const [usersName, setUsersName] = useState('')
  const [deleteFav, setDeleteFav] = useState(false)
  const [OptionSelected, setOptionSelected] = useState(null);
  const [TypeSelected, setTypeSelected] = useState(null);

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

  var favRows =     
  

  <Row style={firstRow}>

    <Col xs='12' lg='3' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', justifySelf: 'center', alignSelf: 'center', height:'100%'}}>
      <Link to='/bien' style={{display:'flex', justifySelf: 'center', alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}}><img src={photo} style={{width: '200px', height: '200px', display:'flex', justifySelf: 'center', alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}} fluid /></Link>
    </Col>

    
    <Col xs='12' lg='2' style={{display:'flex', alignItems:'center', justifyContent: 'center', flexDirection: 'column'}}>
      <Link to='/bien' style={{color: '#206A37'}}>
        <Row>Maison</Row>
        <Row><strong>7 p - 4 ch -  300m²</strong></Row>
      </Link>
    </Col>


    <Col xs='12' lg='4'>
      <span style={{fontSize: 'calc(0.5em + 0.4vw)'}}>Lorem ipsum molestie adipiscing fringilla  lacinia condimentum amet phasellus. nec cras non imperdiet proin augue curae ultrices aliquam, tempus hendrerit sociosqu laoreet potenti aliquet sit taciti nullam,sociosqu laoreet potenti...</span>
    </Col>

    <Col xs='12' lg='2' style={{display: 'flex',alignItems:'center', flexDirection: 'column', height: '100%', justifyContent:'center'}}>
      <Row style={{marginTop:'15px', marginBottom:'45px'}}><Badge style={{backgroundColor: '#206A37', fontSize:'calc(0.5em + 0.5vw)'}}>4 000 000 €</Badge></Row>
      <Row style={{marginBottom:'15px', marginTop:'45px', display: 'flex', alignSelf: 'flex-end', marginRight: '1px'}}><FaRegHeart type='button' style={{color:'#206A37', width: 40, height: 40}}/></Row>
    </Col>

  </Row>




var allRows = [];

for (let i=0; i<3; i++ ){

  allRows.push(favRows)
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
                R E S U L T A T S
            </span>
        </Col>
        
        <Col xs='2' lg='1' style={{display: 'flex', justifyContent:'flex-end', paddingRight: '5vh'}}>
          <img src={user} id="Popover1" style={{width: 'calc(1em + 2vw)'}} type="button" ></img>
            <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle} >
              {userBoard}
            </Popover>
        </Col>

      </Row>

      <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255, 0.8)',height: 'auto',marginTop: '15px', padding: '5px'}}>

        <Col xs='12' lg='2' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>

          <Row style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Button color="success" style={{marginBottom: '3px'}}><FontAwesomeIcon icon={faBell} style={{color: 'white', marginRight: '2px'}}/>Activer l'alerte mail</Button>
          </Row>

        </Col>

        <Col xs='12' lg='2'  style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#206A37'}}>
          <ButtonGroup style={{display: 'flex', flexDirection: 'column'}}>
            <Button color="success" style={{marginBottom: '3px'}} onClick={() => setOptionSelected('Acheter')} active={OptionSelected === 'Acheter'}>Acheter</Button>
            <Button color="success"  onClick={() => setOptionSelected('Louer')} active={OptionSelected === 'Louer'}>Louer</Button>
          </ButtonGroup>
        </Col>

        <Col xs='12' lg='2'  style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <Row style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#206A37'}}>Type de bien :</Row>
            <Row style={{display: 'flex',flexDirection: 'column'}}>
              <ButtonGroup style={{display: 'flex', flexDirection: 'column'}}>
                <Button color="success" style={{marginBottom: '3px'}} onClick={() => setTypeSelected('Appartement')} active={TypeSelected === 'Appartement'}>Appartement</Button>
                <Button color="success" onClick={() => setTypeSelected('Maison')} active={TypeSelected === 'Maison'}>Maison</Button>
              </ButtonGroup>
            </Row>
        </Col>

        <Col xs='12' lg='2'  style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <Row style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#206A37'}}>A quelle endroit ?</Row>
            <Row style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Input placeholder='Ville ? Quartier ?'/>
            </Row>
        </Col>

        <Col xs='12' lg='2'  style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginBottom: '3px'}}>
            <Row style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#206A37'}}>Votre Budget ?</Row>
            <Row style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
              <Input style={{width:'40%'}} placeholder='Min'/>
              <Input style={{width:'40%'}} placeholder='Max'/>
            </Row>
        </Col>
        
        <Col xs='12' lg='2' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
          <ButtonGroup style={{display: 'flex', flexDirection: 'column'}}>
            <Button color="success" style={{marginBottom: '3px'}}>Confirmer</Button>
            <Button color="success">Plus de filtres</Button>
          </ButtonGroup>
        </Col>
          
        

      </Row>

      <Row style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        {allRows}
      </Row>

      

      

    </Container>
  );
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

var firstRow = {
  height: 'auto',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(255,255,255, 0.8)',
  width: '90%',
  justifySelf: 'center',
  alignSelf: 'center',
  marginTop: 'calc(0.5em + 0.5vw)',
  marginBottom: 'calc(0.5em + 0.5vw)',
  borderRadius: '10px',
  border: 0
}



export default Resultats;
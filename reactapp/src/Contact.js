import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Popover, Input, PopoverBody, Button  } from 'reactstrap';
import photo from './images/PageContacts.png'
import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import user from './images/user.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { Divider } from 'antd';
import {connect} from 'react-redux';




function Contact(props) {

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

  

 const [value,setValue]=useState('Raison');
  const handleSelect=(e)=>{
    console.log(e);
    setValue(e)
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
                      <Button size='sm' style={{width: '28vh', marginBottom: '1vh', backgroundColor: '#206A37'}}>Voir mes dernieres recherches</Button>
                      <Button size='sm' style={{width: '28vh', backgroundColor: '#206A37'}} onClick={()=>handleLogout()} >Se déconecter</Button>
                  </PopoverBody>
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
            <span style={{color: '#206A37', fontSize: 'calc(1em + 2vw)'}}>
                C O N T A C T 
            </span>
        </Col>

        <Col xs='2' lg='1' style={{display: 'flex', justifyContent:'flex-end', paddingRight: '5vh'}}>
          <img src={user} id="Popover1" style={{width: 'calc(1em + 2vw)'}} type="button" ></img>
            <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle} >
             {userBoard}
            </Popover>
        </Col>

      </Row>

      <Row style={firstRow}>

        <Row>
          <Col xs='12' id='contactezNous' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center'}}>
            <span style={spanContactezNous}>CONTACTEZ NOUS</span>
          </Col>
        </Row>

        <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: '10px'}}>
          <Divider style={{width: '100%', backgroundColor: '#206A37', height: '1px'}} />
        </Row>

          
        <Row style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '100%', flexDirection: 'row'}}>
          <Col xs='5' lg='2' style={contactBoxes}>
            <span>FCI Houdan</span>
            <a href='mailto:houdan@fcimmo.com' style={{color: '#206A37'}}>houdan@fcimmo.com</a>
            <span>Tél. : 01.78.90.51.51</span>
          </Col>
          <Col xs='5' lg='2' style={contactBoxes}>
            <span>FCI Paris</span>
            <a href='mailto:mozart@fcimmo.com' style={{color: '#206A37'}}>mozart@fcimmo.com</a>
            <span>Tél. : 01.40.50.20.20</span>
          </Col>
          <Col xs='5' lg='2' style={contactBoxes}>
            <span>FCI Syndic</span>
            <a href='mailto:contact@fcisyndic.com' style={{color: '#206A37'}}>contact@fcisyndic.com</a>
            <span>Tél. : 01.86.22.96.96</span>
          </Col>
          <Col xs='5' lg='2' style={contactBoxes}>
            <span>FCI Maule</span>
            <a href='mailto:contact@fcisyndic.com' style={{color: '#206A37'}}>maule@fcimmo.com</a>
            <span>Tél. : 01.34.75.08.08</span>
          </Col>
        </Row>
        
      </Row>

      <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '75%', justifySelf: 'center', alignSelf: 'center', flexDirection: 'row' }}>
        <Col xs='12' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', flexDirection: 'row' }}>
          <Divider  style={{width: '48%', backgroundColor: 'white', height: '2px'}}/> 
          <span style={{color: 'white', fontSize: 'calc(1em + 0.2vw)', marginLeft: '7px', marginRight: '7px'}}>OU</span>
          <Divider  style={{width: '48%', backgroundColor: 'white', height: '2px'}}/> 
        </Col>
      </Row>

      <Row style={firstRow}>

        <Row>
          <Col xs='12' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center'}}>
            <span style={spanContactezNous}>LAISSEZ NOUS UNE MESSAGE</span>
          </Col>
        </Row>

        <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: '10px'}}>
          <Divider style={{width: '100%', backgroundColor: '#206A37', height: '1px'}} />
        </Row>


        <Row style={{width: '100%', margin:'1vw', marginBottom: '1vw'}}>
          <Col xs='12' lg='6'>
            <DropdownButton
                alignCenter
                title={value}
                id="dropdown"
                className="myDropdown"
                size="sm"
                variant="secondary"
                onSelect={handleSelect}
                style={{color: '#206A37'}}
            >
                <Dropdown.Item as="button" eventKey="Je veux acheter" style={{}}>Je veux acheter</Dropdown.Item>
                <Dropdown.Item as="button" eventKey="Je veux vendre mon bien">Je veux vendre mon bien</Dropdown.Item>
                <Dropdown.Item as="button" eventKey="Je cherche une location">Je cherche une location</Dropdown.Item>
                <Dropdown.Item as="button" eventKey="Je veux louer mon bien">Je veux louer mon bien</Dropdown.Item>
                <Dropdown.Item as="button" eventKey="Je veux changer de syndic">Je veux changer de syndic</Dropdown.Item>
                <Dropdown.Item as="button" eventKey="Je cherche un viager">Je cherche un viager</Dropdown.Item>
                <Dropdown.Item as="button" eventKey="Autre raison">Autre raison</Dropdown.Item>
            </DropdownButton>
          </Col>

          <Col xs='12' lg='6'>
            <Input size="sm" placeholder='Votre email'></Input>
          </Col>
        </Row>

        <Row style={{width: '100%', margin:'1vw'}}>
          <Col xs='12' lg='6'>
            <Input size="sm" placeholder='Nom et Prénom' style={{marginBottom: '1vw'}}></Input>
            <Input size="sm" placeholder='Téléphone' style={{marginBottom: '1vw'}}></Input>
          </Col>
          <Col xs='12' lg='6'>
            <Input size="sm" placeholder='Message' type="textarea" style={{height: 'calc(2em + 12vw)'}}></Input>
          </Col>
        </Row>

        <Row style={{width: '100%', margin:'1vw'}}>
          <Col xs='1'>
            <Button size="sm">Envoyer</Button>
          </Col>
        </Row>
        
      </Row>

      

    </Container>
  );
}



var BackgroundImage = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height:'110vh',
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
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(255,255,255, 0.7)',
  width: 'auto',
  padding: '5px',
  width: '80%',
  justifySelf: 'center',
  alignSelf: 'center',
  margin: '5px',
  borderRadius: '10px'
}


 var spanContactezNous = {
  display: 'flex',
  justifySelf: 'center',
  alignSelf: 'center',
  color: '#206A37',
  fontSize: 'calc(1em + 0.3vw)',
  marginBottom: '5px',
}

var contactezNous = {
  display: 'flex',
  justifySelf: 'center',
  alignSelf: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '1vw'
}


var contactBoxes = {
display: 'flex', 
flexDirection: 'column', 
justifyContent: 'center', 
alignItems: 'center', 
textAlign: 'center',
border: 'solid 2px #206A37',
borderRadius: 10,
margin: 3,
padding: 1,
fontSize: 'calc(0.4em + 0.5vw)'
}


export default Contact;

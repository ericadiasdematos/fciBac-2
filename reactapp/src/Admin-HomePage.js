import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Popover, Input, PopoverBody, Button, Label  } from 'reactstrap';
import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion'
import { FaUserCircle } from 'react-icons/fa';
import messagesPhoto from './images/messages.png'
import adminPhoto from './images/admins.png'
import biensPhoto from './images/biens.jpg'
import postsPhoto from './images/posts.png'
import NavBarAdmin from "./NavBarAdmin"






function AdminHomePage() {

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

        <NavBarAdmin pageName="PAGE ADMISNISTRATEUR" />

        <Row style={firstRow}>

            <Col xs='12' lg='2' style={styleCol}>
                <Link to="/adminGererBiens" style={styleLink}>
                  <Row style={{width: 'inherit'}}>
                      <img style={{width: 'inherit', borderRadius:'6px 6px 0px 0px'}} src={biensPhoto}/>
                  </Row>
                  <Row style={styleRow}>
                      <span style={{fontSize: 12, fontWeight: 'bold'}}>Gérer les biens</span>
                  </Row>
                </Link>
            </Col>
            <Col xs='12' lg='2' style={styleCol}>
                <Link to="/adminGererMessages" style={styleLink}>
                  <Row style={{width: 'inherit'}}>
                      <img style={{width: 'inherit', borderRadius:'6px 6px 0px 0px'}} src={messagesPhoto}/>
                  </Row>
                  <Row style={styleRow}>
                      <span style={{fontSize: 12, fontWeight: 'bold'}}>Gérer les messages</span>
                  </Row>
                </Link>
            </Col>
            <Col xs='12' lg='2' style={styleCol}>
              <Link to="/adminGererAdmin" style={styleLink}>
                <Row style={{width: 'inherit'}}>
                    <img style={{width: 'inherit', borderRadius:'6px 6px 0px 0px'}} src={adminPhoto}/>
                </Row>
                <Row style={styleRow}>
                    <span style={{fontSize: 12, fontWeight: 'bold'}}>Gérer les administrateurs</span>
                </Row>
              </Link>
            </Col>


        </Row>

      </Container>

</motion.div>
  );
}

var BackgroundImage = {
  display: 'flex',
  flexDirection: 'column',
  height:'100vh',
  backgroundColor: 'rgba(189, 224, 193)',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  maxWidth: '100%',
}

 var navBarRow = {
  backgroundColor: 'white',
  border: '2px solid #206A37',
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
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '70%',
  justifySelf: 'center',
  alignSelf: 'center',
  marginTop: '150px',
  borderRadius: '10px',
  border: 0,
}

var styleCol = {
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    border: '4px solid #206A37', 
    borderRadius: 10, 
    padding: 0, 
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)',
    marginRight: '10px',
    backgroundColor: 'rgba(255,255,255, 0.7)',

}


 var styleRow = {
    backgroundColor: '#206A37', 
    color: 'white', 
    width: '100%', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: '30px', 
    marginBottom: '30px', 
    paddingTop: '10px', 
    paddingBottom: '10px', 
    fontSize: 20, 
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'
}

var styleLink = {
  width: "100%", 
  display: "flex", 
  flexDirection: "column", 
  justifyContent: "center", 
  alignItems: "center", 
  color: "white"
}




export default AdminHomePage;
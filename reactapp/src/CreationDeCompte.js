import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Popover, Input, PopoverBody, Button, Label  } from 'reactstrap';
import photo from './images/PageCreationDeCompte.png'
import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import user from './images/user.png'
import Footer from './Footer'
import { motion } from 'framer-motion'
import { FaUserCircle } from 'react-icons/fa';


function CreationDeCompte() {

    const [popoverOpen, setPopoverOpen] = useState(false);

    const toggle = () => setPopoverOpen(!popoverOpen);

    const [genre, setGenre] = useState('')
    const [nom, setNom] = useState('')
    const [prenom, setprenom] = useState('')
    const [email, setEmail] = useState('')
    const [telephone, setTelephone] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const [tableauErreurs, setTableauErreurs] = useState([]);
    const [userCreated, setUserCreated] = useState('')

    const [signInEmail, setSignInEmail] = useState('');
    const [signInpassword, setSignInpassword] = useState('')

    const [logInMessage, setLogInMessage] = useState([])

  const [logInAccepted, setLogInAccepted] = useState(false)

  const [usersName, setUsersName] = useState('')
  const [userGenre, setUserGenre] = useState('')

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
        localStorage.setItem('usersToken', data.token)
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
                      <span style={{padding: '1vh', color: '#206A37', fontWeight: 'bold'}}>Bienvenue {usersName} !</span>
                      <Button size='sm' style={{width: '28vh', marginBottom: '1vh', backgroundColor: '#206A37'}}><Link to='/wishlist' style={{color: 'white'}}>Voir mes favoris</Link></Button>
                      <Button size='sm' style={{width: '28vh', marginBottom: '1vh', backgroundColor: '#206A37'}}>Voir mes dernieres recherches</Button>
                      <Button size='sm' style={{width: '28vh', backgroundColor: '#206A37'}} onClick={()=>handleLogout()} >Se déconecter</Button>
                  </PopoverBody>
    }


   var handleConfirmer = async ()  =>  {

    var rawData = await fetch('/signUp', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `genreFromFront=${genre}&nomFromFront=${nom}&prenomFromFront=${prenom}&emailFromFront=${email}&telephoneFromFront=${telephone}&passwordFromFront=${password}&passwordConfirmationFromFront=${passwordConfirmation}`
});

    var data = await rawData.json();
    console.log(data.errors);

    if(data.result == true){
      setUserCreated('Votre compte à été créé!')
    }else{
      setTableauErreurs(data.errors)

    }

   }

   var listOfErrors = tableauErreurs.map((error, i)=>{
     return(<span>{error}</span>)
   })

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

          <Col xs='7' lg='10' style={{display: 'flex', justifyContent: 'center'}}>
              <span style={{color: '#206A37', fontSize: 'calc(1em + 2vw)', textAlign: 'center'}}>
                  C R É E R &nbsp; U N E &nbsp; C O M P T E
              </span>
          </Col>
          
          <Col xs='2' lg='1' style={{display: 'flex', justifyContent:'flex-end', paddingRight: '5vh'}}>
            <Button style={{backgroundColor: 'white', border: 'white', borderRadius: 100}}><FaUserCircle id="Popover1" size='2x' style={{width: '40px', color: '#206A37'}}/></Button>
              <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle} >
                {userBoard}
              </Popover>
          </Col>

        </Row>

        <Row style={descRow}>

          <Row style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'calc(1em + 2vw)'}}>
              <Col style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Label check style={{marginRight: '25px'}}>
                      <Input type="radio" name="radio1" value="Madame" onChange={(e) => setGenre(e.target.value)} />{' '}
                      Mme.
                  </Label>
                  <Label check>
                      <Input type="radio" name="radio1" value="Monsieur" onChange={(e) => setGenre(e.target.value)} />{' '}
                      M.
                  </Label>
              </Col>
          </Row>
          <Row style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'calc(0.2em + 0.2vw)'}}>
              <Col xs='12' lg='5'>
                  <Input placeholder="Nom" style={{border: '2px solid #206A37', borderRadius: 10}} onChange={(e) => setNom(e.target.value)}/>
              </Col>
              <Col xs='12' lg='5'>
                  <Input placeholder="Prénom" style={{border: '2px solid #206A37', borderRadius: 10}} onChange={(e) => setprenom(e.target.value)}/>
              </Col>
          </Row>
          <Row style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'calc(0.2em + 0.2vw)'}}>
              <Col xs='12' lg='5'>
                  <Input placeholder="Email" style={{border: '2px solid #206A37', borderRadius: 10}} onChange={(e) => setEmail(e.target.value)}/>
              </Col>
              <Col xs='12' lg='5'>
                  <Input placeholder="Telephone" style={{border: '2px solid #206A37', borderRadius: 10}} onChange={(e) => setTelephone(e.target.value)}/>
              </Col>
          </Row>
          <Row style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'calc(1em + 2vw)'}}>
              <Col xs='12' lg='5'>
                  <Input type="password" placeholder="Mot de passe" style={{border: '2px solid #206A37', borderRadius: 10}} onChange={(e) => setPassword(e.target.value)} />
              </Col>
              <Col xs='12' lg='5'>
                  <Input type="password" placeholder="Confirmer me mot de passe" style={{border: '2px solid #206A37', borderRadius: 10}} onChange={(e) => setPasswordConfirmation(e.target.value)}/>
              </Col>
          </Row>
          <Row style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
              <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'red', flexDirection: 'column', textAlign: 'center'}}>
                {listOfErrors}
              </span>
              <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#206A37', flexDirection: 'column', textAlign: 'center'}}>
                {userCreated}
              </span>
              <Button style={{color: 'white', backgroundColor: '#206A37', marginTop: '5px'}} onClick={()=>handleConfirmer()}>Confirmer</Button>
          </Row>

        </Row>

      </Container>
      <Footer/>
    </motion.div>
  );
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
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    justifySelf: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'calc(1em + 5vw)',
    backgroundColor: 'rgba(255,255,255, 0.7)',
    borderRadius: 10,
    paddingTop: 'calc(1em + 1vw)',
    paddingBottom: 'calc(1em + 1vw)'
  }
  
  var col1 = {
    display: 'flex', 
    justifySelf: 'center', 
    alignSelf: 'center', 
    flexDirection: 'column', 
    backgroundColor: 'rgba(255,255,255, 0.7)', 
    justifyContent: 'center', 
    alignItems: 'center',
     borderRadius: 10,
  }
  
  var titleStyle = {
    display: 'flex', 
    justifySelf: 'center', 
    alignSelf: 'center', 
    padding: '2vh', 
    color: '#206A37', 
    paddingTop: '4vh', 
    fontSize: 'calc(1em + 2vw)', 
    textAlign: 'center'
  }
  
  var span1Style = {
    display: 'flex', 
    justifySelf: 'center', 
    alignSelf: 'center', 
    padding: '2vh', 
    textAlign: 'justify', 
    fontSize: 'calc(0.4em + 0.5vw)'
  }
  
  var span2Style = {
    display: 'flex', 
    justifySelf: 'center', 
    alignSelf: 'center', 
    padding: '1vh', 
    textAlign: 'justify', 
    fontSize: 'calc(0.4em + 0.5vw)'
  }
  
  var span3Style = {
    display: 'flex', 
    justifySelf: 'center', 
    alignSelf: 'center', 
    paddingRight: '2vh', 
    paddingLeft: '2vh', 
    paddingBottom: '2vh', 
    textAlign: 'justify', 
    fontSize: 'calc(0.4em + 0.5vw)'
  }

export default CreationDeCompte;
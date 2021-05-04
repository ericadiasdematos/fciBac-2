import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Popover, Input, PopoverBody, Button  } from 'reactstrap';
import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion'
import { FaUserCircle } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { GrUserFemale } from 'react-icons/gr';
import { GrUserManager } from 'react-icons/gr';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';
import { BsPlusCircleFill } from 'react-icons/bs';
import NavBarAdmin from "./NavBarAdmin"






function AdminGererAdmin() {

  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const [logInMessage, setLogInMessage] = useState([])

  const [logInAccepted, setLogInAccepted] = useState(false)

  const [userGenre, setUserGenre] = useState('')
  const [usersName, setUsersName] = useState('')
  const [listOfAdmins, setListOfAdmins] = useState([])

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

      // getAdmins

    var getAdmins = await fetch('/getAdmins')
      .then(response => response.json())
      .then(json => setListOfAdmins(json.adminUsers));


       
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

  async function handleDeleteAdmin(id){

    var deleteAdmin = await fetch('/deleteAdmin', {
      method: 'DELETE',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        idFromFront: id
      })
    })
      .then(response => response.json()
        .then(json => setListOfAdmins(json.adminUsers)))

  }

  return (

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{opacity: 0 }}
>

      <Container style={BackgroundImage}>

        <NavBarAdmin pageName="GERER LES ADMINISTRATEURS" />


        <Row style={{marginTop: 15, width: "100%", display: "flex", justifyContent: "center", alignItems: "center", justifySelf: "center", alignSelf: "center"}}>
          <Button style={{backgroundColor: "#206A37", width: "50%"}}>
            <Link to="/adminAjouterAdmin" style={{color: "white"}}>
              <BsPlusCircleFill style={{marginRight: 5}}/>Ajouter un administrateur
            </Link>
          </Button>
        </Row>

        <Row style={firstRow}>

          {
            listOfAdmins.map(function(admin, i){
              var gender;
              if(admin.genre === "Madame"){
                gender = <GrUserFemale style={{width: "60%", height: "60%"}}/>
              }
              if(admin.genre === "Monsieur"){
                gender = <GrUserManager style={{width: "60%", height: "60%"}}/>
              }
              return(

                  <Col xs='12' lg='2' style={styleCol}>
                      <Row style={{width: 'inherit', display: "flex", justifyContent: "center", alignItems: "center", marginTop: 5}}>
                        {gender}
                      </Row>
                      <Row style={styleRow}>
                        <span style={{fontSize: 15, fontWeight: 'bold'}}>{admin.prenom} {admin.nom}</span>
                      </Row>
                      <Row style={{width: "100%", paddingRight: 3, paddingLeft: 3, marginBottom: 2, marginTop: 5}}>
                        <FaPhoneAlt style={{color: '#206A37', marginRight: 5}} />
                        <span>+33 0{admin.telephone}</span>
                      </Row>
                      <Row style={{width: "100%", paddingRight: 3, paddingLeft: 3}}>
                        <Col xs="10" style={{display: "flex", padding: 0, alignItems: "center"}}>
                          <FaMapMarkerAlt style={{color: '#206A37', marginRight: 5}} />
                          <span>{admin.agence}</span>
                        </Col>
                        <Col xs="2" style={{padding: 0, display: 'flex', justifyContent: "flex-end", alignItems: "center"}}>
                          <FaTrash onClick={()=>handleDeleteAdmin(admin._id)} style={{color: '#206A37', cursor: "pointer"}}/>
                        </Col>
                      </Row>
                  </Col>

              )
            })
          }

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
  marginTop: 50,
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
    backgroundColor: "rgb(255,255,255, 0.7)"
}


 var styleRow = {
    backgroundColor: '#206A37', 
    color: 'white', 
    width: '100%', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 5, 
    marginBottom: 5, 
    paddingTop: '5px', 
    paddingBottom: '5px', 
    fontSize: 20, 
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'
}




export default AdminGererAdmin;
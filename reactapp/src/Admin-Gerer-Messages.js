import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Popover, Input, PopoverBody, Button  } from 'reactstrap';
import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion'
import { FaUserCircle } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { RiMoneyEuroCircleFill } from 'react-icons/ri';
import { FaTrash } from 'react-icons/fa';
import '@szhsin/react-menu/dist/index.css';
import { connect } from 'react-redux';
import NavBarAdmin from "./NavBarAdmin"




function AdminGererMessages (props) {

    const [popoverOpen, setPopoverOpen] = useState(false);

    const toggle = () => setPopoverOpen(!popoverOpen);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle2 = () => setDropdownOpen(prevState => !prevState);
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
  
    const [logInMessage, setLogInMessage] = useState([])
  
    const [logInAccepted, setLogInAccepted] = useState(false)
  
    const [userGenre, setUserGenre] = useState('')
    const [usersName, setUsersName] = useState('')
  
    const [userFoundFromToken, setUserFoundFromToken] = useState(localStorage.getItem('usersToken'))
  
    const [biensList, setBiensList] = useState([])

    var handleLogout = () => {
        localStorage.removeItem('usersToken')
        setLogInAccepted(false)
    }
    
        
    useEffect(async() => {

        var rawGetBiens = await fetch('/getBiens')
        var getBiensJson = rawGetBiens.json()
            .then(function(response){
                setBiensList(response.biens)
            })


  
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


  
        console.log("biensList :", biensList)
         
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

        <NavBarAdmin pageName="GERES LES MESSAGES" />


        <Row style={{display: 'flex', justifyContent:"center", alignItems: "center", marginTop: 30, marginBottom: 30}}>
            <span style={{fontSize: 40, fontWeight: "bold", color: "#206A37"}}>Vos messages :</span>
        </Row>

        <Row style={firstRow}>

            <Link to="/adminMessage" style={{display: 'flex', justifyContent: 'center', alignItems:'center', width: "90%", border: "2px solid #206A37", padding: 15, borderRadius: 5, backgroundColor: "rgb(255,255,255, 0.7)", color: "#206A37", flexDirection: "column", marginBottom: 5}}>
                <Row style={{display: 'flex', justifyContent: 'center', alignItems:'center', width: "100%", marginBottom: 10}}>
                    <Col xs="11" style={{padding: 0, display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                        <span style={{marginRight: "15px", fontSize: 20, fontWeight: "bold"}}>Charles Benoit</span>
                        <span style={{border: "2px solid red", borderRadius: 100, color: "red", width: "80px", height: "30px", display: "flex", justifyContent: "center", alignItems: "center"}}>Non lu</span>
                    </Col>
                    <Col xs="1" style={{padding: 0, display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
                        <span>1 jours</span>
                    </Col>
                </Row>
                <Row style={{display: 'flex', justifyContent: 'center', alignItems:'center', width: "100%"}}>
                    <Col xs= "11" style={{padding: 0, display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                        Bonjour, Je veux estimer mon bien.
                    </Col>
                    <Col xs="1" style={{padding: 0, display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
                        <FaTrash style={{width: 20, height: 20}}/>
                    </Col>
                </Row>
            </Link>
            <Link to="/adminMessage" style={{display: 'flex', justifyContent: 'center', alignItems:'center', width: "90%", border: "2px solid #206A37", padding: 15, borderRadius: 5, backgroundColor: "rgb(255,255,255, 0.7)", color: "#206A37", flexDirection: "column"}}>
                <Row style={{display: 'flex', justifyContent: 'center', alignItems:'center', width: "100%", marginBottom: 10}}>
                    <Col xs="11" style={{padding: 0, display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                        <span style={{marginRight: "15px", fontSize: 20, fontWeight: "bold"}}>Marie Martin</span>
                        <span style={{border: "2px solid green", borderRadius: 100, color: "green", width: "80px", height: "30px", display: "flex", justifyContent: "center", alignItems: "center"}}>Lu</span>
                    </Col>
                    <Col xs="1" style={{padding: 0, display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
                        <span>7 jours</span>
                    </Col>
                </Row>
                <Row style={{display: 'flex', justifyContent: 'center', alignItems:'center', width: "100%"}}>
                    <Col xs= "11" style={{padding: 0, display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                        Bonjour, Je cherche un appartement avec 3 piéces à cote de Ranelagh.
                    </Col>
                    <Col xs="1" style={{padding: 0, display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
                        <FaTrash style={{width: 20, height: 20}}/>
                    </Col>
                </Row>
            </Link>

        </Row>

    </Container>

</motion.div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        onChooseCategory : function(thisCategory) {
            dispatch( {type: "addCategory", category: thisCategory})
        }
    }
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
    width: '100%',
    justifySelf: 'center',
    alignSelf: 'center',
    marginTop: '20px',
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
      marginTop: '10px',
      justifySelf: 'center', 
      alignSelf: 'center'
  }
  
  
   var styleRow = {
      backgroundColor: '#206A37', 
      color: 'white', 
      width: '100%', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      marginTop: '10px', 
      marginBottom: '10px', 
      paddingTop: '10px', 
      paddingBottom: '10px', 
      fontSize: 20, 
      boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'
  }



export default connect(
    null, 
    mapDispatchToProps
) (AdminGererMessages);
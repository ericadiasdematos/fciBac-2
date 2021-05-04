import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Col, Popover, Input, PopoverBody, Button, Badge  } from 'reactstrap';
import photo from './images/PageWishlist.png'
import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import user from './images/user.png'
import Footer from './Footer'
import { motion } from 'framer-motion'
import { FaUserCircle } from 'react-icons/fa';
import { BsFillTrashFill } from 'react-icons/bs';
import {connect} from "react-redux"
import NavBar from "./NavBar"






function Wishlist(props) {

  function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const [logInMessage, setLogInMessage] = useState([])

  const [logInAccepted, setLogInAccepted] = useState(false)

  const [userGenre, setUserGenre] = useState('')
  const [usersName, setUsersName] = useState('')
  const [deleteFav, setDeleteFav] = useState(false)
  const [biensFavoris, setBiensFavoris] = useState([])

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

      var getBiensFavoris = await fetch('/getBiensFavoris', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          userTokenFromFront: userFoundFromToken,
        })
      })
        .then(response => response.json()
          .then(json => setBiensFavoris(json.tableauDeBiensFavoris) ))


  


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

  async function deleteBienFavoris(id){

    console.log("id :", id)

    var deleteBien = await fetch('/supprimerBienFavori', {
      method: 'DELETE',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        idFromFront: id,
        userTokenFromFront: userFoundFromToken,
      })
    })
      .then(response => response.json()
        .then(json => setBiensFavoris(json.tableauDeBiensFavoris)))

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

        <NavBar pageName="M E S &nbsp; F A V O R I S" />


        {
                biensFavoris.map(function(bien, i){
  
                    var bienImage = bien.photos[0]
                    var caption100 = bien.description.substring(0,200) + " ...";
                  
            
                    return(
                    <span  style={firstRow} key={i} onClick={()=>props.onBienClick(bien)}>
                        <Col xs='12' lg='3' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', justifySelf: 'center', alignSelf: 'center', height:'100%'}}>
                          <Link to='/bien' style={linkStyle}>
                            <img src={decodeURIComponent(bienImage)} style={{width: '200px', height: '200px', display:'flex', justifySelf: 'center', alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}} fluid />
                          </Link>
                        </Col>
            
                      
                      <Col xs='12' lg='9' style={{display:'flex', alignItems:'center', justifyContent: 'center', flexDirection: 'column'}}>
                        
                            <Row style={{width: "100%", marginBottom: 10, color: "#206A37", display: "flex", justifyContent: "space-between", }}>
                              <Link to='/bien' style={linkStyle}>
                                <Col xs="10">
                                  <Row>{bien.typeBien}</Row>
                                  <Row><strong> {bien.nbPieces} p -  ch - {bien.surfaceTotal} m² </strong></Row>
                                </Col>
                                <Col xs="2">
                                  <Badge style={{backgroundColor: '#206A37', fontSize:'calc(0.5em + 0.5vw)'}}>{numberWithSpaces(bien.prixBien)} €</Badge>
                                </Col>
                              </Link>
                            </Row>

                            <Row style={{width: "100%", display: "flex", flexDirection: "column", marginBottom: 10, color: "#206A37"}}>
                              <Link to='/bien' style={linkStyle}>
                                <span>{bien.ville} - {bien.codePostal}</span>
                              </Link>
                            </Row>
            
                          <Row style={{width: "100%", display: "flex", justifyContent: "space-between", marginRight: 5}}>
                            <Col xs="10">
                              <span style={{fontSize: 'calc(0.5em + 0.4vw)', color: "#a6a6a6",}}>{caption100}</span>
                            </Col>
                            <Col xs="2" style={{display: "flex", justifyContent: "flex-end"}}>
                              <BsFillTrashFill style={{height: 20, width: 20, marginRight: 5, color: "#206A37", cursor: "pointer"}} onClick={()=>deleteBienFavoris(bien._id)}/>
                            </Col>
                          </Row>
                      </Col>

                    </span>
                    )
                  })
            }

      </Container>
      <Footer/>

</motion.div>
  );
}


function mapDispatchToProps(dispatch) {
  return {
    onBienClick: function(info) {
      dispatch( {type: "sendBienInfo", whatInfo: info} )
    }
  }
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

var firstRow = {
  height: 'auto',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(255,255,255, 0.9)',
  width: '60%',
  justifySelf: 'center',
  alignSelf: 'center',
  marginTop: 'calc(0.5em + 0.5vw)',
  marginBottom: 'calc(0.5em + 0.5vw)',
  borderRadius: '10px',
  border: 0
}

var linkStyle = {
  width: "100%",
  display: 'flex',
  color: "#206A37"
}



export default connect(
  null,
  mapDispatchToProps
)(Wishlist)
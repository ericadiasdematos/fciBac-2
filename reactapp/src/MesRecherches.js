import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Popover, Input, PopoverBody, Button, Badge   } from 'reactstrap';
import photo from './images/PageMesRecherches.png'
import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import user from './images/user.png'
import { BsFillTrashFill } from 'react-icons/bs';
import Footer from './Footer'
import { motion } from 'framer-motion'
import { FaUserCircle } from 'react-icons/fa';
import { connect } from "react-redux"
import { Tag } from 'antd';
import { FaMapMarkerAlt } from 'react-icons/fa';
import NavBar from "./NavBar"





function MesRecherches(props) {

  function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [day, mnth, date.getFullYear()].join("/");
}

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const [logInMessage, setLogInMessage] = useState([])

    const [logInAccepted, setLogInAccepted] = useState(false)
  
  
    const [userGenre, setUserGenre] = useState('')
    const [usersName, setUsersName] = useState('')
  
    const [userFoundFromToken, setUserFoundFromToken] = useState(localStorage.getItem('usersToken'))
    const [tableauDeMesRecherches, setTableauDeMesRecherches] = useState([])



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
      
      var tempoTableau = []
      var tableauFiltered = []
      var getMesRecherces = await fetch('/getMesRecherches', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          userTokenFromFront: userFoundFromToken,
        })
      })
        .then(response => response.json()
          .then(json =>  tempoTableau = json.tableauDeMesRecherches))

          setTableauDeMesRecherches(tempoTableau)

       
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
                    <Button size='sm' style={{width: '28vh', marginBottom: '1vh', backgroundColor: '#206A37'}}><Link to='/mesrecherches'>Voir mes dernieres recherches</Link></Button>
                    <Button size='sm' style={{width: '28vh', backgroundColor: '#206A37'}} onClick={()=>handleLogout()}>Se déconecter</Button>
                </PopoverBody>
  }


  async function handleDelete(id){

    var getBiensFavoris = await fetch('/deleteMaRecherche', {
      method: 'DELETE',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        userTokenFromFront: userFoundFromToken,
        idFromFront: id
      })
    })
      .then(response => response.json()
        .then(json => setTableauDeMesRecherches(json.tableauDeMesRecherches)))
        }
        
        
  

  return (
<motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{opacity: 0 }}
>
      <Container style={BackgroundImage}>

        <NavBar pageName="M E S &nbsp; R E C H E R C H E S" />


        <Row style={titreStyle}>
          <span>Voici vos dernieres recherches :</span>
        </Row>

        { tableauDeMesRecherches.map(function(recherche, i){

          var typedeTransaction = 
          <span>
            <span style={{fontWeight: "bold"}}>Type de Transaction : &nbsp;</span><span>{recherche.typeDeTransaction}</span>
          </span>
          var typeBien;
          var budgetMin;
          var budgetMax;
          var localisation;
          var surfaceMin;
          var surfaceMax;
          var terrainMin;
          var terrainMax;
          var nombrePieces;
          var nombreChambres;
          if(recherche.typeDeBien[0] != "Vous n'avez pas séléctionné un type de bien"){
            typeBien = 
            <span style={{display: "flex", flexDirection: "row", marginRight: 5 }}>
              <span style={{fontWeight: "bold"}}>Type de Bien : &nbsp;</span><span>{recherche.typeDeBien.join(', ')}</span>
            </span>
          }
          if(recherche.budgetMin != ""){
            budgetMin = 
            <span  style={{display: "flex", flexDirection: "row", marginRight: 5}}>
              <span style={{fontWeight: "bold"}}>Budget Min : &nbsp;</span><span> {recherche.budgetMin}</span>
            </span>
          }
          if(recherche.budgetMax != ""){
            budgetMax = 
            <span  style={{display: "flex", flexDirection: "row", marginRight: 5}}>
              <span style={{fontWeight: "bold"}}>Budget Max : &nbsp;</span><span> {recherche.budgetMax}</span>
            </span>
          }
          if(recherche.localisation != undefined){
              localisation = 
              <span  style={{display: "flex", flexDirection: "row", marginRight: 5}}>
                <span style={{fontWeight: "bold"}}>Localisation: &nbsp;</span><span> {recherche.localisation}</span>
              </span>
          }
          if(recherche.mapBounds.length != 0){
            localisation = 
            <span  style={{display: "flex", flexDirection: "row", marginRight: 5}}>
              <span style={{fontWeight: "bold"}}>Localisation: &nbsp;</span>
              <span>
                <Tag icon={<FaMapMarkerAlt style={{marginRight: 3}} />} color="success" style={{padding: 5, display: "flex", justifyContent: "center", alignItems: "center"}}>
                  Coordonnées de la carte
                </Tag>
              </span>
            </span>
          }
          if(recherche.surfaceMin != undefined){
            surfaceMin = 
            <span style={{display: "flex", flexDirection: "row", marginRight: 5 }}>
              <span style={{fontWeight: "bold"}}>Surface Min: &nbsp;</span><span> {numberWithSpaces(recherche.surfaceMin)}</span>
            </span>
          }
          if(recherche.surfaceMax != undefined){
            surfaceMax = 
            <span  style={{display: "flex", flexDirection: "row", marginRight: 5}}>
              <span style={{fontWeight: "bold"}}>Surface Max: </span><span> {numberWithSpaces(recherche.surfaceMax)}</span>
            </span>
          }
          if(recherche.terrainMin != undefined){
            terrainMin =
            <span  style={{display: "flex", flexDirection: "row", marginRight: 5}}>
              <span style={{fontWeight: "bold"}}>Terrain Min: </span><span> {numberWithSpaces(recherche.terrainMin)}</span>
            </span>
          }
          if(recherche.terrainMax != undefined){
            terrainMax = 
            <span  style={{display: "flex", flexDirection: "row", marginRight: 5}}>
              <span style={{fontWeight: "bold"}}>Terrain Max: </span><span> {numberWithSpaces(recherche.terrainMax)}</span>
            </span>
          }
          if(recherche.nbPieces != undefined){
            nombrePieces =
            <span  style={{display: "flex", flexDirection: "row", marginRight: 5}}>
              <span style={{fontWeight: "bold"}}>Nombre de pièces: </span><span> {recherche.nbPieces}</span>
            </span>
          }
          if(recherche.nbChambres != undefined){
            nombreChambres =
            <span  style={{display: "flex", flexDirection: "row", marginRight: 5}}>
            <span style={{fontWeight: "bold"}}>Nombre de chambres: </span><span> {recherche.nbChambres}</span>
            </span>
          }
          var pasDeType = false
          if(recherche.typeDeBien[0] === "Vous n'avez pas séléctionné un type de bien"){
            pasDeType = true
          }
          var appBoolean = false
          var maisonBoolean = false
          var loftBoolean = false
          var terrainBoolean = false
          var bureauBoolean = false
          var fondCommerceBoolean = false
          var hotelPBoolean = false
          var immeubleBoolean = false
          var parkingBoolean = false


          if(recherche.typeDeBien.includes("Appartement") === true){
            appBoolean = true
          }
          if(recherche.typeDeBien.includes("Maison") === true){
            maisonBoolean = true
          }
          if(recherche.typeDeBien.includes("Loft") === true){
            loftBoolean = true
          }
          if(recherche.typeDeBien.includes("Terrain") === true){
            terrainBoolean = true
          }
          if(recherche.typeDeBien.includes("Bureau") === true){
            bureauBoolean = true
          }
          if(recherche.typeDeBien.includes("Fond de Commerce") === true){
            fondCommerceBoolean = true
          }
          if(recherche.typeDeBien.includes("Hotel Particulier") === true){
            hotelPBoolean = true
          }
          if(recherche.typeDeBien.includes("Immeuble") === true){
            immeubleBoolean = true
          }
          if(recherche.typeDeBien.includes("Parking / Box") === true){
            parkingBoolean = true
          }
          var filtersToSendToRedux = {
            endroit: {
              label: recherche.localisation
            },
            noBiensSelected: pasDeType,
            typedeTransaction: recherche.typeDeTransaction,
            appartement: appBoolean,
            maison: maisonBoolean,
            loft: loftBoolean,
            terrain: terrainBoolean,
            bureau: bureauBoolean,
            fondCommerce: fondCommerceBoolean,
            hotelP: hotelPBoolean,
            immeuble: immeubleBoolean,
            parking: parkingBoolean
          }
          return(

                <Row style={rechercheStyle}>
                  <Col xs="2" style={{display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between", color: "#888888"}}>
                    <span>Filtres :</span>
                    <span>{convert(recherche.date)}</span>
                  </Col>
                  <Col xs="8" style={{display: "flex"}}>
                    <Col xs="6" style={{display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: "column"}}>
                      {typedeTransaction}
                      {typeBien}
                      {budgetMin}
                      {budgetMax}
                      {localisation}
                      {surfaceMin}
                    </Col>
                    <Col xs="6" style={{display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: "column"}}>
                      {surfaceMax}
                      {terrainMin}
                      {terrainMax}
                      {nombrePieces}
                      {nombreChambres}
                    </Col>
                  </Col>
                  <Col xs="2" style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                    <Row style={{display: "flex", justifyContent: "flex-end", alignItems: "self-start"}}>
                      <BsFillTrashFill onClick={()=>handleDelete(recherche._id)} style={{height: 25, width: 25, color: "#206A37", cursor: "pointer"}}/>
                    </Row>
                    <Row  style={{display: "flex", justifyContent: "flex-end", alignItems: "self-end"}}>
                      <Button onClick={()=>console.log(filtersToSendToRedux)} style={{backgroundColor: '#206A37', fontSize: 10}}>
                        <Link to="/resultats" style={{color: "white"}}>
                          Utiliser ces filtres de recherche
                        </Link>
                      </Button>
                    </Row>
                  </Col>
                </Row>

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
    onClickValider: function(filtres) {
      dispatch( {type: "filtersFromRecherche", whatFilters: filtres} )
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

var titreStyle = {
  display: "flex", 
  justifyContent: "center", 
  alignItems: "center", 
  backgroundColor: 'rgba(255,255,255, 0.9)', 
  color: '#206A37', 
  fontWeight: "bold", 
  marginTop: 20, 
  marginBottom: 20, 
  width: "30%", 
  justifySelf: "center", 
  alignSelf: "center", 
  padding: 10, 
  borderRadius: 10, 
  fontSize: 20
}

var rechercheStyle = {
  display: "flex", 
  justifySelf: "center",
  alignSelf: "center",
  backgroundColor: 'rgba(255,255,255, 0.9)', 
  marginTop: 20, 
  marginBottom: 20, 
  width: "70%", 
  padding: 10, 
  borderRadius: 10, 
}

var descRow = {
  display: 'flex',
  flexDirection: 'column',
  justifySelf: 'center',
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '16px',
  width: '100%'
}

var styleRow1 = {
  width: 'auto',
  backgroundColor: 'rgba(255,255,255, 0.9)',
  borderRadius: 10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '15px',
  fontSize: 'calc(0.8em + 0.8vw)',
  color: '#206A37',
  fontWeight: "bold"
}

var styleRow2 = {
  backgroundColor: 'rgba(255,255,255, 0.9)',
  borderRadius: 10,
  padding: '15px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '15px',
  padding: 20
}

var styleRowInside = {
  width: '100%',
}

var styleFiltres = {
  display: 'flex',
  justifyContent: 'center',
  justifySelf: 'center',
  alignSelf: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 5,
  borderRadius: 5
}

var styleButtons = {
  marginLeft: '5px',
  backgroundColor: '#206A37'
}


export default connect(
  null,
  mapDispatchToProps
)(MesRecherches)
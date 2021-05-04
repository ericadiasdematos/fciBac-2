import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Popover, Input, PopoverBody, Button, Spinner, ButtonGroup } from 'reactstrap';
import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import user from './images/user.png'
import 'react-alice-carousel/lib/alice-carousel.css';
import PictureCarousel from './carosel'
import { FaRegHeart } from 'react-icons/fa';
import { FaMap } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { BiArrowBack } from 'react-icons/bi';
import { Table } from 'reactstrap';
import energy from './images/energieExample.gif'
import emailjs from 'emailjs-com';
import Footer from './Footer'
import Car from './car'
import { motion } from 'framer-motion'
import { FaUserCircle } from 'react-icons/fa';
import { GiConfirmed } from 'react-icons/gi';
import {connect} from "react-redux"
import NavBar from "./NavBar"





function PageBien(props) {

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

  const [buttonClicked, setButtonClicked] = useState('Général')
  const [bienAVendre, setBienAVendre] = useState(null);
  const [heart, setHeart] = useState(false)
  const [userFoundFromToken, setUserFoundFromToken] = useState(localStorage.getItem('usersToken'))

  const [nomClient, setNomClient] = useState('')
  const [prenomClient, setPrenomClient] = useState('')
  const [telClient, setTelClient] = useState('')
  const [messageResult, setMessageResult] = useState('')
  const [bienFromRedux, setBienFromRedux] = useState(props.bienToDisplay)
  const [sendClicked, setSendClicked] = useState(false)
  const [bienIncludedInFavoris, setBienIncludedInFavoris] = useState(false)
  // const [bienAVendreClient, setBienAVendreClient] = useState('')

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

      console.log("bienFromRedux :", bienFromRedux)

      var checkIfBienIsFavorite = await fetch('/checkIfBienIsInWishlist', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          idFromFront: bienFromRedux._id,
          userTokenFromFront: userFoundFromToken,
        })
      })
        .then(response => response.json()
          .then(json => setBienIncludedInFavoris(json.includesBien)))
       
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

  const sendEmail=()=> {
    setSendClicked(true)
      
    emailjs.send('service_k47enb9', 'template_3zyynoq', {raison_message: 'Interresé par bien', nom_client: nomClient, premon_client: prenomClient, tel_client: telClient, bien_interrese: '1234', bien_a_vendre: bienAVendre}, 'user_TImKxpycj1WcmG7hCooDa')
      .then((result) => {
          console.log(result.text);
          setMessageResult(result.text)
      }, (error) => {
          console.log(error.text);
      });
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


  async function AddToFavoris(){
    setHeart(true)

    var rawData = await fetch('/addBienToFavoris', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        userTokenFromFront: userFoundFromToken,
        bienIdFromFront: bienFromRedux._id
      })

});
  }


  var sauvegarderButton = 
  <Button onClick={()=>AddToFavoris()} style={{backgroundColor: "#206A37"}}>
    <FaHeart style={{color:'white', width: 20, height: 20, marginRight: 5}}/>
    Sauvegarder sur favoris
  </Button>

  if(bienIncludedInFavoris === true){
    sauvegarderButton = 
    <Button style={{backgroundColor: "#206A37"}}>
      <GiConfirmed style={{color:'white', width: 20, height: 20, marginRight: 5}} />
      <span>Ce bien est sauvegardé sur vos favoris</span>
    </Button>
  }

  if(heart === true){
    sauvegarderButton = 
  <Button style={{backgroundColor: "#206A37"}}>
    <GiConfirmed style={{color:'white', width: 20, height: 20, marginRight: 5}} />
    <span>Ce bien est sauvegardé sur vos favoris</span>
  </Button>

  }

  var infoShown;
  var jardin;
  var balcon;
  var terrasse;
  var piscine;

  if(bienFromRedux.terrasseBoolean === "Oui"){
    terrasse = <li>Terrasse : {bienFromRedux.terrasseBoolean}</li>
  }
  if(bienFromRedux.jardinBoolean === "Oui"){
    jardin = <li>Jardin : {bienFromRedux.jardinBoolean}</li>
    
  }
  if(bienFromRedux.piscineBoolean === "Oui"){
    piscine = <li>Piscine : {bienFromRedux.piscineBoolean}</li>
  }
  if(bienFromRedux.balconBoolean === "Oui"){
    balcon = <li>Balcon : {bienFromRedux.balconBoolean}</li>
  }

  function handleBienAvendre(answer){
    setBienAVendre(answer)
  }

  var styleOui;
  var styleNon;
  if(bienAVendre === "Oui"){
    styleOui = {
      textDecoration: "underline",
    }
    styleNon = {
      textDecoration: "none",
    }
  }
  if(bienAVendre === "Non"){
    styleNon = {
      textDecoration: "underline",
    }
    styleOui = {
      textDecoration: "none",
    }
  }

  if(buttonClicked === 'Général'){

    infoShown = 
      <Col xs="12">
        <Row style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Row style={{display: 'flex', justifySelf: 'center', alignSelf: 'flex-start', marginLeft: '5px', fontSize: 25, color: '#206A37'}}><strong>Général :</strong></Row>
          <Row style={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
            <Col xs='6'>
              <ul>
                <li>Surface de {bienFromRedux.surfaceTotal} m²</li>
                <li>{bienFromRedux.nbPieces} pieces</li>
                <li>{bienFromRedux.nbChambres} chambres</li>
                <li>{bienFromRedux.etages} etage(s)</li>
                <li>Année de construction: {bienFromRedux.anneeDeConstruction}</li>
              </ul>
            </Col>
            <Col xs='6'>
              <ul>
                {jardin}
                {piscine}
                {terrasse}
                {balcon}
              </ul>
            </Col>
          </Row>
        </Row>
        <Row style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Row style={{display: 'flex', justifySelf: 'center', alignSelf: 'flex-start', marginLeft: '5px', fontSize: 25, color: '#206A37'}}><strong>Description :</strong></Row>
          <Row style={{display: 'flex', width: '98%', textAlign: 'start'}}>{bienFromRedux.description}</Row>
        </Row>
      </Col>
    
  }

  if(buttonClicked === 'Localisation'){
    infoShown = 
      <Col xs='6' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
        <Row style={{width: '100%'}}>
          <Table striped style={{border: '2px solid white'}}>
            <tbody>
              <tr>
                <th scope="row">VILLE :</th>
                <td>{bienFromRedux.ville}</td>
              </tr>
              <tr>
                <th scope="row">CODE POSTAL :</th>
                <td>{bienFromRedux.codePostal}</td>
              </tr>
              <tr>
                <th scope="row">PAYS :</th>
                <td>{bienFromRedux.pays}</td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </Col>
  }

  if(buttonClicked === 'Energie'){

    infoShown =
    <span style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Col xs='6' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Table striped style={{border: '2px solid white'}}>
          <tbody>
            <tr>
              <th scope="row">Indice d'émission de gaz à effet de serre</th>
              <td>{bienFromRedux.gazEffetSerre}</td>
            </tr>
            <tr>
              <th scope="row">Diagnostic de performance énergétique :</th>
              <td>{bienFromRedux.valeurGazSerre}</td>
            </tr>
            <tr>
              <th scope="row">Valeur conso annuelle énergie :</th>
              <td>{bienFromRedux.valeurConsoAnnuelle}</td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </span>

  }

  if(buttonClicked === 'Coproriete'){

    infoShown = 
    <Col xs="8">
        <Table striped style={{border: '2px solid white'}}>
          <tbody>
            <tr>
              <th scope="row">Bien en copropriété :</th>
              <td>{bienFromRedux.copro}</td>
            </tr>
            <tr>
              <th scope="row">Nb Lots Copropriété :</th>
              <td>{bienFromRedux.nbLots}</td>
            </tr>
            <tr>
              <th scope="row">Dont lots d'habitation :</th>
              <td>{bienFromRedux.nbLotsHabitation}</td>
            </tr>
            <tr>
              <th scope="row">Charges annuelles :</th>
              <td>{bienFromRedux.chargesAnuelles} €</td>
            </tr>
            <tr>
              <th scope="row">Procédures diligentées c/ syndicat de copropriété :</th>
              <td>{bienFromRedux.proceduresCopro}</td>
            </tr>
          </tbody>
        </Table>
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
            <Input placeholder='Nom' style={styleInput} onChange={(e)=>setNomClient(e.target.value)}></Input>
          </Row>
          <Row>
            <Input placeholder='Prénom' style={styleInput} onChange={(e)=>setPrenomClient(e.target.value)}></Input>
          </Row>
          <Row>
            <Input placeholder='Téléphone' style={styleInput} onChange={(e)=>setTelClient(e.target.value)}></Input>
          </Row>
          <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: 3}}>
            <Row>Avez-vous un bien à vendre?</Row>
            <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
              <ButtonGroup style={{width: '100%'}}>
                <Button color="success" onClick={() => handleBienAvendre("Oui")} active={bienAVendre === 1} style={styleOui} >Oui</Button>
                <Button color="success" onClick={() => handleBienAvendre('Non')} active={bienAVendre === 2} style={styleNon} >Non</Button>
               </ButtonGroup>
            </Row>
          </Row>
          <Row>
            <Button color="success" style={{color: 'white', width: '100%'}} onClick={sendEmail}>Contacter l’agence</Button>
          </Row>
    </Col>
  }

  if(sendClicked === true){
    infoShown = <Spinner color="success"  style={{marginBottom: 10}}/>
  }

  if(messageResult === 'OK'){

    infoShown = <span style={{fontSize: 25, color: '#206A37', textAlign: 'center', padding: 10}}>Votre demande a été envoyé! Nous vous répondrons dans les plus brefs délais.</span>
  }



  return (
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{opacity: 0 }}
>

      <Container style={BackgroundImage}>

        <NavBar pageName="&nbsp;" />


        <Row style={descRow}>

          <Row style={{width: "100%", marginBottom: 30, display: "flex", justifyContent: "flex-start"}}>
            <Link to="/resultats">
              <Button style={{color: "#206A37", backgroundColor: "white"}}>
                <BiArrowBack style={{marginRight: 5}}/>
                Revenir aux Resultats
              </Button>
            </Link>
          </Row>

          <Col xs='12' lg='6' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', alignSelf: 'center', justifySelf: 'center'}}>
            <PictureCarousel/>
          </Col>

        </Row>

        <Row style={descRow2}>
          <Col xs='12' lg='6'>
            <Row style={{marginLeft: '3px', fontSize: 25}}><strong>Maison</strong></Row>
            <Row style={{marginLeft: '3px'}}>{bienFromRedux.nbPieces} p - {bienFromRedux.nbChambres} ch  -  {bienFromRedux.surfaceTotal} m²</Row>
            <Row style={{marginLeft: '3px'}}>{bienFromRedux.ville} - {bienFromRedux.codePostal}</Row>
          </Col>

          <Col xs='12' lg='6' style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-end', flexDirection: 'column'}}>
            <Row style={{marginRight: '3px', fontSize: 25}}>{numberWithSpaces(bienFromRedux.prixBien)} €</Row>
            <Row style={{marginRight: '3px'}}>
              {sauvegarderButton}
            </Row>
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
      <Footer/>

</motion.div>
  );
}

function mapStateToProps(state) {
  return {
    bienToDisplay: state.bienSelected
  }
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
  backgroundImage: 'linear-gradient(to right bottom, #176b2b, #419068, #74b4a0, #b1d7d1, #f4fafa)',
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
  flexDirection: "column",
  justifySelf: 'center',
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
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
  padding: '15px',
  backgroundColor: 'rgba(255,255,255, 0.8)'
}



export default connect(
  mapStateToProps,
  null
)(PageBien);
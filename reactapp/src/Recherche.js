import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Popover, Input, PopoverBody, Button, Label  } from 'reactstrap';
import photo from './images/PageRechercher1.png'
import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import user from './images/user.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Divider } from 'antd';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPencilRuler} from '@fortawesome/free-solid-svg-icons'
import {faHistory} from '@fortawesome/free-solid-svg-icons'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import Footer from './Footer'
import { motion } from 'framer-motion'
import { FaUserCircle } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { InputNumber, Tag } from 'antd';
import 'antd/dist/antd.css';
import NavBar from "./NavBar"






function Recherche(props) {

  function onChangeBudgetMin(value) {
    setBudgetMin(value)
    console.log('changed', value);
  }
  function onChangeBudgetMax(value) {
    setBudgetMax(value)
    console.log('changed', value);
  }




  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [logInMessage, setLogInMessage] = useState([])
  const [logInAccepted, setLogInAccepted] = useState(false)
  const [userGenre, setUserGenre] = useState('')
  const [usersName, setUsersName] = useState('')
  const [userFoundFromToken, setUserFoundFromToken] = useState(localStorage.getItem('usersToken'))


  const [place, setPlace] = useState("")
  const [codeP, setCodeP] = useState("")
  const [placeToSend, setPlaceToSend] = useState({})
  const [cord, setCord] = useState({})
  const [budgetMax, setBudgetMax] = useState("")
  const [budgetMin, setBudgetMin] = useState("")
  const [appartement, setAppartement] = useState(false)
  const [maison, setMaison] = useState(false)
  const [loft, setLoft] = useState(false)
  const [bureau, setBureau] = useState(false)
  const [hP, setHP] = useState(false)
  const [parking, setParking] = useState(false)
  const [battiment, setBattiment] = useState(false)
  const [fondCommerce, setFondsCommerce] = useState(false)
  const [terrain, setTerrain] = useState(false)
  const [grange, setGrange] = useState(false)
  const [locations, setLocations] = useState([])
  const [noTypeDeBien, setNoTypeDeBien] = useState(false)
  const [boundsFromRedux, setBoundsFromRedux] = useState(props.boundsToDisplay)
  const [showLocationInputs, setShowLocationInputs] = useState(true)

  

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

      // props.onBoundsValider([])
 
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

  
  
  async function handleValider() {

    console.log(place)
    
    // geocodeByAddress(place.label)
    // .then(results => getLatLng(results[0]))
    // .then(({ lat, lng }) =>
    //   console.log('Successfully got latitude and longitude', { lat, lng })
    // );
    var noBienType = false
    if(
      appartement === false &&
      maison === false &&
      loft === false &&
      bureau === false &&
      hP === false &&
      parking === false &&
      battiment === false &&
      fondCommerce === false &&
      terrain === false &&
      grange === false
    ){
      noBienType = true
    }


    var allFilters = {
      endroit: place,
      mapBounds: boundsFromRedux,
      codeP: codeP,
      prixMin: budgetMin,
      prixMax: budgetMax,
      appartement: appartement,
      maison: maison,
      loft: loft,
      bureau: bureau,
      hotelP: hP,
      immeuble: battiment,
      parking: parking,
      fondCommerce: fondCommerce,
      terrain: terrain,
      grange: grange,
      typedeTransaction: props.typeTransactionToDisplay,
      noBiensSelected: noBienType
    }
    props.onClickValider(allFilters)
    // localStorage.setItem('filtersFromRecherche', JSON.stringify(allFilters))

    var getSaveFiltersInRecherche = await fetch('/addFiltersInRecherches', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        tokenFromFront: userFoundFromToken,
        filtersFromFront: allFilters,
      })

});

    var filtersInRecherche = await getSaveFiltersInRecherche.json()
    console.log("dataGetBiens :", filtersInRecherche)

  }

  var inputTerrain;
  var inputFondsCommerce;

  if(props.typeTransactionToDisplay === "Acheter"){

    inputTerrain =

    <Col xs='12' lg='2' style={styleColRadio}>
      <Label check style={radioButtonsStyle}>
        <Input type="checkbox" name="Terrain" checked={terrain} onChange={(e)=>setTerrain(e.target.checked)}/>
        Terrain
      </Label>
    </Col>

    inputFondsCommerce = 

    <Col xs='12' lg='2' style={styleColRadio}>
      <Label check style={radioButtonsStyle}>
        <Input type="checkbox" name="Fonds de Commerce" checked={fondCommerce} onChange={(e)=>setFondsCommerce(e.target.checked)}/>
        Fonds de Commerce
      </Label>
    </Col>
  }

  var allInputs =
      <span style={{width: "100%", marginBottom: 30, marginTop: 30, display: 'flex', justifySelf: "center", alignItems: "center", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
          <Row style={{diplay:'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
            <Col xs='12' lg='2' style={styleColRadio}>
              <Label check style={radioButtonsStyle}>
                <Input type="checkbox" name="Appartement" checked={appartement} onChange={(e)=>setAppartement(e.target.checked)} />
                Appartement
              </Label>
            </Col>
            <Col xs='12' lg='2' style={styleColRadio}>
              <Label check style={radioButtonsStyle}>
                <Input type="checkbox" name="Maison" checked={maison} onChange={(e)=>setMaison(e.target.checked)}/>
                Maison
              </Label>
            </Col>
            <Col xs='12' lg='2' style={styleColRadio}>
              <Label check style={radioButtonsStyle}>
                <Input type="checkbox" name="Loft" checked={loft} onChange={(e)=>setLoft(e.target.checked)}/>
                Loft
              </Label>
            </Col>
            <Col xs='12' lg='2' style={styleColRadio}>
              <Label check style={radioButtonsStyle}>
                <Input type="checkbox" name="Bureau" checked={bureau} onChange={(e)=>setBureau(e.target.checked)}/>
                Bureau
              </Label>
            </Col>

          </Row>

          <Row style={{diplay:'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', marginTop: '15px'}}>
            <Col xs='12' lg='2' style={styleColRadio}>
              <Label check style={radioButtonsStyle}>
                <Input type="checkbox" name="Hôtel Particulier" checked={hP} onChange={(e)=>setHP(e.target.checked)}/>
                Hôtel Particulier
              </Label>
            </Col>
            <Col xs='12' lg='2' style={styleColRadio}>
              <Label check style={radioButtonsStyle}>
                <Input type="checkbox" name="Parking / Box" checked={parking} onChange={(e)=>setParking(e.target.checked)}/>
                Parking / Box
              </Label>
            </Col>
            <Col xs='12' lg='2' style={styleColRadio}>
              <Label check style={radioButtonsStyle}>
                <Input type="checkbox" name="Battiment / Immeuble" checked={battiment} onChange={(e)=>setBattiment(e.target.checked)}/>
                Immeuble
              </Label>
            </Col>
            {inputFondsCommerce}
            {inputTerrain}
          </Row>
      </span>

  if(props.typeTransactionToDisplay === "Viager"){
    allInputs = 
  <Row style={{diplay:'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', marginBottom: 30, marginTop: 30}}>
    <Col xs='12' lg='3' style={styleColRadio}>
      <Label check style={radioButtonsStyle}>
        <Input type="checkbox" name="Appartement" checked={appartement} onChange={(e)=>setAppartement(e.target.checked)} />
        Appartement
      </Label>
    </Col>
    <Col xs='12' lg='3' style={styleColRadio}>
      <Label check style={radioButtonsStyle}>
        <Input type="checkbox" name="Maison" checked={maison} onChange={(e)=>setMaison(e.target.checked)}/>
        Maison
      </Label>
    </Col>
    <Col xs='12' lg='3' style={styleColRadio}>
      <Label check style={radioButtonsStyle}>
        <Input type="checkbox" name="Loft" checked={loft} onChange={(e)=>setLoft(e.target.checked)}/>
        Loft
      </Label>
    </Col>
  </Row>


  }

  var transactionToShow;
  if(props.typeTransactionToDisplay === "Louer"){
    transactionToShow = "LOCATION"
  }
  if(props.typeTransactionToDisplay === "Acheter"){
    transactionToShow = "VENTE"
  }
  if(props.typeTransactionToDisplay === "Viager"){
    transactionToShow = "VIAGER"
  }

var mapButton = 
<Col xs='12' lg='3' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'flex-end', width: '100%', marginTop: 10}}>
  <Button size='sm' style={{backgroundColor: '#206A37'}}><Link to='/map' style={{color: 'white'}}><FontAwesomeIcon icon={faPencilRuler} style={{color: 'white', marginRight: 5}}/>Dessiner sur la map</Link></Button>
</Col>

var autocompleteStyle = {
  display: 'flex', 
  flexDirection: 'column', 
  justifyContent: 'center', 
  alignItems: 'center', 
  justifySelf: 'center', 
  alignSelf: 'center', 
  width: '100%'
}

 if(boundsFromRedux.length != 0){

autocompleteStyle = {
    display: "none"
  }

  mapButton =
  <Row  style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'flex-end', width: '100%'}}>
      <Tag icon={<FaMapMarkerAlt style={{marginRight: 3}} />} color="success" style={{padding: 5, display: "flex", justifyContent: "center", alignItems: "center"}}>
        Coordonnées de la carte
      </Tag>
   </Row>
 }


  return (

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{opacity: 0 }}
>

      <Container style={BackgroundImage}>

        <NavBar pageName="R E C H E R C H E"/>   

        <Row style={firstRow}>

        
          <Row>
            <Col xs='12' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
              <span style={spanContactezNous}>{transactionToShow}</span>
            </Col>
          </Row>
          
          <Divider style={{width: '100%', backgroundColor: '#206A37', height: '0.7px', margin: 0}} />

          <Row style={{width: "100%", marginTop: 10}}>
            <Col xs='12' lg='4' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 0 5px 0'}}>
              <Button size="sm" style={{backgroundColor: '#206A37', fontSize: 'calc(0.5em + 0.4vw)'}}><Link style={{color: 'white'}} to="/mesrecherches"><FontAwesomeIcon icon={faHistory} style={{color: 'white', margin: '2px'}}/>Voir mes dérnieres recherches</Link></Button>
            </Col>
          </Row>

          <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%', marginTop: '15px', marginBottom: 30}}>
            <Row  style={autocompleteStyle}>
              <span style={{color: '#206A37', textAlign: 'center'}}>Dans quelle ville? Quartier?</span>
                  <GooglePlacesAutocomplete
                      selectProps={{
                        place,
                        onChange: setPlace,
                        styles: {
                          input: (provided) => ({
                            ...provided,
                            color: '#206A37',
                            width: "200px",
                          }),
                        },
                      }}
                    apiKey="AIzaSyDFL0VzZ5rQB4FxgH_UWVlZXLBkkun_LSc" 
                    apiOptions={{ language: 'fr', region: 'fr' }}

                  />
            </Row>
            {mapButton}
          </Row>

          <Row style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: 10, width: "100%", justifySelf: "center", alignSelf: "center"}}>
            <span style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginRight: 5}}>
              <span style={{color: '#206A37', textAlign: 'center'}}>Votre budget Min?</span>
              <InputNumber
                size="middle"
                defaultValue={1000}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                value={budgetMin}
                onChange={onChangeBudgetMin}
                style={{width: "150px"}}
              />
            </span>
            <span style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginLeft: 5}}>
              <span style={{color: '#206A37', textAlign: 'center'}}>Votre budget Max?</span>
              <InputNumber
                size="middle"
                defaultValue={1000}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                value={budgetMax}
                onChange={onChangeBudgetMax}
                style={{width: "150px"}}
              />
            </span>
          </Row>


          {allInputs}

          <Row style={{width: '100%', marginTop:'1vw', marginBottom: '1vw', display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Col xs='12' lg='4'  style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 0 5px 0'}}>
              <Button size="sm" style={{backgroundColor: '#206A37',fontSize: 'calc(0.5em + 0.4vw)'}}><Link style={{color: 'white'}} to="/rechercheavances"><FontAwesomeIcon icon={faPlus} style={{color: 'white', margin: '2px'}}/>Recherche Avancé</Link></Button>
            </Col>
          </Row>

          <Button style={secondRow}>
            <Link to='/resultats' onClick={()=>handleValider()} style={{color: 'white', fontSize: 22, paddingLeft: 23, paddingRight: 23}}>Valider</Link>
          </Button>

        </Row>


      </Container>
      <Footer/>

</motion.div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    onClickValider: function(filtres) {
      dispatch( {type: "filtersFromRecherche", whatFilters: filtres} )
    },
    onBoundsValider: function(bounds) {
      dispatch( {type: "setLatAndLng", whatBounds: bounds} )
    }
  }
}



function mapStateToProps(state) {
  return {
    typeTransactionToDisplay: state.typedeTransaction,
    boundsToDisplay: state.latAndLng
  }
}

var BackgroundImage = {
  display: 'flex',
  flexDirection: 'column',
  minHeight:'100vh',
  height: 'auto',
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
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(255,255,255, 0.8)',
  width: '70%',
  justifySelf: 'center',
  alignSelf: 'center',
  borderRadius: '10px',
  border: 0,
  marginBottom: 30
}

var secondRow = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#206A37',
  justifySelf: 'center',
  alignSelf: 'center',
  borderRadius: '10px',
  paddingBottom: '10px',
  paddingTop: '7px',
  border: 0,
  marginTop: 10,
  marginBottom: 10
}


 var spanContactezNous = {
  display: 'flex',
  justifySelf: 'center',
  alignSelf: 'center',
  color: '#206A37',
  fontSize: 'calc(1em + 0.6vw)',
  marginBottom: '5px',
  textAlign: 'center',
  margin: 0,
  fontWeight: "bold"
}


var radioButtonsStyle = {
  textAlign: 'center',
  color: '#206A37',
  display: "flex",
  justifySelf: "center",
  alignSelf: "center"

  
}

var styleColRadio = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: "white",
  border: "1px solid #206A37",
  borderRadius: 10,
  padding: 5,
  marginRight: 10

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recherche);
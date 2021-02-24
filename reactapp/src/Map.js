import React ,{useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Popover, Input, PopoverBody, Button  } from 'reactstrap';
import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import user from './images/user.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import {GoogleMap, useLoadScript, Data, DrawingManager  } from '@react-google-maps/api'
import mapStyles from './mapSyles';
import usePlacesAutoComplete, {getGeocode, getLatLng} from "use-places-autocomplete"
import {Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from "@reach/combobox"
import "@reach/combobox/styles.css"
import { motion } from 'framer-motion'




/** MAP OPTIONS */
const libraries = ["places", "drawing"]
const mapContainerStyle={
  height: '80vh',
  width: '100%'
}
const center = {
  lat: 48.866667,
  lng: 2.333333,
}

const ExampleDrawingPropTypes = {
  styles: PropTypes.shape({
    container: PropTypes.object.isRequired,
  }).isRequired,
}

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,

}
/** MAP OPTIONS */


function Map() {

  /** LOG IN OPTIONS */

  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const [logInMessage, setLogInMessage] = useState([])

  const [logInAccepted, setLogInAccepted] = useState(false)

  const [userGenre, setUserGenre] = useState('')
  const [usersName, setUsersName] = useState('')

  const [userFoundFromToken, setUserFoundFromToken] = useState(localStorage.getItem('usersToken'))

  const [doneButton, setDoneButton] = useState(false)
  const [refresh, setRefresh] = useState(false)


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
                      <span style={{padding: '1vh', color: '#206A37', fontWeight: 'bold'}}>Bienvenue {usersName} !</span>
                      <Button size='sm' style={{width: '28vh', marginBottom: '1vh', backgroundColor: '#206A37'}}><Link to='/wishlist' style={{color: 'white'}}>Voir mes favoris</Link></Button>
                      <Button size='sm' style={{width: '28vh', marginBottom: '1vh', backgroundColor: '#206A37'}}><Link to='/mesrecherches'>Voir mes dernieres recherches</Link></Button>
                      <Button size='sm' style={{width: '28vh', backgroundColor: '#206A37'}}  onClick={()=>handleLogout()}>Se déconecter</Button>
                  </PopoverBody>
    }

/** LOG IN OPTIONS */

/** MORE MAP OPTIONS */

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: 'AIzaSyDFL0VzZ5rQB4FxgH_UWVlZXLBkkun_LSc',
    libraries,
  })

  const panTo = React.useCallback(({lat, lng}) => {
    mapRef.current.panTo({lat, lng});
    mapRef.current.setZoom(14)
  }, [] );

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map
  }, []);

  if(loadError) return "Error loading maps";
  if(!isLoaded) return "Loading Maps"

  const onDataLoad = (data) => {
    console.log('data: ', data)
  }

  // const dataOptions = {
  //   controlPosition: 'TOP_LEFT',
  //   controls: ['Polygon', 'Circle'],
  //   drawingMode: ['Polygon', 'Circle'],
  //   featureFactory: (geometry) => {
  //     console.log('geometry: ', geometry)
  //   },
  //   fillColor: 'yellow',
  //   fillOpacity: 1,
  //   strokeColor: 'red',
  //   strokeOpacity: 1,
  //   clickable: true,
  //   draggable: true,
  //   visible: true,
  //   zIndex: 2,
  // }

  

  function getPaths(polygon) {

    var polygonBounds = polygon.getPath();
    var bounds = [];
    for (var i = 0; i < polygonBounds.length; i++) {
      var point = {
        lat: polygonBounds.getAt(i).lat(),
        lng: polygonBounds.getAt(i).lng()
      };
      bounds.push(point);
    }
    console.log('THIS ARE THE POLYGON COORDINATES: ', bounds);
    setDoneButton(true)

  }

  var buttonValider;
  var buttonRecommencer;

  if(doneButton === true){
    buttonValider = <Button style={{backgroundColor: '#206A37'}}><Link to='/recherche' style={{color: 'white'}}>Valider cette zone</Link></Button>
    buttonRecommencer = <Button style={{backgroundColor: '#206A37'}} onClick={()=>window.location.reload()}>Recommencer</Button>
  }

  

  
/** MORE MAP OPTIONS */

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

      <Col xs='8' lg='10' style={{display: 'flex', justifyContent: 'center'}}>
          <span style={{color: '#206A37', fontSize: 'calc(1em + 2vw)'}}>
              R E C H E R C H E
          </span>
      </Col>

      <Col xs='2' lg='1' style={{display: 'flex', justifyContent:'flex-end', paddingRight: '5vh'}}>
        <img src={user} id="Popover1" style={{width: 'calc(1em + 2vw)'}} type="button" ></img>
          <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle} >
            {userBoard}
          </Popover>
      </Col>

      </Row>

      
      <Search panTo={panTo}/>
      

      <GoogleMap 
        id='drawing-example'
        mapContainerStyle={mapContainerStyle} 
        zoom={10} 
        center={center} 
        options={options}
        onLoad={onMapLoad}

      >
            <DrawingManager
            
            onPolygonComplete={value => console.log(getPaths(value))}
            defaultOptions={{
              drawingControl: true,
              drawingControlOptions: {
                drawingModes: ["polygon"],
              },
  
              polygonOptions: {
                strokeWeight: 2,
                fillColor: "#000",
                fillOpacity: 0.4,
                clickable: true,
                editable: true,
                zIndex: 1,
              },
            }}
          />
        <Data onLoad={onDataLoad} /*options={dataOptions}*/ />
      </GoogleMap>
      {buttonValider}
      {buttonRecommencer}
   </Container>
  </motion.div>
  );

}

function Search({ panTo }){
  const {
    ready, 
    value, 
    suggestions: {status, data}, 
    setValue, 
    clearSuggestions,
  } = usePlacesAutoComplete({
    requestOptions: {
      location: { lat: () => 48.8499198 , lng: () => 2.6370411 },
      radius: 200*1000,
    }
  });
  return (

    <div style={searchStyle}>
      <Combobox 
      onSelect={async (address) => {
        setValue(address, false);
        clearSuggestions();
        try {
          const results = await  getGeocode({address});
          const { lat, lng } = await getLatLng(results[0])
          panTo({ lat, lng });
        } catch(error) {
          console.log("error!")}}
        }
        >
        <ComboboxInput 
        style={searchInput}
        value={value} 
        onChange={
          (e) => {setValue(e.target.value)
          }}
        disabled={!ready}
        placeholder="Saisissez un endroit"
        />
        <ComboboxPopover>
          <ComboboxList>
          {status === "OK" && data.map(({id, description}) => <ComboboxOption key={id} value={description}/> )}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
  </div>
  )
}

var BackgroundImage = {
  display: 'flex',
  flexDirection: 'column',
  height:'100%',
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

var searchStyle = {
  position: 'absolute',
  top: '11vw',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100%',
  maxWidth: '400px',
  zIndex: 10
}

var searchInput = {
  width: "100%"
}

var drawStyle = {
  color: 'red'
}



export default Map;
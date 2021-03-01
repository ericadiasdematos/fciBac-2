import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, DrawingManager } from '@react-google-maps/api';
import { Container, Row, Col, Popover, Input, PopoverBody, Button  } from 'reactstrap';
import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import user from './images/user.png'
import { BsArrowDown } from 'react-icons/bs';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import MapIconsPhoto from './images/mapIcons.png'
import usePlacesAutoComplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption
} from "@reach/combobox"
import "@reach/combobox/styles.css"
import { Components } from 'antd/lib/date-picker/generatePicker';




function AnotherMap(props) {

    const [doneButton, setDoneButton] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [logInMessage, setLogInMessage] = useState([])
    const [logInAccepted, setLogInAccepted] = useState(false)
    const [usersName, setUsersName] = useState('')
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [userFoundFromToken, setUserFoundFromToken] = useState(localStorage.getItem('usersToken'))
    const [userGenre, setUserGenre] = useState('')

    const toggle = () => setPopoverOpen(!popoverOpen);

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
                    <Button size='sm' style={{width: '28vh', backgroundColor: '#206A37'}}  onClick={()=>handleLogout()}>Se déconecter</Button>
                </PopoverBody>
}


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

var handleLogout = () => {
    localStorage.removeItem('usersToken')
    setLogInAccepted(false)
}

    const center = {
        lat: 48.866667,
        lng: 2.333333
    }

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
        buttonValider = <Button onClick={()=> window.location.replace('/recherche')} style={{backgroundColor: '#206A37', width: '50%'}}>Valider cette zone</Button>
        buttonRecommencer = <Button style={{backgroundColor: '#206A37', width: '50%'}} onClick={()=>window.location.reload()}>Recommencer</Button>
      }

      const panTo = React.useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(14)
      }, [] );

      const mapRef = React.useRef();
      const onMapLoad = React.useCallback((map) => {
        mapRef.current = map
      }, []);


      const {
        buttonLabel,
        className
      } = props;
      const [modal, setModal] = useState(true);

      const toggle1 = () => setModal(!modal);
    

return(

<motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{opacity: 0 }}
>
    <LoadScript
        googleMapsApiKey="AIzaSyDFL0VzZ5rQB4FxgH_UWVlZXLBkkun_LSc"
        libraries={['drawing']}
    >
        <div>
            <Search/>
        </div>

        <div style={{width: '100%', border: '10px solid white', display: 'flex', justifySelf: 'center', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={11}
                controlSize='82'
                options={{
                    mapTypeControl: false,
                    controlSize: 42,
                    
                }}
                >
                { /* Child components, such as markers, info windows, etc. */ }
                <DrawingManager
                    onPolygonComplete={value => getPaths(value)}
                    setMap={GoogleMap}
                    options={{
                        drawingControl: true,
                        drawingControlOptions: {
                            drawingModes: ['polygon'],

                        }
                    }}
                />
                <></>
            </GoogleMap>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', justifySelf: 'center', alignSelf: 'center', marginTop: '10px'}}>
                {buttonRecommencer}
                {buttonValider}
            </div>
        </div>
    </LoadScript>
    <Modal isOpen={modal} toggle={toggle1} className={className}>
        <ModalHeader toggle={toggle1}></ModalHeader>
        <ModalBody style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <span>Pour commencer à dessiner cliquez sur le button droite à gauche en haut de la map</span>
          <img src={MapIconsPhoto}/>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle1}>OK</Button>
        </ModalFooter>
    </Modal>
</motion.div>

)

}

function Search() {
    const {
        ready, 
        value, 
        suggestions:  {status, data }, 
        setValue, clearSuggestions
    } = usePlacesAutoComplete({
        requestOptions: {
            location: { lat: () => 48.866667, lng: () => 2.333333 },
            radius: 200 * 1000,
        }
    })

    return (
    <Combobox
        onSelect={(address)=> {
            console.log(address)
        }} >
            <ComboboxInput value={value} onChange={(e)=>{
                setValue(e.target.value)
            }}
            // disabled={!ready}
            placeholder="Saisissez une endroit"/>
            <ComboboxPopover>
                {status === "OK" && data.map(({id, description}) => <ComboboxOption key={id} value={description}/>)}
            </ComboboxPopover>

    </Combobox>
    )

        
}



export default AnotherMap

const containerStyle = {
  width: '100%',
  height: '90vh'
}

var searchStyle = {
    // position: 'absolute',
    // // top: '11vw',
    // // left: '50%',
    // transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: '400px',
    // zIndex: 10
  }

  var searchInput = {
    width: "100%"
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


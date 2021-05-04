import React, {useState, useEffect, useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Popover, Input, PopoverBody, Label, Button  } from 'reactstrap';
import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion'
import { FaUserCircle } from 'react-icons/fa';
import { BiPlusCircle } from 'react-icons/bi';
import { FaSave } from 'react-icons/fa';
import { TabContent, TabPane, Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, Spinner } from 'reactstrap';
import classnames from 'classnames';
import { FormGroup } from 'reactstrap';
import firebase from './InitFirebase'
import { storage } from './InitFirebase'
import {connect} from 'react-redux'
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'
import { Gallery, Item } from 'react-photoswipe-gallery'
import { FaTrash } from 'react-icons/fa';
import 'antd/dist/antd.css';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { InputNumber } from 'antd';
import NavBarAdmin from "./NavBarAdmin"






const db = firebase.database();








function AdminCreerBien(props) {

    function onChangeMoney(value) {
        setPrixBien(value)
      }
    function onChangeMoneyhonorairesAcq(value) {
    setHonoraireAcq(value)
    }
    function onChangeprixM2(value) {
    setPrixM2(value)
    }

    function convert(str) {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("/");
      }

  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  const [activeTab, setActiveTab] = useState('1');

  const toggle2 = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle3 = () => setDropdownOpen(prevState => !prevState);

  const [state, setState] = useState(false);

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = dd + '/' + mm + '/' + yyyy;

  /** STATES FOR LOGIN */

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [logInMessage, setLogInMessage] = useState([])
  const [logInAccepted, setLogInAccepted] = useState(false)
  const [userGenre, setUserGenre] = useState('')
  const [usersName, setUsersName] = useState('')
  const [userFoundFromToken, setUserFoundFromToken] = useState(localStorage.getItem('usersToken'))
  const [refBien, setRefBien] = useState("")
  const [fileInput, setFileInput] = useState()
  const [bienSaved, setBienSaved] = useState(false)
/** STATES FOR HOUSE DATA */

    /** GENERAL */
        const [reference, setReference] = useState(getRandomInt(9900000000))
        const [statut, setStatut] = useState('')
        const [typeDeBien, setTypeDeBien] = useState(props.categoryToDispay.typeDeBien)
        const [typeTransaction, setTypeTransaction] = useState(props.categoryToDispay.transaction)
        const [typeDachat, setTypeDachat] = useState('Ancien')
        const [quelleAgence, setQuelleAgence] = useState('F.C.I Paris')
        const [date, setDate] = useState(today)
        const [anneeDeConstruction, setAnneeDeConstruction] = useState("")
        const [etages, setEtages] = useState("")
    /** LOCALISATION */
        const [adresse, setAdresse] = useState('')
        const [codePostal, setCodePostal] = useState('')
        const [ville, setVille] = useState('')
        const [pays, setPays] = useState('')
        const [exposition, setExposition] = useState('')
        const [vue, setVue] = useState('')
        const [distanceTrain, setDistanceTrain] = useState('')
        const [accesBus, setAccesBus] = useState('')
        const [accesMetro, setAccesMetro] = useState('')
        const [accesTram, setAccesTram] = useState('')
        const [accesEcole, setAccesEcole] = useState('')
        const [rezDeChausee, setRezDeChausee] = useState('Non')
        const [dernierEtage, setDernierEtage] = useState('Non')
        const [longitude, setLongitude] = useState('')
        const [latitude, setLatitude] = useState('')

    /** FINANCES */
        const [prixBien, setPrixBien] = useState('')
        const [prixM2, setPrixM2] = useState('')
        const [honorairesAcq, setHonoraireAcq] = useState('')
        const [taxFonciere, setTaxFonciere] = useState('')
        const [prixDepart, setPrixDepart] = useState('')

    /** COPRO */
        const [copro, setCopro] = useState('Non')
        const [nbLotsCop, setNbLotsCop] = useState('')
        const [lotsHabitation, setLotsHabitation] = useState('')
        const [chargesAnn, setChargesAnn] = useState('')
        const [procedure, setProcedures] = useState('')
     
    /** INTERIEUR */

        const [nbPieces, setNbPieces] = useState('')
        const [nbChambres, setNbChambres] = useState('')
        const [chauffage, setChauffage] = useState('')
        const [eauChaude, setEauChaude] = useState('')
        const [chambreRDC, setChambreRDC] = useState('Non')

    /** EXTERIEUR */
        const [piscine, setPiscine] = useState('Non')
        const [balcon, setBalcon] = useState('Non')
        const [terrasse, setTerrasse] = useState('Non')
        const [visAvis, setvisAvis] = useState('Non')
        const [jardinBoolean, setJardinBoolean] = useState('Non')
        const [jardin, setJardin] = useState('')

    /** SURFACES */
        const [surfaceTotal, setSurfaceTotal] = useState('')
        const [surfacePieces, setSurfacePiece] = useState('')
        const [surfaceTerrain, setSurfaceTerrain] = useState('')

    /** DIAGNOSTICS */
        const [gazEffet, setGazEffet] = useState('')
        const [gazValeur, setGazValeur] = useState('')
        const [valeurConso, setValeurConso] = useState('')

    /** DESCRIPTION */
        const [descrip, setDescrip] = useState("")

    /** AUTRES */
        const [autres, setAutres] = useState('')

    /** PHOTOS */
        const [imageUrl, setImageUrl] = useState("")
        const [photoUploaded, setPhotoUploaded] = useState()
        const [tableaudImages, setTableaudImages] = useState([])
        const [progress, setProgress] = useState(0)
        const [uploadedPhoto, setUploadedPhoto] = useState({})

  
        const [saving, setSaving] = useState(false)
  




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

  
function getLat(){

    var latVar = ""
    var lngVar = ""
    
     geocodeByAddress(adresse.label)
    .then(results => getLatLng(results[0]))
    .then(( lat, lng ) => {
        
        console.log('Successfully got latitude and longitude',  lat, lng )
        latVar = lat.lat
        lngVar = lat.lng
    }
    )
    .then(whatever => console.log("latitude :", latVar, "longitude :", lngVar));
}


  async function handleSauvegarder() {

    setSaving(true)

    var latVar = ""
    var lngVar = ""
    
     await geocodeByAddress(adresse.label)
    .then(results => getLatLng(results[0]))
    .then(( lat, lng ) => {
        
        console.log('Successfully got latitude and longitude',  lat, lng )
        latVar = lat.lat
        lngVar = lat.lng
    }
    )
    .then(whatever => console.log("latitude :", latVar, "longitude :", lngVar));



    var rawData = await fetch('/createBien', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            refFromFront: reference,
            statusFromFront: statut,
            dateFromFront: date,
            refFromFront: reference,
            statusFromFront: statut,
            typeFromFront: typeDeBien,
            agenceFromFront: quelleAgence,
            trasactionFromFront: typeTransaction,
            typeDachatFromFront: typeDachat,
            anneeDeConstructionFromFront: anneeDeConstruction,
            adressFromFront: adresse.label,
            latitudeFromFront: latVar,
            longitudeFromFront: lngVar,
            codeFromFront: codePostal,
            cityFromFront: ville.label,
            countryFromFront: pays,
            expositionFromFront: exposition,
            viewFromFront: vue,
            trainFromFront: distanceTrain,
            busFromFront: accesBus,
            metroFromFront: accesMetro,
            tramFromFront: accesTram,
            schoolFromFront: accesEcole,
            firstFloorFromFront: rezDeChausee,
            lastFloorFromFront: dernierEtage,
            priceFromFront: prixBien,
            prixMFromFront: prixM2,
            honorairesFromFront: honorairesAcq,
            taxFonciereFromFront: taxFonciere,
            prixDepartFromFront: prixDepart,
            coproprieteFromFront: copro,
            nLotsFromFront: nbLotsCop,
            lotHabFromFront: lotsHabitation,
            priceYearFromFront: chargesAnn,
            proceduresFromFront: procedure,
            roomsFromFront: nbPieces,
            nbChambresFromFront: nbChambres,
            etagesFromFront: etages,
            heatFromFront: chauffage,
            waterFromFront: eauChaude,
            firstFloorRoomFromFront: chambreRDC,
            buildingViewFromFront: visAvis,
            jardinBooleanFromFront: jardinBoolean,
            gardenFromFront: jardin,
            piscineFromFront: piscine,
            balconFromFront: balcon,
            terrasseFromFront: terrasse,
            totalMFromFront: surfaceTotal,
            eachRoomFromFront: surfacePieces,
            surfaceTerrainFromFront: surfaceTerrain,
            gasEffectFromFront: gazEffet,
            gasValueFromFront: gazValeur,
            consoFromFront: valeurConso,
            descriptionFromFront: descrip,
            otherFromFront: autres,
            photoFromFront: tableaudImages

        })

  });

  var data = await rawData.json()
  console.log(data.result)
  if(data.result === true){
      setBienSaved(true)
      setSaving(false)
  }

  }

  function fileSelectedHandler() {
      if(photoUploaded){
        setState(true)
        console.log(photoUploaded)


      }
      

    
  }



function handleDelete(imageUrl) {

    setTableaudImages(tableaudImages.filter((item)=>(item !== imageUrl)))
}



var tableau = tableaudImages.map(function(image, i){
    return(
        <Item key={i}
            original={decodeURIComponent(image)}
            thumbnail={decodeURIComponent(image)}
            width="1024"
            height="768"
        >
            {({ ref, open }) => (
                <span style={{display: 'flex', flexDirection: 'column'}}>
                    <img style={{width: '250px', height:'150px', border: '5px solid #206A37', marginRight: 5, marginTop: 5, cursor: 'pointer'}} ref={ref} onClick={open} src={decodeURIComponent(image)} />
                    <span style={{width: '250px', height:'30px', backgroundColor: '#206A37', marginRight: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', cursor: 'pointer'}}>
                        <FaTrash onClick={()=>handleDelete(image)}/>
                    </span>
                </span>
            )}
        </Item>
    )
})



function fileUploaded(file) {
    console.log(file.target.files[0])
    setUploadedPhoto(file.target.files[0])

}

function sendPhotoToStorage(){
    console.log(uploadedPhoto.name)

    if(uploadedPhoto){
        console.log("condition passes")

        const uploadTask = storage.ref(`imagesBiens/${uploadedPhoto.name}`).put(uploadedPhoto);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const percentage = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(percentage)
            },
            error => {
                console.log(error)
            },
            () => {
                storage
                    .ref("imagesBiens")
                    .child(uploadedPhoto.name)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url)
                        setImageUrl(url)
                        setTableaudImages([...tableaudImages, `${encodeURIComponent(url)}`])
                        
                    })
            }
        )

    }
}

if(saving === true){
    return(
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{opacity: 0 }}
        >
            <Container style={BackgroundImage}>
    
              <NavBarAdmin pageName="CREER UN BIEN" />
    
              <Row style={secondRow}>
                <Spinner color="success" />
                <span style={{fontSize: 40, color: "#206A37"}}>Patientez</span>
              </Row>
    
            </Container>
        </motion.div>

    )
}else if(bienSaved === true){
    return (
        <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{opacity: 0 }}
    >
        <Container style={BackgroundImage}>

          <NavBarAdmin pageName="CREER UN BIEN" />

          <Row style={secondRow}>
            <span style={{fontSize: 40, color: "#206A37"}}>Le bien à été sauvegardé!</span>
            <Button style={{backgroundColor: "#206A37"}}><Link to="/adminGererBiens" style={{color: "white"}}>Revenir à Gerer Biens</Link></Button>
          </Row>

        </Container>
    </motion.div>
            
    )
}else{
    
    return (
    
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{opacity: 0 }}
    >
    
        <Container style={BackgroundImage}>
    
          <NavBarAdmin pageName="CREER UN BIEN" />
    
    
          <Row style={{display: 'flex', flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", marginTop: '30px',}}>
              <Gallery>
                  {tableau}
              </Gallery>
          </Row>
    
          <Row style={secondRow}>
              <span style={{display: "flex", flexDirection: "column", border: "4px solid #206A37", padding: 5}}>
                  <input type="file" onChange={(e)=>fileUploaded(e)} style={{display: "none"}}ref={(ref) => setFileInput(ref)}/>
                  <Button onClick={() => fileInput.click() } style={{backgroundColor: "#206A37", marginBottom: 5}}>
                      <BiPlusCircle style={{marginRight:5}}/>
                      <span>Selectioner image</span>
                  </Button>
                  <span style={{color: "#206A37", fontWeight: "bold"}}>Fichier : {uploadedPhoto.name}</span>
                  <Button style={{backgroundColor: "#206A37", marginTop: 5}} onClick={()=>sendPhotoToStorage()}>Ajouter l'image à la Gallerie</Button>
              </span>
          </Row>
    
    
          <Row style={secondRow}>
    
              <Nav style={{width: '100%'}} tabs>
                  <NavItem>
                      <NavLink
                          className={classnames({ active: activeTab === '1' })}
                          onClick={() => { toggle2('1'); }}
                          style={{color: "#206A37", fontWeight: "bold"}}
                      >
                          GENERAL
                      </NavLink>
                  </NavItem>
    
                  <NavItem>
                      <NavLink
                          className={classnames({ active: activeTab === '2' })}
                          onClick={() => { toggle2('2'); }}
                          style={{color: "#206A37", fontWeight: "bold"}}
                      >
                          LOCALISATION
                      </NavLink>
                  </NavItem>
    
                  <NavItem>
                      <NavLink
                          className={classnames({ active: activeTab === '3' })}
                          onClick={() => { toggle2('3'); }}
                          style={{color: "#206A37", fontWeight: "bold"}}
                      >
                          ASPECTS FINANCIERS
                      </NavLink>
                  </NavItem>
    
                  <NavItem>
                      <NavLink
                          className={classnames({ active: activeTab === '4' })}
                          onClick={() => { toggle2('4'); }}
                          style={{color: "#206A37", fontWeight: "bold"}}
                      >
                          COPROPRIÉTÉ
                      </NavLink>
                  </NavItem>
    
                  <NavItem>
                      <NavLink
                          className={classnames({ active: activeTab === '6' })}
                          onClick={() => { toggle2('6'); }}
                          style={{color: "#206A37", fontWeight: "bold"}}
                      >
                          INTÉRIEUR
                      </NavLink>
                  </NavItem>
    
                  <NavItem>
                      <NavLink
                          className={classnames({ active: activeTab === '7' })}
                          onClick={() => { toggle2('7'); }}
                          style={{color: "#206A37", fontWeight: "bold"}}
                      >
                          EXTÉRIEUR
                      </NavLink>
                  </NavItem>
    
                  <NavItem>
                      <NavLink
                          className={classnames({ active: activeTab === '8' })}
                          onClick={() => { toggle2('8'); }}
                          style={{color: "#206A37", fontWeight: "bold"}}
                      >
                          SURFACES
                      </NavLink>
                  </NavItem>
    
                  <NavItem>
                      <NavLink
                          className={classnames({ active: activeTab === '9' })}
                          onClick={() => { toggle2('9'); }}
                          style={{color: "#206A37", fontWeight: "bold"}}
                      >
                          DIAGNOSTICS
                      </NavLink>
                  </NavItem>
    
                  <NavItem>
                      <NavLink
                          className={classnames({ active: activeTab === '10' })}
                          onClick={() => { toggle2('10'); }}
                          style={{color: "#206A37", fontWeight: "bold"}}
                      >
                          DESCRIPTION
                      </NavLink>
                  </NavItem>
    
                  <NavItem>
                      <NavLink
                          className={classnames({ active: activeTab === '11' })}
                          onClick={() => { toggle2('11'); }}
                          style={{color: "#206A37", fontWeight: "bold"}}
                      >
                          AUTRES
                      </NavLink>
                  </NavItem>
              </Nav>
    
              <TabContent style={{width: '100%', border: '1px solid rgb(231, 231, 231)', paddingTop:30, paddingBottom:30, borderTop: 0, marginBottom: 30, backgroundColor: "white"}} activeTab={activeTab}>
                  <TabPane tabId="1">
                      <Row>
                          <Col sm="3" style={styleColTab}>
                              <FormGroup>
                                  <Label style={{fontWeight: 'bold'}}>Référence du bien : </Label>
                                  <Input type='text' value={reference} onChange={ (e) => setReference(e.target.value)}></Input>
                              </FormGroup>
                              <FormGroup>
                                  <Label for="exampleSelect" style={{fontWeight: 'bold'}}>Type de bien : </Label>
                                      <Input value={typeDeBien} onChange={(e)=>setTypeDeBien(e.target.value)} type="select" name="select" id="exampleSelect">
                                          <option>Appartement</option>
                                          <option>Maison</option>
                                          <option>Loft</option>
                                          <option>Hôtel Particulier</option>
                                          <option>Terrain</option>
                                          <option>Immeuble</option>
                                          <option>Loft</option>
                                          <option>Fonds de commerce</option>
                                          <option>Bureau</option>
                                          <option>Parking / Garage</option>
                                      </Input>
                              </FormGroup>
                              <FormGroup>
                                  <Label for="exampleSelect" style={{fontWeight: 'bold'}}>Type de transaction : </Label>
                                      <Input value={typeTransaction} onChange={(e)=>setTypeTransaction(e.target.value)} type="select" name="select" id="exampleSelect">
                                          <option>Location</option>
                                          <option>Vente</option>
                                          <option>Viager</option>
                                      </Input>
                              </FormGroup>
                              <FormGroup>
                                  <Label for="exampleSelect" style={{fontWeight: 'bold'}}>Type d'achat : </Label>
                                      <Input value={typeDachat} onChange={(e)=>setTypeDachat(e.target.value)} type="select" name="select" id="exampleSelect">
                                          <option>Ancien</option>
                                          <option>Neuf</option>
                                          <option>Projet de Construction</option>
                                      </Input>
                              </FormGroup>
                          </Col>
                          <Col sm="3" style={styleColTab}>
                              <FormGroup>
                                  <Label style={{fontWeight: 'bold'}}>Date : </Label>
                                  <Input type='text' value={date} id="exampleCustomSelectDisabled" /*onChange={ (e) => setDate(e.target.value)}*/></Input>
                              </FormGroup>
                              <FormGroup>
                                  <Label style={{fontWeight: 'bold'}}>Statut du bien : </Label>
                                  <Input type='text' value={statut} onChange={ (e) => setStatut(e.target.value)}></Input>
                              </FormGroup>
                              <FormGroup>
                                  <Label for="exampleSelect" style={{fontWeight: 'bold'}}>Agence Mandataire : </Label>
                                      <Input value={quelleAgence} onChange={(e)=>setQuelleAgence(e.target.value)} type="select" name="select" id="exampleSelect" >
                                          <option>F.C.I Paris</option>
                                          <option>F.C.I Houdan</option>
                                          <option>F.C.I Maule</option>
                                      </Input>
                              </FormGroup>
                          </Col>
                          <Col sm="3" style={styleColTab}>
                                <FormGroup>
                                  <Label style={{fontWeight: 'bold'}}>Année de Construction : </Label>
                                  <Input type='text' value={anneeDeConstruction} onChange={ (e) => setAnneeDeConstruction(e.target.value)}></Input>
                              </FormGroup>
                          </Col>
                      </Row>
                  </TabPane>
    
                  <TabPane tabId="2">
                      <Row>
                          <Col sm="2" style={styleColTab}>
                              <FormGroup>
                                <Label style={{fontWeight: 'bold'}}>Adresse : </Label>
                                <GooglePlacesAutocomplete
                                    selectProps={{
                                        adresse,
                                        onChange: setAdresse,
                                        styles: {
                                        input: (provided) => ({
                                            ...provided,
                                            color: '#206A37',
                                            width: "140px"
                                        }),
                                        },
                                    }}
                                    apiKey="AIzaSyDFL0VzZ5rQB4FxgH_UWVlZXLBkkun_LSc"
                                    apiOptions={{ language: 'fr', region: 'fr' }}

                                />
                              </FormGroup>
                              <FormGroup>
                                  <Label style={{fontWeight: 'bold'}}>Code Postal : </Label>
                                  <Input type='text' value={codePostal} onChange={ (e) => setCodePostal(e.target.value) }></Input>
                              </FormGroup>
                              <FormGroup>
                                  <Label style={{fontWeight: 'bold'}}>Ville : </Label>
                                  <GooglePlacesAutocomplete
                                    selectProps={{
                                        ville,
                                        onChange: setVille,
                                        styles: {
                                        input: (provided) => ({
                                            ...provided,
                                            color: '#206A37',
                                            width: "140px"
                                        }),
                                        },
                                    }}
                                    apiKey="AIzaSyDFL0VzZ5rQB4FxgH_UWVlZXLBkkun_LSc"
                                    apiOptions={{ language: 'fr', region: 'fr' }}

                                />
                              </FormGroup>
                              <FormGroup>
                                  <Label style={{fontWeight: 'bold'}}>Pays : </Label>
                                  <Input type='text' value={pays} onChange={ (e) => setPays(e.target.value) }></Input>
                              </FormGroup>
                          </Col>
                          <Col sm="2" style={styleColTab}>
                              <FormGroup>
                                  <Label style={{fontWeight: 'bold'}}>Exposition : </Label>
                                  <Input type='textarea' value={exposition} onChange={ (e) => setExposition(e.target.value) }></Input>
                              </FormGroup>
                              <FormGroup>
                                  <Label style={{fontWeight: 'bold'}}>Vue : </Label>
                                  <Input type='textarea' value={vue} onChange={ (e) => setVue(e.target.value) }></Input>
                              </FormGroup>
                              <FormGroup>
                                  <Label for="exampleSelect" style={{fontWeight: 'bold'}}>Rez de chaussée : </Label>
                                      <Input value={rezDeChausee} onChange={(e)=>setRezDeChausee(e.target.value)} type="select" name="select" id="exampleSelect" >
                                          <option>Oui</option>
                                          <option>Non</option>
                                      </Input>
                              </FormGroup>
                              <FormGroup>
                                  <Label for="exampleSelect" style={{fontWeight: 'bold'}}>Dernier Etage : </Label>
                                      <Input value={dernierEtage} onChange={(e)=>setDernierEtage(e.target.value)} type="select" name="select" id="exampleSelect" >
                                          <option>Oui</option>
                                          <option>Non</option>
                                      </Input>
                              </FormGroup>
                          </Col>
                          <Col sm="2" style={styleColTab}>
                              <FormGroup>
                                  <Label style={{fontWeight: 'bold'}}>Distance Train : </Label>
                                  <Input type='textarea' value={distanceTrain} onChange={ (e) => setDistanceTrain(e.target.value) }></Input>
                              </FormGroup>
                              <FormGroup>
                                  <Label style={{fontWeight: 'bold'}}>Accès Bus : </Label>
                                  <Input type='textarea' value={accesBus} onChange={ (e) => setAccesBus(e.target.value) }></Input>
                              </FormGroup>
                              <FormGroup>
                                  <Label style={{fontWeight: 'bold'}}>Accès Métro : </Label>
                                  <Input type='textarea' value={accesMetro} onChange={ (e) => setAccesMetro(e.target.value) }></Input>
                              </FormGroup>
                              <FormGroup>
                                  <Label style={{fontWeight: 'bold'}}>Accès Tramway : </Label>
                                  <Input type='textarea' value={accesTram} onChange={ (e) => setAccesTram(e.target.value) }></Input>
                              </FormGroup>
                          </Col>
                          <Col sm="2" style={styleColTab}>
                              <FormGroup>
                                  <Label style={{fontWeight: 'bold'}}>Accès Ecole : </Label>
                                  <Input type='textarea' value={accesEcole} onChange={ (e) => setAccesEcole(e.target.value) }></Input>
                              </FormGroup>
                          </Col>
                      </Row>
                  </TabPane>
    
                  <TabPane tabId="3">
                      <Row>
                          <Col sm="3" style={styleColTab}>
                              <FormGroup style={{display: "flex", flexDirection: "column"}}>
                                  <Label style={{fontWeight: 'bold'}}>Prix du bien : </Label>
                                  <InputNumber
                                    size="middle"
                                    defaultValue={1000}
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    value={prixBien}
                                    onChange={onChangeMoney}
                                    style={{width: "200px"}}
                                    />
                              </FormGroup>
                              <FormGroup style={{display: "flex", flexDirection: "column"}}>
                                  <Label style={{fontWeight: 'bold'}}>Prix m2 : </Label>
                                  <InputNumber
                                    size="middle"
                                    defaultValue={1000}
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    value={prixM2}
                                    onChange={onChangeprixM2}
                                    style={{width: "200px"}}
                                />
                              </FormGroup>
                              <FormGroup style={{display: "flex", flexDirection: "column"}}>
                                  <Label style={{fontWeight: 'bold'}}>Honoraires Agence : </Label>
                                  <InputNumber
                                    size="middle"
                                    defaultValue={1000}
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    value={honorairesAcq}
                                    onChange={onChangeMoneyhonorairesAcq}
                                    style={{width: "200px"}}
                                />
                              </FormGroup>
                          </Col>
    
                          <Col sm="3" style={styleColTab}>
                              <FormGroup>
                                  <Label style={{fontWeight: 'bold'}}>Taxe Foncière : </Label>
                                  <Input type='text' value={taxFonciere} onChange={ (e) => setTaxFonciere(e.target.value) }></Input>
                              </FormGroup>
                              <FormGroup>
                                  <Label style={{fontWeight: 'bold'}}>Prix de départ : </Label>
                                  <Input type='text' value={prixDepart} onChange={ (e) => setPrixDepart(e.target.value) }></Input>
                              </FormGroup>
                          </Col>
                      </Row>
                  </TabPane>
    
                  <TabPane tabId="4">
                      <Row>
                          <Col sm="3" style={styleColTab}>
                              <FormGroup>
                                  <Label for="exampleSelect" style={{fontWeight: 'bold'}}>Bien en copropriété : </Label>
                                      <Input value={copro} onChange={(e)=>setCopro(e.target.value)} type="select" name="select" id="exampleSelect" >
                                          <option>Oui</option>
                                          <option>Non</option>
                                      </Input>
                              </FormGroup>
                              <FormGroup>
                                  <Label style={{fontWeight: 'bold'}}>Nb Lots Copropriété : </Label>
                                  <Input type='text' value={nbLotsCop} onChange={ (e) => setNbLotsCop(e.target.value) }></Input>
                              </FormGroup>
                              <FormGroup>
                                  <Label style={{fontWeight: 'bold'}}>Dont lots d'habitation : </Label>
                                  <Input type='text' value={lotsHabitation} onChange={ (e) => setLotsHabitation(e.target.value) }></Input>
                              </FormGroup>
                          </Col>
                          <Col sm="8" style={styleColTab}>
                              <FormGroup>
                                  <Label style={{fontWeight: 'bold'}}>Charges annuelles : </Label>
                                  <Input type='text' value={chargesAnn} onChange={ (e) => setChargesAnn(e.target.value) }></Input>
                              </FormGroup>
                              <FormGroup>
                                  <Label style={{fontWeight: 'bold'}}>Procédures diligentées c/ syndicat de copropriété :</Label>
                                  <Input type='textarea' value={procedure} onChange={ (e) => setProcedures(e.target.value) }></Input>
                              </FormGroup>
                          </Col>
                      </Row>
                  </TabPane>
    
                  <TabPane tabId="6">
                      <Row>
                      <Col sm="3" style={styleColTab}>
                              <FormGroup>
                                  <Label style={{fontWeight: 'bold'}}>Nombre pièces : </Label>
                                  <Input type='text' value={nbPieces} onChange={ (e) => setNbPieces(e.target.value) }></Input>
                              </FormGroup>
                              <FormGroup>
                                  <Label style={{fontWeight: 'bold'}}>Nombre chambres : </Label>
                                  <Input type='text' value={nbChambres} onChange={ (e) => setNbChambres(e.target.value) }></Input>
                              </FormGroup>
                              <FormGroup>
                                  <Label for="exampleSelect" style={{fontWeight: 'bold'}}>Chambre RDC : </Label>
                                      <Input value={chambreRDC} onChange={(e)=>setChambreRDC(e.target.value)} type="select" name="select" id="exampleSelect" >
                                          <option>Oui</option>
                                          <option>Non</option>
                                      </Input>
                              </FormGroup>
                              <FormGroup>
                                  <Label style={{fontWeight: 'bold'}}>Etages : </Label>
                                  <Input type='text' value={etages} onChange={ (e) => setEtages(e.target.value)}></Input>
                              </FormGroup>
                          </Col>
                          <Col sm="3" style={styleColTab}>
                              <FormGroup>
                                  <Label style={{fontWeight: 'bold'}}>Méca. Chauffage : </Label>
                                  <Input type='text' value={chauffage} onChange={ (e) => setChauffage(e.target.value) }></Input>
                              </FormGroup>
                              <FormGroup>
                                  <Label style={{fontWeight: 'bold'}}>Eau chaude : </Label>
                                  <Input type='text' value={eauChaude} onChange={ (e) => setEauChaude(e.target.value) }></Input>
                              </FormGroup>
                          </Col>
                      </Row>
                  </TabPane>
    
                  <TabPane tabId="7">
                      <Row>
                          <Col sm="6" style={styleColTab}>
                            <FormGroup>
                                  <Label for="exampleSelect" style={{fontWeight: 'bold'}}>Jardin : </Label>
                                      <Input value={jardinBoolean} onChange={(e)=>setJardinBoolean(e.target.value)} type="select" name="select" id="exampleSelect" >
                                          <option>Oui</option>
                                          <option>Non</option>
                                      </Input>
                              </FormGroup>
                              <FormGroup style={{width: '100%'}}>
                                  <Label style={{fontWeight: 'bold'}}>Description du jardin : </Label>
                                  <Input style={{width: '100%'}} type='textarea' value={jardin} onChange={ (e) => setJardin(e.target.value) }></Input>
                              </FormGroup>
                              <FormGroup>
                                  <Label for="exampleSelect" style={{fontWeight: 'bold'}}>Piscine : </Label>
                                      <Input value={piscine} onChange={(e)=>setPiscine(e.target.value)} type="select" name="select" id="exampleSelect" >
                                          <option>Oui</option>
                                          <option>Non</option>
                                      </Input>
                              </FormGroup>
                              <FormGroup>
                                  <Label for="exampleSelect" style={{fontWeight: 'bold'}}>Vis à Vis : </Label>
                                      <Input value={visAvis} onChange={(e)=>setvisAvis(e.target.value)} type="select" name="select" id="exampleSelect" >
                                          <option>Oui</option>
                                          <option>Non</option>
                                      </Input>
                              </FormGroup>
                          </Col>
                          <Col sm="6" style={styleColTab}>
                            <FormGroup>
                                <Label for="exampleSelect" style={{fontWeight: 'bold'}}>Terrasse : </Label>
                                    <Input value={terrasse} onChange={(e)=>setTerrasse(e.target.value)} type="select" name="select" id="exampleSelect" >
                                        <option>Oui</option>
                                        <option>Non</option>
                                    </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleSelect" style={{fontWeight: 'bold'}}>Balcon : </Label>
                                    <Input value={balcon} onChange={(e)=>setBalcon(e.target.value)} type="select" name="select" id="exampleSelect" >
                                        <option>Oui</option>
                                        <option>Non</option>
                                    </Input>
                            </FormGroup>
                          </Col>
                      </Row>
                  </TabPane>
    
                  <TabPane tabId="8">
                      <Row>
                          <Col sm="11" style={styleColTab}>
                              <FormGroup>
                                  <Label style={{fontWeight: 'bold'}}>Surface Total : </Label>
                                  <Input type='text' value={surfaceTotal} onChange={ (e) => setSurfaceTotal(e.target.value) }></Input>
                              </FormGroup>
                              <FormGroup>
                                  <Label style={{fontWeight: 'bold'}}>Surface Terrain : </Label>
                                  <Input type='text' value={surfaceTerrain} onChange={ (e) => setSurfaceTerrain(e.target.value) }></Input>
                              </FormGroup>
                              <FormGroup style={{width: '100%'}}>
                                  <Label style={{fontWeight: 'bold'}}>Surface par piéces : </Label>
                                  <Input style={{width: '100%'}} type='textarea' value={surfacePieces} onChange={ (e) => setSurfacePiece(e.target.value) }></Input>
                              </FormGroup>
                          </Col>
                      </Row>
                  </TabPane>
    
                  <TabPane tabId="9">
                      <Row>
                          <Col sm="3" style={styleColTab}>
                              <FormGroup>
                                  <Label style={{fontWeight: 'bold'}}>Gaz Effet de Serre : </Label>
                                  <Input type='text' value={gazEffet} onChange={ (e) => setGazEffet(e.target.value) }></Input>
                              </FormGroup>
                              <FormGroup>
                                  <Label style={{fontWeight: 'bold'}}>Valeur Gaz Effet de serre : </Label>
                                  <Input type='text' value={gazValeur} onChange={ (e) => setGazValeur(e.target.value) }></Input>
                              </FormGroup>
                              <FormGroup>
                                  <Label style={{fontWeight: 'bold'}}>Valeur conso annuelle énergie : </Label>
                                  <Input type='text' value={valeurConso} onChange={ (e) => setValeurConso(e.target.value) }></Input>
                              </FormGroup>
                          </Col>
                      </Row>
                  </TabPane>
    
                  <TabPane tabId="10">
                      <Row>
                          <Col sm="11" style={styleColTab}>
                              <FormGroup style={{width: '100%'}}>
                                  <Label style={{fontWeight: 'bold'}}>Description : </Label>
                                  <Input style={{width: '100%'}} type='textarea' value={descrip} onChange={ (e) => setDescrip(e.target.value) }></Input>
                              </FormGroup>
                          </Col>
                      </Row>
                  </TabPane>
    
                  <TabPane tabId="11">
                      <Row>
                          <Col sm="11" style={styleColTab}>
                              <FormGroup style={{width: '100%'}}>
                                  <Label style={{fontWeight: 'bold'}}>Autres Infos : </Label>
                                  <Input style={{width: '100%'}} type='textarea' value={autres} onChange={ (e) => setAutres(e.target.value) }></Input>
                              </FormGroup>
                          </Col>
                      </Row>
                  </TabPane>
              </TabContent>
    
              <Button style={{backgroundColor: '#206A37', color: 'white', width: '100%', marginBottom: 30}}>
                  <FaSave style={{marginRight:5}}/>
                  <span onClick={()=>handleSauvegarder()}>Sauvegarder toutes modifications</span>
              </Button>
    
          </Row>
    
    
    
        </Container>
    
    </motion.div>
    );
}



}


function mapStateToProps(state) {
    return { categoryToDispay: state.ajouterBien}
}

var BackgroundImage = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: "100vh",
  height:'auto',
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
  backgroundColor: 'rgba(255,255,255, 0.7)',
  width: '100%',
  justifySelf: 'center',
  alignSelf: 'center',
  marginTop: '30px',
  borderRadius: '10px',
  border: 0,
}


var secondRow = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    justifySelf: 'center',
    alignSelf: 'center',
    marginTop: '30px',
    borderRadius: '10px',
    border: 0,
  }

  var styleColTab = {
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'flex-start', 
    marginTop: 10, 
    marginLeft: 5
  }









export default connect(
    mapStateToProps,
    null
) (AdminCreerBien)

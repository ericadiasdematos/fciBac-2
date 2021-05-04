import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Popover, Input, PopoverBody, Button  } from 'reactstrap';
import logo from './images/logo.png'
import { Link, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion'
import { FaUserCircle } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { RiMoneyEuroCircleFill } from 'react-icons/ri';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { Menu ,MenuItem ,SubMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import firebase from './InitFirebase'
import { connect } from 'react-redux';
import NavBarAdmin from "./NavBarAdmin"


const db = firebase.database()


function AdminGererBiens (props) {

    function numberWithSpaces(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

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

        // var rawGetBiens = await fetch('/getBiens')
        // var getBiensJson = rawGetBiens.json()
        //     .then(function(response){
        //         setBiensList(response.biens)
        //         console.log(response.biens)
        //     })

            var getBiens = await fetch('/getBiens', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    userFoundFromToken: userFoundFromToken,
                })
        
          });
          var dataGetBiens = await getBiens.json()
          var biensJson = dataGetBiens.biens
          biensJson.sort((a, b) => new Date(a.date) - new Date(b.date)).reverse()
        console.log("biensJson :", biensJson)
          setBiensList(biensJson)


  
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


    function handleBienClick (bien) {
        props.onBienClick(bien)

        return <Link  to="/adminBien" />
    }


var viewBiensList = biensList.map(function(bien){
    return(

    
        <Col xs='12' sm="6" md="4" lg='2' style={styleCol} onClick={()=> handleBienClick(bien)}>
            <Link to="/adminBien" style={styleLink}>
                <Row style={{width: '100%', height: '40%', justifyContent: "center", alignItems: "center"}}>
                    <img style={{width: "100%", maxWidth: '100%', height:'150px', borderRadius:'6px 6px 0px 0px', overflow: "hidden"}} src={decodeURIComponent(bien.photos[0])}/>
                </Row>
                <Row style={styleRow}>
                    <span style={{fontSize: 20, textTransform: "uppercase"}}>{bien.typeTransaction}</span>
                </Row>
                <Row style={{display: 'flex',justifyContent:'flex-start', alignItems: 'center', width: '100%'}}>
                    <span style={{color: "#206A37", fontWeight: "bold", marginLeft: 5}}>{bien.typeBien.toUpperCase()}</span>
                </Row>
                <Row style={{display: 'flex',justifyContent:'flex-start', alignItems: 'center', width: '100%'}}>
                    <FaMapMarkerAlt style={{color: '#206A37'}}/>
                    <span>{bien.codePostal} {bien.ville}</span>
                </Row>
                <Row style={{width: '100%', marginBottom: 5}}>
                    <Col xs='9' style={{padding: 0}}>
                        <RiMoneyEuroCircleFill style={{color: '#206A37'}}/>
                        <span>{numberWithSpaces(bien.prixBien)} €</span>
                    </Col>
                    {/* <Col xs='3' style={styleDays}>
                        <span>{bien.date}</span>
                    </Col> */}
                </Row>
            </Link>
        </Col>
    

    )
})







return (

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{opacity: 0 }}
>

    <Container style={BackgroundImage}>


        <NavBarAdmin pageName="GERER LES BIENS" />


        <Row style={{marginTop: '30px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', justifySelf: 'center', alignSelf: 'center'}}>
            <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Menu  menuButton={     <button style={{backgroundColor: '#206A37', color: 'white', padding: 5, borderRadius: 5}}>
                                        <BsFillPlusCircleFill style={{marginRight: '5px'}}/>
                                        <span>Ajouter un bien</span>
                                    </button>}>
                    <SubMenu label="Vente">
                        <MenuItem onClick={()=> props.onChooseCategory({transaction: "Vente", typeDeBien: "Appartement"})}><Link to="/adminCreerBien" style={{color: "black"}}>Appartement</Link></MenuItem>
                        <MenuItem onClick={()=> props.onChooseCategory({transaction: "Vente", typeDeBien: "Maison"})}><Link to="/adminCreerBien" style={{color: "black"}}>Maison</Link></MenuItem>
                        <MenuItem onClick={()=> props.onChooseCategory({transaction: "Vente", typeDeBien: "Loft"})}><Link to="/adminCreerBien" style={{color: "black"}}>Loft</Link></MenuItem>
                        <MenuItem onClick={()=> props.onChooseCategory({transaction: "Vente", typeDeBien: "Terrain"})}><Link to="/adminCreerBien" style={{color: "black"}}>Terrain</Link></MenuItem>
                        <MenuItem onClick={()=> props.onChooseCategory({transaction: "Vente", typeDeBien: "Immeuble"})}><Link to="/adminCreerBien" style={{color: "black"}}>Immeuble</Link></MenuItem>
                        <MenuItem onClick={()=> props.onChooseCategory({transaction: "Vente", typeDeBien: "Hôtel Particulier"})}><Link to="/adminCreerBien" style={{color: "black"}}>Hôtel Particulier</Link></MenuItem>
                        <MenuItem onClick={()=> props.onChooseCategory({transaction: "Vente", typeDeBien: "Fonds de commerce"})}><Link to="/adminCreerBien" style={{color: "black"}}>Fonds de commerce</Link></MenuItem>
                        <MenuItem onClick={()=> props.onChooseCategory({transaction: "Vente", typeDeBien: "Bureau"})}><Link to="/adminCreerBien" style={{color: "black"}}>Bureau</Link></MenuItem>
                        <MenuItem onClick={()=> props.onChooseCategory({transaction: "Vente", typeDeBien: "Parking / Garage"})}><Link to="/adminCreerBien" style={{color: "black"}}>Parking / Garage</Link></MenuItem>
                    </SubMenu>
                    <SubMenu label="Location">
                        <MenuItem onClick={()=> props.onChooseCategory({transaction: "Location", typeDeBien: "Appartement"})}><Link to="/adminCreerBien" style={{color: "black"}}>Appartement</Link></MenuItem>
                        <MenuItem onClick={()=> props.onChooseCategory({transaction: "Location", typeDeBien: "Maison"})}><Link to="/adminCreerBien" style={{color: "black"}}>Maison</Link></MenuItem>
                        <MenuItem onClick={()=> props.onChooseCategory({transaction: "Location", typeDeBien: "Loft"})}><Link to="/adminCreerBien" style={{color: "black"}}>Loft</Link></MenuItem>
                        <MenuItem onClick={()=> props.onChooseCategory({transaction: "Location", typeDeBien: "Hôtel Particulier"})}><Link to="/adminCreerBien" style={{color: "black"}}>Hôtel Particulier</Link></MenuItem>
                        <MenuItem onClick={()=> props.onChooseCategory({transaction: "Location", typeDeBien: "Immeuble"})}><Link to="/adminCreerBien" style={{color: "black"}}>Immeuble</Link></MenuItem>
                        <MenuItem onClick={()=> props.onChooseCategory({transaction: "Location", typeDeBien: "Bureau"})}><Link to="/adminCreerBien" style={{color: "black"}}>Bureau</Link></MenuItem>
                        <MenuItem onClick={()=> props.onChooseCategory({transaction: "Location", typeDeBien: "Parking / Garage"})}><Link to="/adminCreerBien" style={{color: "black"}}>Parking / Garage</Link></MenuItem>
                    </SubMenu>
                    <SubMenu label="Viager">
                        <MenuItem onClick={()=> props.onChooseCategory({transaction: "Viager", typeDeBien: "Appartement"})}><Link to="/adminCreerBien" style={{color: "black"}}>Appartement</Link></MenuItem>
                        <MenuItem onClick={()=> props.onChooseCategory({transaction: "Viager", typeDeBien: "Maison"})}><Link to="/adminCreerBien" style={{color: "black"}}>Maison</Link></MenuItem>
                        <MenuItem onClick={()=> props.onChooseCategory({transaction: "Viager", typeDeBien: "Loft"})}><Link to="/adminCreerBien" style={{color: "black"}}>Loft</Link></MenuItem>
                    </SubMenu>
                </Menu>
            </Col>
        </Row>

        <Row style={firstRow}>

            {viewBiensList}

        </Row>

    </Container>

</motion.div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        onChooseCategory : function(thisCategory) {
            dispatch( {type: "addCategory", category: thisCategory})
        },
        onBienClick : function(bien) {
            dispatch( {type: "addBien", whatBien: bien})
        }
    }
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
      alignSelf: 'center',
      cursor: "pointer",
      backgroundColor: 'rgba(255,255,255, 0.7)'
  }

  var styleLink = {
    width: "100%", 
    display: "flex", 
    flexDirection: "column", 
    justifyContent: "center", 
    alignItems: "center", 
    color: "black"
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

  var styleDays = {
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#206A37', 
    color: 'white', 
    fontSize: 10,
    borderRadius: 30

  }

export default connect(
    null, 
    mapDispatchToProps
) (AdminGererBiens);
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Popover, Input, PopoverBody, Button, Label, FormGroup  } from 'reactstrap';
import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion'
import { FaUserCircle } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { GrUserFemale } from 'react-icons/gr';
import { GrUserManager } from 'react-icons/gr';
import NavBarAdmin from "./NavBarAdmin"





function AdminAjouterAdmin() {

  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  /* LOGIN STATES*/ 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [logInMessage, setLogInMessage] = useState([])
  const [logInAccepted, setLogInAccepted] = useState(false)
  const [userGenre, setUserGenre] = useState('')
  const [usersName, setUsersName] = useState('')
  const [quelleAgence, setQuelleAgence] = useState('')
  const [userFoundFromToken, setUserFoundFromToken] = useState(localStorage.getItem('usersToken'))
  const [tableauErreurs, setTableauErreurs] = useState([])

/* ADMIN STATES*/ 

const [genre, setGenre] = useState("")
const [nom, setNom] = useState("")
const [prenom, setPrenom] = useState("")
const [adminEmail, setAdminEmail] = useState("")
const [adminPassword, setAdminPassword] = useState("")
const [agence, setAgence] = useState("F.C.I Paris")
const [telephone, setTelephone] = useState("")
const [adminSaved, setAdminSaved] = useState(false)



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


    
      var userBoard = <PopoverBody style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                          <span style={{padding: '1vh', color: '#206A37', fontWeight: 'bold'}}>Se connecter</span>
                          <Input type="email" placeholder="Email" style={{marginBottom: '1vh', width:'auto'}} onChange={(e) => setEmail(e.target.value)}></Input>
                          <Input type="password" placeholder="Password" style={{marginBottom: '1vh', width:'auto'}} onChange={(e) => setPassword(e.target.value)}></Input>
                          <span style={{padding: '1vh', color: 'red', fontWeight: 'bold'}}>
                              {
                                logInMessage.map(function(error){
                                    return(
                                    <span>{error}</span>
                                    )
                                })
                              }
                           </span>
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

  var genreStyleFemme = {
    border: "2px solid black", 
    padding: 8, 
    borderRadius: 100, 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    marginRight: 5,
    cursor: "pointer",
    
  }

  var genreStyleHomme = {
    border: "2px solid black", 
    padding: 8, 
    borderRadius: 100, 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    marginRight: 5,
    cursor: "pointer", 
    
  }


 
      if(genre === "Madame"){

        genreStyleFemme = {
            border: "4px solid #206A37", 
            padding: 8, 
            borderRadius: 100, 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            marginRight: 5,
            cursor: "pointer"
          }
      }
      if(genre === "Monsieur"){

        genreStyleHomme = {
            border: "4px solid #206A37", 
            padding: 8, 
            borderRadius: 100, 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            marginRight: 5,
            cursor: "pointer"
          }

      }

async function onValidateClick(){
    console.log(
        nom, prenom, adminPassword, adminEmail, genre, agence, telephone
    )

    var rawData = await fetch('/saveAdmin', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            genreFromFront: genre,
            nomFromFront: nom,
            prenomFromFront: prenom,
            emailFromFront: adminEmail,
            passwordFromFront: adminPassword,
            telFromFront: telephone,
            agenceFromFront: agence,
        })

})
    var data = await rawData.json()
    console.log(data)
    if(data.result == true){
      setAdminSaved(true)
      }else{
        setTableauErreurs(data.errors)

      }

}

if(adminSaved === true){
  return(
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{opacity: 0 }}
>

      <Container style={BackgroundImage}>


        <NavBarAdmin pageName="AJOUTER ADMINISTRATEUR"/>

        <Row style={{color: "#206A37", fontWeight: "bold", fontSize: 30, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
          Le compte administrateur à été crée!
          <Button to="adminHomePage" style={{backgroundColor: "#206A37", marginTop: 10}}>
            <Link to="/adminHomePage" style={{color: "white"}}>
              Revenir à l'acceuil
            </Link>
          </Button>
        </Row>


        
      </Container>

</motion.div>

  )
}

  

  return (

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{opacity: 0 }}
>

      <Container style={BackgroundImage}>


        <NavBarAdmin pageName="AJOUTER ADMINISTRATEUR"/>

        <Col xs="6" style={{border: "2px solid black", borderRadius: 10, display: "flex", justifyContent: "center", alignItems: "center", justifySelf: "center", alignSelf: "center", flexDirection: "column", marginTop: 40}}>
            <Row style={{marginTop: 10, display: "flex", flexDirection: "column", marginBottom: 20}}>
                <Row style={{fontWeight: 'bold', display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 10}}>
                    Genre : 
                </Row>
                <Row style={{display: "flex"}}>
                    <span onClick={()=>setGenre("Madame")} style={genreStyleFemme}>
                        <GrUserFemale style={{width: 50, height: 50}}/>
                    </span>
                    <span onClick={()=>setGenre("Monsieur")} style={genreStyleHomme}>
                        <GrUserManager style={{width: 50, height: 50}}/>
                    </span>
                </Row>
            </Row>
            <Row style={{marginBottom: 5, width: "100%"}}>
                <Col xs="6">
                    <span style={{fontWeight: 'bold'}}>Nom :</span>
                    <Input type="text" value={nom} onChange={(e)=>setNom(e.target.value)}/>
                </Col>
                <Col xs="6">
                    <span style={{fontWeight: 'bold'}}>Prénom :</span>
                    <Input type="text" value={prenom} onChange={(e)=>setPrenom(e.target.value)}/>
                </Col>
            </Row>
            <Row style={{marginBottom: 5, width: "100%"}}>
                <Col xs="6">
                    <span style={{fontWeight: 'bold'}}>Email :</span>
                    <Input type="text" value={adminEmail} onChange={(e)=>setAdminEmail(e.target.value)}/>
                </Col>
                <Col xs="6">
                    <span style={{fontWeight: 'bold'}}>Mot de passe :</span>
                    <Input style={{width: "100%"}} type="password" value={adminPassword} onChange={(e)=>setAdminPassword(e.target.value)}/>
                </Col>
            </Row>
            <Row style={{marginBottom: 5, width: "100%"}}>
                <Col xs="6" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <FormGroup style={{width: "100%"}}>
                    <Label for="exampleSelect" style={{fontWeight: 'bold', margin: 0}}>Agence Mandataire : </Label>
                        <Input style={{width: "100%"}}  value={agence} onChange={(e)=>setAgence(e.target.value)} type="select" name="select" id="exampleSelect" >
                            <option>F.C.I Paris</option>
                            <option>F.C.I Houdan</option>
                            <option>F.C.I Maule</option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col xs="6" style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                    <span style={{fontWeight: 'bold', alignSelf: "flex-start"}}>Téléphone :</span>
                    <Input style={{width: "100%"}}  type="text" value={telephone} onChange={(e)=>setTelephone(e.target.value)}/>
                </Col>
            </Row>
            <Row style={{display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 5}}>
                {
                    tableauErreurs.map(function(error){
                        return(
                            <span style={{color: "red"}}>{error}</span>
                        )
                    })
                }
            </Row>
            <Row  style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%"}}>
                <Button onClick={()=>onValidateClick()} style={{backgroundColor: "#206A37", width: "100%", marginBottom: 5 }}>CONFIRMER</Button>
            </Row>
        </Col>


        
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






export default AdminAjouterAdmin;
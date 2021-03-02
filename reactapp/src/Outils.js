import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Popover, Input, PopoverBody, Button, Label  } from 'reactstrap';
import photo from './images/PageOutils.png'
import { Link } from 'react-router-dom';
import logo from './images/logo.png'
import user from './images/user.png'
import { Divider } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEquals} from '@fortawesome/free-solid-svg-icons'
import Footer from './Footer'
import { motion } from 'framer-motion'
import { FaUserCircle } from 'react-icons/fa';



function Outils() {

  function percentage(num, per)
{
  return (num/100)*per;
}

  const [popoverOpen, setPopoverOpen] = useState(false);

  const [montantEmpruntbutton, setmontantEmpruntButton] = useState(false);
  const [mensualiteButton, setMensualiteButton] = useState(false)
  const [dureeButton, setDureeButton] = useState(false)
  const [fraisNotaireButton, setFraisNotaireButton] = useState(false)

  const [MEmensualite, setMEmensualite] = useState()
  const [MEduree, setMEduree] = useState()
  const [MEtaux, setMEtaux] = useState()
  const [MEmoisOuAnnee, setMEmoisOuAnnee] = useState()

  const [mensMontant, setMensMontant] = useState()
  const [mensDuree, setMensDuree] = useState()
  const [mensTaux, setMensTaux] = useState()
  const [mensMoisOuAnee, setMensMoisOuAnnee] = useState()

  const [dureeMontant, setDureeMontant] = useState()
  const [dureeMensualite, setDureeMensualite] = useState()
  const [dureeTaux, setDureeTaux] = useState()
  const [dureeAppInitial, setDureeAppInitial] = useState()

  const [FNtype, setFNtype] = useState('')
  const [FNmontant, setFNmontant] = useState()

  const [resultatMensualité , setResultatMensualité] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const [logInMessage, setLogInMessage] = useState([])

  const [logInAccepted, setLogInAccepted] = useState(false)

  const [userGenre, setUserGenre] = useState('')
  const [usersName, setUsersName] = useState('')

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

  const toggle = () => setPopoverOpen(!popoverOpen);

  var handleMontantEmpruntButtonClick = () => {
    setmontantEmpruntButton(!montantEmpruntbutton)
  }

  var handleMensualiteButtonClick = () => {
    setMensualiteButton(!mensualiteButton)
  }

  var handleDureeButtonClick = () => {
    setDureeButton(!dureeButton)
  }

  var handleFraisNotaireButton = () => {
    setFraisNotaireButton(!fraisNotaireButton)
  }

  var handleCalculerMontantEmprut = () => {
    console.log(MEmensualite, MEduree, MEtaux, MEmoisOuAnnee)
  }

  var handleCalculerMensualite = () => {
    console.log(mensMontant, mensTaux, mensDuree, mensMoisOuAnee)
  }

  var handleCalculerDuree = () => {
    console.log(dureeMontant, dureeTaux, dureeAppInitial, dureeMensualite)
  }

  var handleCalculerFN = () => {
    console.log(FNmontant, FNtype, percentage(250000, 8))
  }



  var montantEmprunt = ''
  var mensualité = ''
  var duree = ''
  var fraisNotaire = ''

  if (montantEmpruntbutton === true){

    montantEmprunt = <Row style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: '2vh', marginBottom: '2vh'}}>

              <Col xs='12' lg='6' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>

                <Row style={{diplay:'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                  <Col xs='12' lg='5' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <span style={smallFont}>Mensualité:</span>
                    <Input onChange={(e) => setMEmensualite(e.target.value)} size="sm"/>  
                  </Col>
                  <Col  xs='12' lg='5' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <span style={smallFont}>Durée:</span>
                    <Input onChange={(e) => setMEduree(e.target.value)} size="sm"/>
                  </Col>
                </Row>

                <Row style={{diplay:'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
                  <Col  xs='12' lg='5' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <span style={smallFont}>Taux d’intéret:</span>
                    <Input onChange={(e) => setMEtaux(e.target.value)} size="sm" />  
                  </Col>
                  <Col xs='12' lg='5' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                    <Label check style={{marginRight: '25px'}}>
                      <Input type="radio" name="radio1" size="sm" value='mois' style={smallFont} onChange={(e) => setMEmoisOuAnnee(e.target.value)} />
                      <span style={smallFont}>Mois</span>
                    </Label>
                    <Label check style={{marginRight: '5px'}}>
                      <Input type="radio" name="radio1" size='sm' value='annee' style={smallFont} onChange={(e) => setMEmoisOuAnnee(e.target.value)} />
                      <span style={smallFont}>Année</span>
                    </Label>
                  </Col>
                </Row>

                <Row>
                  <Button size='sm' style={{marginTop: '0.5em', backgroundColor: '#206A37', width: 'auto', fontSize: '0.8em'}} onClick={()=>handleCalculerMontantEmprut()}>Calculer</Button>
                </Row>

              </Col>

              <Col xs='12' lg='1' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <FontAwesomeIcon icon={faEquals} style={{color: '#206A37', margin: '2px'}}></FontAwesomeIcon>
              </Col>

              <Col xs='12' lg='4' style={styleResultat}>
                <Row>
                  <span>Montant de votre emprunt : </span>
                </Row>
                <Row>
                  <span>203 000 €</span>
                </Row>
              </Col>
            </Row>
  }

  if (mensualiteButton === true) {

    // var taux = mensTaux/100;
    // var cal1 = mensMontant*(taux/12);
    // var cal2 = 1+(taux/12)

    // setResultatMensualité(cal1/1-cal2-12*mensDuree)
    // console.log()
    

    mensualité = <Row style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: '2vh', marginBottom: '2vh'}}>

    <Col xs='12' lg='6' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>

      <Row style={{diplay:'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
        <Col xs='12' lg='5' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <span style={smallFont}>Montant de votre emprunt:</span>
          <Input onChange={(e) => setMensMontant(e.target.value)} size="sm"/>  
        </Col>
        <Col  xs='12' lg='5' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <span style={smallFont}>Durée:</span>
          <Input onChange={(e) => setMensDuree(e.target.value)} size="sm"/>
        </Col>
      </Row>

      <Row style={{diplay:'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
        <Col  xs='12' lg='5' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <span style={smallFont}>Taux d’intéret:</span>
          <Input onChange={(e) => setMensTaux(e.target.value)} size="sm" />  
        </Col>
        <Col xs='12' lg='5' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
          <Label check style={{marginRight: '25px'}}>
            <Input type="radio" name="radio1" size="sm" style={smallFont} value='mois' onChange={(e) => setMensMoisOuAnnee(e.target.value)} />
            <span style={smallFont}>Mois</span>
          </Label>
          <Label check style={{marginRight: '5px'}}>
            <Input type="radio" name="radio1" size='sm' style={smallFont} value='annee' onChange={(e) => setMensMoisOuAnnee(e.target.value)} />
            <span style={smallFont}>Année</span>
          </Label>
        </Col>
      </Row>

      <Row>
        <Button size='sm' style={{marginTop: '0.5em', backgroundColor: '#206A37', width: 'auto', fontSize: '0.8em'}} onClick={()=>handleCalculerMensualite()}>Calculer</Button>
      </Row>

    </Col>

    <Col xs='12' lg='1' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <FontAwesomeIcon icon={faEquals} style={{color: '#206A37', margin: '2px'}}></FontAwesomeIcon>
    </Col>

    <Col xs='12' lg='4' style={styleResultat}>
      <Row>
        <span>Mensualité : {resultatMensualité} </span>
      </Row>
      <Row>
        <span>203 000 €</span>
      </Row>
    </Col>



  </Row>
  }

  if (dureeButton === true) {
    duree = <Row style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: '2vh', marginBottom: '2vh'}}>

    <Col xs='12' lg='6' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>

      <Row style={{diplay:'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
        <Col xs='12' lg='5' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <span style={smallFont}>Montant de votre emprunt:</span>
          <Input size="sm" onChange={(e) => setDureeMontant(e.target.value)}/>  
        </Col>
        <Col  xs='12' lg='5' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <span style={smallFont}>Apport initial:</span>
            <Input size="sm" onChange={(e) => setDureeAppInitial(e.target.value)}/>  
          </Row>
        </Col>
      </Row>

      <Row style={{diplay:'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
        <Col  xs='12' lg='5' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <span style={smallFont}>Taux d’intéret:</span>
          <Input size="sm" onChange={(e) => setDureeTaux(e.target.value)} />
        </Col>
        <Col xs='12' lg='5' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <span style={smallFont}>Mensualité:</span>
          <Input size="sm" onChange={(e) => setDureeMensualite(e.target.value)} />
        </Col>
      </Row>

      <Row>
        <Button size='sm' style={{marginTop: '0.5em', backgroundColor: '#206A37', width: 'auto', fontSize: '0.8em'}} onClick={()=>handleCalculerDuree()}>Calculer</Button>
      </Row>

    </Col>

    <Col xs='12' lg='1' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <FontAwesomeIcon icon={faEquals} style={{color: '#206A37', margin: '2px'}}></FontAwesomeIcon>
    </Col>

    <Col xs='12' lg='4' style={styleResultat}>
      <Row>
        <span>Durée : </span>
      </Row>
      <Row>
        <span>203 000 €</span>
      </Row>
    </Col>



  </Row>
  }

  if (fraisNotaireButton ===  true) {

    fraisNotaire = <Row style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: '2vh', marginBottom: '2vh'}}>

    <Col xs='12' lg='6' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>

      <Row style={{diplay:'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
        <Col  xs='12' lg='5' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <Row style={{marginBottom: '1vh'}}>
            <Label check style={{marginRight: '25px'}}>
              <Input type="radio" name="radio1" size="sm" style={smallFont} value='neuf' onChange={(e) => setFNtype(e.target.value)} />
              <span style={smallFont}>Neuf</span>
            </Label>
            <Label check style={{marginRight: '5px'}}>
              <Input type="radio" name="radio1" size='sm' style={smallFont} value='ancien' onChange={(e) => setFNtype(e.target.value)} />
              <span style={smallFont}>Ancien</span>
            </Label>
          </Row>
        </Col>
      </Row>

      <Row style={{diplay:'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', width: '100%'}}>
        <Col  xs='12' lg='5' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <span style={smallFont}>Montant Total du Projet (€) :</span>
          <Input size="sm" onChange={(e) => setFNmontant(e.target.value)} />  
        </Col>
      </Row>

      <Row>
        <Button size='sm' style={{marginTop: '0.5em', backgroundColor: '#206A37', width: 'auto', fontSize: '0.8em'}} onClick={()=>handleCalculerFN()}>Calculer</Button>
      </Row>

    </Col>

    <Col xs='12' lg='1' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <FontAwesomeIcon icon={faEquals} style={{color: '#206A37', margin: '2px'}}></FontAwesomeIcon>
    </Col>

    <Col xs='12' lg='4' style={styleResultat}>
      <Row>
        <span>Frais de Notaire : </span>
      </Row>
      <Row>
        <span>203 000 €</span>
      </Row>
    </Col>



  </Row>
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
        <Row style={navBarRow}>

          <Col xs='2' lg='1' style={{paddingLeft: '0.6vh'}}>
            <Link to='/'>
              <img src={logo} alt='logo' style={{width: 'calc(1em + 9vw)'}}/>
            </Link>
          </Col>

          <Col xs='8' lg='10' style={{display: 'flex', justifyContent: 'center'}}>
              <span style={{color: '#206A37', fontSize: 'calc(1em + 1.5vw)'}}>
                <span>O U T I L S</span>   
              </span>
          </Col>

          <Col xs='2' lg='1' style={{display: 'flex', justifyContent:'flex-end', paddingRight: '5vh'}}>
          <Button style={{backgroundColor: 'white', border: 'white', borderRadius: 100}}><FaUserCircle id="Popover1" size='2x' style={{width: '40px', color: '#206A37'}}/></Button>
              <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle} >
                {userBoard}
              </Popover>
          </Col>

        </Row>

        <Row style={styleBigWhiteBox}>
          <Row style={{fontSize: 'calc(1em + 0.7vw)', color: '#206A37'}}>Outils de financement</Row>
          <Divider style={{width: '100%', backgroundColor: '#206A37', height: '0.7px'}} />
          <Row style={{fontSize: 'calc(0.7em + 0.3vw)', color: '#206A37', width: '100%', justifySelf: 'center', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginBottom: '2vh', marginTop: '2vh'}}>Effectuez vos comptes facilement grâce à nos différentes calculettes financières.</Row>
          <Row style={{width: '80%'}}><Button style={buttonStyle} onClick={ ()=>handleMontantEmpruntButtonClick() }>Calculer le montant de votre emprunt</Button></Row>
            {montantEmprunt}
          <Row style={{width: '80%'}}><Button style={buttonStyle} onClick={ ()=>handleMensualiteButtonClick() }>Calculer le remborsement mensuel de votre emprunt</Button></Row>
            {mensualité}
          <Row style={{width: '80%'}}><Button style={buttonStyle} onClick={ ()=>handleDureeButtonClick() }>Calculer la durée de votre emprunt</Button></Row>
            {duree}
          <Row style={{width: '80%'}}><Button style={buttonStyle} onClick={ ()=>handleFraisNotaireButton() } >Simulation frais de notaires</Button></Row>
            {fraisNotaire}

        </Row>

      </Container>
      <Footer/>

</motion.div>
  );
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

var styleBigWhiteBox = {
  backgroundColor: 'rgba(255,255,255, 0.7)',
  borderRadius: 10,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '70%',
  justifySelf: 'center',
  alignSelf: 'center',
  marginTop: '15px',
  
}

var buttonStyle = {
  width: '100%',
  margin: '5px',
  backgroundColor: '#206A37',
  opacity: '150%',
  fontSize: 'calc(0.5em + 0.3vw)'
}

var smallFont = {
  fontSize: 'calc(0.4em + 0.4vw)',
  textAlign: 'center'
  
}

var styleResultat = {
  textAlign: 'center',
  fontSize: 'calc(0.6em + 0.6vw)',
  color: '#206A37',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  margin: '2px'
}

export default Outils;
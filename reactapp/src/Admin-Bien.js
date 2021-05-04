import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Popover, Input, PopoverBody, Button, Label  } from 'reactstrap';
import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion'
import { FaUserCircle } from 'react-icons/fa';
import { BiEditAlt } from 'react-icons/bi';
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'
import { Gallery, Item } from 'react-photoswipe-gallery'
import NavBarAdmin from "./NavBarAdmin"
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText } from 'reactstrap';
import classnames from 'classnames';
import {connect} from 'react-redux'





function AdminBien(props) {

    function numberWithSpaces(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  const [activeTab, setActiveTab] = useState('1');

  const toggle2 = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const [logInMessage, setLogInMessage] = useState([])

  const [logInAccepted, setLogInAccepted] = useState(false)

  const [userGenre, setUserGenre] = useState('')
  const [usersName, setUsersName] = useState('')

  const [userFoundFromToken, setUserFoundFromToken] = useState(localStorage.getItem('usersToken'))

  const [bienDataFromRedux, setBienDataFromRedux] = useState(props.bienToDispay)
  const [biensPhotos, setBienPhotos] = useState(props.bienToDispay.photos)

  var handleLogout = () => {
      localStorage.removeItem('usersToken')
      setLogInAccepted(false)
  }
  
      
  useEffect(async() => {

    console.log("bienDataFromRedux :", bienDataFromRedux)

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




  return (

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{opacity: 0 }}
>

      <Container style={BackgroundImage}>


        <NavBarAdmin pageName="GERER BIEN" />

        <Row style={{backgroundColor: '#206A37', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingBottom: 10, marginTop: 30, width: "95%", justifySelf: "center", alignSelf: "center", borderRadius: 5}}>
            <Row style={{width: '100%', display: 'flex', marginBottom: 10, alignItems: 'center', fontSize: 20, fontWeight: 'bold'}}>
                <Col xs='6' style={{textTransform: "uppercase"}}>{bienDataFromRedux.typeTransaction}</Col>
                <Col xs='6' style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <span>{numberWithSpaces(bienDataFromRedux.prixBien)} €</span>
                </Col>
            </Row>
            <Row style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                <Col xs='6'>REF: {bienDataFromRedux.reference}</Col>
                <Col xs='6' style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <span style={{backgroundColor: 'white', color: '#206A37', borderRadius: 200, padding: 10}}> {bienDataFromRedux.date}</span>
                </Col>
            </Row>
        </Row>

        <Row style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: 30, marginRight: 1, width: "95%", justifySelf: "center", alignSelf: "center"}}>
            <Link to='/adminEditerBien' style={{color: 'white'}}>
                <Button onClick={()=>props.onEditerBien(bienDataFromRedux)} style={{backgroundColor: '#206A37', color: 'white'}}>
                    <BiEditAlt/>
                    <span>EDITER CE BIEN</span>
                </Button>
            </Link>
        </Row>

        <Row style={firstRow}>
            <Gallery>
                {
                    biensPhotos.map(function(img, i){
                        return(
                            <Item key={i}
                                original={decodeURIComponent(img)}
                                thumbnail={decodeURIComponent(img)}
                                width="1024"
                                height="768"
                            >
                                {({ ref, open }) => (
                                <img style={{width: '250px', height:'150px', border: '5px solid #206A37', marginRight: 5, marginTop: 5, cursor: 'pointer'}} ref={ref} onClick={open} src={decodeURIComponent(img)} />
                                )}
                        </Item>

                        )

                    })
                }
            </Gallery>
        </Row>


        <Row style={secondRow}>

            <Nav style={{width: '100%'}} tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle2('1'); }}
                    >
                        GENERAL
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle2('2'); }}
                    >
                        LOCALISATION
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '3' })}
                        onClick={() => { toggle2('3'); }}
                    >
                        ASPECTS FINANCIERS
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '4' })}
                        onClick={() => { toggle2('4'); }}
                    >
                        COPROPRIÉTÉ
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '6' })}
                        onClick={() => { toggle2('6'); }}
                    >
                        INTÉRIEUR
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '7' })}
                        onClick={() => { toggle2('7'); }}
                    >
                        EXTÉRIEUR
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '8' })}
                        onClick={() => { toggle2('8'); }}
                    >
                        SURFACES
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '9' })}
                        onClick={() => { toggle2('9'); }}
                    >
                        DIAGNOSTICS
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '10' })}
                        onClick={() => { toggle2('10'); }}
                    >
                        DESCRIPTION
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '11' })}
                        onClick={() => { toggle2('11'); }}
                    >
                        AUTRES
                    </NavLink>
                </NavItem>
            </Nav>

            <TabContent style={{width: '100%', border: '1px solid rgb(231, 231, 231)', paddingTop:30, paddingBottom:30, borderTop: 0, marginBottom: 50}} activeTab={activeTab}>
                <TabPane tabId="1">
                    <Row>
                        <Col sm="3" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 10, marginLeft: 5}}>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Type de bien : </span> <span>{bienDataFromRedux.typeBien}</span>
                            </span>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Type de transaction : </span> <span>{bienDataFromRedux.typeTransaction}</span>
                            </span>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Type d'achat : </span> <span>{bienDataFromRedux.typeDachat}</span>
                            </span>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Statut du bien : </span> <span>{bienDataFromRedux.status}</span>
                            </span>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Agence Mandataire : </span> <span>{bienDataFromRedux.agency}</span>
                            </span>
                        </Col>
                        <Col sm="3" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 10}}>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Référence : </span> <span>{bienDataFromRedux.reference}</span>
                            </span>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Date : </span> <span>{bienDataFromRedux.date}</span>
                            </span>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Année de construction : </span> <span>{bienDataFromRedux.anneeDeConstruction}</span>
                            </span>
                        </Col>
                    </Row>
                </TabPane>

                <TabPane tabId="2">
                    <Row>
                        <Col sm="3" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 10, marginLeft: 5}}>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Adresse : </span> <span>{bienDataFromRedux.adresse}</span>
                            </span>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Code Postal : </span> <span>{bienDataFromRedux.codePostal}</span>
                            </span>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Ville : </span> <span>{bienDataFromRedux.ville}</span>
                            </span>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Pays : </span> <span>{bienDataFromRedux.pays}</span>
                            </span>
                        </Col>
                        <Col sm="3" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 10, marginLeft: 5}}>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Exposition : </span> <span>{bienDataFromRedux.exposition}</span>
                            </span>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Vue : </span> <span>{bienDataFromRedux.vue}</span>
                            </span>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Rez de chaussée : </span> <span>{bienDataFromRedux.rdc}</span>
                            </span>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Dernier Etage : </span> <span>{bienDataFromRedux.dernierEtage}</span>
                            </span>
                        </Col>
                        <Col sm="3" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 10, marginLeft: 5}}>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Distance Train : </span> <span>{bienDataFromRedux.distanceTrain}</span>
                            </span>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Accès Bus : </span> <span>{bienDataFromRedux.accesBus}</span>
                            </span>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Accès Métro : </span> <span>{bienDataFromRedux.accesMetro}</span>
                            </span>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Accès Tramway : </span> <span>{bienDataFromRedux.accesTram}</span>
                            </span>
                        </Col>
                        <Col sm="3" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 10, marginLeft: 5}}>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Accès Ecole : </span> <span>{bienDataFromRedux.accesEcole}</span>
                            </span>
                        </Col>
                    </Row>
                </TabPane>

                <TabPane tabId="3">
                    <Row>
                        <Col sm="3" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 10, marginLeft: 5}}>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Prix du bien : </span> <span>{numberWithSpaces(bienDataFromRedux.prixBien)}</span>
                            </span>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Prix m2 : </span> <span>{numberWithSpaces(bienDataFromRedux.prixM2)}</span>
                            </span>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Honoraires Acquéreur : </span> <span>{numberWithSpaces(bienDataFromRedux.honoAcquereur)}</span>
                            </span>
                        </Col>

                        <Col sm="3" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 10, marginLeft: 5}}>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Taxe Foncière : </span> <span>{numberWithSpaces(bienDataFromRedux.taxeFonciere)}</span>
                            </span>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Prix Départ : </span> <span>{numberWithSpaces(bienDataFromRedux.prixDepart)}</span>
                            </span>
                        </Col>
                    </Row>
                </TabPane>

                <TabPane tabId="4">
                    <Row>
                        <Col sm="3" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 10, marginLeft: 5}}>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Bien en copropriété : </span> <span>{bienDataFromRedux.copro}</span>
                            </span>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Nb Lots Copropriété : </span> <span>{bienDataFromRedux.nbLots}</span>
                            </span>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Dont lots d'habitation : </span> <span>{bienDataFromRedux.nbLotsHabitation}</span>
                            </span>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Charges annuelles : </span> <span>{bienDataFromRedux.chargesAnuelles}</span>
                            </span>
                        </Col>
                        <Col sm="3" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 10, marginLeft: 5}}>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Procédures diligentées c/ syndicat de copropriété :</span> <span>{bienDataFromRedux.proceduresCopro}</span>
                            </span>
                        </Col>
                    </Row>
                </TabPane>

                <TabPane tabId="6">
                    <Row>
                    <Col sm="3" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 10, marginLeft: 5}}>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Nombre pièces : </span> <span>{bienDataFromRedux.nbPieces}</span>
                            </span>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Nombre chambres : </span> <span>{bienDataFromRedux.nbChambres}</span>
                            </span>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Chambre RDC : </span> <span>{bienDataFromRedux.chambreRdc}</span>
                            </span>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Etages : </span> <span>{bienDataFromRedux.etages}</span>
                            </span>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Méca. Chauffage : </span> <span>{bienDataFromRedux.mecaChauffage}</span>
                            </span>
                        </Col>
                        <Col sm="3" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 10, marginLeft: 5}}>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Eau chaude : </span> <span>{bienDataFromRedux.eauChaude}</span>
                            </span>
                        </Col>
                    </Row>
                </TabPane>

                <TabPane tabId="7">
                    <Row>
                        <Col sm="3" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 10, marginLeft: 5}}>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Jardin : </span> <span>{bienDataFromRedux.jardinBoolean}</span>
                            </span>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Description jardin : </span> <span>{bienDataFromRedux.jardin}</span>
                            </span>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Vis à Vis : </span> <span>{bienDataFromRedux.visAvis}</span>
                            </span>
                        </Col>
                        <Col xs="3" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 10, marginLeft: 5}}>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Piscine : </span> <span>{bienDataFromRedux.piscineBoolean}</span>
                            </span>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Balcon : </span> <span>{bienDataFromRedux.balconBoolean}</span>
                            </span>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Terrasse : </span> <span>{bienDataFromRedux.terrasseBoolean}</span>
                            </span>
                        </Col>
                    </Row>
                </TabPane>

                <TabPane tabId="8">
                    <Row>
                        <Col sm="3" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 10, marginLeft: 5}}>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Surface Total : </span> <span>{bienDataFromRedux.surfaceTotal}</span>
                            </span>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Surface Terrain : </span> <span>{bienDataFromRedux.surfaceTerrain}</span>
                            </span>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Surface par pièce : </span> <span>{bienDataFromRedux.surfacePiece}</span>
                            </span>
                        </Col>
                    </Row>
                </TabPane>

                <TabPane tabId="9">
                    <Row>
                        <Col sm="3" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 10, marginLeft: 5}}>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Gaz Effet de Serre : </span> <span>{bienDataFromRedux.gazEffetSerre}</span>
                            </span>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Valeur Gaz Effet de Serre : </span> <span>{bienDataFromRedux.valeurGazSerre}</span>
                            </span>
                            <span>
                                <span style={{fontWeight: 'bold'}}>Valeur Consomation annuelle : </span> <span>{bienDataFromRedux.valeurConsoAnnuelle}</span>
                            </span>
                        </Col>
                    </Row>
                </TabPane>

                <TabPane tabId="10">
                    <Row>
                        <Col sm="12" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 10, marginLeft: 5}}>
                            <span style={{fontWeight: 'bold'}}>Description : </span> 
                            <span>{bienDataFromRedux.description}</span>
                        </Col>
                    </Row>
                </TabPane>

                <TabPane tabId="11">
                    <Row>
                        <Col sm="12" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 10, marginLeft: 5}}>
                            <span style={{fontWeight: 'bold'}}>Autres : </span> 
                            <span>{bienDataFromRedux.autres}</span>
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>

        </Row>



      </Container>

</motion.div>
  );
}

function mapStateToProps(state) {
    return { bienToDispay: state.viewBien }
}

function mapDispatchToProps(dispatch) {
    return {
        onEditerBien : function(thisBien) {
            dispatch( {type: "editBien", whatBien: thisBien})
        }
    }
}



var BackgroundImage = {
  display: 'flex',
  flexDirection: 'column',
  height:'auto',
  minHeight: "100vh",
  backgroundColor: 'rgba(189, 224, 193)',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  maxWidth: '100%',
}


var firstRow = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
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
    backgroundColor: 'rgba(255,255,255, 0.7)',
    width: '95%',
    justifySelf: 'center',
    alignSelf: 'center',
    marginTop: '30px',
    borderRadius: '10px',
    border: 0,
    marginBottom: 30
  }


export default connect (
    mapStateToProps,
    mapDispatchToProps
) (AdminBien) 
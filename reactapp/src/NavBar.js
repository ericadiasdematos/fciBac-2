import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Popover, Input, PopoverBody, Button, ListGroup, ListGroupItem  } from 'reactstrap';
import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserCircle } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { RiCloseCircleLine } from 'react-icons/ri';
import { RiAdminFill } from 'react-icons/ri';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { SpaceContext } from 'antd/lib/space';





function NavBar(props){

    const [popoverOpen, setPopoverOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [logInMessage, setLogInMessage] = useState([])
    const [logInAccepted, setLogInAccepted] = useState(false)
    const [userGenre, setUserGenre] = useState('')
    const [usersName, setUsersName] = useState('')
    const [userFoundFromToken, setUserFoundFromToken] = useState(localStorage.getItem('usersToken'))
    const [userType, setUserType] = useState('')
    const [popoverOpenMenu, setPopoverOpenMenu] = useState(false);

    const toggleMenu = () => setPopoverOpenMenu(!popoverOpenMenu);

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
            setUserType(data.user.type)

          }
  
        }
     
      },[]);

    const toggle = () => setPopoverOpen(!popoverOpen);

    var handleLogout = () => {
        localStorage.removeItem('usersToken')
        setLogInAccepted(false)
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
          setUserType(data.userType)
          localStorage.setItem('usersToken', data.token)
          window.location.reload()
        }else{
          setLogInMessage(data.errors)
  
        }
  
    }

var adminButton;

if(userType === 'admin'){

  adminButton = 
<Button size='xl' style={{width: '28vh', marginBottom: '1vh', backgroundColor: '#206A37'}}>
  <Link to="/adminHomePage" style={{color: "white"}}>
    <RiAdminFill style={{marginRight: 5}}/>
    Page Administrateur
  </Link>
</Button>

}

var userBoard = 
<Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
  <PopoverBody style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <span style={{padding: '1vh', color: '#206A37', fontWeight: 'bold'}}>Se connecter</span>
      <Input type="email" placeholder="Email" style={{marginBottom: '1vh', width:'auto'}} onChange={(e) => setEmail(e.target.value)}></Input>
      <Input type="password" placeholder="Password" style={{marginBottom: '1vh', width:'auto'}} onChange={(e) => setPassword(e.target.value)}></Input>
      <span style={{padding: '1vh', color: '#206A37', fontWeight: 'bold'}}>{logInMessage}</span>
      <Button style={{width: '28vh', marginBottom: '1vh', backgroundColor: '#206A37'}} onClick={()=>handleSignIn()}>Confirmer</Button>
      <Button style={{width: '28vh', backgroundColor: '#206A37'}}><Link to='/creationdecompte' style={{color: 'white'}}>Créer un compte</Link></Button>
  </PopoverBody>
</Popover>

var userIcon = <AiOutlineUserAdd size='2x' style={{width: '40px', color: '#206A37'}}/>


if(logInAccepted === true){

var firstLetter = usersName.charAt(0)

userIcon =
    <span style={{fontSize: 15, color: '#206A37', fontWeight: "bold", display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center"}}>
      <FaUserCircle size='2x' style={{width: '40px', color: '#206A37', marginBottom: 5}}/>
     {usersName}
    </span>

userBoard = 
<Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
  <PopoverBody style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
    <span style={{padding: '1vh', color: '#206A37', fontWeight: 'bold'}}>Bienvenue {userGenre} {usersName} !</span>
    {adminButton}
    <Button size='sm' style={{width: '28vh', marginBottom: '1vh', backgroundColor: '#206A37'}}><Link to='/wishlist' style={{color: 'white'}}>Voir mes favoris</Link></Button>
    <Button size='sm' style={{width: '28vh', marginBottom: '1vh', backgroundColor: '#206A37'}}><Link to='/mesrecherches' style={{color: 'white'}}>Voir mes dernieres recherches</Link></Button>
    <Button size='sm' style={{width: '28vh', backgroundColor: '#206A37'}} onClick={()=>handleLogout()}>Se déconecter</Button>
  </PopoverBody>
</Popover>
}

var burguerMenu = 
<Popover placement="bottom-end" hideArrow={true} isOpen={popoverOpenMenu} target="Popover2" toggle={toggleMenu} style={{width: 250}}>
<ListGroup>
  <ListGroupItem style={{fontWeight: "bold", color: "gray", display: "flex", justifyContent: "space-between"}}>
    <span style={{fontSize: 25}}>
      MENU :
    </span>
    <RiCloseCircleLine style={{width: 20, height: 20, cursor: "pointer"}} onClick={()=>toggleMenu()}/>
  </ListGroupItem>
  <ListGroupItem disabled tag="button" action style={{fontWeight: "bold", color: "#206A37"}}>GESTION LOCATIVE :</ListGroupItem>
    <ListGroupItem tag="button" action>
      <Link to="/estimer" onClick={()=>props.onContactClick('Je veux mettre mon bien en location.')} style={{color: "gray"}}>
        &nbsp;Mettre en location
      </Link>
    </ListGroupItem>
    <ListGroupItem tag="button" action>
      <Link to="/recherche" onClick={ () => onClickTransaction("Louer") } style={{color: "gray"}}>
        &nbsp;Louer un bien
      </Link>
    </ListGroupItem>
  <ListGroupItem disabled tag="button" action style={{fontWeight: "bold", color: "#206A37"}}>TRANSACTION :</ListGroupItem>
    <ListGroupItem tag="button" action>
      <Link to="/recherche" onClick={ () => onClickTransaction("Acheter") } style={{color: "gray"}}>
        &nbsp;Acheter un bien
      </Link>
    </ListGroupItem>
    <ListGroupItem tag="button" action>
      <Link to="/estimer" onClick={()=>props.onContactClick('Je veux vendre mon bien.')} style={{color: "gray"}}>
        &nbsp;Vendre mon bien
      </Link>
    </ListGroupItem>
    <ListGroupItem tag="button" action>
      <Link to="/estimer" onClick={()=>props.onContactClick('Je veux estimer mon bien.')} style={{color: "gray"}}>
        &nbsp;Estimer mon bien
      </Link>
    </ListGroupItem>
    <ListGroupItem tag="button" action>
      <Link to="/recherche" onClick={ () => onClickTransaction("Viager") } style={{color: "gray"}}>
        &nbsp;Viager
      </Link>
    </ListGroupItem>
  <ListGroupItem disabled tag="button" action style={{fontWeight: "bold", color: "#206A37"}}>SYNDIC :</ListGroupItem>
    <ListGroupItem tag="button" action>
      <Link to="/syndic" onClick={()=>props.onContactClick('Je veux changer de Syndic.')} style={{color: "gray"}}>
        &nbsp;Changer de Syndic
      </Link>
    </ListGroupItem>


</ListGroup>              
</Popover>

if(props.pageName === "AJOUTER ADMINISTRATEUR" ||
  props.pageName === "GERER BIEN" ||
  props.pageName === "CREER UN BIEN" ||
  props.pageName === "EDITER BIEN" ||
  props.pageName === "GERER LES ADMINISTRATEURS" ||
  props.pageName === "GERES LES MESSAGES" ||
  props.pageName === "GERER LES BIENS" ||
  props.pageName === "PAGE ADMISNISTRATEUR"||
  props.pageName === "CREER UN BIEN" ){

  burguerMenu = 
<Popover placement="bottom-end" hideArrow={true} isOpen={popoverOpenMenu} target="Popover2" toggle={toggleMenu} style={{width: 300}}>
<ListGroup>
  <ListGroupItem style={{fontWeight: "bold", color: "gray", display: "flex", justifyContent: "space-between"}}>
    <span style={{fontSize: 25}}>
      MENU :
    </span>
    <RiCloseCircleLine style={{width: 20, height: 20, cursor: "pointer"}} onClick={()=>toggleMenu()}/>
  </ListGroupItem>
  <ListGroupItem disabled tag="button" action style={{fontWeight: "bold", color: "#206A37"}}>GERES LES BIENS :</ListGroupItem>
    <ListGroupItem tag="button" action>
      <Link to="/adminGererBiens" onClick={()=>props.onContactClick('Je veux mettre mon bien en location.')} style={{color: "gray"}}>
        &nbsp;Voir la liste des biens
      </Link>
    </ListGroupItem>
    <ListGroupItem tag="button" action>
      <Link to="/adminCreerBien" onClick={ () => onClickTransaction("Louer") } style={{color: "gray"}}>
        &nbsp;Créer un bien
      </Link>
    </ListGroupItem>
  <ListGroupItem disabled tag="button" action style={{fontWeight: "bold", color: "#206A37"}}>GERES LES MESSAGES :</ListGroupItem>
    <ListGroupItem tag="button" action>
      <Link to="/adminGererMessages" onClick={ () => onClickTransaction("Acheter") } style={{color: "gray"}}>
        &nbsp;Voir les messages
      </Link>
    </ListGroupItem>
  <ListGroupItem disabled tag="button" action style={{fontWeight: "bold", color: "#206A37"}}>GERER LES ADMINISTRATEURS :</ListGroupItem>
    <ListGroupItem tag="button" action>
      <Link to="/adminGererAdmin" onClick={()=>props.onContactClick('Je veux changer de Syndic.')} style={{color: "gray"}}>
        &nbsp;Voir la liste des administrateurs
      </Link>
    </ListGroupItem>
    <ListGroupItem tag="button" action>
      <Link to="/adminAjouterAdmin" onClick={()=>props.onContactClick('Je veux changer de Syndic.')} style={{color: "gray"}}>
        &nbsp;Ajouter un administrateur
      </Link>
    </ListGroupItem>
    <ListGroupItem tag="button" action>
      <Link to="/" onClick={()=>props.onContactClick('Je veux mettre mon bien en location.')} style={{fontWeight: "bold", color: "#206A37"}}>
        &nbsp;Page d'acceuil utilisateur
      </Link>
  </ListGroupItem>
  <ListGroupItem tag="button" action>
      <Link to="/adminHomePage" onClick={()=>props.onContactClick('Je veux mettre mon bien en location.')} style={{fontWeight: "bold", color: "#206A37"}}>
        &nbsp;Page d'acceuil administrateurs
      </Link>
  </ListGroupItem>


</ListGroup>              
</Popover>
}

function changeWeight(e) {
  e.target.style.fontWeight = 'bolder';
}

function changeBackWeight(e) {
  e.target.style.fontWeight = 'normal';
}

function changeBorder(e) {
  e.target.style.border = '1px solid #206A37';
}

function changeBackBorder(e) {
  e.target.style.border = 'none';
}

function onClickTransaction(type){
  props.onTypeClick(type)
  props.onBoundsValider([])
}




    return(

      <Row style={navBarRow}>

            <Col xs="12" lg="2" style={{display: "flex", justifyContent: "flex-start"}}>
              <span id="Popover2" type="button" style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center", marginRight: 45}}>
                <FiMenu style={{height: 40, width: 40, color: "#206A37"}}/>
                <span style={{color: "#206A37"}}>MENU</span>
              </span>
              {burguerMenu}
              <Link to="/" style={{width: '100%', height: '100%'}}>
                  <img src={logo} style={{width: 150}}/>
              </Link>
            </Col>

            <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center'}}>
                <span style={{color: '#206A37', fontSize: 'calc(1em + 0.5vw)'}}>
                    <Link to='/quisommesnous' style={{color: '#206A37'}} onMouseOver={changeWeight} onMouseOut={changeBackWeight}>QUI SOMMES NOUS</Link>
                </span>
            </Col>
            <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center'}}>
                <span style={{color: '#206A37', fontSize: 'calc(1em + 0.5vw)'}}>
                    <Link to='/nosagences' style={{color: '#206A37'}} onMouseOver={changeWeight} onMouseOut={changeBackWeight}>NOS AGENCES</Link>
                </span>
            </Col>
            <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center'}}>
                <span style={{color: '#206A37', fontSize: 'calc(1em + 0.5vw)'}}>
                    <Link to='/outils' style={{color: '#206A37'}} onMouseOver={changeWeight} onMouseOut={changeBackWeight}>OUTILS</Link>
                </span>
            </Col>
            <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center'}}>
                <span style={{color: '#206A37', fontSize: 'calc(1em + 0.5vw)'}}>
                    <Link to='/contact' style={{color: '#206A37'}} onMouseOver={changeWeight} onMouseOut={changeBackWeight}>CONTACT</Link>
                </span>
            </Col>
            <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center', fontSize: '1vw'}}>
              <Button id="Popover1" style={{backgroundColor: "transparent", border: "transparent", width: '100%', height: '100%'}}>
                {userIcon}
              </Button>
              {userBoard}
            </Col>
        </Row>

    )
}

function mapDispatchToProps(dispatch) {
  return {
      onContactClick: function(reason) {
          dispatch( {type: 'addReason', whatReason: reason})
      },
      onTypeClick : function(type) {
          dispatch( {type: "addType", whatType: type})
      },
      onBoundsValider: function(bounds) {
        dispatch( {type: "setLatAndLng", whatBounds: bounds} )
      }
  }
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
  marginBottom: 50
}


export default connect(
  null,
  mapDispatchToProps
)(NavBar);
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import photo from './images/HomePageFond.png'
import photo2 from './images/ActualitéesFonds.png'
import { Container, Row, Col, Popover, Input, PopoverBody, Button } from 'reactstrap';
import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import user from './images/user.png'
import {connect} from 'react-redux'
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { Media } from 'reactstrap';

const Example = () => {
    return (
      <Media>
        <Media left>
          <img src={photo} style={{width: 264}}/>
        </Media>
        <Media body>
          <Media heading>
            Media heading
          </Media>
          Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
        </Media>
      </Media>
    );
  };
 




function HomePage(props) {

    const [popoverOpen, setPopoverOpen] = useState(false);

    const toggle = () => setPopoverOpen(!popoverOpen);

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


//     const listData = [];
// for (let i = 0; i < 23; i++) {
//   listData.push({
//     href: 'https://ant.design',
//     title: `ant design part ${i}`,
//     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//     description:
//       'Ant Design, a design language for background applications, is refined by Ant UED Team.',
//     content:
//       'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
//   });
// }

// const IconText = ({ icon, text }) => (
//   <Space>
//     {React.createElement(icon)}
//     {text}
//   </Space>
// );


    return(

<span>

    <Container style={BackgroundImage1}>
            
        <Row style={navBarRow}>

            <Col xs='12' lg='2' style={{paddingLeft: '0.6vh', display: 'flex', justifyContent: 'center'}}>
                <img src={logo} alt='logo' style={{width: 'calc(1em + 9vw)'}}/>
            </Col>
            <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center'}}>
                <span style={{color: '#206A37', fontSize: 'calc(1em + 0.5vw)'}}>
                    <Link to='/quisommesnous' style={{color: '#206A37'}}>QUI SOMMES NOUS</Link>
                </span>
            </Col>
            <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center'}}>
                <span style={{color: '#206A37', fontSize: 'calc(1em + 0.5vw)'}}>
                    <Link to='/nosagences' style={{color: '#206A37'}}>NOS AGENCES</Link>
                </span>
            </Col>
            <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center'}}>
                <span style={{color: '#206A37', fontSize: 'calc(1em + 0.5vw)'}}>
                    <Link to='/outils' style={{color: '#206A37'}}>OUTILS</Link>
                </span>
            </Col>
            <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center'}}>
                <span style={{color: '#206A37', fontSize: 'calc(1em + 0.5vw)'}}>
                    <Link to='/contact' style={{color: '#206A37'}}>CONTACT</Link>
                </span>
            </Col>
            <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center', fontSize: '1vw'}}>
                <img src={user} id="Popover1" style={{width: 'calc(1em + 2vw)'}} type="button" ></img>
                <Popover placement="auto" isOpen={popoverOpen} target="Popover1" toggle={toggle} >
                    {userBoard}
                </Popover>
            </Col>
        </Row>
        

        <Row style={nameWhiteBlock}>
            <Col xs='12' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <h1 style={{color: '#206A37', fontSize: 'calc(1em + 2vw)'}}>Agence Immobiliere FCI</h1>
                <h5 style={{color: '#206A37', fontSize: 'calc(1em + 0.5vw)'}}>Françoise Combes Immobilier</h5>
            </Col>
        </Row>

        <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Col xs='12' lg='2' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <span style={littlewhiteboxes}>
                    <span>
                        <Link to='/estimer' style={{color: '#206A37'}} onClick={()=>props.onContactClick('Je veux mettre mon bien en location.')}>Mettre en Location</Link>
                    </span>
                </span>
                <span style={littlewhiteboxes}>
                    <span>
                        <Link to='/recherche' style={{color: '#206A37'}}>Louer un bien</Link>
                    </span>
                </span>
            </Col>
            <Col  xs='12' lg='2' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <span style={littlewhiteboxes}>
                    <span>
                        <Link to='/recherche' style={{color: '#206A37'}}>Acheter</Link>
                    </span>
                </span>
                <span style={littlewhiteboxes}>
                    <span>
                        <Link to='/estimer' style={{color: '#206A37'}} onClick={()=>props.onContactClick('Je veux vendre mon bien.')}>Vendre mon bien</Link>
                    </span>
                </span>
                <span style={littlewhiteboxes}>
                    <span>
                        <Link to='/estimer' style={{color: '#206A37'}} onClick={()=>props.onContactClick('Je veux estimer mon bien.')}>Estimer mon bien</Link>
                    </span>
                </span>
                <span style={littlewhiteboxes}>
                    <span>
                        <Link to='/recherche' style={{color: '#206A37'}}>Viager</Link>
                    </span>
                </span>
            </Col>
            <Col  xs='12' lg='2' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <span style={littlewhiteboxes}>
                    <span>
                        <Link to='/syndic' style={{color: '#206A37'}} onClick={()=>props.onContactClick('Je veux changer de Syndic.')}>Changer de Syndic</Link>
                    </span>
                </span>
            </Col>

        </Row>

        <Row style={barContacts}>
            <Col xs='3' lg='3' style={colContacts}>
                <span style={spanContacts}>
                    <span>FCI Houdan</span>
                    <span>17 Grande rue</span>
                    <span>78550 HOUDAN</span>
                    <span>Tél. : 01.78.90.51.51</span>
                </span>
            </Col>
            <Col xs='3' lg='3' style={colContacts}>
                <span style={spanContacts}>
                    <span>FCI Paris</span>
                    <span>53 avenue Mozart</span>
                    <span>75016 PARIS</span>
                    <span>Tél. : 01.40.50.20.20</span>
                </span>
            </Col>
            <Col xs='3' lg='3' style={colContacts}>
                <span style={spanContacts}>
                    <span>FCI Syndic</span>
                    <span>53 avenue Mozart</span>
                    <span>75016 PARIS</span>
                    <span>Tél. : 01.86.22.96.96</span>
                </span>
            </Col>
            <Col xs='3' lg='3' style={colContacts}>
                <span style={spanContacts}>
                    <span>FCI Maule</span>
                    <span>2 place de la mairie</span>
                    <span>78580 MAULE</span>
                    <span>Tél. : 01.34.75.08.08</span>
                </span>
            </Col>

        </Row>


    </Container>

    <Container style={BackgroundImage2}>

        <Row style={navBarRow}>
            <Col xs='12' style={{display: 'flex', justifyContent: 'center'}}>
                <span style={{color: '#206A37', fontSize: '4vw'}}>
                     A C T U A L I T E S
                </span>
            </Col>
        </Row>

        <Row style={{justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', backgroundColor: 'rgba(255,255,255, 0.7)', width: '70%', borderRadius: 10, marginBottom: 10, marginTop: 30}}>
            <Col xs='10' lg='3' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img src={photo2} style={{width: 'inherit', height: 'inherit'}} fluid />
            </Col>
            <Col xs='10' lg='8'  style={{display: 'flex', justifySelf: 'center', alignSelf: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <span style={{fontSize: 'calc(1em + 0.5vw)'}}>Title of the news!</span>
                <span style={{textAlign: 'justify', fontSize: 'calc(0.5em + 0.2vw)'}}>Lorem ipsum quis non adipiscing id arcu porta nisl, consectetur non class suscipit et in fusce risus aenean, cras scelerisque ultricies purus eget nulla nisl. tristique euismod eget orci tincidunt non porttitor cras vestibulum porttitor hac blandittristique euismod eget orci tincidunt non porttitor cras vestibulum porttitor hac blandit</span>
            </Col>
        </Row>

        <Row style={{justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', backgroundColor: 'rgba(255,255,255, 0.7)', width: '70%', borderRadius: 10, marginBottom: 10, marginTop: 30}}>
            <Col xs='10' lg='3' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img src={photo2} style={{width: 'inherit', height: 'inherit'}} fluid />
            </Col>
            <Col xs='10' lg='8'  style={{display: 'flex', justifySelf: 'center', alignSelf: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <span style={{fontSize: 'calc(1em + 0.5vw)'}}>Title of the news!</span>
                <span style={{textAlign: 'justify', fontSize: 'calc(0.5em + 0.2vw)'}}>Lorem ipsum quis non adipiscing id arcu porta nisl, consectetur non class suscipit et in fusce risus aenean, cras scelerisque ultricies purus eget nulla nisl. tristique euismod eget orci tincidunt non porttitor cras vestibulum porttitor hac blandittristique euismod eget orci tincidunt non porttitor cras vestibulum porttitor hac blandit</span>
            </Col>
        </Row>

        <Row style={{justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', backgroundColor: 'rgba(255,255,255, 0.7)', width: '70%', borderRadius: 10, marginBottom: 10, marginTop: 30}}>
            <Col xs='10' lg='3' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img src={photo2} style={{width: 'inherit', height: 'inherit'}} fluid />
            </Col>
            <Col xs='10' lg='8'  style={{display: 'flex', justifySelf: 'center', alignSelf: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <span style={{fontSize: 'calc(1em + 0.5vw)'}}>Title of the news!</span>
                <span style={{textAlign: 'justify', fontSize: 'calc(0.5em + 0.2vw)'}}>Lorem ipsum quis non adipiscing id arcu porta nisl, consectetur non class suscipit et in fusce risus aenean, cras scelerisque ultricies purus eget nulla nisl. tristique euismod eget orci tincidunt non porttitor cras vestibulum porttitor hac blandittristique euismod eget orci tincidunt non porttitor cras vestibulum porttitor hac blandit</span>
            </Col>
        </Row>
        
        

        
    </Container>


</span>
    )
}



function mapDispatchToProps(dispatch) {
    return {
        onContactClick: function(reason) {
            dispatch( {type: 'addReason', whatReason: reason})
        }
    }
}


var BackgroundImage1 = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height:'100vh',
    backgroundImage: `url(${photo})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
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

var nameWhiteBlock = {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifySelf: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: '80%',
    borderRadius: 10,
    padding: '1vw'
}

var littlewhiteboxes = {
    backgroundColor: 'white',
    width: 'calc(7em + 9vw)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0.5vw',
    padding: '0.5vw',
    fontSize: '2vh',
    opacity: '80%',
    borderRadius: 10,
    color: '#206A37'
}

var barContacts = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '1vh',
    opacity: '70%'

    
}

var colContacts = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    
}

var spanContacts = {
    backgroundColor: '#206A37',
    width: 'calc(7em + 9vw)',
    color: 'white',
    padding: '1vh',
    borderRadius: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 'calc(0.3em + 0.3vw)'
}

var BackgroundImage2 = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    height:'auto',
    backgroundImage: `url(${photo2})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat-y',
    backgroundSize: 'cover',
    maxWidth: '100%',
}

var newsRow = {
    backgroundColor: 'rgba(255,255,255, 0.7)',
    display: 'flex',
    flexDirection: 'row',
    padding: 0, 
    alignItems: 'center', 
    justifyContent: 'space-between',
    alignSelf: 'center',
    justifySelf: 'center',
    borderRadius: 10,
    marginBottom: 'calc(0.3em + 0.3vw)',
    
}


export default connect (
    null,
    mapDispatchToProps
) (HomePage);



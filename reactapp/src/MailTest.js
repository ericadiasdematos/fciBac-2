import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Col, Popover, Input, PopoverBody, Button,  } from 'reactstrap';
import photo from './images/PageQuiSommesNous.png'
import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import user from './images/user.png'
import emailjs from 'emailjs-com';


export default function ContactUs() {

    function sendEmail(e) {
      e.preventDefault();
  
      emailjs.sendForm('service_k47enb9', 'template_qvsa1y7', e.target, 'user_TImKxpycj1WcmG7hCooDa')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    }


    return (
        <form className="contact-form" onSubmit={sendEmail}>
          <input type="hidden" name="contact_number" />
          <label>Nom</label>
          <input type="text" name="nom_client" />
          <label>Prénom</label>
          <input type="text" name="prenom_client" />
          <label>Email</label>
          <input type="email" name="email_client" />
          <label>Message</label>
          <textarea name="message" />
          <input type="submit" value="Send" />
        </form>
      );
    }




// function QuiSommesNous() {

//   const [popoverOpen, setPopoverOpen] = useState(false);

//   const toggle = () => setPopoverOpen(!popoverOpen);

//   const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('')

//     const [logInMessage, setLogInMessage] = useState([])

//   const [logInAccepted, setLogInAccepted] = useState(false)

//   const [userGenre, setUserGenre] = useState('')
//   const [usersName, setUsersName] = useState('')

//   const [userFoundFromToken, setUserFoundFromToken] = useState(localStorage.getItem('usersToken'))

//   var handleLogout = () => {
//       localStorage.removeItem('usersToken')
//       setLogInAccepted(false)
//   }
  
      
//   useEffect(async() => {

//       console.log('localstotage',userFoundFromToken);

//       if(userFoundFromToken != null){

          
//       var rawData = await fetch('/sendToken', {
//           method: 'POST',
//           headers: {'Content-Type':'application/x-www-form-urlencoded'},
//           body: `tokenFromFront=${userFoundFromToken}`
//     }); 
    
//         var data = await rawData.json()
        
//         if(data.result === true){
//           setLogInAccepted(true)
//           setUsersName(data.user.prenom)
//           setUserGenre(data.user.genre)
//         }

//       }


       
//     },[]);



//   var handleSignIn = async () => {

//       console.log(password)

//         var rawData = await fetch('/signIn', {
//             method: 'POST',
//             headers: {'Content-Type':'application/x-www-form-urlencoded'},
//             body: `emailFromFront=${email}&passwordFromFront=${password}`
//       });

//       var data = await rawData.json()
//       console.log('data: ', data)
//       if(data.result == true){
//         setLogInAccepted(true)
//         setUsersName(data.usersName)
//         localStorage.setItem('usersToken', data.token)
//       }else{
//         setLogInMessage(data.errors)

//       }

//   }

//   var userBoard = <PopoverBody style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
//                       <span style={{padding: '1vh', color: '#206A37', fontWeight: 'bold'}}>Se connecter</span>
//                       <Input type="email" placeholder="Email" style={{marginBottom: '1vh', width:'auto'}} onChange={(e) => setEmail(e.target.value)}></Input>
//                       <Input type="password" placeholder="Password" style={{marginBottom: '1vh', width:'auto'}} onChange={(e) => setPassword(e.target.value)}></Input>
//                       <span style={{padding: '1vh', color: '#206A37', fontWeight: 'bold'}}>{logInMessage}</span>
//                       <Button style={{width: '28vh', marginBottom: '1vh', backgroundColor: '#206A37'}} onClick={()=>handleSignIn()}>Confirmer</Button>
//                       <Button style={{width: '28vh', backgroundColor: '#206A37'}}><Link to='/creationdecompte' style={{color: 'white'}}>Créer un compte</Link></Button>
//                   </PopoverBody>

//   if(logInAccepted === true){
//     userBoard = <PopoverBody style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
//                     <span style={{padding: '1vh', color: '#206A37', fontWeight: 'bold'}}>Bienvenue {userGenre} {usersName} !</span>
//                     <Button size='sm' style={{width: '28vh', marginBottom: '1vh', backgroundColor: '#206A37'}}>Voir mes favoris</Button>
//                     <Button size='sm' style={{width: '28vh', marginBottom: '1vh', backgroundColor: '#206A37'}}><Link to='/mesrecherches' style={{color: 'white'}}>Voir mes dernieres recherches</Link></Button>
//                     <Button size='sm' style={{width: '28vh', backgroundColor: '#206A37'}} onClick={()=>handleLogout()}>Se déconecter</Button>
//                 </PopoverBody>
//   }

  

//   return (
//     <Container style={BackgroundImage}>

//       <Row style={navBarRow}>

//         <Col xs='2' lg='1' style={{paddingLeft: '0.6vh'}}>
//           <Link to='/'>
//             <img src={logo} alt='logo' style={{width: 'calc(1em + 9vw)'}}/>
//           </Link>
//         </Col>

//         <Col xs='8' lg='10' style={{display: 'flex', justifyContent: 'center'}}>
//             <span style={{color: '#206A37', fontSize: 'calc(1em + 2vw)', textAlign: 'center'}}>
//                 Q U I &nbsp; S O M M E S &nbsp; N O U S
//             </span>
//         </Col>
        
//         <Col xs='2' lg='1' style={{display: 'flex', justifyContent:'flex-end', paddingRight: '5vh'}}>
//           <img src={user} id="Popover1" style={{width: 'calc(1em + 2vw)'}} type="button" ></img>
//             <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle} >
//               {userBoard}
//             </Popover>
//         </Col>

//       </Row>

//       <Row style={descRow}>

        

//       </Row>

//     </Container>
//   );
// }

var BackgroundImage = {
  display: 'flex',
  flexDirection: 'column',
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

var descRow = {
  display: 'flex',
  flexDirection: 'column',
  justifySelf: 'center',
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 'calc(1em + 5vw)'
}

var col1 = {
  display: 'flex', 
  justifySelf: 'center', 
  alignSelf: 'center', 
  flexDirection: 'column', 
  backgroundColor: 'rgba(255,255,255, 0.7)', 
  justifyContent: 'center', 
  alignItems: 'center',
  borderRadius: 10,
}

var titleStyle = {
  display: 'flex', 
  justifySelf: 'center', 
  alignSelf: 'center', 
  padding: '2vh', 
  color: '#206A37', 
  paddingTop: '4vh', 
  fontSize: 'calc(1em + 2vw)', 
  textAlign: 'center'
}

var span1Style = {
  display: 'flex', 
  justifySelf: 'center', 
  alignSelf: 'center', 
  padding: '2vh', 
  textAlign: 'justify', 
  fontSize: 'calc(0.4em + 0.5vw)'
}

var span2Style = {
  display: 'flex', 
  justifySelf: 'center', 
  alignSelf: 'center', 
  padding: '1vh', 
  textAlign: 'justify', 
  fontSize: 'calc(0.4em + 0.5vw)'
}

var span3Style = {
  display: 'flex', 
  justifySelf: 'center', 
  alignSelf: 'center', 
  paddingRight: '2vh', 
  paddingLeft: '2vh', 
  paddingBottom: '2vh', 
  textAlign: 'justify', 
  fontSize: 'calc(0.4em + 0.5vw)'
}

// export default QuiSommesNous;
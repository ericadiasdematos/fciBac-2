import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Popover, Input, PopoverBody, Button,  } from 'reactstrap';
import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import { FaInstagram } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { FaRegCopyright } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { MdComputer } from 'react-icons/md';
import creerPar from './images/sitecreetpar.png'

function Footer() {

    



return(

<Row style={footerStyle}>
    <Col xs='12' lg='2' style={{display:'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>
        <Row style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <img src={logo} style={{width: 'calc(1em + 9vw)'}} />
            <span style={{color: 'white', fontFamily: 'freight-big-pro, serif', fontWeight: '400', marginTop: 5, fontStyle: 'normal'}}>Françoise Combes Immobilier</span>
        </Row>
        <Row style={{display: 'flex', color: 'white'}}>
            <a href='http://www.instagram.com/fcimmo/' style={{color: 'white'}}><FaInstagram style={iconsStyle}/></a>
            <a href='http://www.facebook.com/FCI-167527826666267' style={{color: 'white'}}><FaFacebook style={iconsStyle}/></a>
        </Row>
    </Col>
    <Col xs='12' lg='8' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', justifySelf: 'center', alignSelf: 'center'}}>

        <Row style={{display: 'flex', color: 'white', justifyContent: 'center', alignItems: 'center', fontSize: 15, marginBottom: 5}}>
            <span style={iconsStyle}><Link to='/quisommesnous' style={{color: 'white'}}>QUI SOMMES NOUS</Link></span>
            <span style={iconsStyle}><Link to='/contact' style={{color: 'white'}}>CONTACT</Link></span>
            <span style={iconsStyle}>NEWSLETTER</span>
        </Row>


        <Row style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
            <span style={spanContacts}>
                <span>FCI Houdan 17 Grande rue  </span>
                <span>78550 HOUDAN</span>
                <span>Tél. : 01.78.90.51.51</span>
            </span>
            <span style={spanContacts}>
                <span>FCI Paris 53 avenue Mozart</span>
                <span>75016 PARIS </span>
                <span>Tél. : 01.40.50.20.20</span>
            </span>
            <span style={spanContacts}>
                <span>FCI Syndic 53 avenue Mozart</span>
                <span>75016 PARIS</span>
                <span>Tél. : 01.86.22.96.96</span>
            </span>
            <span style={spanContacts}>
                <span>FCI Maule 2 place de la mairie</span>
                <span>78580 MAULE</span>
                <span>Tél. : 01.34.75.08.08</span>
            </span>

        </Row>
        <Row style={{display: 'flex', color: 'white', justifyContent: 'center', alignItems: 'center', marginBottom: 5}}>
            <FaRegCopyright style={{width: 10}}/>
            <span> Copyright All rights reserved. | &nbsp; </span>
            <a href='https://www.privacypolicies.com/live/d791f210-d32e-4766-bb19-2c99491e813d' style={{color: 'white'}}> Privacy Policy</a>
        </Row>
    </Col>
    <Col xs='12' lg='2' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: 5}}>
        <div style={{border: '1px solid white', padding: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <img src={creerPar} style={{width: 'calc(1em + 6vw)'}}/>
            <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white'}}>
                <Link to='' style={{color: 'white'}}><MdComputer style={iconsStyle}/></Link>
                <a href='https://www.linkedin.com/in/%C3%A9rica-dias-de-matos/' style={{color: 'white'}}><FaLinkedin style={iconsStyle}/></a>
                <a href='https://www.instagram.com/ericadiasmatos/' style={{color: 'white'}}><FaInstagram style={iconsStyle}/></a>
            </span>
        </div>
    </Col>
</Row>

    )
}

var iconsStyle = {
    margin: 7
}

var footerStyle = {
    backgroundColor: 'rgb(32, 106, 55)',
    width: '100%',
    margin: 0,
    padding: 10,
    fontFamily: 'roboto, sans-serif', 
    fontWeight: '300', 
    fontStyle: 'normal', 
}

var colContacts = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
}

var spanContacts = {
    // backgroundColor: '#206A37',
    border: '1px solid #D4F5DB',
    width: '150px',
    color: '#D4F5DB',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 10,
    textAlign: 'center',
    marginRight: 5,
    borderRadius: 10,
    padding: 5
}

export default Footer;
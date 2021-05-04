import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Popover, Input, PopoverBody, Button, Label  } from 'reactstrap';
import { FaUserCircle } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { RiMoneyEuroCircleFill } from 'react-icons/ri';
import biensPhoto from './images/biens.jpg'
import firebase from './InitFirebase'



const db = firebase.database()


function BiensCard() {

    const [allBiens, setAllBiens] = useState({})
    const [biensArray, setBiensArray] = useState([])

    useEffect(() => {

        // const ref = db.ref('Biens')
        // ref.on("value", (snapshot) => {
        //     setAllBiens(JSON.stringify(snapshot.val()))
        //     // console.log("biensArray :", biensArray)
        // })

        // for (const [key, value] of Object.entries(allBiens)) {
        //     console.log(`${key}: ${value}`);
        //   }


    })

    return(
        <Col xs='12' lg='2' style={styleCol}>
            <Row style={{width: '100%', height: '40%'}}>
                <img style={{width: 'inherit', borderRadius:'6px 6px 0px 0px'}} src={biensPhoto}/>
            </Row>
            <Row style={styleRow}>
                <span style={{fontSize: 15, fontWeight: 'bold'}}>LOCATION</span>
            </Row>
            <Row style={{display: 'flex',justifyContent:'flex-start', alignItems: 'center', width: '100%'}}>
                <FaMapMarkerAlt style={{color: '#206A37'}}/>
                <span>75016  Paris</span>
            </Row>
            <Row style={{width: '100%', marginBottom: 5}}>
                <Col xs='9' style={{padding: 0}}>
                    <RiMoneyEuroCircleFill style={{color: '#206A37'}}/>
                    <span>2 200 €</span>
                </Col>
                <Col xs='2' style={styleDays}>
                    <span>5 j</span>
                </Col>
            </Row>
        </Col>

    )
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
    alignSelf: 'center'
}

var styleDays = {
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 2, 
    backgroundColor: '#206A37', 
    borderRadius: 100, 
    color: 'white', 
    marginRight: '2px'
  }


export default BiensCard
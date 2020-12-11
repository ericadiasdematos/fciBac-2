import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons'
import photo from './images/HomePageFond.png'
import photo2 from './images/ActualitéesFonds.png'
import { Container, Row, Col } from 'reactstrap';
import logo from './images/logo.png'
import { Link } from 'react-router-dom';





function HomePage() {
  var BackgroundImage1 = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height:'100vh',
    backgroundImage: `url(${photo})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  }

  var BackgroundImage2 = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height:'100vh',
    backgroundImage: `url(${photo2})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  }

  var navWrap = {
    display: 'flex',
    backgroundColor: 'white', 
    width: '100%',
    height: '12vh',
    flexDirection: 'row',
    alignSelf: 'center',
    
    
    
  }

  var whiteBox = {
    backgroundColor: 'white', 
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderRadius: 10, 
    padding: 10, 
    opacity: 0.8, 
    margin: 5,
    width: 197,
    height: 45,
    color: '#206A37'
  }

  var whiteBoxCol = {
    display: 'flex', 
    flexDirection: 'column', 
    alignSelf: 'center', 
    alignItems: 'center', 
    justifyContent: 'center', 
    maxWidth: '30%'
  }

  var greenCol = {
    display: 'flex', 
    flexDirection: 'column', 
    alignSelf: 'center', 
    alignItems: 'center', 
    justifyContent: 'center', 
    maxWidth: '20%',
    backgroundColor: '#206A37',
    width: 230,
    height: 100,
    borderRadius: 80,
    marginRight: 90,
    marginLeft: 90,
    opacity: 0.8,
    fontSize: 12
    
  }

  var addressStyle = {
    margin: 0.5,
    color: 'white',
    opacity: 0.8
  }
  return (
    <span>
      <div style={BackgroundImage1}>
        <Container style={{display: 'flex', flexDirection: 'column', maxWidth: '100%', padding: 0, height:'100vh', position: 'relative'}}>

  {/* ---------------------------------------------------------NAV BAR -------------------------------------------------------------------------- */}

          <Row style={navWrap}>

            <Col  style={{display: 'flex', flexDirection:'row', alignItems: 'center', justifyContent: 'flex-start', maxWidth: '10%'}}>
              <div>
                <Link to='/'>
                  <img src={logo} alt='logo' style={{width: '20vh'}}></img>
                </Link>
              </div>
            </Col>

            <Col style={{display: 'flex', flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
              <div style={{display: 'flex', flexDirection:'row', alignItems: 'center'}}>
                <Link to='/quisommesnous' style={{color: '#206A37'}}>
                  <h5 style={{color: '#206A37'}}>QUI SOMMES NOUS</h5>
                </Link>
              </div>
            </Col>

            <Col style={{display: 'flex', flexDirection:'row', alignItems: 'center',justifyContent: 'center'}}>
              <div style={{display: 'flex', flexDirection:'row', alignItems: 'center'}}>
                <Link to='/nosagences' style={{color: '#206A37'}}>
                  <h5 style={{color: '#206A37'}}>NOS AGENCES</h5>
                </Link>
              </div>
            </Col>

            <Col style={{display: 'flex', flexDirection:'row', alignItems: 'center',justifyContent: 'center'}}>
              <div style={{display: 'flex', flexDirection:'row', alignItems: 'center'}}>
                <Link to='/outils' style={{color: '#206A37'}}>
                  <h5 style={{color: '#206A37'}}>OUTILS</h5>
                </Link>
              </div>
            </Col>

            <Col  style={{display: 'flex', flexDirection:'row', alignItems: 'center',justifyContent: 'center'}}>
              <div style={{display: 'flex', flexDirection:'row', alignItems: 'center'}}>
                <Link to='/contact' style={{color: '#206A37'}}>
                  <h5 style={{color: '#206A37'}}>CONTACT</h5>
                </Link>
              </div>
            </Col>

            <Col style={{display: 'flex', flexDirection:'row', alignItems: 'center', justifyContent: 'flex-start', maxWidth: '5%'}}>
              <FontAwesomeIcon style={{display: 'flex', justifyContent: 'end', color: '#206A37', }} icon={faUser} size='lg' />
            </Col>


          </Row>
  {/* ---------------------------------------------------------NAV BAR END -------------------------------------------------------------------------- */}


  {/* ---------------------------------------------------------BIG MIDDLE SQUARE -------------------------------------------------------------------------- */}


          <Row style={{display: 'flex', flexDirection: 'row', alignSelf: 'center', marginTop: '8vh', alignItems: 'center', justifyContent: 'center'}}>
            <Col style={{backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 10, padding: 10, opacity: 0.8}}>
              <h1 style={{color: '#206A37'}}>Agence Immobiliere FCI</h1>
              <h4 style={{color: '#206A37'}}>Françoise Combes Immobilier</h4>
            </Col>
          </Row>

  {/* ---------------------------------------------------------BIG MIDDLE SQUARE END -------------------------------------------------------------------------- */}

  {/* ---------------------------------------------------------LITTLE WHITE SQUARES -------------------------------------------------------------------------- */}


          <Row style={{display: 'flex', flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 40}}>

            <Col style={whiteBoxCol}>
              <Row style={whiteBox}>
                <p>Mettre en location</p>
              </Row>
              <Row style={whiteBox}>
                <p>Louer un bien</p>
              </Row>
            </Col>

            <Col style={whiteBoxCol}>
              <Row style={whiteBox}>
                <p>Acheter</p>
              </Row>
              <Row style={whiteBox}>
                <p>Vendre mon bien</p>
              </Row>
              <Row style={whiteBox}>
                <p>Estimer mon bien</p>
              </Row>
              <Row style={whiteBox}>
                <p>Viager</p>
              </Row>
            </Col>

            <Col style={whiteBoxCol}>
              <Row style={whiteBox}>
                <p>Changer de Syndic</p>
              </Row>
            </Col>

          </Row>

  {/* ---------------------------------------------------------LITTLE WHITE SQUARES END -------------------------------------------------------------------------- */}

  {/* ---------------------------------------------------------CONTACT BOTTOM SECTION-------------------------------------------------------------------------- */}
          
          
          <Row style={{display: 'flex', alignItems: 'center', marginRight: 0, marginLeft: 0, justifySelf: 'flex-end', alignSelf: 'flex-end', position: 'absolute', bottom: 0, width: '100%'}}>


            <Col style={greenCol}>
              <p style={addressStyle}>FCI Houdan</p>
              <p style={addressStyle}>17 Grande rue 78550 HOUDAN</p>
              <p style={addressStyle}>Tél. : 01.78.90.51.51</p>
            </Col>

            <Col style={greenCol}>
              <p style={addressStyle}>FCI Paris</p>
              <p style={addressStyle}>53 avenue Mozart 75016 PARIS</p>
              <p style={addressStyle}>Tél. : 01.40.50.20.20</p>
            </Col>

            <Col style={greenCol}>
              <p style={addressStyle}>FCI Syndic</p>
              <p style={addressStyle}>53 avenue Mozart 75016 PARIS</p>
              <p style={addressStyle}>Tél. : 01.86.22.96.96</p>
            </Col>

            <Col style={greenCol}>
              <p style={addressStyle}>FCI Maule</p>
              <p style={addressStyle}>2 place de la mairie</p>
              <p style={addressStyle}>78580 MAULE</p>
              <p style={addressStyle}>Tél. : 01.34.75.08.08</p>
            </Col>


          </Row>

        </Container>
      </div>

{/* -------------------------------------------------- SECOND PAGE ACTUALITES ------------------------------------------------------------------ */}

      <div style={BackgroundImage2}>

        <Container style={{display: 'flex', flexDirection: 'column', maxWidth: '100%', padding: 0, height:'100vh'}}>

          <Row style={navWrap}>
            
            <Col style={{display: 'flex', flexDirection:'row', alignItems: 'center', justifyContent: 'center', color: '#206A37', fontSize: 50}}>
              <p>A C T U A L I T E S</p>
            </Col>

          </Row>

        </Container>

      </div>


    </span>
  );
}

export default HomePage;

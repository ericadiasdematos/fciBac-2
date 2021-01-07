import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomePage from './HomePage';
import NosAgences from './NosAgences';
import Contact from './Contact';
import Estimer from './Estimer'
import Recherche from './Recherche';
import Map from './Map'
import RechercheAvance from './RechercheAvance'
import Resultats from './Resultats'
import Outils from './Outils'
import MesRecherches from './MesRecherches'
import Wishlist from './Wishlist'
import QuiSommesNous from './QuiSommesNous'
import HomePage2 from './HomePage2'
import CreationDeCompte from './CreationDeCompte'
import {Link} from 'react-router-dom'

function App() {
  return (
    
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage2}/>
        <Route path="/nosagences" exact component={NosAgences}/>
        <Route path="/contact" exact component={Contact}/>
        <Route path="/estimer" exact component={Estimer}/>
        <Route path="/recherche" exact component={Recherche}/>
        <Route path="/map" exact component={Map}/>
        <Route path="/rechercheavances" exact component={RechercheAvance}/>
        <Route path="/resultats" exact component={Resultats}/>
        <Route path="/outils" exact component={Outils}/>
        <Route path="/mesrecherches" exact component={MesRecherches}/>
        <Route path="/wishlist" exact component={Wishlist}/>
        <Route path="/quisommesnous" exact component={QuiSommesNous}/>
        <Route path="/creationdecompte" exact component={CreationDeCompte}/>
      </Switch>
    </Router>
  );
}

export default App;

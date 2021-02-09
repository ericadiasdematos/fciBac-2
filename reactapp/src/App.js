import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
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
import ServicesSyndic from './ServicesSyndic'
import {Link} from 'react-router-dom'
import reason from './reducers/reason'
import token from './reducers/token'
import {Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux';
import MapTest from './MapTest'
import PageBien from './PageBien'

const store = createStore(combineReducers({reason, token}))

function App() {
  return (

    <Provider store={store}>
    
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
          <Route path="/syndic" exact component={ServicesSyndic}/>
          <Route path="/maptest" exact component={MapTest}/>
          <Route path="/bien" exact component={PageBien}/>
        </Switch>
      </Router>

    </Provider>
  );
}

export default App;

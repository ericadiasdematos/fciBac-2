import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
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
import reason from './reducers/reason'
import token from './reducers/token'
import ajouterBien from './reducers/ajouterBien'
import viewBien from "./reducers/viewBien"
import editerBien from "./reducers/editerBien"
import filters from "./reducers/filters"
import typedeTransaction from "./reducers/typeTransaction"
import bienSelected from "./reducers/bienSelected"
import latAndLng from "./reducers/latAndLng"
import {Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux';
import PageBien from './PageBien'
import Car from './car'
import {AnimatePresence, motion} from 'framer-motion'
import AdminHomePage from './Admin-HomePage'
import AdminGererBiens from './Admin-GererBien'
import AdminBien from './Admin-Bien'
import AdminEditerBien from './Admin-EditerBien'
import AdminCreerBien from './Admin-CreerBien'
import AdminGererMessages from './Admin-Gerer-Messages';
import AdminMessage from './Admin-Message';
import AdminGererAdmin from './Admin-Gerer-Admin';
import AdminGererPosts from './Admin-Gerer-Posts';
import AdminAjouterAdmin from "./Admin-Ajouter-Admin"


const store = createStore(combineReducers({reason, token, ajouterBien, viewBien, editerBien, filters, typedeTransaction, bienSelected, latAndLng}))

function App() {

  const [userFoundFromToken, setUserFoundFromToken] = useState(localStorage.getItem('usersToken'))
  const [logInAccepted, setLogInAccepted] = useState(false)
  const [userGenre, setUserGenre] = useState('')
  const [usersName, setUsersName] = useState('')
  const [userType, setUserType] = useState('')


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
        setUserType(data.user.type)
        console.log("type from app:", data.user.type)
      }

    }


     
  },[userFoundFromToken]);

  
  return (

    <Provider store={store}>
    
      <Router>
        <AnimatePresence>
          <Switch>
            <Route path="/" exact component={HomePage2}/>
            <Route path="/nosagences" exact component={NosAgences}/>
            <Route path="/contact" exact component={Contact}/>
            <Route path="/estimer" exact component={Estimer}/>
            <Route path="/recherche" exact component={Recherche}/>
            <Route path="/rechercheavances" exact component={RechercheAvance}/>
            <Route path="/resultats" exact component={Resultats}/>
            <Route path="/map" exact component={Map}/>
            <Route path="/outils" exact component={Outils}/>
            <Route path="/quisommesnous" exact component={QuiSommesNous}/>
            <Route path="/creationdecompte" exact component={CreationDeCompte}/>
            <Route path="/syndic" exact component={ServicesSyndic}/>
            <Route path="/bien" exact component={PageBien}/>
            {
              userType === "user" || userType === "admin" ? (
                <Route path="/mesrecherches" exact component={MesRecherches}/>
                
                ) : (
                <Redirect  to="/" />

                )
              }
            {
              userType === "user" || userType === "admin" ? (
                <Route path="/wishlist" exact component={Wishlist}/>
                
                ) : (
                <Redirect  to="/" />

                )
              }
            {
              userType === "admin" ? (
                  <Route path="/adminHomePage" exact component={AdminHomePage}/>
                
                ) : (
                  <Redirect  to="/" />
                  
                )
              }
              {
              userType === "admin" ? (

                <Route path="/adminGererBiens" exact component={AdminGererBiens}/>
                
                ) : (
                  <Redirect  to="/" />
                  
                  )
              }
              {
              userType === "admin" ? (

                <Route path="/adminBien" exact component={AdminBien}/>
                
                ) : (
                  <Redirect  to="/" />
                  
                  )
              }
              {
              userType === "admin" ? (

                <Route path="/adminEditerBien" exact component={AdminEditerBien}/>
                
                ) : (
                  <Redirect  to="/" />
                  
                  )
              }
              {
              userType === "admin" ? (

                <Route path="/adminCreerBien" exact component={AdminCreerBien}/>
                
                ) : (
                  <Redirect  to="/" />
                  
                  )
              }
              {
              userType === "admin" ? (

                <Route path="/adminGererMessages" exact component={AdminGererMessages}/>
                
                ) : (
                  <Redirect  to="/" />
                  
                  )
              }
              {
              userType === "admin" ? (

                <Route path="/adminMessage" exact component={AdminMessage}/>
                
                ) : (
                  <Redirect  to="/" />
                  
                  )
              }
              {
              userType === "admin" ? (

                <Route path="/adminGererPosts" exact component={AdminGererPosts}/>
                
                ) : (
                  <Redirect  to="/" />
                  
                  )
              }
              {
              userType === "admin" ? (

                <Route path="/adminGererAdmin" exact component={AdminGererAdmin}/>
                
                ) : (
                  <Redirect  to="/" />
                  
                  )
              }
              {
              userType === "admin" ? (

                <Route path="/adminAjouterAdmin" exact component={AdminAjouterAdmin}/>
                
                ) : (
                  <Redirect  to="/" />
                  
                  )
              }
          </Switch>
        </AnimatePresence>
      </Router>

    </Provider>
  );
}

export default App;

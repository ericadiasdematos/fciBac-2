import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Input, PopoverBody, Badge, Spinner , Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import Footer from './Footer'
import { motion } from 'framer-motion'
import {connect} from 'react-redux';
import NavBar from "./NavBar"



function Resultats(props) {

  function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
function inside(point, vs) {

  var x = point[0], y = point[1];
  
  var inside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i][0], yi = vs[i][1];
      var xj = vs[j][0], yj = vs[j][1];
      
      var intersect = ((yi > y) != (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
  }
  
  return inside;
}

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [filtersFromRedux, setFiltersFromRedux] = useState(props.filtersToDisplay)

  const toggle = () => setPopoverOpen(!popoverOpen);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const [logInMessage, setLogInMessage] = useState([])

  const [logInAccepted, setLogInAccepted] = useState(false)
  const[loaded, setLoaded] = useState(false)

  const [userGenre, setUserGenre] = useState('')
  const [usersName, setUsersName] = useState('')
  const [deleteFav, setDeleteFav] = useState(false)
  const [OptionSelected, setOptionSelected] = useState(null);
  const [TypeSelected, setTypeSelected] = useState(null);
  const [heart, setHeart] = useState(false)
  const [allBiensState, setAllBiensState] = useState([])
  const [userFoundFromToken, setUserFoundFromToken] = useState(localStorage.getItem('usersToken'))

  const [appartement, setAppartement] = useState(filtersFromRedux.appartement)
  const [maison, setMaison] = useState(filtersFromRedux.maison)
  const [place, setPlace] = useState()
  const [budget, setBudget] = useState(filtersFromRedux.prix)
  const [acheter, setAcheter] = useState(false)
  const [louer, setLouer] = useState(false)
  const [boundsFromRedux, setBoundsFromRedux] = useState(props.boundsToDisplay)



  var handleLogout = () => {
      localStorage.removeItem('usersToken')
      setLogInAccepted(false)
  }

  var pasDeBiens;
  
      
  useEffect(async() => {

      console.log('localstotage',userFoundFromToken);

      if(userFoundFromToken != null){

          
      var rawData = await fetch('/sendToken', {
          method: 'POST',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body: `tokenFromFront=${userFoundFromToken}`
    }); 
    
        var data = await rawData.json()
        console.log("data :",data)
        
        if(data.result === true){
          setLogInAccepted(true)
          setUsersName(data.user.prenom)
          setUserGenre(data.user.genre)
        }

      }

      //FETCH ALL BIENS :

      // console.log("boundsFromRedux :", boundsFromRedux)

      var allBiens = []
      

      var getBiens = await fetch('/getBiens', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          filtersFromFront: filtersFromRedux,
        })

  });

      var dataGetBiens = await getBiens.json()
      console.log("dataGetBiens :", dataGetBiens)
      allBiens = dataGetBiens.biens

      console.log("boundsFromRedux.length :", boundsFromRedux.length)

      // FILTER BIENS:

      var allBiensVar = []

      //filter vente:
      if(props.typeTransactionToDisplay === "Acheter"){
        var allVente = []
          for(let i=0; i<allBiens.length; i++){
            if(allBiens[i].typeTransaction === "Vente"){
              allVente.push(allBiens[i])
            }
          }
          console.log("allVente :", allVente)
          setAllBiensState(allVente)

          // filtre par type de bien:

          if(filtersFromRedux.appartement === true){
            for(let i=0; i<allVente.length; i++){
              if(allVente[i].typeBien === "Appartement"){
                allBiensVar.push(allVente[i])
              }
            }
          }

          if(filtersFromRedux.maison === true){
            for(let i=0; i<allVente.length; i++){
              if(allVente[i].typeBien === "Maison"){
                allBiensVar.push(allVente[i])
              }
            }
          }

          if(filtersFromRedux.loft === true){
            for(let i=0; i<allVente.length; i++){
              if(allVente[i].typeBien === "Loft"){
                allBiensVar.push(allVente[i])
              }
            }
          }
          if(filtersFromRedux.terrain === true){
            for(let i=0; i<allVente.length; i++){
              if(allVente[i].typeBien === "Terrain"){
                allBiensVar.push(allVente[i])
              }
            }
          }
          if(filtersFromRedux.bureau === true){
            for(let i=0; i<allVente.length; i++){
              if(allVente[i].typeBien === "Bureau"){
                allBiensVar.push(allVente[i])
              }
            }
          }
          if(filtersFromRedux.parking === true){
            for(let i=0; i<allVente.length; i++){
              if(allVente[i].typeBien === "Parking / Garage"){
                allBiensVar.push(allVente[i])
              }
            }
          }
          if(filtersFromRedux.immeuble === true){
            for(let i=0; i<allVente.length; i++){
              if(allVente[i].typeBien === "Immeuble"){
                allBiensVar.push(allVente[i])
              }
            }
          }
          if(filtersFromRedux.fondCommerce === true){
            for(let i=0; i<allVente.length; i++){
              if(allVente[i].typeBien === "Fonds de commerce"){
                allBiensVar.push(allVente[i])
              }
            }
          }
          if(filtersFromRedux.hotelP === true){
            for(let i=0; i<allVente.length; i++){
              if(allVente[i].typeBien === "Hôtel Particulier"){
                allBiensVar.push(allVente[i])
              }
            }
          }
          setAllBiensState(allBiensVar)

          var biensFilteredEndroit = []
          var biensFilteredEndroitEtPrix = [];

          // filter par ville tapé:

          if(filtersFromRedux.endroit){
            for(let i=0; i<allBiensVar.length; i++){
              if(allBiensVar[i].ville === filtersFromRedux.endroit.label){
                biensFilteredEndroit.push(allBiensVar[i])
              }
            }
            setAllBiensState(biensFilteredEndroit)
          }

          //filter par budget:

          if(filtersFromRedux.prixMin || filtersFromRedux.prixMax){
            var tableauABloucler = biensFilteredEndroit
            if(biensFilteredEndroit.length === 0){
              tableauABloucler = allBiensVar
            }
            for(let i=0; i<tableauABloucler.length; i++){
              if(tableauABloucler[i].prixBien >=  filtersFromRedux.prixMin && tableauABloucler[i].prixBien <=  filtersFromRedux.prixMax){
                biensFilteredEndroitEtPrix.push(tableauABloucler[i])
              }
            }
            setAllBiensState(biensFilteredEndroitEtPrix)

            if(filtersFromRedux.prixMin === ""){
              for(let i=0; i<tableauABloucler.length; i++){
                if(tableauABloucler[i].prixBien <=  filtersFromRedux.prixMax){
                  biensFilteredEndroitEtPrix.push(tableauABloucler[i])
                }
              }
              setAllBiensState(biensFilteredEndroitEtPrix)
            }
            if(filtersFromRedux.prixMax === ""){
              for(let i=0; i<tableauABloucler.length; i++){
                if(tableauABloucler[i].prixBien >=  filtersFromRedux.prixMin){
                  biensFilteredEndroitEtPrix.push(tableauABloucler[i])
                }
              }
              setAllBiensState(biensFilteredEndroitEtPrix)
            }

          }

          // filter par coordones de la map et type de bien: 

          var biensFilteredMap = []
          var biensFilteredMapAndPrix = []
          if(boundsFromRedux.length != 0){

            for(let i=0; i<allBiensVar.length; i++){
              var bienLat = allBiensVar[i].latitude;
              var bienLgn = allBiensVar[i].longitude
              var bienCords = [bienLat, bienLgn]
              var includesInPolygon = inside(bienCords, boundsFromRedux)
              if(includesInPolygon === true){
                  console.log("condition passed")
                  biensFilteredMap.push(allBiensVar[i])
                  
                }
              }
              setAllBiensState(biensFilteredMap)

              // filter par coordones, type de bien et budget:

              if(filtersFromRedux.prixMin || filtersFromRedux.prixMax){

                if(filtersFromRedux.prixMin != "" && filtersFromRedux.prixMax != ""){
                  for(let i=0; i<biensFilteredMap.length; i++){
                    if(biensFilteredMap[i].prixBien >=  filtersFromRedux.prixMin && biensFilteredMap[i].prixBien <=  filtersFromRedux.prixMax){
                      biensFilteredMapAndPrix.push(biensFilteredMap[i])
                    }
                  }
                  setAllBiensState(biensFilteredMapAndPrix)
                }
    
                if(filtersFromRedux.prixMin === ""){
                  for(let i=0; i<biensFilteredMap.length; i++){
                    if(biensFilteredMap[i].prixBien <=  filtersFromRedux.prixMax){
                      biensFilteredMapAndPrix.push(biensFilteredMap[i])
                    }
                  }
                  setAllBiensState(biensFilteredMapAndPrix)
                }
                if(filtersFromRedux.prixMax === ""){
                  for(let i=0; i<biensFilteredMap.length; i++){
                    if(biensFilteredMap[i].prixBien >=  filtersFromRedux.prixMin){
                      biensFilteredMapAndPrix.push(biensFilteredMap[i])
                    }
                  }
                  setAllBiensState(biensFilteredMapAndPrix)
                }
    
              }

          }

          // filter si le type de bien n'as pa été selectioné :

          if(filtersFromRedux.noBiensSelected === true){
            setAllBiensState(allVente)

            // filter par ville tapé:

            if(filtersFromRedux.endroit){
              for(let i=0; i<allVente.length; i++){
                if(allVente[i].ville === filtersFromRedux.endroit.label){
                  biensFilteredEndroit.push(allVente[i])
                }
              }
              setAllBiensState(biensFilteredEndroit)
            }
            // filter par ville tapé et budget ou juste budget:

            if(filtersFromRedux.prixMin || filtersFromRedux.prixMax){
              var tableauABloucler = biensFilteredEndroit
              if(biensFilteredEndroit.length === 0){
                tableauABloucler = allVente
              }

              // si budget min = null
              if(filtersFromRedux.prixMin === ""){
              for(let i=0; i<tableauABloucler.length; i++){
                if(tableauABloucler[i].prixBien <=  filtersFromRedux.prixMax){
                  biensFilteredEndroitEtPrix.push(tableauABloucler[i])
                }
              }
              setAllBiensState(biensFilteredEndroitEtPrix)
            }

            // si budget max = null
            if(filtersFromRedux.prixMax === ""){
              for(let i=0; i<tableauABloucler.length; i++){
                if(tableauABloucler[i].prixBien >=  filtersFromRedux.prixMin){
                  biensFilteredEndroitEtPrix.push(tableauABloucler[i])
                }
              }
              setAllBiensState(biensFilteredEndroitEtPrix)
            }

            // si les deux budgets sont pas null
            if(filtersFromRedux.prixMin != "" && filtersFromRedux.prixMax != ""){
              for(let i=0; i<tableauABloucler.length; i++){
                if(tableauABloucler[i].prixBien >=  filtersFromRedux.prixMin && tableauABloucler[i].prixBien <=  filtersFromRedux.prixMax){
                  biensFilteredEndroitEtPrix.push(tableauABloucler[i])
                }
              }
              setAllBiensState(biensFilteredEndroitEtPrix)
            }
            // filter par coordones de la map: not working!

            console.log("boundsFromRedux.length :", boundsFromRedux.length)

            if(boundsFromRedux.length != 0){
              console.log("condition passed")

              for(let i=0; i<allVente.length; i++){
                var bienLat = allVente[i].latitude;
                var bienLgn = allVente[i].longitude
                var bienCords = [bienLat, bienLgn]
                var includesInPolygon = inside(bienCords, boundsFromRedux)
                if(includesInPolygon === true){
                  biensFilteredMap.push(allVente[i])
                  
                }
              }
              setAllBiensState(biensFilteredMap)

              // filter par coordones et budget:

              if(filtersFromRedux.prixMin || filtersFromRedux.prixMax){

                for(let i=0; i<biensFilteredMap.length; i++){
                  if(biensFilteredMap[i].prixBien >=  filtersFromRedux.prixMin && biensFilteredMap[i].prixBien <=  filtersFromRedux.prixMax){
                    biensFilteredMapAndPrix.push(biensFilteredMap[i])
                  }
                }
                setAllBiensState(biensFilteredMapAndPrix)
    
                if(filtersFromRedux.prixMin === ""){
                  for(let i=0; i<biensFilteredMap.length; i++){
                    if(biensFilteredMap[i].prixBien <=  filtersFromRedux.prixMax){
                      biensFilteredMapAndPrix.push(biensFilteredMap[i])
                    }
                  }
                  setAllBiensState(biensFilteredMapAndPrix)
                }
                if(filtersFromRedux.prixMax === ""){
                  for(let i=0; i<biensFilteredMap.length; i++){
                    if(biensFilteredMap[i].prixBien >=  filtersFromRedux.prixMin){
                      biensFilteredMapAndPrix.push(biensFilteredMap[i])
                    }
                  }
                  setAllBiensState(biensFilteredMapAndPrix)
                }
    
              }

            }
            
            }
          
          
          }

      }




      //filter location
      if(props.typeTransactionToDisplay === "Louer"){
        var allLocation = []
        for(let i=0; i<allBiens.length; i++){
          if(allBiens[i].typeTransaction === "Location"){
            allLocation.push(allBiens[i])
          }
        }
        
        if(filtersFromRedux.appartement === true){
          for(let i=0; i<allLocation.length; i++){
            if(allLocation[i].typeBien === "Appartement"){
              allBiensVar.push(allLocation[i])
            }
          }
        }
        
        if(filtersFromRedux.maison === true){
          for(let i=0; i<allLocation.length; i++){
            if(allLocation[i].typeBien === "Maison"){
              allBiensVar.push(allLocation[i])
            }
          }
        }
        
        if(filtersFromRedux.loft === true){
          for(let i=0; i<allLocation.length; i++){
            if(allLocation[i].typeBien === "Loft"){
              allBiensVar.push(allLocation[i])
            }
          }
        }
        if(filtersFromRedux.bureau === true){
          for(let i=0; i<allLocation.length; i++){
            if(allLocation[i].typeBien === "Bureau"){
              allBiensVar.push(allLocation[i])
            }
          }
        }
        if(filtersFromRedux.parking === true){
          for(let i=0; i<allLocation.length; i++){
            if(allLocation[i].typeBien === "Parking / Garage"){
              allBiensVar.push(allLocation[i])
            }
          }
        }
        if(filtersFromRedux.immeuble === true){
          for(let i=0; i<allLocation.length; i++){
            if(allLocation[i].typeBien === "Immeuble"){
              allBiensVar.push(allLocation[i])
            }
          }
        }
        if(filtersFromRedux.hotelP === true){
          for(let i=0; i<allLocation.length; i++){
            if(allLocation[i].typeBien === "Hôtel Particulier"){
              allBiensVar.push(allLocation[i])
            }
          }
        }
        setAllBiensState(allBiensVar)


        var biensFilteredEndroit = []
        var biensFilteredEndroitEtPrix = [];


        if(filtersFromRedux.endroit){
          for(let i=0; i<allBiensVar.length; i++){
            if(allBiensVar[i].ville === filtersFromRedux.endroit.label){
              biensFilteredEndroit.push(allBiensVar[i])
            }
          }
          setAllBiensState(biensFilteredEndroit)
        }

        if(filtersFromRedux.prixMin || filtersFromRedux.prixMax){
          console.log("condition passes!")
          var tableauABloucler = biensFilteredEndroit
          if(biensFilteredEndroit.length === 0){
            tableauABloucler = allBiensVar
          }
          for(let i=0; i<tableauABloucler.length; i++){
            if(tableauABloucler[i].prixBien >=  filtersFromRedux.prixMin && tableauABloucler[i].prixBien <=  filtersFromRedux.prixMax){
              biensFilteredEndroitEtPrix.push(tableauABloucler[i])
            }
          }
          setAllBiensState(biensFilteredEndroitEtPrix)

          if(filtersFromRedux.prixMin === ""){
            for(let i=0; i<tableauABloucler.length; i++){
              if(tableauABloucler[i].prixBien <=  filtersFromRedux.prixMax){
                biensFilteredEndroitEtPrix.push(tableauABloucler[i])
              }
            }
            setAllBiensState(biensFilteredEndroitEtPrix)
          }
          if(filtersFromRedux.prixMax === ""){
            for(let i=0; i<tableauABloucler.length; i++){
              if(tableauABloucler[i].prixBien >=  filtersFromRedux.prixMin){
                biensFilteredEndroitEtPrix.push(tableauABloucler[i])
              }
            }
            setAllBiensState(biensFilteredEndroitEtPrix)
          }
        }

        // filter par coordones de la map et type de bien: 

        var biensFilteredMap = []
        var biensFilteredMapAndPrix = []
        if(boundsFromRedux.length != 0){

          for(let i=0; i<allBiensVar.length; i++){
            var bienLat = allBiensVar[i].latitude;
            var bienLgn = allBiensVar[i].longitude
            var bienCords = [bienLat, bienLgn]
            var includesInPolygon = inside(bienCords, boundsFromRedux)
            if(includesInPolygon === true){
                console.log("condition passed")
                biensFilteredMap.push(allBiensVar[i])
                
              }
            }
            setAllBiensState(biensFilteredMap)

            // filter par coordones, type de bien et budget:

            if(filtersFromRedux.prixMin || filtersFromRedux.prixMax){
              if(filtersFromRedux.prixMin != "" && filtersFromRedux.prixMax != ""){
                for(let i=0; i<biensFilteredMap.length; i++){
                  if(biensFilteredMap[i].prixBien >=  filtersFromRedux.prixMin && biensFilteredMap[i].prixBien <=  filtersFromRedux.prixMax){
                    biensFilteredMapAndPrix.push(biensFilteredMap[i])
                  }
                }
                setAllBiensState(biensFilteredMapAndPrix)
              }
  
              if(filtersFromRedux.prixMin === ""){
                for(let i=0; i<biensFilteredMap.length; i++){
                  if(biensFilteredMap[i].prixBien <=  filtersFromRedux.prixMax){
                    biensFilteredMapAndPrix.push(biensFilteredMap[i])
                  }
                }
                setAllBiensState(biensFilteredMapAndPrix)
              }
              if(filtersFromRedux.prixMax === ""){
                for(let i=0; i<biensFilteredMap.length; i++){
                  if(biensFilteredMap[i].prixBien >=  filtersFromRedux.prixMin){
                    biensFilteredMapAndPrix.push(biensFilteredMap[i])
                  }
                }
                setAllBiensState(biensFilteredMapAndPrix)
              }
  
            }

        }


        if(filtersFromRedux.noBiensSelected === true){
          setAllBiensState(allLocation)
          
          if(filtersFromRedux.endroit){
            for(let i=0; i<allLocation.length; i++){
              if(allLocation[i].ville === filtersFromRedux.endroit.label){
                biensFilteredEndroit.push(allLocation[i])
              }
            }
            setAllBiensState(biensFilteredEndroit)
          }

          if(filtersFromRedux.prixMin || filtersFromRedux.prixMax){
            var tableauABloucler = biensFilteredEndroit
            if(biensFilteredEndroit.length === 0){
              tableauABloucler = allLocation
            }
            
            if(filtersFromRedux.prixMin === ""){
              for(let i=0; i<tableauABloucler.length; i++){
                if(tableauABloucler[i].prixBien <=  filtersFromRedux.prixMax){
                  biensFilteredEndroitEtPrix.push(tableauABloucler[i])
                }
              }
              setAllBiensState(biensFilteredEndroitEtPrix)
            }
            if(filtersFromRedux.prixMax === ""){
              for(let i=0; i<tableauABloucler.length; i++){
                if(tableauABloucler[i].prixBien >=  filtersFromRedux.prixMin){
                  biensFilteredEndroitEtPrix.push(tableauABloucler[i])
                }
              }
              setAllBiensState(biensFilteredEndroitEtPrix)
            }

            if(filtersFromRedux.prixMin != "" && filtersFromRedux.prixMax != ""){
              for(let i=0; i<tableauABloucler.length; i++){
                if(tableauABloucler[i].prixBien >=  filtersFromRedux.prixMin && tableauABloucler[i].prixBien <=  filtersFromRedux.prixMax){
                  biensFilteredEndroitEtPrix.push(tableauABloucler[i])
                }
              }
              setAllBiensState(biensFilteredEndroitEtPrix)
            }
          }

        }


      }


      // filter viager
      if(props.typeTransactionToDisplay === "Viager"){
        var allViager = []
        for(let i=0; i<allBiens.length; i++){
          if(allBiens[i].typeTransaction === "Viager"){
            allViager.push(allBiens[i])
          }
        }
        setAllBiensState(allViager)

        if(filtersFromRedux.appartement === true){
          for(let i=0; i<allViager.length; i++){
            if(allViager[i].typeBien === "Appartement"){
              allBiensVar.push(allViager[i])
            }
          }
        }

        if(filtersFromRedux.maison === true){
          for(let i=0; i<allViager.length; i++){
            if(allViager[i].typeBien === "Maison"){
              allBiensVar.push(allViager[i])
            }
          }
        }

        if(filtersFromRedux.loft === true){
          for(let i=0; i<allViager.length; i++){
            if(allViager[i].typeBien === "Loft"){
              allBiensVar.push(allViager[i])
            }
          }
        }
        setAllBiensState(allBiensVar)


        var biensFilteredEndroit = []
        var biensFilteredEndroitEtPrix = [];



        if(filtersFromRedux.endroit){
          for(let i=0; i<allBiensVar.length; i++){
            if(allBiensVar[i].ville === filtersFromRedux.endroit.label){
              biensFilteredEndroit.push(allBiensVar[i])
            }
          }
          setAllBiensState(biensFilteredEndroit)
        }

        if(filtersFromRedux.prixMin || filtersFromRedux.prixMax){
          console.log("condition passes!")
          var tableauABloucler = biensFilteredEndroit
          if(biensFilteredEndroit.length === 0){
            tableauABloucler = allBiensVar
          }
          for(let i=0; i<tableauABloucler.length; i++){
            if(tableauABloucler[i].prixBien <=  filtersFromRedux.prixMax){
              biensFilteredEndroitEtPrix.push(tableauABloucler[i])
            }
          }
          setAllBiensState(biensFilteredEndroitEtPrix)
        }

        // filter par coordones de la map et type de bien: 

        var biensFilteredMap = []
        var biensFilteredMapAndPrix = []
        if(boundsFromRedux.length != 0){

          for(let i=0; i<allBiensVar.length; i++){
            var bienLat = allBiensVar[i].latitude;
            var bienLgn = allBiensVar[i].longitude
            var bienCords = [bienLat, bienLgn]
            var includesInPolygon = inside(bienCords, boundsFromRedux)
            if(includesInPolygon === true){
                console.log("condition passed")
                biensFilteredMap.push(allBiensVar[i])
                
              }
            }
            setAllBiensState(biensFilteredMap)

            // filter par coordones, type de bien et budget:

            if(filtersFromRedux.prixMin || filtersFromRedux.prixMax){

              if(filtersFromRedux.prixMin != "" && filtersFromRedux.prixMax != ""){
                for(let i=0; i<biensFilteredMap.length; i++){
                  if(biensFilteredMap[i].prixBien >=  filtersFromRedux.prixMin && biensFilteredMap[i].prixBien <=  filtersFromRedux.prixMax){
                    biensFilteredMapAndPrix.push(biensFilteredMap[i])
                  }
                }
                setAllBiensState(biensFilteredMapAndPrix)
              }
  
              if(filtersFromRedux.prixMin === ""){
                for(let i=0; i<biensFilteredMap.length; i++){
                  if(biensFilteredMap[i].prixBien <=  filtersFromRedux.prixMax){
                    biensFilteredMapAndPrix.push(biensFilteredMap[i])
                  }
                }
                setAllBiensState(biensFilteredMapAndPrix)
              }
              if(filtersFromRedux.prixMax === ""){
                for(let i=0; i<biensFilteredMap.length; i++){
                  if(biensFilteredMap[i].prixBien >=  filtersFromRedux.prixMin){
                    biensFilteredMapAndPrix.push(biensFilteredMap[i])
                  }
                }
                setAllBiensState(biensFilteredMapAndPrix)
              }
  
            }

        }



        if(filtersFromRedux.noBiensSelected === true){
          setAllBiensState(allViager)

          if(filtersFromRedux.endroit){
            console.log("allVente2", allViager)
            for(let i=0; i<allViager.length; i++){
              if(allViager[i].ville === filtersFromRedux.endroit.label){
                biensFilteredEndroit.push(allViager[i])
              }
            }
            setAllBiensState(biensFilteredEndroit)
          }

          if(filtersFromRedux.prixMin || filtersFromRedux.prixMax){
            var tableauABloucler = biensFilteredEndroit
            if(biensFilteredEndroit.length === 0){
              console.log("condition passes!")
              tableauABloucler = allViager
            }
            for(let i=0; i<tableauABloucler.length; i++){
              if(tableauABloucler[i].prixBien <=  filtersFromRedux.prixMax){
                biensFilteredEndroitEtPrix.push(tableauABloucler[i])
              }
            }
            setAllBiensState(biensFilteredEndroitEtPrix)
          }
        }

      }

      setTimeout(() => {
        setLoaded(true)
      }, 900);

       
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


  if(loaded === false){
    pasDeBiens =  <Spinner style={{marginTop: 30, marginBottom: 30}} color="light" />

  }

  if(loaded === true && allBiensState.length === 0){
    console.log("allBiensState.length :", allBiensState.length)
    pasDeBiens = 
    <span style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
      <span style={{display: "flex", justifyContent: "center", alignItems: "center", color: "white", marginTop: 30, marginBottom: 30, }}>
        Il n'y a pas des biens correspondant à votre recherche
      </span>
      <Button style={{backgroundColor: "#206A37"}}><Link to="/recherche" style={{color: "white"}}>Revenir à la page Recherche</Link></Button>
    </span>

  }



  return (

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{opacity: 0 }}
>

      <Container style={BackgroundImage}>

        <NavBar pageName="R E S U L T A T S" />

        <Row style={{width: "100%", marginBottom: 30, display: "flex", justifyContent: "flex-start", marginLeft: 5}}>
            <Link to="/recherche">
              <Button style={{color: "#206A37", backgroundColor: "white"}}>
                <BiArrowBack style={{marginRight: 5}}/>
                Retour 
              </Button>
            </Link>
        </Row>


        <Row style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          {pasDeBiens}
            {
                allBiensState.map(function(bien, i){
  
                    var bienImage = bien.photos[0]
                    var caption100 = bien.description.substring(0,200) + " ...";
                  
            
                    return(
                    <Link to='/bien' style={firstRow} key={i} onClick={()=>props.onBienClick(bien)}>

                      <Col xs='12' lg='3' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', justifySelf: 'center', alignSelf: 'center', height:'100%'}}>
                          <img src={decodeURIComponent(bienImage)} style={{width: '200px', height: '200px', display:'flex', justifySelf: 'center', alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}} fluid />
                      </Col>
            
                      
                      <Col xs='12' lg='9' style={{display:'flex', alignItems:'center', justifyContent: 'center', flexDirection: 'column'}}>
            
                          <Row style={{width: "100%", marginBottom: 10, color: "#206A37"}}>
                              <Col xs="9">
                                <Row>{bien.typeBien}</Row>
                                <Row><strong> {bien.nbPieces} p -  ch - {bien.surfaceTotal} m² </strong></Row>
                              </Col>
                              <Col xs="3">
                                <Badge style={{backgroundColor: '#206A37', fontSize:'calc(0.5em + 0.5vw)'}}>{numberWithSpaces(bien.prixBien)} €</Badge>
                              </Col>
                          </Row>
            
                          <Row style={{width: "100%", display: "flex", flexDirection: "column", marginBottom: 10, color: "#206A37"}}>
                            <span>{bien.ville}</span>
                            <span>{bien.codePostal}</span>
                          </Row>
            
                          <Row style={{width: "100%"}}>
                              <span style={{fontSize: 'calc(0.5em + 0.4vw)', color: "#a6a6a6"}}>{caption100}</span>
                          </Row>
                      </Col>

                    </Link>
                    )
                  })
            }
        </Row>

      </Container>
      <Footer/>

</motion.div>
  );
}


function mapDispatchToProps(dispatch) {
  return {
    onBienClick: function(info) {
      dispatch( {type: "sendBienInfo", whatInfo: info} )
    }
  }
}


function mapStateToProps(state) {
  return {
    filtersToDisplay: state.filters,
    typeTransactionToDisplay: state.typedeTransaction,
    boundsToDisplay: state.latAndLng
  }
}

var BackgroundImage = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  height:'auto',
  backgroundImage: 'linear-gradient(to right bottom, #176b2b, #419068, #74b4a0, #b1d7d1, #f4fafa)',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  maxWidth: '100%',

}

var navBarRow = {
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

var firstRow = {
  height: 'auto',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(255,255,255, 0.9)',
  width: "60%",
  justifySelf: 'center',
  alignSelf: 'center',
  marginTop: 'calc(0.5em + 0.5vw)',
  marginBottom: 'calc(0.5em + 0.5vw)',
  borderRadius: '10px',
  border: 0,
  paddingBottom: 5, 
  paddingTop: 5,
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Resultats)
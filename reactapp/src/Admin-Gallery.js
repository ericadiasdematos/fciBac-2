import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Popover, Input, PopoverBody, Button, Label, Progress  } from 'reactstrap';
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'
import { Gallery, Item } from 'react-photoswipe-gallery'
import photo1 from './images/ActualitéesFonds.png'
import photo2 from './images/AgenceHoudan.jpg'
import photo3 from './images/EstimerMonBienFonds.png'
import photo4 from './images/HomePageFond.png'
import photo5 from './images/NosAgencesFonds.png'
import photo6 from './images/PageContacts.png'
import photo7 from './images/PageCreationDeCompte.png'
import { FaTrash } from 'react-icons/fa';
import firebase from './InitFirebase'
import { storage } from './InitFirebase'


const db = firebase.database();

    // useEffect(()=>{
    //     const ref = db.ref
    // })




function MyGallery() {


    const [galleryData, setGalleryData] = useState([
        {
            image: photo1,
            id: 1
            },
        {
            image: photo2,
            id: 2
          },
          {
            image: photo3,
            id: 3
          },
          {
            image: photo4,
            id: 4
          },
          {
            image: photo5,
            id: 5
          },
          {
            image: photo6,
            id: 6
          },
          {
            image: photo7,
            id: 7
          },
          {
            image: photo7,
            id: 8
          },
          {
            image: photo7,
            id: 9
          },
          {
            image: photo1,
            id: 10
          },
          
    ])


function deletePhoto(id){
    console.log('hey :', id.id)

    const newList = galleryData.filter((item)=>(item.id !== id))

    setGalleryData(newList)
      
}


return(

    <Gallery>
    {
        galleryData.map(function(image){
            return(
                <Item key={image.id}
                    original={image.image}
                    thumbnail={image.image}
                    width="1024"
                    height="768"
                >
                    {({ ref, open }) => (
                        <span style={{display: 'flex', flexDirection: 'column'}}>
                            <img style={{width: '250px', height:'150px', border: '5px solid #206A37', marginRight: 5, marginTop: 5, cursor: 'pointer'}} ref={ref} onClick={open} src={image.image} />
                            <span style={{width: '250px', height:'30px', backgroundColor: '#206A37', marginRight: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', cursor: 'pointer'}}>
                                <FaTrash onClick={()=>deletePhoto(image.id)}/>
                            </span>
                        </span>
                    )}
                </Item>
            )
        })
    }
</Gallery>

)


}

export default MyGallery
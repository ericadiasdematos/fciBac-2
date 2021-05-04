import React, {useEffect, useState} from "react"
import 'antd/dist/antd.css';
import imageOne from './images/ActualitéesFonds.png'
import imageTwo from './images/HomePageFond.png'
import imageThree from './images/NosAgencesFonds.png'
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import {connect} from "react-redux"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import { Image } from 'antd';
import { AiOutlineExpand } from 'react-icons/ai';





function CarrouselBien(props) {

const [photosFromRedux, setPhotosFromRedux] = useState(props.bienToDisplay.photos)
const [photosToDisplay, setPhotosToDisplay] = useState([])
const [imageExpand, setImageExpand] = useState()


const images = []

useEffect(()=>{
  console.log("photosFromRedux :", photosFromRedux)

  for(let i=0; i<photosFromRedux.length; i++){
    images.push({
      original: decodeURIComponent(photosFromRedux[i]),
      thumbnail: decodeURIComponent(photosFromRedux[i])
    })
  }
}, [])




return(
    <span>
    <Carousel centerMode={true} centerSlidePercentage={100} dynamicHeight={false} style={{display: "flex", justifyContent: "center", alignItems: "center", justifySelf: "center", alignSelf: "center"}}>
          {
          photosFromRedux.map(function(image, i){
            return(
              <div key={i} style={{width: "100%", height: "100%", cursor: "zoom-in"}}>
                  <Image src={decodeURIComponent(image)} style={{width: "100%", height: "100%", cursor: "zoom-in"}} width="100%" height="100%"/>
                  {/* <span onClick={()=> console.log(" imageExpand :", imageExpand) } style={{backgroundColor: "white", borderRadius: 100, position: "absolute", bottom:0, right:0, margin: 10, marginRight: 30, cursor: "pointer"}}>
                    <AiOutlineExpand style={{width: 30, height: 30, margin: 7}}/>
                  </span> */}
              </div>
            )
          })
          }
    </Carousel>
  </span>

  
  )
}

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

function mapStateToProps(state) {
  return {
    bienToDisplay: state.bienSelected
  }
}

export default connect(
  mapStateToProps,
  null
)(CarrouselBien);

{/* <ImageGallery style={{width: "100%", overflow:"hidden"}} items={
  photosFromRedux.map(function(image, i){
    return(
      {
        original: decodeURIComponent(image),
        thumbnail: decodeURIComponent(image)
      }
    )
  })
} /> */}
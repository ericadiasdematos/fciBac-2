import React, { Component, useState, View, useEffect } from 'react';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { Col, Container, Row, Modal,  ModalHeader, ModalBody, Button, ModalFooter} from 'reactstrap';
import imageOne from './images/ActualitéesFonds.png'
import imageTwo from './images/HomePageFond.png'
import imageThree from './images/NosAgencesFonds.png'
import "react-image-gallery/styles/css/image-gallery.css"
import ImageGallery from 'react-image-gallery';
import photo2 from './images/ActualitéesFonds.png'
import { RiCloseCircleLine } from 'react-icons/ri';




function Carrosel(props) {

    function changeWeight(e) {
        e.target.style.fontWeight = 'bolder';
    }
    
    function changeBackWeight(e) {
        e.target.style.fontWeight = 'normal';
    }

    const {
        buttonLabel,
        className
      } = props;

    const [modal, setModal] = useState(false);
    const [allPostsCaptions, setAllPostsCaptions] = useState()
    const [postsInReturnn, setPostsInReturn] = useState()
    const [modalData, setModalData] = useState({})
    const toggle2 = () => setModal(!modal);
    const [mediaPostData, setMediaPostData] = useState()
    const [textPostData, setTextPostData] = useState()
    const [typePostData, setTypePostData] = useState()
    const [datePostData, setDatePostData] = useState()
    const [allPosts, setAllPosts] = useState()

    var InstaPostData = [];
    var instaModal;

    if(typePostData === 'IMAGE'){

        instaModal =   <Modal isOpen={modal} toggle={toggle2} className={className} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <ModalHeader style={{display: 'flex', alignSelf: 'flex-end', justifySelf: 'flex-end'}}>
                                <RiCloseCircleLine onClick={toggle2} type='button' style={{color:'#656D64', width: 20, height: 20, display: 'flex', alignSelf: 'flex-end', justifySelf: 'flex-end'}}/>
                            </ModalHeader>
                            <ModalBody>
                                <img src={mediaPostData} style={{width: '100%'}}/>
                            </ModalBody>
                            <ModalBody>
                                <snap style={{textAlign: 'left', fontFamily: 'roboto, sans-serif', fontWeight: '300', fontStyle: 'normal', fontSize: 14}}>{textPostData}</snap>
                            </ModalBody>
                            <ModalFooter>
                                <span style={{fontFamily: 'roboto, sans-serif', fontWeight: '300', fontStyle: 'normal', fontSize: 14}}>{datePostData}</span>
                            </ModalFooter>
                        </Modal>
    }else{
        instaModal = <Modal isOpen={modal} toggle={toggle2} className={className} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <ModalHeader style={{display: 'flex', alignSelf: 'flex-end', justifySelf: 'flex-end'}}>
                            <RiCloseCircleLine onClick={toggle2} type='button' style={{color:'black', width: 20, height: 20, display: 'flex', alignSelf: 'flex-end', justifySelf: 'flex-end'}}/>
                        </ModalHeader>
                        <ModalBody>
                            <video controls style={{width: '100%'}} fluid>
                                <source src={mediaPostData} />
                                Sorry, your browser doesn't support embedded videos.
                            </video>
                        </ModalBody>
                        <ModalBody>
                            <snap style={{textAlign: 'justify'}}>{textPostData}</snap>
                        </ModalBody>
                        <ModalFooter>
                            <span>{datePostData}</span>
                        </ModalFooter>
                    </Modal>
    }
   

    function handleClickModal(post) {
        console.log(post)
        setMediaPostData(post.imgUrl)
        setTextPostData(post.caption)
        setTypePostData(post.type)
        var date = new Date(post.date);
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var dt = date.getDate();

        if (dt < 10) {
        dt = '0' + dt;
        }
        if (month < 10) {
        month = '0' + month;
        }

        console.log(year+'-' + month + '-'+dt);
        setDatePostData(dt+'-' + month + '-'+year)
        toggle2()
         
        
    }

    var tempoPosts2 = []



    useEffect(async() => {


            
        var rawData = await fetch('https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,timestamp,thumbnail_url&access_token=IGQVJVSlVHV1Q2cGVVemdrYUwzOU1SejdxM254a2NzUF9LZATd6aEFFTEcydjB3ODQtTGxzZAFBXbno5M2JMekJNTGlkdEQyQnpZAQnp5X3VlTU5kcTlld0NweTlKd1RXRGJzbEt3OFd3'); 
      
        var data = await rawData.json()

        var realData = data.data;

        realData.map(function(i) {
            return  InstaPostData.push({caption: i.caption, thumbnailUrl: i.thumbnail_url, imgUrl: `${i.media_url}`, type: i.media_type, date: i.timestamp})
        })

        setAllPostsCaptions(InstaPostData)

        console.log('state: ', InstaPostData)

        



        var tempoPosts = InstaPostData.map(function(i) {
            if(i.type === 'IMAGE'){
                return(
                    <Row onMouseOver={changeWeight} onMouseOut={changeBackWeight} onClick={()=>handleClickModal(i)} type="button"  style={{justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', backgroundColor: 'rgba(255,255,255, 0.7)', width: '100%', margin: '20px 0 20px 0', borderBottom: '1px solid #dddddd', borderTop: '1px solid #dddddd'}}>
                        <Col xs='10' lg='3' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <img  src={i.imgUrl} style={{width: 'inherit', height: 'inherit'}} fluid />
                        </Col>
                        <Col xs='10' lg='8'  style={{display: 'flex', justifySelf: 'center', alignSelf: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <span style={{textAlign: 'left', fontSize: 'calc(0.5em + 0.4vw)'}}>{i.caption}</span>
                        </Col>
                    </Row>
                    
            )
        }
        if(i.type === 'VIDEO'){
            return(
                <Row onMouseOver={changeWeight} onMouseOut={changeBackWeight} onClick={()=>handleClickModal(i)} type="button" style={{justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', backgroundColor: 'rgba(255,255,255, 0.7)', width: '100%', margin: '20px 0 20px 0', borderBottom: '1px solid #dddddd', borderTop: '1px solid #dddddd'}}>
                    <Col xs='10' lg='3' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <img src={i.thumbnailUrl} style={{width: 'inherit', height: 'inherit'}}/>
                    </Col>
                    <Col xs='10' lg='8'  style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'strech', height: 'inherit', alignSelf: 'stretch'}}>
                        <span style={{textAlign: 'left', fontSize: 'calc(0.5em + 0.4vw)', height: 'inherit'}}>{i.caption}</span>
                    </Col>
                </Row>
                
        )
        }
        })


        setAllPosts(tempoPosts)
        console.log('allPosts: ', allPosts)
        

        for(let i=0; i<5; i++){
            tempoPosts2.push(tempoPosts[i])
        }

        setPostsInReturn(tempoPosts2)

      },[]); 

    console.log('out: ', allPostsCaptions)

    function handlePlusArticles() {
        setPostsInReturn(allPosts)
    }

    return (

<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',  height: '100%', alignSelf: 'stretch', backgroundColor: 'white', width: '100%', fontFamily: 'roboto, sans-serif', fontStyle: 'normal'}}>


    {postsInReturnn}
    {instaModal}
    <Button style={{width: '100%', color: 'white', backgroundColor: '#206A37'}} onClick={()=>handlePlusArticles()}>Voir plus d'articles</Button>


</div>
            



    )
  
}

var BackgroundImage2 = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    height:'auto',
    backgroundImage: `url(${photo2})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat-y',
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

export default Carrosel



// const images = [
//     {
//       original: "https://i.imgur.com/b3xdn1x.jpg",
//       thumbnail: "https://i.imgur.com/b3xdn1x.jpg",
//     },
//     {
//       original: 'https://static.dezeen.com/uploads/2020/02/house-in-the-landscape-niko-arcjitect-architecture-residential-russia-houses-khurtin_dezeen_2364_hero-852x479.jpg',
//       thumbnail: 'https://static.dezeen.com/uploads/2020/02/house-in-the-landscape-niko-arcjitect-architecture-residential-russia-houses-khurtin_dezeen_2364_hero-852x479.jpg'
//     },
//     {
//       original: 'https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/TypesOfHomes/types-of-homes-hero.jpg',
//       thumbnail: 'https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/TypesOfHomes/types-of-homes-hero.jpg'
//     }
//   ]

{/* <ImageGallery items={images} /> */}



{/*  */}

{/* <Modal isOpen={modal} toggle={toggle} className={className}>
                <img src={imageOne} onClick={toggle} style={{width: '150vh', display: 'flex', justifySelf: 'center', alignSelf: 'center'}}/>
            </Modal> */}
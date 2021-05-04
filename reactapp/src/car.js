import React, { useState, useEffect } from 'react';
import '@brainhubeu/react-carousel/lib/style.css';
import { Col, Row, Modal,  ModalHeader, ModalBody, Button, ModalFooter, Image} from 'reactstrap';
import "react-image-gallery/styles/css/image-gallery.css"
import photo2 from './images/ActualitéesFonds.png'
import { RiCloseCircleLine } from 'react-icons/ri';




function InstagramFeed(props) {

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
                                <Button style={{backgroundColor: 'white', border: 'white'}}><RiCloseCircleLine onClick={toggle2} style={{color:'#656D64', width: 20, height: 20, display: 'flex', alignSelf: 'flex-end', justifySelf: 'flex-end'}}/></Button>
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
                            <Button style={{backgroundColor: 'white', border: 'white'}}><RiCloseCircleLine onClick={toggle2}  style={{color:'black', width: 20, height: 20, display: 'flex', alignSelf: 'flex-end', justifySelf: 'flex-end'}}/></Button>
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


            
        var rawData = await fetch('https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,timestamp,thumbnail_url&access_token=IGQVJYUTh4dVJaaS10SU9BZAnhjZADc0YlhoSHlWdnZA0bEM0aWJHWFc4aDhrS3djdkpUQ201SHJYUmhRazRBMUt6WWFSWUJrQTdmTzExNmp5RVA4aWVEV0FSTVlyVmQ2dHBEd1VWWmNGLV9NbEJFNDdnRAZDZD'); 
        var data = await rawData.json()

        var realData = data.data

        realData.map(function(i) {
            return  InstaPostData.push({caption: i.caption, thumbnailUrl: i.thumbnail_url, imgUrl: `${i.media_url}`, type: i.media_type, date: i.timestamp, id: i.id})
        })

        setAllPostsCaptions(InstaPostData)

        console.log('state: ', InstaPostData)

        



        var tempoPosts = InstaPostData.map(function(i) {
            if(i.type === 'IMAGE'){
                return(
                    <Row key={i.id} onMouseOver={changeWeight} onMouseOut={changeBackWeight} onClick={()=>handleClickModal(i)}  style={{justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', backgroundColor: 'rgba(255,255,255, 0.7)', width: '100%', margin: '20px 0 20px 0', borderBottom: '1px solid #dddddd', borderTop: '1px solid #dddddd', cursor: "pointer"}}>
                        <Col xs='10' lg='3' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <img  src={i.imgUrl} style={{width: 'inherit', height: 'inherit'}} fluid="true" />
                        </Col>
                        <Col xs='10' lg='8'  style={{display: 'flex', justifySelf: 'center', alignSelf: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <span style={{textAlign: 'left', fontSize: 'calc(0.5em + 0.4vw)'}}>{i.caption}</span>
                        </Col>
                    </Row>
                    
            )
        }
        if(i.type === 'VIDEO'){
            return(
                <Row key={i.id} onMouseOver={changeWeight} onMouseOut={changeBackWeight} onClick={()=>handleClickModal(i)} style={{justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', backgroundColor: 'rgba(255,255,255, 0.7)', width: '100%', margin: '20px 0 20px 0', borderBottom: '1px solid #dddddd', borderTop: '1px solid #dddddd', cursor: "pointer"}}>
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

export default InstagramFeed


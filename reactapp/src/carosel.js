import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import photo1 from './images/PageQuiSommesNous.png'
import photo2 from './images/PageSyndic.png'
import photo3 from './images/PageOutils.png'
import imageOne from './images/ActualitéesFonds.png'
import imageTwo from './images/HomePageFond.png'
import imageThree from './images/NosAgencesFonds.png'
import ModalImage from "react-modal-image";


const items = [
  <ModalImage
small={imageOne}
large={imageOne}
alt="Hello World!"
/>,
<ModalImage
small={imageTwo}
large={imageTwo}
alt="Hello World!"
/>,
<ModalImage
small={imageThree}
large={imageThree}
alt="Hello World!"
/>

];

const Example = () => <UncontrolledCarousel items={items} />;

export default Example;

{/* <ModalImage
small={imageOne}
large={imageOne}
alt="Hello World!"
/>
<ModalImage
small={imageTwo}
large={imageTwo}
alt="Hello World!"
/>
<ModalImage
small={imageThree}
large={imageThree}
alt="Hello World!"
/> */}

// {
//   src: photo1,
//   key: '1'
// },
// {
//   src: photo2,
//   key: '2'
// },
// {
//   src: photo3,
//   key: '3'
// }
import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import photo1 from './images/PageQuiSommesNous.png'
import photo2 from './images/PageSyndic.png'
import photo3 from './images/PageOutils.png'


const items = [
  {
    src: photo1,
    key: '1'
  },
  {
    src: photo2,
    key: '2'
  },
  {
    src: photo3,
    key: '3'
  }
];

const Example = () => <UncontrolledCarousel items={items} />;

export default Example;
import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './ImageCarousel.css'
import { Carousel } from 'react-responsive-carousel';
 
class ImageCarousel extends Component {
    render() {
        return (
            <div className="carousel-container">
            <Carousel autoPlay interval={5000} dynamicHeight showStatus={false} infiniteLoop={true} showThumbs={false} width='330px'>
                <div className="carousel-image-container">
                    <img className="carousel-image" src="images/achieveMPLS.jpg" />
                </div>
                <div className="carousel-image-container">
                    <img className="carousel-image" src="images/advocates-human-rights.png" />
                </div>
                <div className="carousel-image-container">
                    <img className="carousel-image" src="images/handsOn.jpeg" />
                </div>
            </Carousel>
            </div>
        );
    }
};

export default ImageCarousel;

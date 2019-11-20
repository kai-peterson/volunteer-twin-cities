import React, { Component } from 'react';
import { connect } from 'react-redux';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './ImageCarousel.css'
import { Carousel } from 'react-responsive-carousel';

class ImageCarousel extends Component {
    render() {
        return (
            <div className="carousel-container">
                <Carousel interval={5000} dynamicHeight showStatus={false} infiniteLoop={true} showThumbs={false} width='330px'>
                    {this.props.orgsInfoReducer.orgImagesReducer.length ? this.props.orgsInfoReducer.orgImagesReducer.map((image) =>
                        <div className="carousel-image-container">
                            <img className="carousel-image" src={image.image} />
                        </div>) :
                        <pre>Loading...</pre>
                    }
                    {/* <pre></pre> */}
                    {/* <div className="carousel-image-container">
                    <img className="carousel-image" src="images/achieveMPLS.jpg" />
                </div> */}
                    {/* <div className="carousel-image-container">
                    <img className="carousel-image" src="images/advocates-human-rights.png" />
                </div>
                <div className="carousel-image-container">
                    <img className="carousel-image" src="images/handsOn.jpeg" />
                </div> */}
                </Carousel>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(ImageCarousel);

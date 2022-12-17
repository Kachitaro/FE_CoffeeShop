import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Banner.scss'



class Banner extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            speed: 500,
            autoplaySpeed: 2000,
            cssEase: "linear"
        }
            
        return (
            <React.Fragment>
                <div className='section-banner'>
                    <div className='banner-content'>
                       <Slider {...settings}>
                            <div className='banner-item'>
                               <div className='bg-item-1'>
                               </div>
                            </div>
                            <div className='banner-item'>
                                <div className='bg-item-2'> 
                                </div>
                            </div>
                       </Slider>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);

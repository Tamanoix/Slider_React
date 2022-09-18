import React, { useState } from 'react';
import './Slider.css';
import dataSlider from './dataSlider';
import BtnSlider from './BtnSlider';


const Slider = () => {

    const [slideAnim, setSlideAnim] = useState({
        index: 1,
        inProgress: false
    });

    const nextSlide = () => {
        if (slideAnim.index !== dataSlider.length && !slideAnim.inProgress) {

            setSlideAnim({index: slideAnim.index + 1, inProgress: true});

            // Fonction pour éviter le spamm de clicks sur les boutons (on ne peut pas reclicker dessus tant que inProgress est à true)
            setTimeout(() => {
                setSlideAnim({index: slideAnim.index + 1, inProgress: false});
            }, 400);
            
        }
        else if (slideAnim.index === dataSlider.length && !slideAnim.inProgress) {

            setSlideAnim({index: 1, inProgress: true});

            setTimeout(() => {
                setSlideAnim({index: 1, inProgress: false});
            }, 400);

        }
    };

    const prevSlide = () => {
        if (slideAnim.index !== 1 && !slideAnim.inProgress) {

            setSlideAnim({index: slideAnim.index - 1, inProgress: true});

            setTimeout(() => {
                setSlideAnim({index: slideAnim.index - 1, inProgress: false});
            }, 400);

        }
        else if (slideAnim.index === 1) {

            setSlideAnim({index: dataSlider.length, inProgress: true});

            setTimeout(() => {
                setSlideAnim({index: dataSlider.length, inProgress: false});
            }, 400);

        }
    };

    const moveDot = (index) => {
        setSlideAnim({index: index, inProgress: true});
    };


    return (
        <div className='container-slider'>
            { dataSlider.map((obj, index) => {
                return (
                    <div 
                    key={obj}
                    className={slideAnim.index === index + 1 ? 
                        "slide active-anim" : "slide"}
                    >
                        <img src={process.env.PUBLIC_URL + `/Imgs/img${index + 1}.jpg`} alt="" />
                    </div>
                )
            })}

            <BtnSlider moveSlide={nextSlide} direction={'next'} />
            <BtnSlider moveSlide={prevSlide} direction={'prev'} />

            <div className='container-dots'>
                {Array.from({length: dataSlider.length}).map((item, index) => {
                    return <div 
                    className={slideAnim.index === index + 1 ? 
                    "dot active" : "dot"}
                    onClick={() => moveDot(index + 1)}
                    ></div>
                })}
            </div>
        </div>
    )
}

export default Slider;
import React, { useContext, useEffect } from 'react'
import AppContext from '../../context/app-context'
import HeroSlider, { Slide, Nav } from 'hero-slider'
const HeroSlide = () => {
    const { homePage } = useContext(AppContext)
    return (
        <HeroSlider
            slidingAnimation='left_to_right'
            orientation='horizontal'
            initialSlide={1}
            settings={{
                slidingDuration: 500,
                slidingDelay: 100,
                shouldAutoplay: true,
                shouldDisplayButtons: false,
                autoplayDuration: 2000,
                height: '300px',
                width: 'auto'
            }}>

            {
                homePage.heroSlides.map((song, index) =>
                    <Slide
                        key={`slide:${index}` + song.song_id}
                        shouldRenderMask={true}
                        style={{ display: 'flex', justifyContent: 'center' }}
                        background={{
                            maskBackgroundBlendMode: 'luminosity',
                            backgroundImage: song.cover,
                            backgroundAnimation: 'fade',
                        }}
                    >

                        <div style={{
                            fontSize: '60px',
                            fontWeight: '500',
                            fontFamily: 'Roboto',
                            textAlign: 'center',
                            color : '#d60446'
                        }}>{song.title}</div>
                    </Slide>)
            }
            < Nav />
        </HeroSlider>
    )
}

export default HeroSlide
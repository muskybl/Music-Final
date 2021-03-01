import React, { useContext } from 'react';
import HeroSlide from './HeroSlider'
import HorizontalList from './HorizontalList'
import AppContext from '../../context/app-context'
import { MESSAGE } from '../../mylib/constant/constStr'
const Home = () => {
    const { homePage } = useContext(AppContext)    
    return (
        <div>
            <HeroSlide />
            <HorizontalList title={MESSAGE.MOST_VIEWS_ALBUMS} lists={homePage.albumsAlltime} type="albums" />
            <HorizontalList title={MESSAGE.TRENDING_WEEKLY_ALBUMS} lists={homePage.albumsWeekly} type="albums" />
            <HorizontalList title={MESSAGE.POPULAR_PLAYLISTS} lists={homePage.playlistsAlltime} type="playlists" />
            <HorizontalList title={MESSAGE.JUST_FOR_YOU} lists={homePage.playlistsWeekly} type="playlists" />
        </div>
    );
}
// du lieu dau color: 
export default Home;

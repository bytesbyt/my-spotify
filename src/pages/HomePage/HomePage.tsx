
import React from 'react'
import NewReleases from './components/NewReleases'
import PopularTracks from './components/PopularTracks'
import StudioGhibliAlbums from './components/StudioGhibliAlbums'


const HomePage = () => {
  return (
    <div>
      <NewReleases/>
      <PopularTracks/>
      <StudioGhibliAlbums/>
    </div>
  )
}

export default HomePage

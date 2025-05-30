import React, { Suspense } from 'react';
import './App.css';
import { Routes, Route } from "react-router";
import LoadingSpinner from './common/components/LoadingSpinner';

const AppLayout = React.lazy(() => import("./layout/AppLayout"));
const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage/SearchPage"));
const SearchWithKeywordPage = React.lazy(() => import("./pages/SearchWithKeywordPage/SearchWithKeywordPage"));
const PlaylistDetailPage = React.lazy(() => import("./pages/PlaylistDetailPage/PlaylistDetailPage"));

//0. sidebar (playlist, menu)
//1. landing page /
//2. search page /search
//3. serach results page /search/:keyword
//4. playlist detail page /playlist/:id

//5. (mobile) seperate playlist page /playlist

function App() {
  return (
    <Suspense fallback={<LoadingSpinner size={50} color="#ff6347" />}>
      <Routes>
        <Route path="/" element={<AppLayout/>}>
          <Route index element = {<HomePage/>} />
          <Route path="search" element={<SearchPage/>}/>
          <Route path="search/:keyword" element={<SearchWithKeywordPage />}/>
          <Route path="playlist/:id" element={<PlaylistDetailPage />}/>
          {/* <Route path="playlist" element={<PlaylistPage/>}/> */}
        </Route>
      </Routes>
    </Suspense> 
  );
}

export default App;

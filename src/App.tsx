// import { useState } from 'react'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Post from './pages/Post/Post';
import NotFound from './pages/NotFound';
import Blog from './pages/BlogList/BlogList';
import MenuBar from './components/MenuBar/MenuBar';

const App: React.FC = () => {
  return (
    <>
    <Router>
        <MenuBar
          items={[
            { id: 'home', label: 'home', href: '/lavinder/' },
            { id: 'blog', label: 'blog', href: '/lavinder/blog' },
          ]}
        />
        <Routes>
            <Route path="/lavinder/" element={<Home />} />
            <Route path="/lavinder/home" element={<Home />} />
            <Route path="/lavinder/blog" element={<Blog />} />
            <Route path="/lavinder/blog/:slug" element={<Post />} />
            <Route path="/lavinder/not-found" element={<NotFound />} />
            <Route path="/lavinder/*" element={<Home />} />
        </Routes>
    </Router>
    </>
  )
}

export default App

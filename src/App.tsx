// import { useState } from 'react'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import NotFound from './pages/NotFound';
import Blog from './pages/Blog';
import TestMarkdownLoading from './pages/TestMarkdownLoading';

const App: React.FC = () => {
  return (
    <>
    <Router>
        <Routes>
            <Route path="/personal/" element={<Home />} />
            <Route path="/personal/home" element={<Home />} />
            <Route path="/personal/blog" element={<Blog />} />
            <Route path="/personal/blog/:slug" element={<Post />} />
            <Route path="personal/test-markdown-loading" element={<TestMarkdownLoading />} />
            <Route path="/personal/not-found" element={<NotFound />} />
            <Route path="/personal/*" element={<Home />} />
        </Routes>
    </Router>
    </>
  )
}

export default App

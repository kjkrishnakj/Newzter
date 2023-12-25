import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import About from './components/About';
import LoadingBar from 'react-top-loading-bar';
import {
  Routes,
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
export default class App extends Component {

apiKey  = process.env.REACT_APP_NEWS_API;
state={progress : 0}
setProgress= (progress)=>{
  this.setState({progress : progress})
}
render() {
  return (
    <Router>

        <Navbar />
        <div>
          <LoadingBar
            color='#f11946'
            height={3}
            progress={this.state.progress}
          />
          
        </div>
        <Routes>


          <Route path="/about" element={<About />} />
          <Route path="/buisness" element={<News apiKey = {this.apiKey} setProgress =  {this.setProgress} key='buisness' pageSize={15} country="in" category="business" />}></Route>
          <Route path="/entertainment" element={<News apiKey = {this.apiKey} setProgress =  {this.setProgress} key='entertainment' pageSize={15} country="in" category="entertainment" />}></Route>
          <Route path="/" element={<News apiKey = {this.apiKey} setProgress =  {this.setProgress} key='Free Daily Newz!' pageSize={15} country="in" category="general" />}></Route>
          <Route path="/health" element={<News apiKey = {this.apiKey} setProgress =  {this.setProgress} key='health' pageSize={15} country="in" category="health" />}></Route>
          <Route path="/science" element={<News apiKey = {this.apiKey} setProgress =  {this.setProgress} key='science' pageSize={15} country="in" category="science" />}></Route>
          <Route path="/sports" element={<News apiKey = {this.apiKey} setProgress =  {this.setProgress} key='sports' pageSize={15} country="in" category="sports" />}></Route>
          <Route path="/technology" element={<News apiKey = {this.apiKey} setProgress =  {this.setProgress} key='technology' pageSize={15} country="in" category="technology" />}></Route>

        </Routes>

      </Router>
    )
  }
}


import React, { Component, Fragment } from 'react';
import { BrowserRouter,Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

// Components
import Header from './Header';
import Nav from './Nav';
import PhotoList from './Components/PhotoList';
import Search from './Components/Search';
import NotFound from './Components/NotFound';

// ApiKey 
const apiKey=process.env.REACT_APP_API_KEY;


class App extends Component {

  constructor() {
    super();
    this.state = {
      photos: [],
      loading: true,
    };
  } 


componentDidMount() {
  this.performSearch();
} 



  performSearch = (query = 'sunsets') => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        photos: response.data.photos.photo,
        loading: false
      });
      
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });

  }



render() {
  console.log(this.state.photos);

  return (
    
    <BrowserRouter>
      <Header />
      <div className="container">

        {/* <Switch> */}
        <Route path="/" render={ () => <Search onSearch={this.performSearch} /> } />
        <Route       path="/" render={ () => <Nav data={this.state.photos} onSearch={this.performSearch} /> } />
        <Route exact path="/" render={props => <PhotoList data={this.state.photos} /> }/>
        {/* <Route component={NotFound} /> */}

        {/* Search Route */}

        <Route exact path="/search/:topicSearched" component={Search} />

        
        {/* Navigation Links */}

        <Route exact path="/sunsets" render={ () => <PhotoList data={this.state.photos} onSearch={this.performSearch('sunsets')}  /> } />
        <Route exact path="/moonlight" render={ () => <PhotoList data={this.state.photos} onSearch={this.performSearch('moonlight')}  />} />
        <Route exact path="/auroraborealis" render={ () => <PhotoList data={this.state.photos} onSearch={this.performSearch('aurora borealis')} /> } />
      

        {/* Not Found */}
        {
          (this.state.loading) ? <p className="Loading">Loading...</p> : <Route exact path="/notfound" render={ () => <NotFound /> }/>
        }

      </div>
    </BrowserRouter>
  );
}
}

export default App;

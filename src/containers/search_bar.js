import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather} from '../actions/index';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {term: ''}

    //to allow onInputChange to work correctly
    //bind function to searchbar and replace
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    console.log(event.target.value);
    this.setState({term: event.target.value});
  }

  onFormSubmit(event) {
    //prevents form submitting
    event.preventDefault();
    this.props.fetchWeather(this.state.term);
    this.setState({ term: ''});

  }

  render () {
    return (
      <form onSubmit={this.onFormSubmit}
      className="input-group">
        <input
        placeholder="Get a five-day forecast in your city"
        className="form-control"
        value={this.state.term}
        //callbacks need binding
        onChange={this.onInputChange} />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">Submit</button>
          </span>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchWeather}, dispatch);
}
//null is to say no state is needed in searchbar
export default connect(null, mapDispatchToProps)(SearchBar);

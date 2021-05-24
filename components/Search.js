import React from 'react';
import { StyleSheet, TextInput, View, Button, FlatList, Text, ActivityIndicator } from 'react-native';

import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import {getFilmsFromApiWithText} from '../api/TMDBApi'


const styles = StyleSheet.create({
  textinput: {
    borderColor: 'black' ,
    borderWidth:1,
    marginLeft: 5,
    marginRight:5,
    height:50
  },
  margin_top: {
    marginTop: 20
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})


class Search extends React.Component {

  constructor(props) {
    super(props);
    //  this._films = [];
    // utilisation de state
    this.searchedText =  "";
    this.page = 0; // page courante
    this.totalPages = 0; // nombre de page totale
    this.state = { films : [], isLoading: false }
  }

_displayDetailForFilm = (idFilm) => {
  console.log("Display detail "+ idFilm);
  this.props.navigation.navigate('FilmDetail');
}

_searchFilms(){
  this.page = 0;
  this.totalPages=0;
  this.setState({films: []});
  this._loadFilms();
}

  _loadFilms(){
    this.setState({isLoading:true});

  setTimeout(() =>   getFilmsFromApiWithText(this.searchedText, this.page+1).then(data =>
    {
      this.page = data.page;
      this.totalPages = data.total_pages;
      this.setState({
      //  films: this.state.films.concat(data.results),
        films: [...this.state.films, ...data.results],
        isLoading: false
        })
    }
  ) , 2000);
  }

  _searchedTextInputChanged(text) {
    this.searchedText = text;
  }

  _displayLoading() {
    if (this.state.isLoading) {

      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
  }

  render() {
    console.log(this.state.isLoading)
    return (
      <View style={styles.margin_top}>
        <TextInput style={[styles.textinput, styles.margin_top]}
        placeholder='Titre du film'
        onChangeText={(text) => this._searchedTextInputChanged(text)}
        onSubmitEditing={() => this._searchFilms()} />
        <Button title='Rechercher' onPress={() => this._searchFilms()} />

        <FlatList
          data={this.state.films}
          keyExtractor={(item) =>  item.id.toString()  }
          renderItem={( {item} ) => <FilmItem displayDetailForFilm={this._displayDetailForFilm} film={item} /> }
          onEndReachedThreshold={1}
          onEndReached={() => {
            //console.log("Limite atteinte")
            if (this.page < this.totalPages){
              this._loadFilms()
            }
          }}
          />

          {this._displayLoading()}
      </View>
    );
  }

}

export default Search

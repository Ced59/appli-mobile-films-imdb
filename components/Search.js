import React from 'react';
import {Button, FlatList, StyleSheet, TextInput, View, ActivityIndicator} from 'react-native';
import FilmItem from "./FilmItem";
import {getFilmsFromApiWithText} from "../api/TMDBApi";

const styles = StyleSheet.create({
    textinput: {
        borderColor: 'black',
        borderWidth: 1,
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        paddingLeft: 5
    },
    margin: {
        marginTop: 30,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15
    },
    listFilms: {
        marginBottom: 120
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
        //this._films = [];
      this.searchedText = "";
      this.state = { films : [], isLoading: false};
    }

    _loadFilms() {
        this.setState({isLoading:true});

        getFilmsFromApiWithText(this.searchedText).then(data =>
            {
                this.setState({films: data.results, isLoading: false})
            }
        );
    }

    _displayLoading(){
        if (this.state.isLoading)
        {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size="large"/>
                </View>
            )
        }
    }

  _searchedTextInputChanged(text) {
      this.searchedText = text;
  }

    render() {

        return (
            <View style={styles.margin}>
                <TextInput style={[styles.textinput, styles.margin]}
                           placeholder='Titre du film'
                           onChangeText={(text) => this._searchedTextInputChanged(text)}
                           onSubmitEditing={() => this._loadFilms()}
                />
                <Button title='Rechercher' onPress={() => this._loadFilms()}/>

                <FlatList
                    style={styles.listFilms}
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item}/>}
                />
                {this._displayLoading()}
            </View>
        );
    }

}

export default Search

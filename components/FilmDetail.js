import React from 'react'
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native'
import {getFilmFromApiById, getImageFromApi} from "../api/TMDBApi";
import {ScrollView} from "react-native-gesture-handler";


class FilmDetail extends React.Component {

    constructor(props) {
        super(props);
        const {params} = this.props.navigation.state;
        this.state = {film: {}, isLoading: true}


        const idFilm = params ? params.idFilm : null;

        this._loadingFilm(idFilm).then(r => {
        });
    }

    async _loadingFilm(idFilm) {

        let response = await getFilmFromApiById(idFilm)
        this.setState({
            film: response,
            isLoading: false
        })
    }

    _displayLoading() {
        if (this.state.isLoading) {

            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            )
        }
    }

    render() {

        return (
            <View style={{flex: 1}}>

                <ScrollView>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start', marginBottom: 25}}>
                        <Image
                            style={styles.image}
                            source={{uri: getImageFromApi(this.state.film.poster_path)}}
                        />


                        <Text style={styles.title_text}>{this.state.film.title}</Text>

                        <Text style={styles.title_original_text}>({this.state.film.original_title})</Text>

                        <Text style={styles.date_text}>Date de sortie: {this.state.film.release_date}</Text>

                        <Text style={{
                            fontWeight: 'bold',
                            alignSelf: 'baseline',
                            marginLeft: 25,
                            marginTop: 15
                        }}>Synopsis:</Text>

                        <Text style={styles.description_text}>{this.state.film.overview}</Text>

                        <Text style={{fontWeight: 'bold', alignSelf: 'baseline', marginLeft: 25, marginTop: 15}}>Budget
                            de
                            production:</Text>

                        <Text style={styles.description_text_left}>{this.state.film.budget} $</Text>

                        <Text style={{
                            fontWeight: 'bold',
                            alignSelf: 'baseline',
                            marginLeft: 25,
                            marginTop: 15
                        }}>Revenus:</Text>

                        <Text style={styles.description_text_left}>{this.state.film.revenue} $</Text>


                        {/*<Button*/}
                        {/*    title='Go to Details... again'*/}
                        {/*    onPress={() => this.props.navigation.navigate('FilmDetail')}*/}
                        {/*/>*/}
                        {/*<Button*/}
                        {/*    title='Go back'*/}
                        {/*    onPress={() => this.props.navigation.goBack()}*/}
                        {/*/>*/}

                        {this._displayLoading()}
                    </View>
                </ScrollView>
            </View>
        )

    }
}

const styles = StyleSheet.create({

    image: {
        width: 200,
        height: 300,
        margin: 5,
        backgroundColor: 'gray',

    },
    content_container: {
        margin: 5
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingRight: 25,
        paddingLeft: 25
    },
    title_original_text: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 25,
        paddingLeft: 25
    },
    vote_text: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666',

    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666',
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 5,
        textAlign: 'justify'
    },
    description_text_left: {
        fontStyle: 'italic',
        color: '#666666',
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 5,
        textAlign: 'justify',
        alignSelf: 'baseline'
    },
    date_text: {
        fontSize: 14,
        alignSelf: 'baseline',
        marginLeft: 25,
        marginTop: 10
    }
});

export default FilmDetail;

import React, { useState, useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { Alert } from 'react-native';

import Header from '../../components/Header'
import { Container, ListMovies, TouchableOpacity, Text } from './styles';
import { FavoriteItem } from '../../components/FavoritosItem';

import firestore from '@react-native-firebase/firestore'

export function Favoritos() {

    const [movies, setMovies] = useState([])
    const navigation = useNavigation()
    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            List()
        }
    }, [isFocused])

    const List = () => {
        firestore()
            .collection('favoritos')
            .get()
            .then((querySnapshot) => {
                let d = []
                querySnapshot.forEach((doc) => {
                    const favoritos = {
                        id: doc.id,
                        title: doc.data().title,
                    }
                    d.push(favoritos);
                });
                setMovies(d)
            })
            .catch((e) => {
                console.log('favorito, List:' + e)
            })
    }

    function navigateDetailPage(item) {
        navigation.navigate('Detail', { id: item.id })
    }

    function handleDeleteMovie(id) {
        const updatedMovies = movies.filter(movie => movie.id !== id)
        setMovies(updatedMovies)
        firestore().collection('favoritos').doc(id).delete()
    }

    function handleRemoveAllFavorites() {
        Alert.alert(
          'Excluir todos os favoritos',
          'Tem certeza que deseja excluir todos os favoritos?',
          [
            {text: 'Cancelar', style: 'cancel'},
            {text: 'OK', onPress: () => {
              firestore().collection('favoritos').get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  doc.ref.delete().then(() => {
                    console.log("Document successfully deleted!");
                  }).catch((error) => {
                    console.error("Error removing document: ", error);
                  });
                });
              }).then(() => {
                setMovies([]); // define o estado do componente como uma lista vazia
              }).catch((error) => {
                console.error("Error removing documents: ", error);
              });
            }},
          ],
          { cancelable: false }
        );
      }

    

    return (
        <Container>
            <Header title="MEUS FILMES" />
            <ListMovies
                data={movies}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <FavoriteItem
                        movieProps={item}
                        onPressDelete={() => handleDeleteMovie(item.id)}
                        navigatePage={() => navigateDetailPage(item)}
                    />
                )}
            />
              <TouchableOpacity onPress={handleRemoveAllFavorites}>
                   <Text>Apagar Meus Filmes</Text>
                </TouchableOpacity>
        </Container>

    )
}


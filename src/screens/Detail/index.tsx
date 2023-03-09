import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { ScrollView, Modal } from 'react-native'
import {
    Container,
    Title,
    Header,
    HeaderButton,
    Banner,
    Description
} from './styles';
import { api, key } from '../../services/api';
import firestore from '@react-native-firebase/firestore'

type MoviesProps = {
    id: number
    title: string
    overview: string
    vote_average: number
    poster_path: string
    genres: [{ id: number, name: string }],
}


export  function Detail() {


    const navigation = useNavigation();
    const route = useRoute<RouteProp<Record<string, MoviesProps>, string>>();
    const [favoriteMovie, setFavoriteMovie] = useState(false);

    const [movie, setMovie] = useState<MoviesProps>({
        id: 0,
        overview: '',
        title: '',
        poster_path: '',
        vote_average: 0,
        genres: [{ id: 0, name: '' }],
    });

    useEffect(() => {
        let isActive: boolean = true;

        async function getMovie() {
            try {
                const response = await api.get(`/movie/${route.params?.id}`, {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                    }
                })
                if (isActive) {
                    setMovie(response.data)    
                }
            } catch (error){}
        }
        if (isActive) {
            getMovie()
        }
        
    }, [])

     function handleFavoriteMovie(movie: MoviesProps) {

        if(favoriteMovie){ 
            firestore()
            .collection('Favoritos')
            .doc()
            .delete()
        }
        firestore()
        .collection('Favoritos')
        .add({
            movie,
            createdAt: firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            Alert.alert("Produto adicionado com sucesso!")
          })
          
        console.log('você clicou')
    }

    return (
        <Container>
            <Header>
                <HeaderButton>
                    <Feather name="arrow-left" size={28} color="#FFFFFF" onPress={() => navigation.goBack()} />
                </HeaderButton>
                <HeaderButton onPress={() => handleFavoriteMovie(movie)}>
                    <Feather name='bookmark' size={28} color='#FFFFFF' />
                </HeaderButton>
            </Header>

            <Banner
                resizeMethod='resize'
                source={{
                    uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                }}
            />

            <Title numberOfLines={2}>{movie.title}</Title>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Title>Descrição</Title>
                <Description>
                    {movie?.overview}
                </Description>
            </ScrollView>

        </Container>
    )
}
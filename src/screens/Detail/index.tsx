import { ScrollView, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import {
  Container,
  Title,
  Header,
  HeaderButton,
  Banner,
  Description,
} from './styles';
import { api, key } from '../../services/api';
import firestore from '@react-native-firebase/firestore';

interface MovieProps {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

interface ApiResponse {
  data: MovieProps;
}

export function Detail() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<Record<string, MovieProps>, string>>();
  const [movie, setMovie] = useState<MovieProps>({
    id: 0,
    overview: '',
    title: '',
    poster_path: '',
  });
  const [favorites, setFavorites] = useState<boolean>(false);

  useEffect(() => {
    let isActive: boolean = true;

    async function getMovie() {
      try {
        const response: ApiResponse = await api.get(`/movie/${route.params?.id}`, {
          params: {
            api_key: key,
            language: 'pt-BR',
          },
        });
        if (isActive) {
          setMovie(response.data);
          checkIfMovieIsFavorite(response.data.id);
        }
      } catch (error) {
      
      }
    }
    if (isActive) {
      getMovie();
    }
    return () => {
      isActive = false;
    };
  }, []);

  async function checkIfMovieIsFavorite(movieId: number) {
    const documentSnapshot = await firestore()
      .collection('Favoritos')
      .doc(`${movieId}`)
      .get();
    if (documentSnapshot.exists) {
      setFavorites(true);
    }
  }

  function handleToggleFavoriteMovie() {
    if (favorites === true) {
      Alert.alert(
        'Atenção',
        'Este filme já está na sua lista de favoritos!',
        [
          {
            text: 'OK',
            style: 'cancel',
          },
        ]
      );
    } else {
      confirmFavoriteMovie();
    }
  }
  
  function confirmFavoriteMovie() {
    firestore()
      .collection('favoritos')
      .doc(`${movie.id}`)
      .set({
        title: `${movie.title}`,
        id: `${movie.id}`,
      })
      .then(() => {
        setFavorites(true);
        Alert.alert('Sucesso', 'Favoritado com sucesso');
      });
  }
  
  function removeMovieFromFavorites() {
    firestore()
      .collection('favoritos')
      .doc(`${movie.id}`)
      .delete()
      .then(() => {
        setFavorites(false);
        Alert.alert('Sucesso', 'Removido com sucesso');
      });
  }

  return (
    <Container>
      <Header>
        <HeaderButton>
          <Feather name="arrow-left" size={28} color="#FFFFFF" onPress={() => navigation.goBack()} />
        </HeaderButton>
        <HeaderButton onPress={handleToggleFavoriteMovie}>
          <Feather size={28} color='#FFFFFF' name={favorites ? "check" : "plus"}/>
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
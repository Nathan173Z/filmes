import React, { useEffect, useState } from "react";
import { Ionicons, Feather } from '@expo/vector-icons'
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

import {
  Container,
  Title,
  ActionContainer,
  Icon,
  DeleteButton,
} from "./styles";

interface Movie {
  id: string
  overview: string
  poster_path: string
  title: string
  backdrop_path: string
}

interface Props {
  movieProps?: Movie
  onPressDelete: () => void
}

function useFirestoreMovieTitle(movieId: string): string {
  const [title, setTitle] = useState('');

  useEffect(() => {
    const unsubscribe = firestore().collection('favoritos').doc(movieId)
      .onSnapshot((doc) => {
        setTitle(doc?.data()?.title || '');
      });

    return unsubscribe;
  }, [movieId]);

  return title;
}

export function FavoriteItem({ movieProps, onPressDelete }: Props) {
  const navigation = useNavigation();

  if (!movieProps) {
    return null; // or some other fallback
  }

  const title = useFirestoreMovieTitle(movieProps.id);

  function navigateToDetail() {
    navigation.navigate('Detail');
  }

  function handleDelete() {
    Alert.alert(
      'Excluir item',
      'Tem certeza que deseja excluir este item?',
      [
        {text: 'Cancelar', style: 'cancel'},
        {text: 'Excluir', onPress: onPressDelete},
      ],
      {cancelable: false},
    );
  }

  return (
    <Container>
      <Title size={22}>{title}</Title>
      <ActionContainer>
        <DeleteButton onPress={handleDelete}>
          <Icon name="trash" />
        </DeleteButton>
      </ActionContainer>
    </Container>
  );
}

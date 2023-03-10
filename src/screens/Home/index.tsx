import React, { useState, useEffect } from 'react'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import { ScrollView, } from 'react-native';
import firestore from '@react-native-firebase/firestore'

import {
    Container,
    SearchContainer,
    Input,
    SearchButton,
    Title,
    SliderMovie,
} from './styles';


type MoviesProps = {
    id: number
    title: string
    overview: string
    vote_average: number
    poster_path: string
    genres: [{ id: number, name: string }],
}


export function Home() {
    const [input, setInput] = useState('');
    const navigation = useNavigation();

    const [ todo, setTodo ] = useState('FOI SOU FODA');
    const ref = firestore().collection('favoritos');

    async function addTodo() {
        await ref.add({
          title: todo,
          complete: false,
        });
        setTodo('');
      }

    function handleSearchMovie() {
        if (input === '') return;
        navigation.navigate('Search', { name: input })
        setInput('')
    }


    return (
        <Container>
            <Header title="BUSCAR FILMES" />
            <SearchContainer>
                <Input
                    placeholder="Qual Filme Você Procura?"
                    placeholderTextColor="#ffffff"
                    value={input}
                    onChangeText={(text: string) => setInput(text)}
                />
                <SearchButton onPress={handleSearchMovie}>
                    <Feather name="search" size={38} color="#FFFFFF" />
                </SearchButton>
            </SearchContainer>       

            <ScrollView>
                <Title>
                    Em Cartaz
                </Title>
                <SliderMovie source={{uri:'https://www.ioccaruaru.com.br/img/em_breve.jpg'}}/>

                <Title>Populares</Title>
                <SliderMovie source={{uri:'https://www.ioccaruaru.com.br/img/em_breve.jpg'}}/>

                <Title>Mais Votados</Title>
                <SliderMovie source={{uri:'https://www.ioccaruaru.com.br/img/em_breve.jpg'}}/>
                   
                 
            </ScrollView>
        </Container>
    )
}
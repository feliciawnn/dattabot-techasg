import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, TextInput, View, Button, Alert, ScrollView, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native'; 
// import PokemonCard from './PokemonCard';

function Item({ title }) {
    return (
      <TouchableOpacity style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    );
  }

function fetchMoreData(nextUrl){
    fetch(nextUrl)
    .then(res => res.json())
    .then((json) => {
        setPokelist(json.results)
        setNextUrl(json.next)
        setIsLoading(false)
    });
}

export default function PokemonLibrary(){
    const [nextUrl, setNextUrl] = useState()
    const [pokelist, setPokelist] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=1279/') // hardcoded 
        .then(res => res.json())
        .then((json) => {
            setPokelist(json.results)
            setNextUrl(json.next)
            setIsLoading(false)
        });
      }, [])
    

    if(!isLoading) {
        return <FlatList 
                data={pokelist}
                renderItem={({ item }) => <Item title={(item.name).toUpperCase()} />}
                keyExtractor={(item) => item.name} 
                onEndReached={fetchMoreData(nextUrl)}
                onEndReachedThreshold={0.2}
                />
    } else {
        return <ActivityIndicator />
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      backgroundColor: '#fff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 8,
    },
    title: {
      fontSize: 20,
      textAlign: 'center',
    },
  });
import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, TextInput, View, Button, Alert, ScrollView, FlatList, ActivityIndicator, TouchableOpacity, Modal, Pressable} from 'react-native'; 
// import PokemonCard from './PokemonCard';

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
    const [pressPokemon, setPressPokemon] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [pokemonData, setPokemonData] = useState(null)

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=1279/') // hardcoded 
        .then(res => res.json())
        .then((json) => {
            setPokelist(json.results)
            setNextUrl(json.next)
            setIsLoading(false)
        })
        .catch(err=>
            console.log(err));
    }, [])

    function Item({ title, item }) {
        return (
          <TouchableOpacity style={styles.item} onPress={() => onPressItem(item)}>
            <Text style={styles.title}>{title}</Text>
          </TouchableOpacity>
        );
    }

    function PokemonModal(){
        var pokeStats = []
        // const pokeS
        const [pokeData, setPokeData] = useState('')
        console.log(pressPokemon.url, "masukkk")
        var item = pressPokemon

        fetch(item.url)
        .then(res => res.json())
        .then((pokemon) => {
            // console.log(Object.keys(pokemon))
            return setPokeData(pokemon)
            pokeStats = pokemon.stats.stat
            console.log("DISANA", pokeStats)
            // return test(pokeData ={pokemon})
        })
        .catch(err =>
            console.log(err))

        // console.log("DISINI", pokeStats)
        console.log(pokeData.stats)
        
        return(
            <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={() => { setModalVisible(!isModalVisible) }}>
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{pokeData.name}</Text>
                    <Text>Base Exp: {pokeData.base_experience}</Text>
                    <Text>Weight: {pokeData.weight}</Text>
                    <Text>Height: {pokeData.height}</Text>
                    {/* {pokeData.stats ? <Text>ada {pokeData.stats.base_stat}</Text> : <Text>gaada</Text>} */}
                    {/* <Text>{pokeData.stats}</Text> */}
                    {/* {(pokeData.stats).map((statItem => <Text>{statItem}</Text>))} */}
                    {/* {console.log(pokeStats.length)} */}
                    <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setIsModalVisible(!isModalVisible)}>
                        <Text style={styles.textStyle}>Close</Text>
                    </Pressable>
                </View>
                </View>
            </Modal>
        )
    }
    
    function onPressItem(item){
        setPressPokemon(item)
        setIsModalVisible(true)
        console.log(item, "MODAL OPEN")
    }

    if(!isLoading) {
        return (
        <View style={styles.container}>
            <FlatList 
                    data={pokelist}
                    renderItem={({ item }) => <Item title={(item.name).toUpperCase()} item={item} />}
                    keyExtractor={(item) => item.name} 
                    onEndReached={fetchMoreData(nextUrl)}
                    onEndReachedThreshold={0.2}
            />

            <PokemonModal />
        </View>
        )
    } else {
        return <ActivityIndicator />
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 48,
    },
    modalView: {
        margin: 20,
        marginTop: 100,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        marginVertical:8,
        backgroundColor: '#6D6875',
    },
    textStyle:{
        paddingHorizontal: 24,
        color: '#fff',
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
import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, Pressable, Modal, Image } from 'react-native'
import PokemonCard from './PokemonCard'

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function RandomPokemon(){
    const [pokeCount, setPokeCount] = useState(0)
    const [pokemon, setPokemon] = useState()
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => { // Change from hardcode
        fetch('https://pokeapi.co/api/v2/pokemon/') 
        .then(res => res.json())
        .then((json) => {
            setPokeCount(json.count)
            console.log("SDLFJSLDFJLS", pokeCount)
        });
        
        // initialize pokemon
        fetch('https://pokeapi.co/api/v2/pokemon/'+ 1+'/')
        .then((res)=>(res.json()))
        .then((item) => setPokemon(item))

        setIsLoading(false)
    }, [])


    function getRandomPokemon(){
        setIsLoading(true)
        var randIndex = Math.floor(Math.random() * pokeCount) + 1// total num of pokemons

        fetch('https://pokeapi.co/api/v2/pokemon/'+ randIndex+'/')
        .then((res)=>(res.json()))
        .then((item) => {
            setPokemon(item)
            setModalVisible(true)})

        console.log(randIndex, "randomizer")

        setIsLoading(false)
        
    }

    if(!isLoading){
        return(
            <View>
                <Text>Please wait...</Text>
            </View>
        )
    }
    else{
        return(
            <View>
                <View style={styles.titleContainer}>
                    <Text style={styles.pageTitle}>Gotta Catch Them All</Text>
                    <Text style={styles.pageSubtitle}>Press the button below and decide whether you want to keep your new friend or release them to the wild.</Text>
                </View>

                {console.log('oioi', pokeCount)}

                <Pressable  style={styles.loginBtn} onPress={() => getRandomPokemon()}>
                    <Text style={styles.textCenter}>Get A Pokemon</Text>
                </Pressable>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    console.log('Modal has been closed.');
                    setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                            {/* TODO: make fetch random before showing modal done. */}
                            <Text>#{pokemon.id}{'\n'}</Text>
                            <Text>{capitalize(pokemon.name)}{'\n'}</Text>
                            {/* <Text>{pokemon.moves}</Text>
                            {/* {Object.keys(pokemon.stats).map((stat)=> <Text>{stat}{'\n'}</Text>)} */}
                            {/* <Text>{pokemon.stats}</Text> */}
                            {/* {(Object.keys(pokemon).map(pokeKey => <Text>{pokeKey}{'\n'}</Text>))} */}
                        </Text>
                        <View style={styles.modalBtnContainer}>
                            <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Release To Wild</Text>
                            </Pressable>
                            <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            {/* <Text style={styles.textStyle}>Keep {capitalize(pokemon.name)}</Text> */}
                            </Pressable>
                        </View>
                    </View>
                    </View>
                </Modal>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleContainer: {
        marginHorizontal: 24,
    },
    pageTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 12,
    },
    pageSubtitle: {
        textAlign: 'center',
    },
    loginBtn: {
        marginTop: 24,
        marginHorizontal: 12,
        padding: 16,
        backgroundColor: '#68818d',
        borderRadius: 8,
      },
    textCenter: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 16,
    },
    modalView: {
        margin: 20,
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
        padding: 12,
        elevation: 2,
        marginHorizontal: 8,
      },
      modalBtnContainer: {
        display: 'flex',
        flexDirection: 'row',
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
})
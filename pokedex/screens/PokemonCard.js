import React from 'react'
import {TouchableOpacity, View, Text} from 'react-native'

export default function PokemonCard(pokemon){
    <View>
        <TouchableOpacity>
            <View>
                <Text>
                    {pokemon.name}
                </Text>
            </View>
        </TouchableOpacity>
    </View>
}
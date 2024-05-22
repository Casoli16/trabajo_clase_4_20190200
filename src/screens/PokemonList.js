import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TextInput, ActivityIndicator } from 'react-native';



const WIDTH = Dimensions.get('window').width;
const numColumns = 3;

import PokemonItem from '../components/PokemonItem';
import FormularioPokemon from '../components/FormularioPokemon';
import InputName from '../components/InputName';

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cantidadPokemon, setCantidadPokemon] = useState(10);
  const [nombrePokemon, setPokemonNombre]= useState(); //Guardara lo que se escriba en el input

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${cantidadPokemon}`);
      const data = await response.json();

      //Accedemos al endpoint que trae la descripción de los pokemons
      const responseDescription = await Promise.all(
        data.results.map(async (result,index) => {
          //Le pasamos el nombre del pokemon para que busque la descripción según el id del pokemón
          const pokemonDetails = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${result.name}`);
          //Convertimos a json.
          const detailsData = await pokemonDetails.json();

          //Permite cambiar el idioma de la descripción
          const descripcionEspa = detailsData.flavor_text_entries.find(
            (entry) => entry.language.name === 'es'
          );

          //Obtenemos el id que nos ayudara a mostrar la imagen
          const id = index + 1;

          //Accedemos a la informacion que necesitamos.
          return {
            ...result,   
            id: id,  
            name: result.name, 
            description: descripcionEspa?.flavor_text,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
          };
        })
      );

      //Pasamos la informacion obtenida a nuestro arreglo.
      setPokemon(responseDescription);

    } catch (error) {
      console.log("Hubo un error listando los pokemones", error);
    } finally {
      setLoading(false);
    }
  };

   // Utilizar useEffect para ejecutar fetchData cuando cambia cantidadPokemon
  useEffect(() => {
    fetchData();
  }, [cantidadPokemon]);

  // Función para filtrar Pokemon por nombre
  const searchPokemon = (searchName) => {
    if (!searchName) {
      return pokemon;
    }
    // Si no hay término de búsqueda, devolver todos los Pokemon
    return pokemon.filter((item) => item.name.toLowerCase().includes(searchName.toLowerCase()));
  };

  return (
    <View style={styles.container}>
      <FormularioPokemon
        tituloFormulario='Listado de Pokemones usando Fetch'
        labelInput='Ingrese la cantidad de pokemon a cargar: '
        placeHolderInput='20'
        valor={cantidadPokemon}
        setValor={setCantidadPokemon}
      />
       {/* Componente InputName para ingresar el término de búsqueda */}
      <InputName
        labelInput='Escribe el nombre del pokemon que quieres buscar'
        valor={(text) => setPokemonNombre(text)}
        placeholder='Escribe un nombre'
      />
      {loading ? (
        <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={searchPokemon(nombrePokemon)} // // Filtrar datos según el término de búsqueda
          renderItem={({ item }) => <PokemonItem item={item} />}
          keyExtractor={(item) => item.name}
          numColumns={numColumns}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  list: {
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    margin: 5,
    width: WIDTH / numColumns - 10,
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    textTransform: 'capitalize',
  },
  image: {
    width: 80,
    height: 80,
  },
  loading: {
    marginTop: 20,
  },
});

import { View, Text, ImageBackground, StyleSheet, Dimensions, SafeAreaView, TextInput, ActivityIndicator } from 'react-native';
import React, {useState} from 'react';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios'; 
import One from '../../assets/1sum.png';
import Two from '../../assets/2aut.png';
import Three from '../../assets/3hiv.png';
import Four from '../../assets/4prin.png';

const images = [One, Two, Three, Four];

const Home = () => {

  const [city, setCity] = useState('');

  const [weather, setWeather]: any = useState({});
  const [loading, setLoading] = useState(false);
  const [randomImage, setRandomImage] = useState(images[0]);
  const [quote, setQuote]: any = useState({});

  
// appel de l'API du meteo et de la citation
  const getWeather = async () => {
    // verification que l'entree n'est pas vide
    if (!city.trim()) return;
    setLoading(true);
    console.log('hna 1');

    // tentative d'appel de l'API de la citation
    try{
      const qt = await axios.get('https://quotable.io/random');
      console.log('hna');
      setQuote(qt.data);
      console.log(quote);
    }catch(error){
      console.log(error);
    }

    // tentative d'appel de l'API du meteo
    try{
      console.log('fost try')
      const res = await axios.get('https://api.openweathermap.org/data/2.5/weather?q='+ city +'&units=metric&appid=145150384e76ea94f7d1a2a0139501e0');
      setWeather(res.data);
      const n = Math.floor(Math.random() * images.length);
      setRandomImage(images[n]);
      setLoading(false);
      
    }catch(error){
      alert('Veuillez vérifier la ville que vous avez tappée');
      setLoading(false);
    }
  }

  return (
    <ImageBackground source={randomImage as any} style={styles.image}>
      <SafeAreaView style={{flex:1}}>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            value={city}
            placeholder="Tappez votre ville"
            onChangeText={(text)=> setCity(text)}
          />
          {/* On verfie si l'appel est entrain de s'executer pour monter l'indicateur ou l'icone */}
          { loading ? <ActivityIndicator size="small" color='#212121'/> : <AntDesign
          onPress={getWeather}
          name="check" size={24} color="black" />
          }
          
          
        </View>
          {/* On verifie qu'on recu des donnees dans notre parametre sinon le rendu est nul */}
        {Object.keys(weather).length > 0 ?  
        <>
        <View style={styles.locationContainer}>
          <Text style={styles.location}>
            {weather.name}, {weather.sys.country}
          </Text>
        </View>
        
        <View style={styles.weatherContainer}>
          <Text style={styles.temp}>
            {Math.round(weather.main.temp)} C
          </Text>
          <Text style={styles.weather}>
            {weather.weather[0].main}
            </Text>
        </View>
        <View>
        <Text style={styles.quote}>
            "{quote.content}"
        </Text>
        <Text style={styles.quote}>
            {quote.author}
        </Text>
        </View>
        </>
        : null}
        
        
        
        

      </SafeAreaView> 
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  textInput: {
    height: 40,
    fontWeight: '600',

  },
  textInputContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:50,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    width: '70%',
  },
  locationContainer:{
    marginVertical: 15,
  },
  location:{
    color: '#FFFFFF',
    fontSize: 35,
    fontWeight: '500',
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.55)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  weatherContainer:{
    alignItems: 'center',
  },
  temp:{
    textAlign: 'center',
    color: '#FFF',
    fontSize: 100,
    fontWeight: '800',
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingVertical: 20,
    paddingHorizontal:30,
    borderRadius:20,
    overflow: 'hidden',
    marginTop: 10,
    textShadowColor: "rgba(0, 0, 0, 0.55)",
    textShadowOffset: { width: -3, height: 3 },
    textShadowRadius: 5,
  },
  weather:{
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '700',    
    textShadowColor: "#000000",
    textShadowOffset: { width: -1, height: 3 },
    shadowOpacity: 0.7,
    marginBottom:50
  },
  quote:{
    textAlign: "center",
    color: '#FFFFFF',
    fontSize: 18,
    // marginTop: 50,
    fontWeight: '500',    
    textShadowColor: "#000000",
    textShadowOffset: { width: -1, height: 3 },
    shadowOpacity: 0.7,
  },
})
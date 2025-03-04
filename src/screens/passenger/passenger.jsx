import {
  ActivityIndicator,
  ActivityIndicatorBase,
  Text,
  TextInput,
  View,
  Button,
} from "react-native";
import MyButton from "../../components/mybutton/mybutton.jsx";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { styles } from "./passenger.style.js";
import icons from "../../constants/icons.js";
import { useEffect, useState } from "react";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
  reverseGeocodeAsync,
} from "expo-location";

export default function Passenger(props) {
  // const [myLocation, setMyLocation] = useState({
  //   latitude: 20,
  //   longitude: 20,
  // });

  const [myLocation, setMyLocation] = useState({});
  const [title, setTitle] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [pickupAddressResumed, setPickupAddressResumed] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState("");

  async function RequestRideFromUser() {
    //acesso a dados na nossa API

    //simulando
    const response = {};

    // const response = {
    //   ride_id: 1,
    //   passenger_user_id: 1,
    //   passenger_name: "Heber Stein Mazutti",
    //   passenger_phone: "(11) 99999-9999",
    //   pickup_address: "Praça Charles Miller - Pacaembu",
    //   pickup_date: "2025-02-19",
    //   pickup_latitude: "-23.543132",
    //   pickup_longitude: "-46.665389",
    //   dropoff_address: "Shopping Center Norte",
    //   status: "P",//PENDENTE
    //   driver_user_id: null,
    //   driver_name: null,
    //   driver_phone: null
    // }

    return response;
  }

  async function RequestPermissionAndGetLocation() {
    const { granted } = await requestForegroundPermissionsAsync();

    return_location = {};
    if (granted == true) {
      const currentPosition = await getCurrentPositionAsync();
      if (currentPosition.coords.latitude) {
        return_location = currentPosition.coords;
      }
    }

    return return_location;
  }

  async function RequestAddressName(lat, long) {
    //const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=API_KEY`);
    //const data = await response.json();

    //TRÁS OS DADOS DE ENDEREÇO PELA LATITUDE E LOGITUDE
    const response = await reverseGeocodeAsync({
      latitude: lat,
      longitude: long,
    });

    // console.log(response[0]);
    if (
      response[0].street &&
      response[0].streetNumber &&
      response[0].district
    ) {
      // setPickupAddress( + " - " + response[0].district);
      setPickupAddress(response[0].formattedAddress);
      setPickupAddressResumed(
        response[0].street + ", " + response[0].streetNumber
      );
    }
  }

  async function LoadScreen() {
    //buscar dados de corrida aberta na API para o usuario

    //promisse é um conceito de aguardar para devolver (await)
    //sempre com await tem que colocar async na function
    const response = await RequestRideFromUser();

    if (!response.ride_id) {
      // const location = {latitude:-23.561747,longitude:-46.656244};//fictício para busca de localização

      const location = await RequestPermissionAndGetLocation();

      if (location.latitude) {
        setTitle("Encontre a sua carona agora");
        setMyLocation(location);
        RequestAddressName(location.latitude, location.longitude);
      } else {
        Alert.alert("Não foi possível obter sua localização!");
      }
    } else {
      setTitle("");
    }

    // console.log(response);
  }


  //toda vez que acessar, acessa esta tela
  useEffect(() => {
    LoadScreen();
  }, []);

  return (
    <View style={styles.container}>
      {myLocation.latitude ? (
        <>
          <MapView
            style={styles.map}
            provider={PROVIDER_DEFAULT}
            initialRegion={{
              latitude: myLocation.latitude, // -23.561747,
              longitude: myLocation.longitude, // -46.656244,
              latitudeDelta: 0.0722,
              longitudeDelta: 0.0221,
            }}
          >
            <Marker
              coordinate={{
                latitude: myLocation.latitude,
                longitude: myLocation.longitude,
              }}
              title="Heber Stein Mazuttis"
              description={pickupAddressResumed}
              image={icons.location}
              style={styles.marker}
            />
          </MapView>
          
          <View style={styles.footer}>
            <View style={styles.footerText}>
              <Text>{title}</Text>
            </View>
            <View style={styles.footerFields}>
              <Text>Origem</Text>
              <TextInput style={styles.input} value={pickupAddress} />
            </View>
            <View style={styles.footerFields}>
              <Text>Destino</Text>
              <TextInput style={styles.input} value={dropoffAddress} />
            </View>
          </View>
          <MyButton text="CONFIRMAR" style="text" theme="default" />
        </>
      ) : (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
}

{
  /* <View style={styles.footerFields}>  
        <Text>Motorista</Text>
        <TextInput style={styles.input} />
      </View> */
}

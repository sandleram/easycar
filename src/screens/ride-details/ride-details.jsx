import { Text, TextInput, View } from "react-native";
import MyButton from "../../components/mybutton/mybutton.jsx";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { styles } from "./ride_details.style.js";
import icons from "../../constants/icons.js";
import { useEffect, useState } from "react";

export default function RideDetails(props) {
  const [myLocation, setMyLocation] = useState({
    latitude: 20,
    longitude: 20,
  });


  // const rideId = props.route.params.rideId;
  // const userId = props.route.params.userId;
  // const [title,setTitle] = useState("");
  // const [ride,setRide] = useState({});

  async function RequestRideDetail() {

  }

  // async function AcceptRide() {
  //   const json = {
  //     driver_user_id: userId,
  //     ride_id: rideId,
  //   };

  //   console.log("Aceitar",json);
  //   props.navigation.goBack();
  // }

  // async function CancelRide() {
  //   const json = {
  //     driver_user_id: userId,
  //     ride_id: rideId,
  //   };

  //   console.log("Cancelar",json);
  //   props.navigation.goBack();
  // }

  // useEffect(() => {
  //   RequestRideDetail();
  // },[]);



  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={{
          latitude: -23.561747,
          longitude: -46.656244,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: -23.561747,
            longitude: -46.656244,
          }}
          title="Heber Stein Mazuttis"
          description="Av. Paulista,1500"
          image={icons.location}
          style={styles.marker}
        />
      </MapView>
      <View style={styles.footer}>
        <View style={styles.footerText}>
          <Text>Chave: {props.key_ride}</Text>
        </View>
        <View style={styles.footerFields}>
          <Text>Origem</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.footerFields}>
          <Text>Destino</Text>
          <TextInput style={styles.input} />
        </View>
      </View>
      <MyButton text="ACEITAR" style="text" theme="default" />
    </View>
  );
}

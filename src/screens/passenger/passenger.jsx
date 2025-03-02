import { Text, TextInput, View } from "react-native";
import MyButton from "../../components/mybutton/mybutton.jsx";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { styles } from "./passenger.style.js";
import icons from "../../constants/icons.js";
import { useState } from "react";

export default function Passenger(props) {
  const [myLocation, setMyLocation] = useState({
    latitude: 20,
    longitude: 20,
  });

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
          <Text>Encontre a sua carona</Text>
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
      <MyButton text="Confirmar" style="text" theme="red" />
    </View>
  );
}

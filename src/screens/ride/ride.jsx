import { FlatList, Text, TouchableOpacity, View, Image, Alert } from "react-native";
import MyButton from "../../components/mybutton/mybutton.jsx";
import styles from "./ride.style.js";
import { json_rides } from "../../constants/dados.js";
import icons from "../../constants/icons.js";

export default function Ride(props) {



  function OpenRideDetails(id) {
    console.log("teste: ", id);
    props.navigation.navigate("ride-details");
    // Alert.alert("teste");
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        data={json_rides}
        keyExtractor={(ride) => ride.ride_id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.ride} onPress={() => OpenRideDetails(item.ride_id)} >
              <View style={styles.containerName}>
                <Image source={icons.car} style={styles.car} />
                <Text style={styles.name}>{item.passenger_name}</Text>
              </View>
              <View style={styles.containerAdrress}>
                <Text style={styles.address}>Origem: {item.pickup_address}</Text>
                <Text style={styles.address}>Destino: {item.dropoff_address}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

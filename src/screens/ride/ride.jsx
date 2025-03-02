import { Text } from "react-native";
import MyButton from "../../components/mybutton/mybutton.jsx";
import styles from "./ride.style.js";

export default function Ride(props) {
  return (
    <>
      <Text>Tela Ride</Text>
      <Text>Lista</Text>
      <MyButton text="Selecionar" style="text" />
    </>
  );
}

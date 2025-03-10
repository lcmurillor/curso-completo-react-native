import { StyleSheet, Text, View } from 'react-native';
import Animacion1 from './components/animacion1';
import Animacion2 from './components/animacion2';
import Animacion3 from './components/animacion3';
import Animacion4 from './components/animacion4';
import Animacion5 from './components/animacion5';
import Animacion6 from './components/animacion6';
import Animacion7 from './components/animacion7';

export default function App() {
  return (
    <>
    <View style = {styles.contenido}
     >
      <Animacion7></Animacion7>
     </View>
    </>
  );
}

const styles = StyleSheet.create({
  contenido: {
    marginTop: 100,
  }
});

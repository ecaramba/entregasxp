import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider  } from 'react-native-safe-area-context';

import { Header, Icon } from '@rneui/themed';


const css = StyleSheet.create({
  header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    paddingTop: 4
  }
});

/*
 status: ROTA, ATRASADO, ENTREGUE, NAORECEBIDO
*/

const listagem = [{
  ordem_servico: "1234",
  cliente: "João do feijão",
  endereco: "Rua das flores, 123",
  status: "ROTA",
  produto: "caneca",
  nota_fiscal: 3212
},
{
  ordem_servico: "4321",
  cliente: "João do feijão",
  endereco: "Rua das flores, 123",
  status: "ATRASADO",
  produto: "caneca",
  nota_fiscal: 3212
},
{
  ordem_servico: "2211",
  cliente: "João do feijão",
  endereco: "Rua das flores, 123",
  status: "ENTREGUE",
  produto: "caneca",
  nota_fiscal: 3212
}
];

export default function App() {
  return (
    <SafeAreaProvider >
        <Header 
          leftComponent={{ 
            icon:'menu',
            color: "#fff" 
          }}

          centerComponent={{
            text: "José da Silva",
            style: css.header
          }}
        />
      
      <View style={styles.container}>

        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

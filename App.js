import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider  } from 'react-native-safe-area-context';

import { 
    Header,
    Icon,
    ListItem,
    Button
  } from '@rneui/themed';
import { useState } from 'react';




/*
 status: ROTA, ATRASADO, ENTREGUE, NAORECEBIDO
*/

const listagem = [{
  ordem_servico: "1234",
  cliente: "João do feijão",
  endereco: "Rua das flores, 123",
  status: "ROTA",
  produto: "caneca",
  nota_fiscal: 3212,
  exibe: false

},
{
  ordem_servico: "4321",
  cliente: "João do feijão",
  endereco: "Rua das flores, 123",
  status: "ATRASADO",
  produto: "caneca",
  nota_fiscal: 3212,
  exibe: true
},
{
  ordem_servico: "2211",
  cliente: "João do feijão",
  endereco: "Rua das flores, 123",
  status: "ENTREGUE",
  produto: "caneca",
  nota_fiscal: 3212,
  exibe: false
}
];

export default function App() {

  const [listaEntrega, setListaEntrega] = useState(listagem);

  function telaConfirmar()
  {
    console.log("tela")
  }

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
      
      {listaEntrega.map((item, idx) => {
        return (
          <ListItem.Accordion key={idx}
            content={
              <>
                <ListItem.Content>
                  <ListItem.Title>OS: {item. ordem_servico}</ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={item.exibe}

            onPress={()=>{
              listaEntrega[idx].exibe = !listaEntrega[idx].exibe

              setListaEntrega([...listaEntrega])
              console.log("clicou")
            }}
          >

            <View style={css.detalheEntrega}>
              <Text>Cliente: {item.cliente} </Text>
              <Text>Endereço: {item.endereco} </Text>
              <Text>Nota Fiscal: {item.nota_fiscal} </Text>
              <Text>Produto: {item.produto} </Text>

              <Button title="Confirmar a Entrega" 
                color="success" 
                onPress={telaConfirmar}
                style={css.btnConfirmarEntrega} />
            </View>
            
          </ListItem.Accordion>
      )}
      )}

    </SafeAreaProvider >
  );
}

const css = StyleSheet.create({
  header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    paddingTop: 4
  },
  detalheEntrega: {
    padding: 6,
    paddingLeft: 20
  },
  btnConfirmarEntrega: {
    marginTop: 20
  }
});

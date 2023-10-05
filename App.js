import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider  } from 'react-native-safe-area-context';

import { 
    Header,
    Icon,
    Tab,
    ListItem,
    Button
  } from '@rneui/themed';
import { useEffect, useState } from 'react';

import {
  collection,
  getDocs,
  query,
  where,
  getFirestore
} from 'firebase/firestore'
import firebaseApp from './firebase'

const db = getFirestore(firebaseApp);


/*
 status: ROTA, ATRASADO, ENTREGUE, NAORECEBIDO
*/

export default function App() {

  const [listaEntrega, setListaEntrega] = useState([]);
  const [statusSelecionado, setStatus] = useState(0);

  //enum
  const status = ["ROTA", "ATRASADO", "ENTREGUE", "NAORECEBIDO"]

  function telaConfirmar()
  {
    console.log("tela")
  }

  async function lerDados(sel){

    listaEntrega.length = 0;
    const q = query(collection(db, "entregas"), where("status", "==", status[sel]))
    const retorno = await getDocs(q);
    retorno.forEach((item) => {
      let dados = item.data();
      dados.exibe = false;
      listaEntrega.push(dados)

      setListaEntrega([...listaEntrega]);
    })
  }

  useEffect( () => {
    lerDados(0);
  }, [])

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

      <Tab value={statusSelecionado} onChange={(valor)=>{
        setStatus(valor);
        lerDados(valor);
        
      }} dense>
          <Tab.Item>Rota</Tab.Item>
          <Tab.Item>Atrasado</Tab.Item>
          <Tab.Item>Entregue</Tab.Item>
          <Tab.Item>Não Recebido</Tab.Item>
      </Tab>  
      
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

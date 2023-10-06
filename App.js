import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider  } from 'react-native-safe-area-context';

import { 
    Header,
    Icon,
    Tab,
    ListItem,
    Dialog,
    CheckBox,
    Button
  } from '@rneui/themed';
import { useEffect, useState } from 'react';

import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  GeoPoint,
  doc,
  getFirestore
} from 'firebase/firestore'
import firebaseApp from './firebase'

import * as Location from 'expo-location';

const db = getFirestore(firebaseApp);


/*
 status: ROTA, ATRASADO, ENTREGUE, NAORECEBIDO
*/

export default function App() {

  const [listaEntrega, setListaEntrega] = useState([]);
  const [statusSelecionado, setStatus] = useState(0);
  const [exibeDialog, setExibe] = useState(false);
  const [entregue, setEntregue] = useState(false);
  const [location, setLocation] = useState(null);
  const [permissao, setPermissao] = useState(false);
  const [selecionado, setSelecionado] = useState(null);

  //enum
  const status = ["ROTA", "ATRASADO", "ENTREGUE", "NAORECEBIDO"]

  async function telaConfirmar()
  {
    console.log("tela")
    setExibe(true);
    let geo = await Location.getCurrentPositionAsync();
    console.log(geo);
    setLocation(geo);

    await updateDoc(doc(db, "entregas", selecionado), {
      location: new GeoPoint(geo.coords.latitude, geo.coords.longitude)
    })

  }

  function tirarFoto(){
    console.log("foto");
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

    async function permissao()
    {
      const geolocation = await Location.getBackgroundPermissionsAsync();
      if (geolocation.status == "granted")
      {
        setPermissao(true);
      }
    }

    permissao();

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
              setSelecionado(item.ordem_servico)
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

      <Dialog isVisible={exibeDialog}>
        <Dialog.Title title='Confirmar a entrega'/>
            <CheckBox 
              title="Entregue" 
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={entregue === true} 
              onPress={()=> {
              setEntregue(true)
              console.log("sim")
              }} />
            <CheckBox 
              title="Não Entregue" 
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={entregue === false} 
              onPress={()=> {
              setEntregue(false)
              console.log("nao")
              }} />

            <Button title="Tirar Foto" onPress={tirarFoto}/>

        <Dialog.Actions>
          <Dialog.Button title="Confirmar" color='success'/>
          <Dialog.Button title="Cancelar" onPress={() => setExibe(false)} />
        </Dialog.Actions>
      </Dialog>

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

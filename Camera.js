import { View, 
    StyleSheet, 
    Text,
    Pressable,
    Alert,
    Dimensions } from "react-native"

import { Camera as CameraAndroid } from "expo-camera"
import { useEffect, useRef } from "react"

import { getStorage, ref, uploadBytes }  from "firebase/storage"
import firebaseApp from "./firebase"

const storage = getStorage(firebaseApp);

export default function Camera(props)
{
    const cameraRef = useRef(null);

    useEffect(() => {
        
        async function permissao()
        {
            let permissao = await CameraAndroid.requestCameraPermissionsAsync();
            console.log(permissao)
        }

        permissao();

    }, []);

    async function tirarFoto()
    {
        let imagem = await cameraRef.current.takePictureAsync();
        console.log(imagem)
        Alert.alert( JSON.stringify(imagem) );
        
        
        const leitor = new FileReader();
        leitor.readAsDataURL(imagem.uri);
        leitor.onload = async () => {
            const arquivo = leitor.result;
            const foto = ref(storage, "entrega-os1234.jpg");
            await uploadBytes(foto, arquivo);
            
        }
        props.exibe(false);



    }

    return (
        <>
            <CameraAndroid style={css.tela} ref={cameraRef}>
                <View >
                    <Pressable  style={css.btn} onPress={tirarFoto} />
                </View>
            </CameraAndroid>                
        </>
    )
}

const css = StyleSheet.create({
    tela: {
        backgroundColor: "#000",
        flex: 1,
        width:Dimensions.get("window").width,
        height:Dimensions.get("window").height,
        position: "absolute",
        top:0,
        zIndex:200,
        alignItems:"center",
        justifyContent: "flex-end"
    },
    btn: {
        width: 80,
        height: 80,
        backgroundColor: "#fff",
        bottom: 40,
        borderRadius: 40
    }
})
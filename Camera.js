import { View, 
    StyleSheet, 
    Text,
    Pressable,
    Dimensions } from "react-native"

import { Camera as CameraAndroid } from "expo-camera"
import { useEffect } from "react"

export default function Camera()
{
    useEffect(() => {
        
        async function permissao()
        {
            let permissao = await CameraAndroid.getCameraPermissionsAsync();
            console.log(permissao)
        }

        permissao();

    }, []);

    return (
        <>
            <View style={css.tela}>
                
                <Pressable  style={css.btn} />
            </View>
        </>
    )
}

const css = StyleSheet.create({
    tela: {
        backgroundColor: "red",
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
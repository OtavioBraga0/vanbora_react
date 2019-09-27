import React, { useState } from "react";
import { StyleSheet, Button, Text, TextInput, View, AsyncStorage } from "react-native";
import FirebaseService from "../service/FirebaseService";

const PerfilScreen = ({navigation}) => {
    const [key, setKey] = useState("");
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [tipo, setTipo] = useState("");
    const [grupo, setGrupo] = useState(null);

    navigationOptions = {
        title: 'Perfil',
    };

    const init = async () => {
        const key = await AsyncStorage.getItem("@Usuario:key");
        FirebaseService.getDataWithKey("usuario",key, (dataIn) => this.setState(dataIn[0]));        
    }

    submit = async () => {
        if (telefone == "" && nome == "") {
            alert("Preencha todos os campos!");
        } else {
            try {
                let obj = {
                    "nome": nome,
                    "telefone": telefone,
                    "tipo": tipo,
                    "grupo": grupo,
                }
                FirebaseService.changeValues(`usuario/${key}`, obj)

                alert("Perfil atualizado!")
                navigation.goBack();
            } catch (error) {
                alert("Erro de conexão")
            }
        }
    };

    init();
    return(
        <View style={{marginHorizontal: 15}}>
            <Text>Nome</Text>
            <TextInput
                style={styles.input}
                value={nome}
                required
                onChangeText={(value) => setNome(value)}/>
            <Text>Telefone</Text>
            <TextInput
                style={styles.input}
                value={telefone}
                required
                onChangeText={(value) => setTelefone(value)}/>
            <Button 
                type="button"
                title="Cadastrar"
                onPress={() => submit()}
                style={{marginTop: '20px', display: 'inline-block'}} />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        margin: 10,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "black",
        padding: 5,
    }
});

export default PerfilScreen;
import React, { useState } from "react";
import { StyleSheet, Button, Text, TextInput, View, Picker, AsyncStorage } from "react-native";
import FirebaseService from "../../service/FirebaseService";

const CadastroScreen = ({navigation}) => { 
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [tipo, setTipo] = useState("aluno");

    submit = async () => {
        if (nome == "" && telefone == "") {
            alert("Preencha todos os campos!");
        } else {
            try {
                const newid = FirebaseService.pushData('usuario', {
                    nome,
                    telefone,
                    tipo
                });
                
                await AsyncStorage.setItem("@Usuario:key", newid);

                alert("Cadastro efetuado com sucesso!");
                navigation.replace("Home");
            } catch (error) {
                alert("Erro ao salvar novo ID")
            }
        }
    };
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
            <Text>Tipo</Text>
            <Picker
                style={styles.input}
                selectedValue={tipo}
                onValueChange={(itemValue, itemIndex) =>
                    setTipo(itemValue)
                }>
                <Picker.Item label="Aluno" value="aluno" />
                <Picker.Item label="Motorista" value="motorista" />
            </Picker>
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

export default CadastroScreen;
import React, { Component } from "react";
import { StyleSheet, Button, Text, TextInput, View, Picker, AsyncStorage } from "react-native";
import FirebaseService from "../service/FirebaseService";

export default class CadastroScreen extends Component { 
    static navigationOptions = {
        title: 'Cadastro',
    };

    state = {
        nome: "",
        periodo: "matutino"
    };

    render(){
        const {nome, periodo} = this.state;
        const {replace} = this.props.navigation;

        submit = async () => {
            if (nome == "") {
                alert("Preencha todos os campos!");
            } else {
                try {
                    const motoristaId = await AsyncStorage.getItem("@Usuario:key");

                    FirebaseService.pushData('grupo', {
                        nome,
                        periodo,
                        motoristaId
                    });

                    alert("Novo grupo criado!");
                    replace("HomeMotorista");
                } catch (error) {
                    alert("Erro de conexão")
                }
            }
        };
        return(
            <View style={{marginHorizontal: 15}}>
                <Text>Nome do Grupo</Text>
                <TextInput
                    style={styles.input}
                    value={nome}
                    required
                    onChangeText={(value) => this.setState({nome: value})}/>
                <Text>Período</Text>
                <Picker
                    style={styles.input}
                    selectedValue={periodo}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({periodo: itemValue})
                    }>
                    <Picker.Item label="Motutino" value="matutino" />
                    <Picker.Item label="Vespertino" value="vespertino" />
                    <Picker.Item label="Noturno" value="noturno" />
                </Picker>
                <Button 
                    type="button"
                    title="Cadastrar"
                    onPress={() => submit()}
                    style={{marginTop: '20px', display: 'inline-block'}} />
            </View>
        );
    }
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
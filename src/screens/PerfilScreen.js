import React, { Component } from "react";
import { StyleSheet, Button, Text, TextInput, View, AsyncStorage } from "react-native";
import FirebaseService from "../../service/FirebaseService";

export default class PerfilScreen extends Component { 
    static navigationOptions = {
        title: 'Perfil',
    };

    state = {
        telefone: "",
    };

    async componentDidMount(){
        const key = await AsyncStorage.getItem("@Usuario:key");
        FirebaseService.getDataWithKey("usuario",key, (dataIn) => this.setState(dataIn[0]));        
    }

    render(){
        const {key, nome, telefone, tipo, grupo = null} = this.state;
        const {goBack} = this.props.navigation;


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
                    goBack();
                } catch (error) {
                    alert("Erro de conexão")
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
                    onChangeText={(value) => this.setState({nome: value})}/>
                <Text>Telefone</Text>
                <TextInput
                    style={styles.input}
                    value={telefone}
                    required
                    onChangeText={(value) => this.setState({telefone: value})}/>
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
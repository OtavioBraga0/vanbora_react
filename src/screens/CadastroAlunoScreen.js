import React, { Component } from "react";
import { StyleSheet, Button, Text, TextInput, View, Picker, AsyncStorage } from "react-native";
import FirebaseService from "../../service/FirebaseService";

export default class CadastroScreen extends Component { 
    static navigationOptions = {
        title: 'Cadastro - Aluno',
    };

    state = {
        telefone: "",
    };

    render(){
        const {telefone} = this.state;
        const {goBack} = this.props.navigation;


        submit = async () => {
            if (telefone == "") {
                alert("Preencha todos os campos!");
            } else {
                try {
                    FirebaseService.getDataWithChild("usuario", "telefone", telefone, dataIn => {

                        var grupoId = this.props.navigation.getParam("grupoId");

                        const objGrupo = {
                            [`${grupoId}`] : true,
                        }

                        const objUsuario = {
                            [`${dataIn[0].key}`]: true
                        }

                        FirebaseService.updateRelationship(dataIn[0].key, 'usuario', "grupo", objGrupo);
                        FirebaseService.updateRelationship(grupoId, 'grupo', "usuario", objUsuario);
    
                        alert("Aluno adicionado!");
                        goBack();
                    })
                    
                } catch (error) {
                    alert("Erro de conexão")
                }
            }
        };
        return(
            <View style={{marginHorizontal: 15}}>
                <Text>Telefone do Aluno</Text>
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
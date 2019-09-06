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
                    let grupoId = this.props.navigation.getParam("grupoId");
                    FirebaseService.getDataWithChild("usuario", "telefone", telefone, dataIn => {

                        // FirebaseService.pushData('grupo-aluno', {
                        //     alunoId: dataIn[0].key,
                        //     grupoId: this.props.navigation.getParam("grupoId"),
                        //     presenca: "S"
                        // });

                        let objUsuario = {
                            [grupoId]: {
                                presenca: "S",                                
                            }, 
                        }

                        let objGrupo = {
                            [dataIn[0].key]: {
                                presenca: "S",
                            } 
                        }

                        FirebaseService.updateRelationship(`usuario/${dataIn[0].key}/grupo`, objUsuario)
                        FirebaseService.updateRelationship(`grupo/${grupoId}/usuario`, objGrupo)

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
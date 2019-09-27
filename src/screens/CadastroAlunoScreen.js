import React, { useState } from "react";
import { StyleSheet, Button, Text, TextInput, View } from "react-native";
import FirebaseService from "../service/FirebaseService";

const CadastroAlunoScreen = ({navigation}) => {
    const [telefone, setTelefone] = useState("");
    navigationOptions = {
        title: "Cadastro - Aluno"
    };

    submit = async () => {
        if (telefone == "") {
            alert("Preencha todos os campos!");
        } else {
            try {
                let grupoId = this.props.navigation.getParam("grupoId");
                FirebaseService.getDataWithChild("usuario", "telefone", telefone, dataIn => {

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
                    navigation.goBack();
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
                onChangeText={(value) => setTelefone(value)}/>
            <Button 
                type="button"
                title="Cadastrar"
                onPress={() => submit()}
                style={{marginTop: '20px', display: 'inline-block'}} />
        </View>
    );
}

export default CadastroAlunoScreen;

const styles = StyleSheet.create({
    input: {
        margin: 10,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "black",
        padding: 5,
    }
});
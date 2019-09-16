import React, {useState} from "react";
import {StyleSheet, View, Text, ScrollView, Button } from "react-native";
import FirebaseService from "../../service/FirebaseService";
import { FontAwesome } from '@expo/vector-icons';

const GrupoScreen = ({navigation}) => {
    // INSTANCIA UM ATRIBUTO STATE COMO UM OBJETO COM O ITEM DATALIST
    const {dataList, setDataList} = useState([]);

    // this.props.navigation.getParam("grupoId") => É UMA VARIÁVEL PASSADA POR PARÂMETRO DA PÁGINA HOME
    grupoId = navigation.getParam("grupoId");

    // TROCA TÍTUTLO DO HEADER
    navigationOptions = {
        title: "Grupo",
    };

    // VALIDA DE O PASSAGEIRO JÁ EXISTE NA LISTAGEM, CASO EXISTA, SUBSTITUE OS DADOS ANTIGOS COM OS NOVOS 
    verifyDataList = (dataIn) => {        
        let dataList = dataList;   
        let exist = 0;   
        if(dataIn.length != 0){
            dataList.forEach((element, index) => {      
                if(dataIn[0].key == element.key){       
                    exist += 1;
                    // 1º ARGUMENTO -> REMOVE ITENS APARETIDO DO INDEX PASSADO
                    // 2º ARGUMENTO -> LIMITE DE ITENS QUE DEVEM SER REMOVIDOS
                    // 3º ARGUMENTO -> SUBSTITUI O ITEM REMOVIDO PELO NOVO PASSADO
                    dataList.splice(index, 1, dataIn[0])
                }
            })
        }

        if(exist == 0){
            dataList.push(dataIn[0]);
            setDataList(dataList)
        } else {
            setDataList(dataList)
        }
    }

    // FUNÇÃO CHAMADA NA INICIALIZAÇÃO DA PÁGINA 
    init = () => {
        // LISTA A KEY DE TODOS OS ALUNOS QUE ESTÁ NO GRUPO
        FirebaseService.getDataList(`grupo/${this.grupoId}/usuario` , dataIn => {
            // PERCORRE TODO O RETORNO DAS KEYs           
            dataIn.forEach(usuario => {                        
                // RETORNA OS DADOS DOS ALUNOS BASEADOS NAS KEYs RECOLHIDAS ANTERIORMENTE
                FirebaseService.getDataWithKey(
                    'usuario',
                    usuario.key, 
                    dataIn => {
                        // CHAMA A FUNÇÃO QUE VALIDA O DATALIST
                        this.verifyDataList(dataIn);                        
                    });
            });
        });
    };

    init();
    return(
        <View>
            <Button
                title="Adicionar Aluno"
                onPress={() => navigation.navigate("CadastroAluno", {grupoId: navigation.getParam("grupoId")})}
            />
            <ScrollView>
                <View style={styles.fullWidth}>
                    {
                        // PERCORRE TODO DATALIST COM OS DADOS ATUALIZADOS RENDERIZANDO-OS NA TELA
                        dataList && dataList.map(
                            (item, index) => {
                                var presenca = "";
                                if(item.grupo[this.grupoId].presenca == "S"){
                                    presenca = <FontAwesome size={30} name="thumbs-up" color="green"/>;
                                } else {
                                    presenca = <FontAwesome size={30} name="thumbs-down" color="red"/>;
                                }
                                return (
                                    <View style={[styles.margin10, styles.item]} key={index}>
                                        <View style={{padding:10}}>
                                            <Text style={styles.listItemHeader}> Nome </Text>
                                            <Text style={styles.listItemText}> {item.nome} </Text>
                                        </View>
                                        <View style={styles.itemGrupo}>
                                            {presenca}
                                        </View>
                                    </View>
                                );
                            }
                        )
                    }
                </View>
            </ScrollView>
        </View>
    );

}

const styles = StyleSheet.create({
    margin10: {margin: 10},
    fullWidth: {flex: 1},
    header: {alignItems: 'flex-start', justifyContent: 'flex-start', height: 60, paddingTop: 20, paddingBottom: 20, flexDirection: 'row'},
    listItemText: {fontSize: 20, color: '#000000', marginBottom:10},
    listItemHeader: {fontSize: 10, color: '#000000'},
    item: {backgroundColor: '#c7c7c7', borderRadius: 20, display: "flex", flexDirection: "row", justifyContent: "space-around"},
    itemGrupo: {display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", flexGrow: .5},
});

export default GrupoScreen;
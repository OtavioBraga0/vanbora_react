import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView, AsyncStorage } from "react-native";
import FirebaseService from "../../service/FirebaseService";

export default class HomeAlunoScreen extends Component {
    state = {
        dataList: [],
        alunoId: 0,
    };

    static navigationOptions = {
        title: 'Home - Aluno',
    };

    // VALIDA DE O PASSAGEIRO JÁ EXISTE NA LISTAGEM, CASO EXISTA, SUBSTITUE OS DADOS ANTIGOS COM OS NOVOS 
    verifyDataList(dataIn){        
        let dataList = this.state.dataList;   
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
            this.setState({dataList: dataList})
        } else {
            this.setState({dataList: dataList})
        }
    }

    async componentDidMount() {
        const key = await AsyncStorage.getItem("@Usuario:key");
        this.setState({alunoId: key});
        // LISTA A KEY DE TODOS OS GRUPOS EM QUE O ALUNO ESTA
        FirebaseService.getDataList(`usuario/${this.state.alunoId}/grupo` , dataIn => {
            // PERCORRE TODO O RETORNO DAS KEYs           
            dataIn.forEach(grupo => {                        
                // RETORNA OS DADOS DOS GRUPOS BASEADOS NAS KEYs RECOLHIDAS ANTERIORMENTE
                FirebaseService.getDataWithKey(
                    'grupo',
                    grupo.key, 
                    dataIn => {
                        // CHAMA A FUNÇÃO QUE VALIDA O DATALIST
                        this.verifyDataList(dataIn);                        
                    });
            });
        });
    };

    render() {
        const {dataList, alunoId} = this.state;

        return(
            <View>
                <ScrollView>
                    <View style={styles.fullWidth}>
                        {
                            // PERCORRE TODO DATALIST COM OS DADOS ATUALIZADOS RENDERIZANDO-OS NA TELA
                            dataList && dataList.map(
                                (item, index) => {
                                    return (
                                        <View style={[styles.margin10, styles.item]} key={index}>
                                            <View style={{padding:10}}>
                                                <Text style={styles.listItemHeader}> Nome </Text>
                                                <Text style={styles.listItemText}> {item.nome} </Text>

                                                <Text style={styles.listItemHeader}> Período </Text>
                                                <Text style={styles.listItemText}> {item.periodo} </Text>

                                                <Text style={styles.listItemHeader}> Presença </Text>
                                                <Text style={styles.listItemText}> {item.usuario[alunoId].presenca} </Text>
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
}

const styles = StyleSheet.create({
    margin10: {margin: 10},
    fullWidth: {flex: 1},
    header: {alignItems: 'flex-start', justifyContent: 'flex-start', height: 60, paddingTop: 20, paddingBottom: 20, flexDirection: 'row'},
    listItemText: {fontSize: 20, color: '#000000', marginBottom:10},
    listItemHeader: {fontSize: 10, color: '#000000'},
    item: {backgroundColor: '#c7c7c7', borderRadius: 20}

});
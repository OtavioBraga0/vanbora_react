import React, { Component, useState } from "react";
import { StyleSheet, View, Text, ScrollView, AsyncStorage, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import FirebaseService from "../service/FirebaseService";


const HomeAlunoScreen = () => {
    const [dataList, setDataList] = useState([]);
    const [alunoId, setAlunoId] = useState("");

    navigationOptions = {
        title: 'Home - Aluno',
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

    const init = async () => {
        const key = await AsyncStorage.getItem("@Usuario:key");
        setAlunoId(key);
        // LISTA A KEY DE TODOS OS GRUPOS EM QUE O ALUNO ESTA
        FirebaseService.getDataList(`usuario/${alunoId}/grupo` , dataIn => {
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

    const trocaPresenca = (presenca, grupoId) => {
        let alunoId = alunoId;
        
        // FUNÇÃO PARA ALTERAR VALORES DE UM DETERMINADO NÓ
        FirebaseService.changeValues(`grupo/${grupoId}/usuario/${alunoId}`, {'presenca': presenca});
        FirebaseService.changeValues(`usuario/${alunoId}/grupo/${grupoId}`, {'presenca': presenca});
    }
 
    init();
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
                                        <View style={{padding: 10}}>
                                            <Text style={styles.listItemHeader}> Nome </Text>
                                            <Text style={styles.listItemText}> {item.nome} </Text>
                                        </View>
                                        <View style={styles.itemGrupo}>
                                            <TouchableOpacity onPress={() => trocaPresenca('S', item.key)} >
                                                <FontAwesome size={30} name="thumbs-up" color="green" style={item.usuario[alunoId].presenca == "S" ? null : styles.botaoDesativo}/>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => trocaPresenca('N', item.key)}>
                                                <FontAwesome size={30} name="thumbs-down" color="red" style={item.usuario[alunoId].presenca == "N" ? null : styles.botaoDesativo}/>
                                            </TouchableOpacity>
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
    botaoDesativo: {opacity: 0.3},
});

export default HomeAlunoScreen;
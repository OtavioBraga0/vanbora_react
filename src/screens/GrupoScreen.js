import React, {Component} from "react";
import {StyleSheet, View, Text, ScrollView, Button } from "react-native";
import FirebaseService from "../../service/FirebaseService";
import { isUndefined } from "util";

export default class ListagemAlunosScreen extends Component {
    // INSTANCIA UM ATRIBUTO STATE COMO UM OBJETO COM O ITEM DATALIST
    state = {
        dataList: [],
    }

    // TROCA TÍTUTLO DO HEADER
    static navigationOptions = {
        title: "Grupo",
    };

    // VALIDA DE O PASSAGEIRO JÁ EXISTE NA LISTAGEM, CASO EXISTA, SUBSTITUE OS DADOS ANTIGOS COM OS NOVOS 
    verifyDataList(dataIn){        
        let dataList = this.state.dataList;   
        let exist = 0;   
        console.log(dataIn);
        
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

    // this.props.navigation.getparam("grupoId") => É UMA VARIÁVEL PASSADA POR PARÂMETRO DA PÁGINA HOME

    // FUNÇÃO CHAMADA NA INICIALIZAÇÃO DA PÁGINA 
    componentDidMount() {
        // LISTA A KEY DE TODOS OS ALUNOS QUE ESTÁ NO GRUPO
        FirebaseService.getDataWithChild('grupo-aluno', 'grupoId', this.props.navigation.getParam("grupoId"), dataIn => {
            // PERCORRE TODO O RETORNO DAS KEYs
            dataIn.forEach(usuario => {        
                // RETORNA OS DADOS DOS ALUNOS BASEADOS NAS KEYs RECOLHIDAS ANTERIORMENTE
                FirebaseService.getDataWithKey(
                    'usuario',
                    usuario.alunoId, 
                    dataIn => {
                        // CHAMA A FUNÇÃO QUE VALIDA O DATALIST
                        this.verifyDataList(dataIn);
                    });
            });
        });
    };

    // RENDERIZA O LAYOUT DA PÁGINA
    render(){
        // INSTANCIA UMA CONSTANTE DATALIST COM OS DADOS DO ATRIBUTO STATE
        const {dataList} = this.state;
        // INTANCIA UMA CONSTANTE NAVIGATE COM OS DADOS DE NAVEGAÇÃO (ESSES DADOS SÃO PASSADOS POR PADRÃO DE PÁGINA PRA PÁGINA)
        const {navigate} = this.props.navigation;
        
        return(
            <View>
                <Button
                    title="Adicionar Aluno"
                    onPress={() => navigate("CadastroAluno", {grupoId: this.props.navigation.getParam("grupoId")})}
                />
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

                                                <Text style={styles.listItemHeader}> Key </Text>
                                                <Text style={styles.listItemText}> {item.key} </Text>
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
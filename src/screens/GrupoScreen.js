import React, {Component} from "react";
import {StyleSheet, View, Text, ScrollView, Button, FlatList} from "react-native";
import FirebaseService from "../../service/FirebaseService";

export default class ListagemAlunosScreen extends Component {
    state = {
        dataList: [],
    }

    static navigationOptions = {
        title: "Grupo",
    };

    verifyDataList(dataIn){
        let dataList = this.state.dataList;
        let exist = 0;
        dataList[0].forEach((element, index) => {
            console.log(index)
            if(dataIn[0].key == element.key){
                exist += 1;
            }
        })

        if(exist == 0) {
            dataList.push(dataIn);
            this.setState({dataList: dataList})
        }
        
        console.log(dataList[0])

    }

    componentDidMount() {
        FirebaseService.getDataWithChild('grupo-aluno', 'grupoId', this.props.navigation.getParam("grupoId"), dataIn => {
            dataIn.forEach(usuario => {                
                FirebaseService.getDataWithKey(
                    'usuario', 
                    usuario.alunoId, 
                    dataIn => {
                        this.verifyDataList(dataIn);
                    });
            });
        });
    };

    render(){
        const {dataList} = this.state;
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
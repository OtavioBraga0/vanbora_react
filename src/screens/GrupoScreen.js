import React, {Component} from "react";
import {StyleSheet, View, Text, ScrollView, Button} from "react-native";
import FirebaseService from "../../service/FirebaseService";

export default class ListagemAlunosScreen extends Component {
    state = {
        dataList: null,
    }

    static navigationOptions = {
        title: "Grupo",
    };


    componentDidMount() {
        FirebaseService.getDataWithChild('grupo-aluno', 'grupoId', this.props.navigation.getParam("grupoId"), dataIn => this.setState({dataList: dataIn}));
        
        this.state.dataList.map((userData) => {
            console.log(userData);
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

                                                <Text style={styles.listItemHeader}> Período </Text>
                                                <Text style={styles.listItemText}> {item.periodo} </Text>
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
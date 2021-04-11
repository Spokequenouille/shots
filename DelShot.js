import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List, Divider, Avatar,Title, Button  } from 'react-native-paper';
import InputSpinner from "react-native-input-spinner";

export default class Users extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            isLoading: true,
            users: [],
            shot: 0
        }
        this.postShot = this.postShot.bind(this)
    }

    postShot() {
        const shots = this.props.route.params.user.shot - this.state.shot
        console.log(shots)
        fetch('http://192.168.1.51:5000/update', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.props.route.params.user.id,
                shot :shots,
                gorge: this.props.route.params.user.gorge,
                name : this.props.route.params.user.name
            })
        })
    }
    
    render() {
        return(
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Avatar.Icon size={100} icon="folder" />
                    <Title>Retirer des shots à {this.props.route.params.user.name}</Title>
                    <InputSpinner
                        min={0}
                        step={1}
                        max={this.props.route.params.user.shot}
                        colorMax={"#f04048"}
                        colorMin={"#40c5f4"}
                        value={this.state.shot}
                        onChange={shot => this.setState({shot})}
                    />
                    <Button onPress={() => {
                        console.log("presse")
                        this.postShot()
                        this.props.navigation.navigate('Users')
                    }}>Retirer</Button>
                </View>
        )
    }
}


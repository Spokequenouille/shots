import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { List, Divider, Avatar } from 'react-native-paper';
import { NavigationEvents } from '@react-navigation/native';

export default class Users extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            isLoading: true,
            users: []
        }
        this.callApi = this.callApi.bind(this)
    }

    callApi() {
        return fetch('http://172.20.10.14:5000/user')
        .then((res) =>
            res.json()
        )
        .then((resJson) =>
            this.setState({
                isLoading: false,
                users: resJson
            })
        )
    }

    /*componentDidMount() {
        return fetch('http://192.168.0.21:5000/user')
        .then((res) =>
            res.json()
        )
        .then((resJson) =>
            this.setState({
                isLoading: false,
                users: resJson
            })
        )
    }*/
    
    
    render() {
        this.callApi();

        return(
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {this.state.users.map((user, i) => (
                        <View key={user.id}style={{ minWidth: 360}}>
                            <List.Item
                                left={props => <Avatar.Image source={{uri: user.avatar}}/>}
                                title={user.name}
                                description={`Doit boire encore : ${user.shot} shots`}
                                onPress={() => this.props.navigation.navigate('User', {user})}
                            />
                            <Divider/>                        
                        </View>
                    ))}
                </View>
        )
    }
}


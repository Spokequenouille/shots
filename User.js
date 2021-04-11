import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List, Divider, Avatar,Title, Button  } from 'react-native-paper';

export default class Users extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            isLoading: true,
            users: []
        }
    }

    componentDidMount () {
        return fetch(`http://192.168.1.51:5000/user/${this.props.route.params.user.id}`)
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
    
    render() {
        const user = this.state.users;
        return(
             
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Avatar.Image size={100}  source={{uri: this.state.users.avatar}}/>
                    <Title>{this.state.users.name}</Title>
                    <Text>Doit boire encore : {this.state.users.shot} shots</Text>
                    <View style={{    flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Button
                            onPress={() => this.props.navigation.navigate('Ajouter des shots', {user})}    
                        >
                            En ajouter
                        </Button>
                        <Button
                            onPress={() => this.props.navigation.navigate('Boire des shots', {user})}    
                        >
                            En boire
                        </Button>
                    </View>
                </View>
        )
    }
}


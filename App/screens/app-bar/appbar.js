
import React, { Component } from 'react';
import { Appbar } from 'react-native-paper';

export default class AppBar extends Component {
    constructor() {
        super();
    }
    _goBack = () => {
        this.props.navigation.goBack();
    };

    _handleSearch = () => console.log('Searching');

    _handleMore = () => console.log('Shown more');
    
    render() {
        const title = this.props.title;
        return (
            <Appbar.Header>
                <Appbar.BackAction
                    onPress={this._goBack}
                />
                <Appbar.Content
                    title={title}
                    // subtitle="Subtitle"
                />
                <Appbar.Action icon="magnify" onPress={this._handleSearch} />
                <Appbar.Action icon="dots-vertical" onPress={this._handleMore} />
            </Appbar.Header>
        )
    }
}
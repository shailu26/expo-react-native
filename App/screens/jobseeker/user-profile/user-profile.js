import React, { Component } from 'react';
import { Chip, Paragraph, Card } from 'react-native-paper';
import AppBar from '../../app-bar/appbar';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';

import { Video } from 'expo-av';
const { width } = Dimensions;

export class UserProfileDetail extends Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={{ backgroundColor: '#fbfcfd' }}>
                <AppBar title="Sachin" navigation={navigation} />
                <ScrollView>
                    <Video
                        source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={true}
                        resizeMode="cover"
                        shouldPlay
                        isLooping
                        style={{ width: width, height: 300 }}
                    />

                    <View style={styles.chip}>
                        <Chip>New</Chip>
                        <Chip>Rate</Chip>
                        <Chip>Add to MyList</Chip>
                        <Chip>Share</Chip>
                        {/* <Chip onPress={() => {navigation.navigate('UserEdit')}}>Edit</Chip> */}
                    </View>

                    <Card style={styles.card}>
                        <Card.Content>
                            <Card.Title 
                                title="About"
                            />
                            <View style={styles.info}>
                                <Paragraph>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                    It has survived not only five centuries, but also the leap into electronic typesetting,
                                    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
                                    Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
                                    of Lorem Ipsum.
                                </Paragraph>
                            </View>
                        </Card.Content>
                    </Card>
                    <Card style={styles.card}>
                        <Card.Content>
                            <Card.Title title="Activity" />
                            <View style={styles.info}>
                                <Paragraph>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                </Paragraph>
                            </View>
                        </Card.Content>
                    </Card>
                </ScrollView>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row"
    },
    card: {
        marginTop: 10,
        marginBottom: 10
    },
    userAvater: {
        height: 150,
        width: 150
    },
    footer: {
        position: 'absolute', left: 0, right: 0, bottom: 0
    },
    chip: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10
    },
    info: {
        margin: 10
    },
})
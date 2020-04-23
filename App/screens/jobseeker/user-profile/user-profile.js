import React, {Component} from 'react';
// import {Chip, Paragraph, Card} from 'react-native-paper';
import AppBar from '../../app-bar/appbar';
import {View, StyleSheet, ScrollView, Dimensions, Text, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-paper';
// import avatar from '../../../../assets/avatar.png'
// import {Video} from 'expo-av';
const {width} = Dimensions;

export class UserProfileDetail extends Component {
    render() {
        const {navigation} = this.props;
        return (
            // <View style={{
            //     backgroundColor: '#fbfcfd'
            // }}>
            //     <AppBar title="Shailesh" navigation={navigation}/>
            //     <ScrollView>
            //         <View style={{flex: 1, height: 150, backgroundColor: 'blue'}}></View>
            //         <View style={styles.profileView}>
            //                     <Avatar.Image
            //                         style={{
            //                         backgroundColor: 'transparent'
            //                     }}
            //                         size={125}
            //                         source={require('../../../../assets/avatar.png')}/>
            //                 </View>

            //         <Video
            //             source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
            //             rate={1.0}
            //             volume={1.0}
            //             isMuted={true}
            //             resizeMode="cover"
            //             shouldPlay
            //             isLooping
            //             style={{ width: width, height: 300 }}
            //         />

            //         <View style={styles.chip}>
            //             <Chip>New</Chip>
            //             <Chip>Rate</Chip>
            //             <Chip>Add to MyList</Chip>
            //             <Chip>Share</Chip>
            //         </View>

            //         <Card style={styles.card}>
            //             <Card.Content>
            //                 <Card.Title
            //                     title="About"
            //                 />
            //                 <View style={styles.info}>
            //                     <Paragraph>
            //                         Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            //                         Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            //                         when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            //                         It has survived not only five centuries, but also the leap into electronic typesetting,
            //                         remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
            //                         Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
            //                         of Lorem Ipsum.
            //                     </Paragraph>
            //                 </View>
            //             </Card.Content>
            //         </Card>
            //         <Card style={styles.card}>
            //             <Card.Content>
            //                 <Card.Title title="Activity" />
            //                 <View style={styles.info}>
            //                     <Paragraph>
            //                         Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            //                         Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            //                     </Paragraph>
            //                 </View>
            //             </Card.Content>
            //         </Card>

            //     </ScrollView>
            // </View>
            <View style={styles.container}>
                <AppBar title="Shailesh" navigation={navigation}/>
                <ScrollView>
                    <View style={styles.header}></View>
                    <Avatar.Image style={styles.avatar} size={125} source={require('../../../../assets/avatar.png')}/>
                    <View style={styles.body}>
                        <View style={styles.bodyContent}>
                            <Text style={styles.name}>Shailesh Gehlot</Text>
                            <Text style={styles.info}>UX Designer / Mobile developer</Text>
                            <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>
                
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header:{
    backgroundColor: "#6200ee",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:210,
    backgroundColor: 'white'
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#6200ee",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  }
})
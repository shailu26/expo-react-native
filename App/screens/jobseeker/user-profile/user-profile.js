import React, { Component } from "react";
import { Chip, Paragraph, Card } from "react-native-paper";
import AppBar from "../../app-bar/appbar";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { Avatar, IconButton } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import Moment from 'moment';
// import avatar from '../../../../assets/avatar.png'
// import {Video} from 'expo-av';
const { width } = Dimensions;

export class UserProfileDetail extends Component {
  state = {
    experiences: [],
    userAbout: 'Portfolio - https://shailu26.github.io'
  };
  componentDidMount() {
    this.getExperiences();
  }

  getExperiences() {
    let experiences = [
      {
        icon: "",
        details: {
          name: "Flowace",
          yearOfExperience: { startAt: new Date(), endAt: new Date() },
          designation: "Software Developer",
        },
      },
      {
        icon: "",
        details: {
          name: "Paintcollar",
          yearOfExperience: { startAt: new Date(), endAt: new Date() },
          designation: "Software Developer",
        },
      },
    ];
    this.setState({ experiences });
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <AppBar title="Shailesh" navigation={navigation} />
        <ScrollView>
          <View style={styles.header}></View>
          <Avatar.Image
            style={styles.avatar}
            size={125}
            source={require("../../../../assets/avatar.png")}
          />
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>Shailesh Gehlot</Text>
              <Text style={styles.info}>UX Designer / Mobile developer</Text>
              <View style={{ flex: 1, flexDirection: "row", marginTop: 5 }}>
                <Text style={styles.companyName}>Flowace</Text>
                <Text style={styles.dot}>●</Text>
                <Text style={styles.degree}>
                  Rajiv Gandhi Prodyogiki Vishwvidhyalaya
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row", marginTop: 5 }}>
                <Text style={styles.location}>Mumbai, Maharastra, India</Text>
              </View>
            </View>
          </View>
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Card.Title
                title="About"
                titleStyle={styles.cardTitle}
                right={(props) => (
                  <MaterialIcons size={25} name="edit" onPress={() => {}} />
                )}
              />
              <View style={styles.userAbout}>
                <Paragraph style={styles.companyDetails}>
                  {this.state.userAbout}
                </Paragraph>
              </View>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Card.Title
                title="Experience"
                titleStyle={styles.cardTitle}
                right={(props) => (
                  <MaterialIcons size={25} name="edit" onPress={() => {}} />
                )}
              />
              {this.state.experiences.map((experience, index) => {
                return (
                  <View key={index}
                    style={[styles.info, { flexDirection: "row", flex: 1, marginTop: -5, paddingBottom: 20 }]}
                  >
                    <View style={{ flex: 0.2 }}>
                      <Text>Icon</Text>
                    </View>
                    <View style={[styles.companyDetails, index !== this.state.experiences.length-1 ? styles.applyBottomBorder : '']}>
                      <Text style={styles.designation}>{experience.details.designation}</Text>
                      <Text style={styles.companyName}>{experience.details.name}</Text>
                      <Text style={styles.yearOfExperience}>{Moment(experience.details.yearOfExperience.startAt).format('MMM YYYY')} - {Moment(experience.details.yearOfExperience.endAt).format('MMM YYYY')} </Text>
                    </View>
                  </View>
                );
              })}
            </Card.Content>
          </Card>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 50
  },
  header: {
    backgroundColor: "#6200ee",
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130,
    backgroundColor: "white",
    zIndex: 1
  },
  body: {
    paddingTop: 40,
    backgroundColor: 'white',
    paddingBottom: 15
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600",
  },
  info: {
    fontSize: 16,
    // color: "#6200ee",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center",
  },
  card: {
    marginTop: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    position: "relative",
    right: 15,
  },
  dot: {
    fontSize: 15,
    marginLeft: 5,
    position: "relative",
    bottom: 1,
  },
  degree: {
    marginLeft: 5,
  },
  cardContent: {
    marginTop: -15
  },
  companyDetails: {
    
    flex: 0.8,
    paddingBottom: 10,
  },
  designation: {
    fontSize: 15.5
  },
  companyName: {
    marginTop: 0,
    fontSize: 14
  },
  yearOfExperience: {
    fontSize: 13,
    marginTop: 5,
    color: 'grey'
  },
  applyBottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#e8ecf1'

  }
});

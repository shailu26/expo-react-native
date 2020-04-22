import React, { Component } from "react";
import {
  Card,
  Title,
  Button,
  Text,
  List,
  Dialog,
  Portal,
  Paragraph,
  Snackbar,
} from "react-native-paper";
import AppBar from "../../app-bar/appbar";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Video } from "expo-av";
import styles from "./uv-style";
import axios from "../../../../services/axios/axios";
import { environment } from "../../../../environment/environment";
import * as FileSystem from "expo-file-system";
import { AntDesign } from "@expo/vector-icons";
import ProgressCircle from "react-native-progress-circle";
import { socketConnection } from "../../../../services/socket/socket";

export class UploadVideo extends Component {
  state = {
    videosToUpload: [],
    videoIndex: 1,
    visibleDialog: false,
    visibleSnackbar: false,
    requestToDelete: {}
  };

  componentDidMount() {
    this.getPermissionAsyncGallery();
    this.getPermissionAsync_ForCamera();
    this.listenVideoUpload();
  }

  getPermissionAsyncGallery = async () => {
    if (Constants.platform.ios || Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  getPermissionAsync_ForCamera = async () => {
    if (Constants.platform.ios || Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickVideo = async () => {
    let videoDetails = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!videoDetails.cancelled) {
      let fileDetails = await FileSystem.getInfoAsync(videoDetails.uri);
      if (!fileDetails.exists) {
        alert("file doesn't exists");
      } else if (fileDetails.size / 1000000 > 50) {
        // size will be in bytes so dividing with 1000000 to convert to mb
        alert("Please select File below 50mb");
      } else {
        let videos = this.state.videosToUpload;
        videoDetails.contentType = videoDetails.uri.substr(
          videoDetails.uri.lastIndexOf(".") + 1
        );
        videoDetails.id = this.state.videoIndex;
        videoDetails.isProgressStart = false;
        videoDetails.percentageDone = 0;
        videoDetails.isVideoFailed = false;
        this.setState({
          videoIndex: this.state.videoIndex + 1,
        });
        videos.push(videoDetails);
        this.setState({ videosToUpload: videos });
      }
    }
  };

  upload = async () => {
    let files = JSON.parse(JSON.stringify(this.state.videosToUpload));
    files = files.filter((file) => !file.isProgressStart);
    for (const file of files) {
      let otherDetails = {
        folderName: "videos",
        userId: 1,
        bucketName: "example",
        contentType: file.contentType,
        isProgressStart: file.isProgressStart,
        isVideoFailed: file.isVideoFailed,
        id: file.id,
      };
      let data = new FormData();
      data.append("otherDetails", JSON.stringify(otherDetails));
      data.append("file", {
        uri: file.uri,
        name: `${new Date().getTime()}`,
        type: `${file.type}/${file.contentType}`,
      });
      let req = await axios.post(
        `${environment.baseUrl}/api/common/abortVideoUpload`,
        { userId: 1, id: file.id }
      );
      await axios.post(`${environment.baseUrl}/api/common/uploadVideo`, data);
    }
  };

  _onDismissSnackBar = () => this.setState({ visibleSnackbar: false });

  checkBeforeRemovingVideo = async (video, index) => {
    //   this.setState()
    this.setState({ visibleDialog: false });
    if (video.isProgressStart) {
      try {
        let req = await axios.post(
          `${environment.baseUrl}/api/common/abortVideoUpload`,
          { userId: 1, id: video.id }
        );
        this.removeSelectedVideo(video);
      } catch (e) {
        console.log(e);
        this.removeSelectedVideo(video);
      }
    } else {
      this.removeSelectedVideo(video);
    }
  };

  removeSelectedVideo = async (video) => {
    let videos = this.state.videosToUpload;
    let index = videos.findIndex((vid) => vid.id === video.id);
    if (index > -1) {
      videos.splice(index, 1);
      this.setState({
        videosToUpload: videos,
      });
    }
  };

  async listenVideoUpload() {
    const socketEvent = await socketConnection.getSocket();
    socketEvent.on(`uploadStatusSuccess_${1}`, (data) => {
      let videosToUpload = this.state.videosToUpload;
      videosToUpload.forEach((video, index) => {
        if (video.id === data.id) {
          video.percentageDone = data.percentageDone;
          video.isVideoFailed = data.isVideoFailed;
          video.isProgressStart = data.isProgressStart;
        }
      });
      this.setState({ videosToUpload });
      let index = this.state.videosToUpload.findIndex(
        (video) => video.id === data.id
      );
      if (index > -1) {
        if (this.state.videosToUpload[index].percentageDone === 100) {
          this.setState({ visibleSnackbar: true });
          this.removeSelectedVideo(this.state.videosToUpload[index]);
        }
      }
    });
  }

  _hideDialog = () => this.setState({ visibleDialog: false });

  setVisibleDialog = (value, video) => {
    this.setState({ visibleDialog: value, requestToDelete: video });
  }

  render() {
    let { image, videosToUpload } = this.state;
    const { navigation } = this.props;
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            backgroundColor: "#fbfcfd",
          }}
        >
          <AppBar title="Videos" navigation={navigation} />
        </View>
        <View style={styles.mainContainer}>
          <Button
            style={styles.selectFileBtn}
            icon="camera"
            mode="contained"
            onPress={this._pickVideo}
            disabled={this.state.videosToUpload.length === 5}
          >
            Select Video
          </Button>
          <Text
            style={{
              textAlign: "center",
            }}
          >
            (Maximum 5 files can be selected)
          </Text>
        </View>

        <View style={videosToUpload.length && styles.selectedVidBox}>
          {videosToUpload.length
            ? videosToUpload.map((video, index) => {
                return (
                  <View
                    style={{
                      position: "relative",
                      paddingLeft: 15,
                    }}
                    key={video.id}
                  >
                    <Video
                      source={{
                        uri: video.uri,
                      }}
                      rate={1.0}
                      volume={1.0}
                      isMuted={true}
                      resizeMode="cover"
                      shouldPlay={false}
                      isLooping
                      style={{
                        width: 175,
                        height: 125,
                        flexDirection: "column",
                        margin: 5,
                        justifyContent: "space-between",
                      }}
                    />
                    <AntDesign
                      name="closecircle"
                      size={20}
                      color="black"
                      style={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                      }}
                      onPress={() =>
                        video.isProgressStart
                          ? this.setVisibleDialog(true, video)
                          : this.checkBeforeRemovingVideo(video, index)
                      }
                    />
                    {!video.isVideoFailed ? (
                      video.isProgressStart && (
                        <View
                          style={{
                            position: "absolute",
                            top: 50,
                            left: 85,
                            zIndex: 999,
                          }}
                        >
                          <ProgressCircle
                            percent={video.percentageDone}
                            radius={20}
                            borderWidth={3}
                            color="#6200ee"
                            shadowColor="#999"
                            bgColor="#fff"
                          >
                            <Text
                              style={{
                                fontSize: 10,
                              }}
                            >
                              {`${video.percentageDone}%`}
                            </Text>
                          </ProgressCircle>
                        </View>
                      )
                    ) : (
                      <View style={{ position: "absolute", top: 60, left: 60 }}>
                        <Text
                          style={{
                            backgroundColor: "white",
                            color: "#6200ee",
                            zIndex: 999,
                          }}
                        >
                          Upload Failed
                        </Text>
                      </View>
                    )}
                  </View>
                );
              })
            : null}
          <Portal>
            <Dialog
              visible={this.state.visibleDialog}
              onDismiss={this._hideDialog}
            >
              <Dialog.Content>
                <Paragraph>
                  Are you sure you want to delete? {this.state.requestToDelete.id}
                </Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => this.setState({ visibleDialog: false })}>
                  Cancel
                </Button>
                <Button
                  onPress={() => this.checkBeforeRemovingVideo(this.state.requestToDelete)}
                >
                  Ok
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>

        <TouchableHighlight onPress={this.upload} style={{flex: 1, alignItems: 'center'}}>
          <Button
            style={styles.uploadBtn}
            mode="contained"
            disabled={this.state.videosToUpload.length === 0}
          >
            Upload
          </Button>
        </TouchableHighlight>
        <Snackbar
          visible={this.state.visibleSnackbar}
          onDismiss={this._onDismissSnackBar}
        >
          File Uploaded Successfully 🎉
        </Snackbar>
      </View>
    );
  }
}
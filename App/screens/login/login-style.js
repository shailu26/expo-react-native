const React = require("react-native");
import {Dimensions} from 'react-native';
const { StyleSheet } = React;

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  loginView: {
    position: "absolute",
    top: 125,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 10,
    paddingTop: 40,
  },
  scrollViewWrapper: {
    flex: 1,
  },
  loginHeader: {
    fontWeight: "bold",
    paddingLeft: 20,
    fontSize: 28,
    color: "black",
    paddingTop: 10,
    paddingBottom: 5,
  },
  linkedinLogo: {
    fontWeight: "bold",
    paddingLeft: 20,
    fontSize: 30,
    color: "blue",
    paddingTop: 20,
    paddingBottom: 20,
    textShadowOffset: { width: 5, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.7,
  },
  loginBox: {
    padding: 30,
  },
  label: {
    color: "black",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 10,
  },
  form: {
    padding: 20,
    flexGrow: 1
  },
  input: {
    color: "black",
    lineHeight: 1.2,
    fontSize: 13,
    height: 40,
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  wrapInput: {
    backgroundColor: "black",
    // border: "1px solid white",
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    marginTop: 30,
  },
  formItem: {
    marginRight: 5,
    marginBottom: 30,
  },
  formLabel: {
    fontSize: 11,
    marginBottom: 4,
    fontWeight: "600",
    color: "grey",
  },
  formInput: {
    borderRadius: 5,
    width: Dimensions.get("window").width - 75,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    paddingHorizontal: 25,
    color: "grey",
  },
  formInputEmailFocused: {
    borderRadius: 5,
    width: Dimensions.get("window").width - 75,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "blue",
    paddingHorizontal: 25,
    color: "blue",
  },
  formInputPasswordFocused: {
    borderRadius: 5,
    width: Dimensions.get("window").width - 75,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "blue",
    paddingHorizontal: 25,
    color: "blue",
  },
  signInBtn: {
    backgroundColor: "blue",
    color: "white",
    fontSize: 16,
    paddingTop: 12,
    paddingRight: 30,
    paddingBottom: 12,
    paddingLeft: 30,
    width: Dimensions.get("window").width / 2,
    textAlign: "center",
    borderRadius: 25,
    marginTop: 20,
  },
  disabledSignIn: {
    opacity: 0.5,
    backgroundColor: 'grey',
    
  }
});
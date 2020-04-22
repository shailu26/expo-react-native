const React = require("react-native");
const {
    StyleSheet
} = React;
import Constants from "expo-constants";
const {
    Dimensions
  } = React;

const styles = StyleSheet.create({
    selectFileBtn: {
        justifyContent: 'center',
        margin: 15
    },
    uploadBtn: {
        justifyContent: 'center',
        margin: 15,
        width: Dimensions.get('window').width/2,
        alignItems: 'center',
        marginLeft: '26%'
    },
    selectedVidBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        marginHorizontal: 16,
    }
});

export default styles;
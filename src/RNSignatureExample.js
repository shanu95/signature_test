const React = require('react');
const ReactNative = require('react-native');
import RNTesseractOcr from 'react-native-tesseract-ocr';

const {Component} = React;

const {
    AppRegistry,
    StyleSheet,
    Text,
    View, TouchableHighlight
} = ReactNative;

const tessOptions = {
    whitelist: '^[0-9]+$',
    blacklist: '\'!"#$%&/()={}[]+*-_:;<>ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
};


import SignatureCapture from 'react-native-signature-capture';

class RNSignatureExample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: 'no input'
        };
    }

    _handleTextChange(text) {
        this.setState({text: text});
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: "column" }}>
                <Text style={{alignItems:"center",justifyContent:"center"}}>Signature Capture Extended </Text>
                <SignatureCapture
                    style={{width:500,height: 500}}
                    ref="sign"
                    onSaveEvent={this._onSaveEvent}
                    onDragEvent={this._onDragEvent}
                    saveImageFileInExtStorage={true}
                    showNativeButtons={false}
                    showTitleLabel={false}
                    viewMode={"portrait"}/>

                <View style={{ flex: 1, flexDirection: "row" }}>
                    <TouchableHighlight style={styles.buttonStyle}
                                        onPress={() => { this.saveSign() } } >
                        <Text>Save</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.buttonStyle}
                                        onPress={() => { this.resetSign() } } >
                        <Text>Reset</Text>
                    </TouchableHighlight>

                </View>
                {/*<Text>{this.state.text}</Text>*/}

            </View>
        );
    }


    saveSign() {
        this.refs["sign"].saveImage();
    }

    resetSign() {
        this.refs["sign"].resetImage();
    }

    _onSaveEvent(result) {
        //result.encoded - for the base64 encoded png
        //result.pathName - for the file path name
        console.log(result.pathName);
        RNTesseractOcr.recognize(result.pathName, 'LANG_ENGLISH', tessOptions)
            .then((result) => {
                //this.setState({ ocrResult: result });
                //this.setState({text: result})
                alert(result)
                console.log("OCR Result: ", result);
            })
            .catch((err) => {
                console.log("OCR Error: ", err);
            })
            .done();

    }
    _onDragEvent() {
        // This callback will be called when the user enters signature
        console.log("dragged");
    }
}

const styles = StyleSheet.create({
    signature: {
        flex: 1,
        borderColor: '#000033',
        borderWidth: 1,
    },
    buttonStyle: {
        flex: 1, justifyContent: "center", alignItems: "center", height: 50,
        backgroundColor: "#eeeeee",
        margin: 10
    }
});

export default RNSignatureExample;

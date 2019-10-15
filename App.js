import React, {Component, Fragment} from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { BarCodeScanner } from 'expo-barcode-scanner';

export default class BarcodeScannerExample extends Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
    data: '',
    type: '',
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
        {!this.state.scanned && <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />}

        {scanned && (
          <Fragment>
          <Text>{`Type: ${this.state.type}`}</Text>
          <Text>{`Code: ${this.state.data}`}</Text>
          <Button  title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
          </Fragment>
        )}
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true, data, type });
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
}
import React, {Component, Fragment} from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { BarCodeScanner } from 'expo-barcode-scanner';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    marginBottom: 40,
  },
  code: {
    fontSize: 30,
    padding: 15,
    borderColor: 'red',
    borderRadius: 15,
    borderStyle: 'solid',
    borderWidth: 5
  },
  type: {
    fontSize: 20
  }
})

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
      <View style={styles.container} >
        {!this.state.scanned && <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />}

        {scanned && (
          <Fragment>
          <Text style={[styles.text, styles.type]}>{`${this.state.type}`}</Text>
          <Text style={[styles.text, styles.code]}>{`${this.state.data}`}</Text>
          <Button  title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
          </Fragment>
        )}
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true, data, type });
  };
}
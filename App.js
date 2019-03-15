import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_URL = 'https://www.boredapi.com/api/activity/'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: null
    }

    this.fetchActivity = this.fetchActivity.bind(this);
  }

  componentDidMount() {
    this.fetchActivity();
  }

  fetchActivity() {
    axios.get(API_URL)
      .then((response) => {
        this.setState({activity: response.data.activity})
      })
  }

  render() {
    const {activity} = this.state;
    const content = activity !== null ? (
      <Text style={styles.activityText}>{activity}</Text>
    ) : (
      <ActivityIndicator size="large" color="#222" />
    );

    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          {content}
        </View>
        <TouchableHighlight style={styles.button} onPress={this.fetchActivity} underlayColor="#eee">
          <Text style={styles.buttonLabel}>I'm Bored!</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center'
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  activityText: {
    fontSize: 20,
    color: '#222',
  },
  button: {
    height: 44,
    width: 200,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonLabel: {
    fontSize: 16,
    color: '#222'
  }
});

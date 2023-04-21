import React from 'react'
import { View, Text,TouchableOpacity,FlatList } from 'react-native';

import styles from './about.style';
import {SIZES} from "../../../constants";

const About = ({info}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>A propos du job:</Text>
        <View style={styles.contentBox}>
            <Text style={styles.contextText}>{info}</Text>
        </View>
    </View>
  )
}

export default About
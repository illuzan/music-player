import React from 'react'
import {
  TouchableOpacity,
} from 'react-native';

export default function Icon({ colors, weight, size }) {
  return (
    <TouchableOpacity
      style={styles.icon}
      onPress={() => navigation.navigate('QueueScreen')}>
      <Queue color={colors} weight={weight} size={size} />
    </TouchableOpacity>

  )
}

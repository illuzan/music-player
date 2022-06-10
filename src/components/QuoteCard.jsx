import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Surface, Title, useTheme } from 'react-native-paper';
import { sample } from 'lodash';
import colors from '../utils/colors';

const QuoteCard = () => {
  const [isLoading, setisLoading] = useState(true)
  const [quote, setquote] = useState({ quote: '', author: '' })

  async function getData() {
    try {
      const response = await fetch(
        'https://gist.githubusercontent.com/YajanaRao/3917a962bbe8462ac5083da2186b7c3d/raw/001db7423543f53c0fd72273c333b53d32d50f7d/quotes.json',
      );
      const data = await response.json();
      const temp = sample(data)
      setquote(temp)
      setisLoading(false)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getData()
  }, [])


  return (
    <Surface style={styles.container}>
      <View style={styles.quoteContainer}>
        {isLoading ? <ActivityIndicator color={colors.OnBackground} /> : (
          <View>
            <Title style={{ fontFamily: 'Nunito-Italic' }}>{quote?.quote}</Title>
            <Title style={{ fontFamily: 'Nunito-Italic' }}>{`~ ${quote?.author}`}</Title>
          </View>
        )}
      </View>
    </Surface>
  );
};

export default React.memo(QuoteCard);

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 6, elevation: 8, borderRadius: 8, marginTop:8 },
  backgroundImageContainer: {
    flex: 1,
    minHeight: 200,
    width: "100%",
  },
  quoteContainer: {
    flex: 1,
    justifyContent: "center",
    margin: 12
  }
})

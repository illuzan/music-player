import React from 'react';
import { View, Text, Image } from 'react-native';
// import greetUser from '../../utils/greetUser';
import QuoteCard from '../components/QuoteCard';
import { RecentContainer } from '../components/RecentView'
import { MostPlayed } from '../components/MostPlayedView'
import tw from 'twrnc'
import colors from '../utils/colors';
export default function HomeScreen() {
  return (
    <View style={tw`w-full h-full p-4 bg-black`}>
      <View style={tw`flex-row flex-wrap`}>
        <View style={tw`flex-row items-center m-2 bg-gray-800 rounded `}>
          <Image
            style={tw`w-12 h-12 rounded-r`}
            source={{
              uri: 'https://cache.boston.com/resize/bonzai-fba/Globe_Photo/2011/04/14/1302796985_4480/539w.jpg',
            }}
          />
          <Text style={tw`p-2 text-lg font-medium`}>Taylor Swift</Text>
        </View>
        <View style={tw`flex-row items-center bg-gray-800 rounded `}>
          <Image
            style={tw`w-12 h-12`}
            source={{
              uri: 'https://images-na.ssl-images-amazon.com/images/I/61F66QURFyL.jpg',
            }}
          />
          <Text style={tw`p-2 text-lg font-medium`}>Post Malone</Text>
        </View>
        <View style={tw`flex-row items-center bg-gray-800`}>
          <Image
            style={tw`w-12 h-12`}
            source={{
              uri: 'https://images-na.ssl-images-amazon.com/images/I/61F66QURFyL.jpg',
            }}
          />
          <Text style={tw`p-2 text-lg font-medium`}>Post Malone</Text>
        </View>
        <View style={tw`flex-row items-center bg-gray-800 rounded`}>
          <Image
            style={tw`w-12 h-12`}
            source={{
              uri: 'https://images-na.ssl-images-amazon.com/images/I/61F66QURFyL.jpg',
            }}
          />
          <Text style={tw`p-2 text-lg font-medium`}>Post Malone</Text>
        </View>
      </View>
  
      <QuoteCard />

      <RecentContainer />
      <MostPlayed />
    </View >
  );
}

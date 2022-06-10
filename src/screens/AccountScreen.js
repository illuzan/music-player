import React from 'react';
import { View, Image, Text } from 'react-native';
import Screen from '../components/Screen';
import tw from 'twrnc';
import RazorpayCheckout from 'react-native-razorpay';
import { useAuth } from '../utils/auth';

import { Button } from 'react-native-paper';

const AccountScreen = () => {
  const { user, signOut } = useAuth();
  const options = {
    description: 'Muisc Player App',
    image: 'https://i.imgur.com/3g7nmJC.png',
    currency: 'INR',
    key: 'rzp_test_oIVoFn621AJhJR',
    amount: '5000',
    name: 'Music Corp',
    order_id: 'order_JW3JF4lRbYpqDJ', //Replace this with an order_id created using Orders API.
    prefill: {
      email: 'user.email',
      contact: '9191919191',
      name: 'user.displayName',
    },
    theme: { color: '#53a20e' },
  };
  async function payment() {
    try {
      const pay = await RazorpayCheckout.open(options);
      console.log(pay);
    } catch (error) {
      console.log('error', error);
    }
  }
  return (
    <Screen>
      <View style={tw`items-center justify-center mt-20`}>
        <View style={tw`w-48 h-48 mt-4 overflow-hidden rounded-full shadow`}>
          <Image
            source={require('../assets/images/avatar.png')}
            style={tw`w-48 h-48`}
          />
        </View>
        <Text style={tw`mt-4 text-3xl font-bold text-gray-100`}>
          {user?.name}
        </Text>
        <Text style={tw`text-xl text-gray-500`}>{user?.email}</Text>
      </View>

      <View style={tw`mx-4 mt-5 border-t border-t-2 border-gray-100`}>
        <Text style={tw`mx-auto mt-2 mb-6 text-lg text-gray-300`}>
          Other options
        </Text>
        <Button
          icon="shopping"
          mode="contained"
          onPress={payment}
          color="#0ea5e9"
          style={tw`mb-6`}>
          Get Premium
        </Button>
        <Button icon="logout" mode="contained" onPress={signOut}>
          Logout
        </Button>
      </View>
    </Screen>
  );
};

export default AccountScreen;

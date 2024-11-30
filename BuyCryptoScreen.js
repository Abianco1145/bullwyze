import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';

const BuyCryptoScreen = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const handlePayment = async (paymentMethod) => {
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/payments/create-payment-intent',
        { amount: 10000, currency: 'usd', paymentMethodType: paymentMethod }
      );

      const { clientSecret } = data;
      const result = await initPaymentSheet({ paymentIntentClientSecret: clientSecret });

      if (result.error) {
        Alert.alert('Error', result.error.message);
        return;
      }

      const paymentResult = await presentPaymentSheet();
      if (paymentResult.error) {
        Alert.alert('Error', paymentResult.error.message);
      } else {
        Alert.alert('Success', 'Payment Successful');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pay with Card" onPress={() => handlePayment('card')} />
      <Button title="Pay with WeChat" onPress={() => handlePayment('wechat_pay')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default BuyCryptoScreen;

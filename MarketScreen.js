import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const MarketScreen = () => {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/trading/markets')
      .then(response => setMarkets(response.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={markets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name} ({item.symbol.toUpperCase()})</Text>
            <Text>${item.current_price.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
});

export default MarketScreen;

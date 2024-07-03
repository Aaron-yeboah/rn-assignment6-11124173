import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Menu from '../assets/Menu.png';
import Logo from '../assets/Logo.png';
import Search from '../assets/Search.png';
import Shopping from '../assets/shoppingBag.png';
import ListView from '../assets/Listview.png';
import Filter from '../assets/Filter.png';
import Dress1 from '../assets/dress1.png';
import Dress2 from '../assets/dress2.png';
import Dress3 from '../assets/dress3.png';
import Dress4 from '../assets/dress4.png';
import Dress5 from '../assets/dress5.png';
import Dress6 from '../assets/dress6.png';
import Dress7 from '../assets/dress7.png';
import Add from '../assets/add_circle.png';

const products = [
  { id: '1', name: 'Official Wears', description: 'reversible angora cardigan', amount: '120', image: Dress1 },
  { id: '2', name: 'Black', description: 'reversible angora cardigan', amount: '120', image: Dress2 },
  { id: '3', name: 'Church Wear', description: 'reversible angora cardigan', amount: '120', image: Dress3 },
  { id: '4', name: 'Lamerei', description: 'reversible angora cardigan', amount: '120', image: Dress4 },
  { id: '5', name: '21WN', description: 'reversible angora cardigan', amount: '120', image: Dress5 },
  { id: '6', name: 'Lopo', description: 'reversible angora cardigan', amount: '120', image: Dress6 },
  { id: '7', name: '21WN', description: 'reversible angora cardigan', amount: '120', image: Dress7 },
  { id: '8', name: 'lame', description: 'reversible angora cardigan', amount: '120', image: Dress3 },
];

const Home = ({ navigation }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const cartData = await AsyncStorage.getItem('cart');
      if (cartData) {
        setCart(JSON.parse(cartData));
      }
    };
    loadCart();
  }, []);

  const addToCart = async (item) => {
    const cartData = await AsyncStorage.getItem('cart');
    let updatedCart = [];
  
    if (cartData) {
      updatedCart = JSON.parse(cartData);
    }
  
    updatedCart.push(item);
    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const renderItem = ({ item }) => (
    <View key={item.id} style={styles.productItem}>
      <View style={styles.imageContainer}>
        <Image style={styles.productImage} source={item.image} />
        <TouchableOpacity onPress={() => addToCart(item)}>
          <Image source={Add} style={styles.addButton} />
        </TouchableOpacity>
      </View>
      <Text style={styles.productName}>{item.name}</Text>
      <Text>{item.description}</Text>
      <Text style={styles.productAmount}>${item.amount}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={Menu} />
        <Image source={Logo} />
        <View style={styles.headerIcons}>
          <Image source={Search} />
          <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
            <Image source={Shopping} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.storySection}>
        <Text style={styles.storyTitle}>Our story</Text>
        <View style={styles.storyIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={ListView} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={Filter} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={styles.productList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  storySection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 30,
  },
  storyTitle: {
    fontSize: 28,
  },
  storyIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconButton: {
    backgroundColor: '#f7f7f7',
    padding: 10,
    borderRadius: 50,
  },
  productList: {
    justifyContent: 'space-between',
  },
  productItem: {
    width: '45%',
    padding: 10,
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  productName: {
    fontSize: 20,
    marginTop: 10,
  },
  productAmount: {
    color: 'red',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 3,
  },
});

export default Home;

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Remove from '../assets/remove.png';
import Logo from '../assets/Logo.png';
import Search from '../assets/Search.png';
import Shop from '../assets/cart.jpg';

const CartScreen = () => {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const loadCart = async () => {
      const cartData = await AsyncStorage.getItem('cart');
      if (cartData) {
        const filteredCart = JSON.parse(cartData).filter((item) => item.id);
        setCart(filteredCart);
      }
    };
    loadCart();
  }, []);

  useEffect(() => {
    const calculateTotal = () => {
      let sum = 0;
      cart.forEach((item) => {
        sum += Number(item.amount);
      });
      setTotalAmount(sum);
    };
    calculateTotal();
  }, [cart]);

  const removeFromCart = async (productId) => {
    if (productId) {
      console.log('Removing product with ID:', productId);
      const newCart = cart.filter((item) => item.id !== productId);
      console.log('New cart:', newCart);
      setCart(newCart);
      await AsyncStorage.setItem('cart', JSON.stringify(newCart));
    } else {
      console.error('Invalid product ID');
    }
  };

  const renderItem = ({ item, id }) => (
    <View style={styles.cartItem} key={id}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text>{item.description}</Text>
        <Text style={styles.productAmount}>${item.amount}</Text>
        <TouchableOpacity onPress={() => removeFromCart(item.id)}>
          <Image source={Remove} style={styles.removeButton} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image source={Logo} style={styles.logo} />
          <Image source={Search} />
        </View>
        <Text style={styles.title}>CHECKOUT</Text>
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>EST. TOTAL: </Text>
          <Text style={styles.totalAmount}>$240</Text>
        </View>
      </SafeAreaView>
      <TouchableOpacity onPress={() => alert('Checkout successful')} style={styles.checkoutButton}>
        <Image source={Shop} style={styles.checkoutIcon} />
        <Text style={styles.checkoutText}>CHECKOUT</Text>
      </TouchableOpacity>
    </>
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
    marginBottom: 30,
  },
  logo: {
    alignSelf: 'center',
    marginHorizontal: 140,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: 6,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 20,
  },
  productImage: {
    width: 100,
    height: 150,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 24,
    letterSpacing: 2,
  },
  productAmount: {
    fontSize: 18,
    color: 'red',
    fontWeight: '700',
    letterSpacing: 3,
  },
  removeButton: {
    position: 'absolute',
    right: 0,
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  totalLabel: {
    fontSize: 16,
    letterSpacing: 5,
  },
  totalAmount: {
    fontSize: 22,
    letterSpacing: 6,
    color: 'red',
  },
  checkoutButton: {
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 10,
  },
  checkoutIcon: {
    width: 30,
    height: 30,
  },
  checkoutText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default CartScreen;

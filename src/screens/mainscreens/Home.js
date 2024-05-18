import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';

const Home = () => {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const apihit = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=10&select=title,price`,
      ).then(res => res.json());

      console.log('---------response-----', response);
      setData(prevData => [...prevData, ...response.products]);
    } catch (error) {
      console.log('------------OderHistoryScreen-------error', error);
      ToastAndroid.show(error, ToastAndroid.BOTTOM);
    }
  };

  useEffect(() => {
    apihit();
  }, [offset]);

  const loadMoreData = () => {
    setOffset(prevOffset => prevOffset + limit);
  };

  const Item = ({title, price}) => (
    <View
      style={{
        backgroundColor: '#ddd',
        alignSelf: 'center',
        width: '100%',
        marginTop: 20,
        elevation: 2,
        borderRadius: 5,
        padding: 10,
        flexDirection: 'row',
      }}>
      <View
        style={{
          backgroundColor: '#fff',
          height: 100,
          width: 100,
          borderColor: 'green',
          borderWidth: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: '#000', fontWeight: '500', fontSize: 25}}>
          Image
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          marginLeft: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{color: '#000', fontWeight: '500', fontSize: 25}}>
            {'Title' + ':' + ' '}
          </Text>
          <Text style={{color: '#000', fontWeight: '500', fontSize: 18}}>
            {title}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: '#000', fontWeight: '500', fontSize: 25}}>
            {'Price' + ':' + ' '}
          </Text>
          <Text style={{color: '#000', fontWeight: '500', fontSize: 18}}>
            {'$' + price}
          </Text>
        </View>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => <Item title={item.title} price={item.price} />}
        keyExtractor={item => item.id}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
});

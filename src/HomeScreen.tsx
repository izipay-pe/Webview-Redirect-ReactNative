import {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {WebView} from 'react-native-webview';

interface IData {
  redirect_url: String;
  status: String;
}

const HomeScreen = ({navigation}: {navigation: any}) => {
  const [amount, setAmount] = useState('');
  const [orderId, setOrderId] = useState('');
  const [currency, setCurrency] = useState('');
  const [card, setCard] = useState('');
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    const order = new Date().getTime();
    setOrderId(`Order-${order}`);
  }, []);

  const handleSubmit = async (): Promise<void> => {
    const obj = {
      amount,
      orderId,
      email,
      card,
      currency,
    };
    try {
      const response = await fetch('http://~~SERVER_WEB_VIEW_URL~~/api/init', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(obj),
      });
      const data = await response.json();
      console.log(data);

      // http://webview.success
      setUrl(data.redirect_url);

      setSubmitted(true);
    } catch (error) {
      console.log('error:', error);
    }
  };

  if (submitted)
    return (
      <WebView
        source={{uri: url}}
        allowFileAccess={true}
        scalesPageToFit={true}
        originWhitelist={['*']}
        onLoadProgress={(e)=>{
          console.log('onLoadProccess:', e);
        }}
        onNavigationStateChange={event => {
          if (event.url.includes('http://webview')) {
            console.log(event);

            navigation.navigate(event.url.substring(0, event.url.length - 1));
            setSubmitted(false);
          }
        }}
      />
    );

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: isDarkMode ? '#000000' : '#ffffff',
      }}>
      <Text style={{...styles.text, color: isDarkMode ? '#cccccc' : '#000000'}}>
        Formulario WebView
      </Text>
      <RNPickerSelect
        style={{
          inputAndroid: styles.select,
        }}
        placeholder={{label: 'Select currency'}}
        items={[
          {label: 'PEN', value: '604'},
          {label: 'USD', value: '840'},
        ]}
        onValueChange={setCurrency}
        value={currency}
      />
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        placeholder="Monto"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={orderId}
        onChangeText={setOrderId}
        placeholder="Número de Pedido"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Correo"
        keyboardType="email-address"
      />
      <RNPickerSelect
        style={{
          inputAndroid: styles.select,
        }}
        placeholder={{label: 'Select card'}}
        items={[
          {label: 'VISA', value: 'VISA'},
          {label: 'MASTERCARD', value: 'MASTERCARD'},
          {label: 'DINERS', value: 'DINERS'},
          {label: 'AMEX', value: 'AMEX'},
        ]}
        onValueChange={setCard}
        value={card}
      />
      <Button title="PAGAR" onPress={handleSubmit} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  select: {
    marginBottom: 10,
  },
  button: {},
});

export default HomeScreen;

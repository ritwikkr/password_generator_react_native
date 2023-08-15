import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
// import * as Yup from 'yup';

const App = () => {
  const [passwordLength, setPasswordLength] = useState('');

  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const [lengthError, setLengthError] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);

  function checkPasswordLength(): void {
    if (!passwordLength) {
      setLengthError(true);
    } else {
      setLengthError(false);
      if (
        lowerCase === false &&
        upperCase === false &&
        numbers === false &&
        symbols === false
      ) {
        return setCheckboxError(true);
      }
      setCheckboxError(false);
      generateCharacterString();
    }
  }

  function generateCharacterString(): void {
    let result = '';
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseLetters = 'qwertyuioplkjhgfdsazxcvbnm';
    const numbersLetters = '1234567890';
    const symbolsLetters = '!@#$%^&*()_+';

    if (lowerCase) {
      result += lowerCaseLetters;
    }

    if (upperCase) {
      result += upperCaseLetters;
    }

    if (numbers) {
      result += numbersLetters;
    }

    if (symbols) {
      result += symbolsLetters;
    }

    generatePassword(result);
  }

  function generatePassword(characters: string): void {
    let passwordText = '';
    for (let i = 0; i < +passwordLength; i++) {
      let temp = Math.floor(Math.random() * characters.length);
      passwordText += characters.charAt(temp);
    }
    setPassword(passwordText);
    setIsPasswordGenerated(true);
  }

  return (
    <View style={styles.body}>
      <Text style={styles.mainHeading}>Password Generator</Text>
      <View style={styles.slot1}>
        <Text>Password Length</Text>
        <TextInput
          keyboardType="numeric"
          placeholder="Ex. 8"
          value={passwordLength}
          onChangeText={e => setPasswordLength(e)}
        />
      </View>
      {lengthError && (
        <Text style={styles.errorMsg}>Please provide some length.</Text>
      )}
      {checkboxError && (
        <Text style={styles.errorMsg}>Please Select atleast one checkbox</Text>
      )}
      <View style={[styles.slot1]}>
        <Text>Include Lowercase letters</Text>
        <BouncyCheckbox
          size={25}
          fillColor="red"
          isChecked={lowerCase}
          unfillColor="#FFFFFF"
          iconStyle={{borderColor: 'red'}}
          innerIconStyle={{borderWidth: 2}}
          onPress={() => setLowerCase(!lowerCase)}
        />
      </View>
      <View style={[styles.slot1]}>
        <Text>Include Uppercase letters</Text>
        <BouncyCheckbox
          size={25}
          fillColor="red"
          isChecked={upperCase}
          unfillColor="#FFFFFF"
          iconStyle={{borderColor: 'red'}}
          innerIconStyle={{borderWidth: 2}}
          onPress={() => setUpperCase(!upperCase)}
        />
      </View>
      <View style={[styles.slot1]}>
        <Text>Include Numbers</Text>
        <BouncyCheckbox
          size={25}
          isChecked={numbers}
          fillColor="red"
          unfillColor="#FFFFFF"
          iconStyle={{borderColor: 'red'}}
          innerIconStyle={{borderWidth: 2}}
          onPress={() => setNumbers(!numbers)}
        />
      </View>
      <View style={[styles.slot1]}>
        <Text>Include Symbols</Text>
        <BouncyCheckbox
          size={25}
          isChecked={symbols}
          fillColor="red"
          unfillColor="#FFFFFF"
          iconStyle={{borderColor: 'red'}}
          innerIconStyle={{borderWidth: 2}}
          onPress={() => setSymbols(!symbols)}
        />
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, styles.generateBtn]}
          onPress={checkPasswordLength}>
          <Text style={styles.btnText}>Generate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Reset</Text>
        </TouchableOpacity>
      </View>
      {isPasswordGenerated && (
        <View style={styles.passwordModal}>
          <Text>Long Press to Copy Password</Text>
          <View style={styles.passwordCard}>
            <Text style={styles.passwordText} selectable>
              {password}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  body: {
    padding: 20,
  },
  mainHeading: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  slot1: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkBox: {
    width: 20,
    height: 20,
  },
  buttons: {
    flexDirection: 'row',
    height: 40,
  },
  button: {
    backgroundColor: 'red',
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  generateBtn: {
    backgroundColor: 'blue',
  },
  errorMsg: {
    color: 'red',
  },
  passwordModal: {
    // backgroundColor: 'red',
    marginTop: 20,
    height: 100,
  },
  passwordCard: {
    // backgroundColor: 'blue',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passwordText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

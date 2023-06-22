import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  TextInput,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Image,
  Pressable,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {
  Eye,
  EyeSlash
} from "iconsax-react-native";


// Password meter
import PassMeter from "react-native-passmeter";

// Font Gotham
import { useFonts } from "expo-font";

import { useNavigation } from "@react-navigation/native";

//redux
import { useDispatch } from "react-redux";
import { logUser } from "../../redux/user.js";

// Variables
import * as CONST from "./../../styles/variables.js";

// CSS
import { styles } from "./../../styles/css.js";

// ---------- CODE ----------

const apiURL = "https://sb-api.herokuapp.com/auth/register";

export default function Register() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loaded] = useFonts({
    GothamMedium: require("./../../fonts/GothamMedium.ttf"),
    GothamBook: require("./../../fonts/GothamBook.ttf"),
  });

  // select items
  const [open, setOpen] = useState(false);
  const [valueOrg, setValueOrg] = useState("");
  const [items, setItems] = useState([]);
  const [orgId, setOrgId] = useState("");

  const [openDep, setOpenDep] = useState(false);
  const [valueDep, setValueDep] = useState("");
  const [itemsDep, setItemsDep] = useState([]);

  // fields
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [organization, setOrganization] = useState("");
  const [department, setDepartment] = useState("");
  const [notifications, setNotifications] = useState([
    true,
    false,
    false,
    false,
  ]);


  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch("https://sb-api.herokuapp.com/organizations", {
          method: "GET"
        });

        if (response.ok) {
          const data = await response.json();
          const message = data.message;
          for (let i = 0; i < message.length; i++) {
            const newItem = { label: message[i].name, value: message[i]._id };
            setItems(prevItems => [...prevItems, newItem]);
          }

        } else {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
      } catch (error) {
        console.error(error);
       // Alert.alert("Error", error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [setItemsDep]);



  const loadingScreen = () => {
    return (
      <Image
      source={require("./../../imgs/white-gif-jun.gif")}
        style={{
          height: CONST.screenWidth / 4,
          width: CONST.screenWidth / 4,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 'auto',
          marginBottom: CONST.screenHeight / 2,
        }}
      />
    );
  };

  const handleRegister = async () => {
    try {
      const response = await fetch(
        "https://sb-api.herokuapp.com/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            surname: surname,
            email: email.trim(),
            password: password,
            admin: false,
            department: department.replace(/"/g, ''),
            organization: organization.replace(/"/g, ''),
          }),
        }
      );

      if (response.ok) {
        // registo com sucesso
        // Alert.alert("Registration successful");
        // --->  redireccionar para outra pagina
      } else {
        const errorData = await response.json();
        Alert.alert("Falha no registo!", errorData.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro!", "Ocorreu um erro durante o registo.");
    }
  };

  const validate_email = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    }
    return true;
  };

  const validate_password = (pass, pass2) => {
    if (pass != pass2) {
      alert("As palavras-passe não coincidem.");
      return false;
    }
    if (pass.length < 8) {
      alert("A palavra-passe deve ter no mínimo 8 caracteres.");
      return false;
    }
    return true;
  };

  const submit = () => {
    setLoading(true);

    if (email.trim().length === 0 || validate_email(email.trim()) === false) {
      Alert.alert("Preencha corretamente o campo E-mail");
      setLoading(false);
      return false;
    }
    if (name.trim().length === 0) {
      Alert.alert("Preencha corretamente o campo Nome");
      setLoading(false);
      return false;
    }
    if (surname.trim().length === 0) {
      Alert.alert("Preencha corretamente o campo Apelido");
      setLoading(false);
      return false;
    }
    if (valueOrg == null) {
      Alert.alert("Preencha corretamente o campo Empresa");
      setLoading(false);
      return false;
    }
    if (valueDep == null) {
      Alert.alert("Preencha corretamente o campo Departamento");
      setLoading(false);
      return false;
    }
    if (password.length === 0) {
      Alert.alert("Preencha corretamente o campo Palavra-passe");
      setLoading(false);
      return false;
    }
    if (confirmPassword.length === 0) {
      Alert.alert("Preencha corretamente o campo Confirmar palavra-passe");
      setLoading(false);
      return false;
    }
    if (!validate_password(password, confirmPassword)) {
      setLoading(false);
      return false;
    }
    handleRegister();
    navigation.navigate("Login");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="light" />
      <ScrollView>
        <Text
          accessible={true}
          accessibilityLabel="Texto na cor branca num fundo azul escuro escrito Regista-te."
          style={styles.titleTextWhite}
        >
          Regista-te
        </Text>
        <Text
          accessible={true}
          accessibilityLabel="Texto na cor branca num fundo azul escuro escrito  Estamos contentes por teres tomado esta iniciativa. Vem fazer energy breaks."
          style={[styles.normalTextWhite, { paddingTop: CONST.boxPadding, paddingBottom: CONST.inputMargin }]}>
          Estamos contentes por teres tomado esta iniciativa. Vem fazer energy
          breaks.
        </Text>
      </ScrollView>

      {loading ? (
        loadingScreen()
      ) : (
        <View style={styles.subContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ paddingBottom: CONST.cardPadding }}
          >
            <Text
              accessible={true}
              accessibilityLabel="Texto na cor preta num fundo branco escrito Nome."
              style={styles.inputLabel}
            >
              Nome
            </Text>
            <TextInput
              accessible={true}
              accessibilityLabel="Campo para introdução do Nome."
              style={styles.inputField}
              onChangeText={(text) => setName(text)}
            />

            <Text
              accessible={true}
              accessibilityLabel="Texto na cor preta num fundo branco escrito Sobrenome."
              style={styles.inputLabel}
            >
              Sobrenome
            </Text>
            <TextInput
              accessible={true}
              accessibilityLabel="Campo para introdução do Sobrenome."
              style={styles.inputField}
              onChangeText={(text) => setSurname(text)}
            />

            <Text
              accessible={true}
              accessibilityLabel="Texto na cor preta num fundo branco escrito E-mail."
              style={styles.inputLabel}
            >
              E-mail
            </Text>
            <TextInput
              accessible={true}
              accessibilityLabel="Campo para introdução do E-mail."
              style={styles.inputField}
              onChangeText={(text) => setEmail(text.toLowerCase())}
            />

            <Text
              accessible={true}
              accessibilityLabel="Texto na cor preta num fundo branco escrito Empresa."
              style={[styles.inputLabel, { paddingBottom: 0 }]}
            >
              Empresa
            </Text>
            <DropDownPicker
              selectedItemContainerStyle={{

                fontFamily: "GothamBook",
                fontSize: CONST.pageSmallTextSize,
                color: CONST.darkerColor
              }}
              zIndex={1000}
              autoScroll={true}
              open={open}
              value={valueOrg}
              items={items}
              setOpen={setOpen}
              setValue={setValueOrg}
              setItems={setItems}
              style={styles.inputField}
              placeholder=""
              multiple={false}
              showTickIcon={false}
              textStyle={{
                fontFamily: "GothamBook",
                fontSize: CONST.pageSmallTextSize,
              }}
              closeAfterSelecting={true}
              onSelectItem={(item) => {
                setOrganization(JSON.stringify(item.value));

                const apiURLDep = "https://sb-api.herokuapp.com/departments/organization/" + JSON.stringify(item.value).replace(/"/g, '');

                async function fetchDataDep() {
                  try {
                    const response = await fetch(apiURLDep, {
                      method: "GET"
                    });

                    if (response.ok) {
                      const data = await response.json();
                      // Alert.alert(JSON.stringify(data));
                      const message = data.message;
                      for (let i = 0; i < message.length; i++) {
                        const newItem = { label: message[i].name, value: message[i]._id };
                        setItemsDep(prevItems => [...prevItems, newItem]);
                      }

                    } else {
                      const errorData = await response.json();
                      throw new Error(errorData.message);
                    }
                  } catch (error) {
                    console.error(error);
                    //Alert.alert("Error", error.message);
                  }
                }

                fetchDataDep();

              }}
            />
            <Text
              accessible={true}
              accessibilityLabel="Texto na cor preta num fundo branco escrito Departamento."
              style={[styles.inputLabel, { paddingBottom: 0 }]}
            >
              Departamento
            </Text>
            <DropDownPicker
              zIndex={10}
              autoScroll={true}
              open={openDep}
              value={valueDep}
              items={itemsDep}
              setOpen={setOpenDep}
              setValue={setValueDep}
              setItems={setItemsDep}
              style={styles.inputField}
              placeholder=""
              multiple={false}
              showTickIcon={false}
              closeAfterSelecting={true}
              textStyle={{
                fontFamily: "GothamBook",
                fontSize: CONST.pageSmallTextSize,
              }}
              onSelectItem={(item) => {
                setDepartment(JSON.stringify(item.value));
              }}
            />

            <Text
              accessible={true}
              accessibilityLabel="Texto na cor preta num fundo branco escrito Palavra-passe."
              style={styles.inputLabel}
            >
              Palavra-passe
            </Text>
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <TextInput
                secureTextEntry={showPassword ? false : true}
                style={[styles.inputField, { width: '90%' }]}
                accessible={true}
                accessibilityLabel="Campo para introdução da Palavra-passe."
                onChangeText={(text) => setPassword(text)}
              />
              {showPassword ?
                <EyeSlash
                  style={{ marginLeft: 'auto', marginRight: 'auto' }}
                  size={CONST.pageSubtitleSize}
                  color={CONST.darkerColor}
                  onPress={() => setShowPassword(!showPassword)}
                />
                :
                <Eye
                  style={{ marginLeft: 'auto', marginRight: 'auto' }}
                  size={CONST.pageSubtitleSize}
                  color={CONST.darkerColor}
                  onPress={() => setShowPassword(!showPassword)}
                />}
            </View>
            <View style={styles.passwordProgressBar}>
              <PassMeter
                showLabels={false}
                password={password}
                maxLength={15}
                minLength={8}
                labels={[]}
              />
            </View>
            <Text
              accessible={true}
              accessibilityLabel="Texto na cor preta num fundo branco escrito Confirmar nova palavra-passe."
              style={styles.inputLabel}
            >
              Confirmar nova palavra-passe
            </Text>
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <TextInput
                secureTextEntry={showPasswordConfirm ? false : true}
                style={[styles.inputField, { width: '90%' }]}
                onChangeText={(text) => setConfirmPassword(text)}
              />
              {showPasswordConfirm ?
                <EyeSlash
                  style={{ marginLeft: 'auto', marginRight: 'auto' }}
                  size={CONST.pageSubtitleSize}
                  color={CONST.darkerColor}
                  onPress={() => setShowPasswordConfirm(!showPasswordConfirm)}
                />
                :
                <Eye
                  style={{ marginLeft: 'auto', marginRight: 'auto' }}
                  size={CONST.pageSubtitleSize}
                  color={CONST.darkerColor}
                  onPress={() => setShowPasswordConfirm(!showPasswordConfirm)}
                />}
            </View>
          </ScrollView>

          <Pressable
            accessible={true}
            accessibilityLabel="Botão da cor azul escura num fundo branco com o objetivo de efetuar o registo. Tem escrito na cor branca a palavra Registar."
            onPress={() => submit()}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>Registar</Text>
          </Pressable>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import { StyleSheet, ScrollView, View, Text, Dimensions, Pressable } from "react-native";
import { ArrowCircleUp } from "iconsax-react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useScrollToTop } from '@react-navigation/native';

// Font Gotham
import { useFonts } from "expo-font";

export default function TermsofUseProfile() {
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

  
  const content = useRef();

  if (!loaded) {
    return null; // Returns null if unable to load the font
  }
  const onPressTouch = () => {
    content.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar style="auto" />
      <Pressable style={styles.arrow} onPress={onPressTouch} >
        <ArrowCircleUp variant="Bold" color="#0051BA" size="60" />
      </Pressable>
      <ScrollView ref={content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Termos de utilização</Text>
        <View>
          <Text style={styles.subtitle}>
            Termos e condições gerais de uso do aplicativo Smart Break.
          </Text>
          <Text style={styles.text}>
            A plataforma visa licenciar o uso do aplicativo e demais ativos de
            propriedade intelectual, fornecendo ferramentas para auxiliar e
            dinamizar o dia a dia dos utilizadores. O presente Termo estabelece
            obrigações contratadas de livre e espontânea vontade, por tempo
            indeterminado, entre a plataforma e as pessoas físicas ou jurídicas,
            utilizadores do aplicativo Smart Break. Ao utilizar a plataforma o
            utilizador aceita integralmente as presentes normas e compromete-se
            a observá-las, sob o risco de aplicação de penalidades.
          </Text>
          <Text style={styles.subtitle}>Registo:</Text>
          <Text style={styles.text}>
            Após a confirmação do registo, o utilizador possuirá um login e uma
            senha pessoal, a qual assegura ao utilizador o acesso individual à
            mesma. Desta forma, compete ao utilizador exclusivamente a
            manutenção de referida senha de maneira confidencial e segura,
            evitando o acesso indevido às informações pessoais. O utilizador
            poderá, a qualquer tempo, requerer o cancelamento de seu registo
            junto ao aplicativo Smart Break. O utilizador, ao aceitar os Termos
            e Política de Privacidade, autoriza expressamente a aplicação a
            coletar, usar, armazenar, tratar, ceder ou utilizar as informações
            derivadas do uso dos serviços, do site e quaisquer plataformas,
            incluindo todas as informações preenchidas pelo utilizador no
            momento em que realizar ou atualizar o seu registo, além de outras
            expressamente descritas na Política de Privacidade que deverá ser
            autorizada pelo usuário.
          </Text>
          <Text style={styles.subtitle}>Suporte:</Text>
          <Text style={styles.text}>
            Em caso de qualquer dúvida, sugestão ou problema com a utilização da
            aplicação, o utilizador poderá entrar em contato com o suporte,
            através do email suporte@smarkbreak.pt.
          </Text>
          <Text style={styles.subtitle}>Responsabilidade:</Text>
          <Text style={styles.text}>
            É de responsabilidade do utilizador: a. defeitos ou vícios técnicos
            originados no próprio sistema do utilizador; b. pela proteção aos
            dados de acesso à sua conta/perfil (login e senha).
          </Text>
          <Text style={styles.text}>
            É de responsabilidade da aplicação Smart Break: a. indicar as
            características do serviço ou produto; b. os conteúdos ou atividades
            ilícitas praticadas através da sua plataforma.
          </Text>
          <Text style={styles.text}>
            A plataforma não se responsabiliza por links externos contidos em
            seu sistema que possam redirecionar o utilizador a ambiente externo
            a sua rede. Não poderão ser incluídos links externos ou páginas que
            sirvam para fins comerciais ou publicitários ou quaisquer
            informações ilícitas, violentas, polêmicas, pornográficas,
            xenofóbicas, discriminatórias ou ofensivas.
          </Text>
          <Text style={styles.subtitle}>Alterações:</Text>
          <Text style={styles.text}>
            Os itens descritos no presente instrumento poderão sofrer
            alterações, unilateralmente e a qualquer tempo, por parte da empresa
            responsável pelo Smart Break, para adequar ou modificar os serviços,
            bem como para atender novas exigências legais. As alterações serão
            veiculadas pelo aplicativo SmartBreak e o utilizador poderá optar
            por aceitar ao não o novo conteúdo.
          </Text>
          <Text style={styles.subtitle}>Política de privacidade:</Text>
          <Text style={styles.text2}>
            Além do presente Termo, o utilizador deverá consentir com as
            disposições contidas na respectiva Política de Privacidade a ser
            apresentada a todos os interessados dentro da interface do
            aplicativo.            
          </Text>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 90,
  },

  arrow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    position: 'absolute',
    right: 25,
    bottom: 115,
    zIndex: 10,
    backgroundColor: '#FFF',
    borderRadius: 50,
  },

  title: {
    fontFamily: "GothamMedium",
    fontSize: 24,
    marginTop: 30,
  },

  subtitle: {
    fontFamily: "GothamMedium",
    fontSize: 16,
    marginTop: 30,
    lineHeight: 24,
  },

  text: {
    fontFamily: "GothamBook",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
    color: "#444444",
  },

  text2: {
    fontFamily: "GothamBook",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
    color: "#444444",
    paddingBottom: 25,
  },
});

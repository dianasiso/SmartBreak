import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import { StyleSheet, ScrollView, View, Text, Dimensions, Pressable } from "react-native";
import { ArrowCircleUp } from "iconsax-react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useScrollToTop } from '@react-navigation/native';

// Font Gotham
import { useFonts } from "expo-font";

// CSS
import { styles } from "./../../styles/css.js";
// Variables
import * as CONST from "./../../styles/variables.js";


export default function TermsofUseProfile() {
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

  
  const content = useRef();

  const onPressTouch = () => {
    content.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }

  return (
    <SafeAreaProvider style={styles.containerLight}>
      <StatusBar style="dark" />
      <Pressable style={styles.arrow} onPress={onPressTouch} >
        <ArrowCircleUp variant="Bold" color={CONST.mainBlue} size="50" />
      </Pressable>
        <ScrollView ref={content} showsVerticalScrollIndicator={false}>
        <Text style={styles.titleText}>Termos de utilização</Text>
        
          <Text style={[styles.normalText, {fontFamily: 'GothamMedium',marginTop: CONST.textPadding}]}>
            Termos e condições gerais de uso do aplicativo Smart Break.
          </Text>
          <Text style={styles.normalText}>
          {"\n"}A plataforma visa licenciar o uso do aplicativo e demais ativos de
            propriedade intelectual, fornecendo ferramentas para auxiliar e
            dinamizar o dia a dia dos utilizadores. O presente Termo estabelece
            obrigações contratadas de livre e espontânea vontade, por tempo
            indeterminado, entre a plataforma e as pessoas físicas ou jurídicas,
            utilizadores do aplicativo Smart Break. Ao utilizar a plataforma o
            utilizador aceita integralmente as presentes normas e compromete-se
            a observá-las, sob o risco de aplicação de penalidades.
          </Text>
          <Text style={[styles.normalText, {marginTop: CONST.textPadding, fontFamily: 'GothamMedium'}]}>
            Registo:
          </Text>
          <Text style={styles.normalText}>
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
          <Text style={[styles.normalText, {marginTop: CONST.textPadding, fontFamily: 'GothamMedium'}]}>
            Suporte:
          </Text>
          <Text style={styles.normalText}>
            Em caso de qualquer dúvida, sugestão ou problema com a utilização da
            aplicação, o utilizador poderá entrar em contato com o suporte,
            através do email suporte@smarkbreak.pt.
          </Text>
          <Text style={[styles.normalText, {marginTop: CONST.textPadding, fontFamily: 'GothamMedium'}]}>
            Responsabilidade:
          </Text>
          <Text style={styles.normalText}>
            É de responsabilidade do utilizador: a. defeitos ou vícios técnicos
            originados no próprio sistema do utilizador; b. pela proteção aos
            dados de acesso à sua conta/perfil (login e senha).
          
            É de responsabilidade da aplicação Smart Break: a. indicar as
            características do serviço ou produto; b. os conteúdos ou atividades
            ilícitas praticadas através da sua plataforma.
          
            A plataforma não se responsabiliza por links externos contidos em
            seu sistema que possam redirecionar o utilizador a ambiente externo
            a sua rede. Não poderão ser incluídos links externos ou páginas que
            sirvam para fins comerciais ou publicitários ou quaisquer
            informações ilícitas, violentas, polêmicas, pornográficas,
            xenofóbicas, discriminatórias ou ofensivas.
          </Text>
          <Text style={[styles.normalText, {marginTop: CONST.textPadding, fontFamily: 'GothamMedium'}]}>
            Alterações:</Text>
          <Text style={styles.normalText}>
            Os itens descritos no presente instrumento poderão sofrer
            alterações, unilateralmente e a qualquer tempo, por parte da empresa
            responsável pelo Smart Break, para adequar ou modificar os serviços,
            bem como para atender novas exigências legais. As alterações serão
            veiculadas pelo aplicativo SmartBreak e o utilizador poderá optar
            por aceitar ao não o novo conteúdo.
          </Text>
          <Text style={[styles.normalText, {marginTop: CONST.textPadding, fontFamily: 'GothamMedium'}]}>
            Política de privacidade:</Text>
          <Text style={styles.normalText}>
            Além do presente Termo, o utilizador deverá consentir com as
            disposições contidas na respectiva Política de Privacidade a ser
            apresentada a todos os interessados dentro da interface do
            aplicativo.            
          </Text>
      </ScrollView>
    </SafeAreaProvider>
  );
}

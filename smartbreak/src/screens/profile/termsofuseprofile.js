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
import { dark_styles } from "../../styles/darkcss.js";

// Variables
import * as CONST from "./../../styles/variables.js";

import { useSelector } from "react-redux";


export default function TermsofUseProfile() {
  const userData = useSelector((state) => state.user);
  const dark_mode = userData.accessibility[1]

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
    <SafeAreaProvider style={[dark_mode ? dark_styles.containerLight : styles.containerLight, {paddingTop: CONST.backgroundPaddingTop/2}]}>
      <StatusBar style={dark_mode ? "light" : "dark" } />
      <Pressable 
        accessible={true}
        accessibilityLabel="Botão circular na cor azul com o objetivo de regressar ao topo do ecrã. Tem uma seta a apontar para o topo."
        style={dark_mode ? dark_styles.arrow : styles.arrow} onPress={onPressTouch} >
        <ArrowCircleUp variant="Bold" color={dark_mode ? CONST.thirdBlue : CONST.mainBlue} size="50" />
      </Pressable>
        <ScrollView ref={content} showsVerticalScrollIndicator={false}>
        <Text 
          accessible={true}
          accessibilityLabel="Texto escrito Termos de utilização. É o título da página."
          style={dark_mode ? dark_styles.titleText : styles.titleText}>Termos de utilização{"\n"}</Text>
        
          <Text 
            accessible={true}
            accessibilityLabel="Termos e condições gerais de uso do aplicativo Smart Break."
            style={[dark_mode ? dark_styles.normalText : styles.normalText, {fontFamily: 'GothamMedium', marginTop: CONST.textPadding}]}>
            Termos e condições gerais de uso do aplicativo Smart Break.
          </Text>
          <Text 
            accessible={true}
            accessibilityLabel="A plataforma visa licenciar o uso do aplicativo e demais ativos de
            propriedade intelectual, fornecendo ferramentas para auxiliar e
            dinamizar o dia a dia dos utilizadores. O presente Termo estabelece
            obrigações contratadas de livre e espontânea vontade, por tempo
            indeterminado, entre a plataforma e as pessoas físicas ou jurídicas,
            utilizadores do aplicativo Smart Break. Ao utilizar a plataforma o
            utilizador aceita integralmente as presentes normas e compromete-se
            a observá-las, sob o risco de aplicação de penalidades."
            style={dark_mode ? dark_styles.normalText : styles.normalText}>
            {"\n"}A plataforma visa licenciar o uso do aplicativo e demais ativos de
            propriedade intelectual, fornecendo ferramentas para auxiliar e
            dinamizar o dia a dia dos utilizadores. O presente Termo estabelece
            obrigações contratadas de livre e espontânea vontade, por tempo
            indeterminado, entre a plataforma e as pessoas físicas ou jurídicas,
            utilizadores do aplicativo Smart Break. Ao utilizar a plataforma o
            utilizador aceita integralmente as presentes normas e compromete-se
            a observá-las, sob o risco de aplicação de penalidades.
          </Text>
          <Text 
            accessible={true}
            accessibilityLabel="Registro."
            style={[dark_mode ? dark_styles.normalText : styles.normalText, {marginTop: CONST.textPadding, fontFamily: 'GothamMedium'}]}>
            Registo:
          </Text>
          <Text 
            accessible={true}
            accessibilityLabel="Após a confirmação do registo, o utilizador possuirá um login e uma
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
            autorizada pelo usuário."
            style={dark_mode ? dark_styles.normalText : styles.normalText}>
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
          <Text 
            accessible={true}
            accessibilityLabel="Suporte."
            style={[dark_mode ? dark_styles.normalText : styles.normalText, {marginTop: CONST.textPadding, fontFamily: 'GothamMedium'}]}>
            Suporte:
          </Text>
          <Text 
            accessible={true}
            accessibilityLabel=" Em caso de qualquer dúvida, sugestão ou problema com a utilização da
            aplicação, o utilizador poderá entrar em contato com o suporte,
            através do email suporte@smarkbreak.pt."
            style={dark_mode ? dark_styles.normalText : styles.normalText}>
            Em caso de qualquer dúvida, sugestão ou problema com a utilização da
            aplicação, o utilizador poderá entrar em contato com o suporte,
            através do email suporte@smarkbreak.pt.
          </Text>
          <Text 
            accessible={true}
            accessibilityLabel="Responsabilidade."
            style={[dark_mode ? dark_styles.normalText : styles.normalText, {marginTop: CONST.textPadding, fontFamily: 'GothamMedium'}]}>
            Responsabilidade:
          </Text>
          <Text 
            accessible={true}
            accessibilityLabel=" É de responsabilidade do utilizador: a. defeitos ou vícios técnicos
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
            xenofóbicas, discriminatórias ou ofensivas."
            style={dark_mode ? dark_styles.normalText : styles.normalText}>
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
          <Text 
            accessible={true}
            accessibilityLabel="Alterações."
            style={[dark_mode ? dark_styles.normalText : styles.normalText, {marginTop: CONST.textPadding, fontFamily: 'GothamMedium'}]}>
            Alterações:</Text>
          <Text 
            accessible={true}
            accessibilityLabel="Os itens descritos no presente instrumento poderão sofrer
            alterações, unilateralmente e a qualquer tempo, por parte da empresa
            responsável pelo Smart Break, para adequar ou modificar os serviços,
            bem como para atender novas exigências legais. As alterações serão
            veiculadas pelo aplicativo SmartBreak e o utilizador poderá optar
            por aceitar ao não o novo conteúdo."
            style={dark_mode ? dark_styles.normalText : styles.normalText}>
            Os itens descritos no presente instrumento poderão sofrer
            alterações, unilateralmente e a qualquer tempo, por parte da empresa
            responsável pelo Smart Break, para adequar ou modificar os serviços,
            bem como para atender novas exigências legais. As alterações serão
            veiculadas pelo aplicativo SmartBreak e o utilizador poderá optar
            por aceitar ao não o novo conteúdo.
          </Text>
          <Text 
            accessible={true}
            accessibilityLabel="Política de privacidade."
            style={[dark_mode ? dark_styles.normalText : styles.normalText, {marginTop: CONST.textPadding, fontFamily: 'GothamMedium'}]}>
            Política de privacidade:</Text>
          <Text 
            accessible={true}
            accessibilityLabel="Além do presente Termo, o utilizador deverá consentir com as
            disposições contidas na respectiva Política de Privacidade a ser
            apresentada a todos os interessados dentro da interface do
            aplicativo."
            style={dark_mode ? dark_styles.normalText : styles.normalText}>
            Além do presente Termo, o utilizador deverá consentir com as
            disposições contidas na respectiva Política de Privacidade a ser
            apresentada a todos os interessados dentro da interface do
            aplicativo.            
          </Text>
      </ScrollView>
    </SafeAreaProvider>
  );
}

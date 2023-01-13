import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";

export default function TermsofUseProfile() {
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={{ marginTop: 30 }}>Termos de utilização</Text>
      <View>
        <Text style={{ marginTop: 30, lineHeight: 24 }}>
          Termos e condições gerais de uso do aplicativo Smart Break.
        </Text>
        <Text style={{ marginTop: 10, lineHeight: 24, color: "#444444" }}>
          A plataforma visa licenciar o uso do aplicativo e demais ativos de
          propriedade intelectual, fornecendo ferramentas para auxiliar e
          dinamizar o dia a dia dos utilizadores. O presente Termo estabelece
          obrigações contratadas de livre e espontânea vontade, por tempo
          indeterminado, entre a plataforma e as pessoas físicas ou jurídicas,
          utilizadores do aplicativo Smart Break. Ao utilizar a plataforma o
          utilizador aceita integralmente as presentes normas e compromete-se a
          observá-las, sob o risco de aplicação de penalidades.
        </Text>
        <Text style={{ marginTop: 30, lineHeight: 24 }}>Cadastro:</Text>
        <Text style={{ marginTop: 10, lineHeight: 24, color: "#444444" }}>
          Após a confirmação do cadastro, o utilizador possuirá um login e uma
          senha pessoal, a qual assegura ao utilizador o acesso individual à
          mesma. Desta forma, compete ao utilizador exclusivamente a manutenção
          de referida senha de maneira confidencial e segura, evitando o acesso
          indevido às informações pessoais. O utilizador poderá, a qualquer
          tempo, requerer o cancelamento de seu cadastro junto ao aplicativo
          Smart Break. O utilizador, ao aceitar os Termos e Política de
          Privacidade, autoriza expressamente a aplicação a coletar, usar,
          armazenar, tratar, ceder ou utilizar as informações derivadas do uso
          dos serviços, do site e quaisquer plataformas, incluindo todas as
          informações preenchidas pelo utilizador no momento em que realizar ou
          atualizar o seu cadastro, além de outras expressamente descritas na
          Política de Privacidade que deverá ser autorizada pelo usuário.
        </Text>
        <Text style={{ marginTop: 30, lineHeight: 24 }}>Suporte:</Text>
        <Text style={{ marginTop: 10, lineHeight: 24, color: "#444444" }}>
          Em caso de qualquer dúvida, sugestão ou problema com a utilização da
          aplicação, o utilizador poderá entrar em contato com o suporte,
          através do email suporte@smarkbreak.pt.
        </Text>
        <Text style={{ marginTop: 30, lineHeight: 24 }}>Responsabilidade:</Text>
        <Text style={{ marginTop: 10, lineHeight: 24, color: "#444444" }}>
          É de responsabilidade do utilizador: a) defeitos ou vícios técnicos
          originados no próprio sistema do utilizador; d) pela proteção aos
          dados de acesso à sua conta/perfil (login e senha).
        </Text>
        <Text style={{ marginTop: 10, lineHeight: 24, color: "#444444" }}>
          É de responsabilidade da aplicação Smart Break: a) indicar as
          características do serviço ou produto; d) os conteúdos ou atividades
          ilícitas praticadas através da sua plataforma.
        </Text>
        <Text style={{ marginTop: 10, lineHeight: 24, color: "#444444" }}>
          A plataforma não se responsabiliza por links externos contidos em seu
          sistema que possam redirecionar o utilizador a ambiente externo a sua
          rede. Não poderão ser incluídos links externos ou páginas que sirvam
          para fins comerciais ou publicitários ou quaisquer informações
          ilícitas, violentas, polêmicas, pornográficas, xenofóbicas,
          discriminatórias ou ofensivas
        </Text>
        <Text style={{ marginTop: 30, lineHeight: 24 }}>Alterações:</Text>
        <Text style={{ marginTop: 10, lineHeight: 24, color: "#444444" }}>
          Os itens descritos no presente instrumento poderão sofrer alterações,
          unilateralmente e a qualquer tempo, por parte da empresa responsável
          pelo Smart Break, para adequar ou modificar os serviços, bem como para
          atender novas exigências legais. As alterações serão veiculadas pelo
          aplicativo SmartBreak e o utilizador poderá optar por aceitar ao não o
          novo conteúdo.
        </Text>
        <Text style={{ marginTop: 30, lineHeight: 24 }}>
          Política de privacidade:
        </Text>
        <Text style={{ marginTop: 10, lineHeight: 24, color: "#444444" }}>
          Além do presente Termo, o utilizador deverá consentir com as
          disposições contidas na respectiva Política de Privacidade a ser
          apresentada a todos os interessados dentro da interface do aplicativo.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 25,
    paddingRight: 25,
  },
});

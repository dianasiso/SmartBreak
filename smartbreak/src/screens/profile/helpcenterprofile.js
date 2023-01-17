import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { ArrowCircleUp } from "iconsax-react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Font Gotham
import { useFonts } from "expo-font";

export default function TermsofUseProfile() {
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar style="auto" />
        {/*<View style={styles.arrow}>
          <ArrowCircleUp variant="Bold" color="#0051BA" size="65" />
  </View>*/}
        <Text style={styles.title}>Centro de ajuda</Text>
        <View>
          <Text style={styles.subtitle}>Como usar a Smart Break</Text>
          <Text style={styles.text}>
            Esta página serve como guia para o uso da Smart Break!
          </Text>
          <Text style={styles.text}>
            Após o login, és redirecionado para a página do Painel, onde vais
            encontrar a tua bateria pessoal. Para a ver encher, podes adicionar
            pausas. O teu contributo poderá ainda afetar a tua bateria de
            equipa, que podes consultar fazendo um swipe right ou clicar na
            opção “Bateria de equipa” no topo da página. Por fim, as métricas
            servem para que tenhas uma noção mais real do contributo que estás a
            ter.
          </Text>
          <Text style={styles.text}>
            À medida que o teu impacto aumenta, também as tuas recompensas. Para
            as ver basta ires ao teu perfil na secção “As minhas recompensas”.
            Já para ver as dos teus colegas, clicas no botão “Ver equipa” na
            bateria de equipa no Painel e escolhes o utilizador de quem queres
            ver as recompensas. Estas nem sempre estão vísiveis, já que te damos
            a opção de não as mostrares aos restantes membros da tua equipa.
          </Text>
          <Text style={styles.text}>
            Através da barra de navegação consegues navegar por páginas como os
            Objetivos e as Estatísticas. A primeira página permite-te ver os
            objetivos que foram pensados pela tua empresa e ainda te dão dicas
            de como te ajudar a alcançar esses objetivos. Já a segunda página
            mencionada dá-te a possibilidade de monitorizar a tua produtividade
            e o teu consumo energético individual ou da tua equipa.
          </Text>
          <Text style={styles.text}>
            Por fim, tens o Perfil, onde tens acesso a páginas como os teus
            equipamentos - onde podes dar setup ao teu ambiente de trabalho - as
            tuas rotinas - onde podes criar horáros pré-definidos para inserções
            de pausas automáticas - e o teu histórico de pausas. Nestas três
            páginas tens ainda a oportunidade de apagar algum item clicando
            prolongadamente na secção que desejas!
          </Text>
          <Text style={styles.text}>
            A equipa Smart Break agradece por instalares a aplicação e ajudares
            a contribuir para a diminuição do desperdício e excesso de energia.
            Em caso de dúvidas, contacta-nos através de suporte@smarkbreak.pt.
          </Text>
          <Text style={styles.text}>
            Smart Break. Converte o teu tempo em lucro e lazer.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 100,
  },

  arrow: {
    position: "absolute",
    bottom: 10,
    right: 10,
    zIndex: 1,
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
});

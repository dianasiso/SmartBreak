import { StyleSheet } from "react-native";

// IMPORT VARIABLES FROM VARIABLES.JS FILE
import * as CONST from "./variables.js";

export const styles = StyleSheet.create({
  // ---- GENERAL -----
  mainContainer: {
    flex: 1,
    paddingTop: CONST.backgroundPaddingTop,
    backgroundColor: CONST.mainBlue,
    width: CONST.screenWidth,
  },
  mainContainerLight: {
    flex: 1,
    paddingTop: CONST.backgroundPaddingTop,
    backgroundColor: CONST.lightBackgroundColor,
    width: CONST.screenWidth,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: CONST.backgroundPaddingLateral,
    paddingRight: CONST.backgroundPaddingLateral,
    paddingTop: CONST.backgroundPaddingTop,
    backgroundColor: CONST.mainBlue,
    width: CONST.screenWidth,
  },
  containerLight: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: CONST.backgroundPaddingLateral,
    paddingRight: CONST.backgroundPaddingLateral,
    paddingTop: CONST.backgroundPaddingTop,
    backgroundColor: CONST.lightBackgroundColor,
    width: CONST.screenWidth,
  },
  dashboardContainer: {
    position: "absolute",
    top: 0,
    width: CONST.screenWidth,
    flexDirection: "column",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: CONST.largeCardRadius,
    borderBottomLeftRadius: CONST.largeCardRadius,
    paddingLeft: CONST.cardPadding,
    paddingRight: CONST.cardPadding,
    paddingBottom: CONST.cardPadding + 10,
    paddingTop: CONST.backgroundPaddingTop + CONST.backgroundPaddingLateral,
    maxHeight: 440, //adicionei maxheight e já dá
  },
  subContainer: {
    backgroundColor: CONST.lightBackgroundColor,
    position: "absolute",
    bottom: 0,
    width: CONST.screenWidth,
    flexDirection: "column",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopRightRadius: CONST.largeCardRadius,
    borderTopLeftRadius: CONST.largeCardRadius,
    paddingLeft: CONST.cardPadding,
    paddingRight: CONST.cardPadding,
    paddingBottom: CONST.cardPadding + 10,
    paddingTop: CONST.cardPadding + 10,
    maxHeight: (CONST.screenHeight / 3) * 2,
  },
  primaryButtonText: {
    fontFamily: "GothamMedium",
    color: CONST.primaryButtonTextColor,
    fontSize: CONST.normalButtonSize,
    textAlign: "center",
  },
  buttonWhiteText: {
    fontFamily: "GothamMedium",
    color: CONST.mainBlue,
    fontSize: CONST.normalButtonSize,
    textAlign: "center",
  },
  secondaryButtonText: {
    fontFamily: "GothamMedium",
    color: CONST.secondaryButtonTextColor,
    fontSize: CONST.normalButtonSize,
    textAlign: "center",
  },
  primaryButton: {
    backgroundColor: CONST.primaryButtonBackground,
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: CONST.heightButton,
    borderRadius: CONST.normalButtonRadius,
    margin: 5,
    borderWidth: 1,
    borderColor: CONST.primaryButtonBorderColor,
  },
  buttonWhite: {
    backgroundColor: CONST.lightBackgroundColor,
    justifyContent: "center",
    height: CONST.heightButton,
    borderRadius: CONST.normalButtonRadius,
    margin: 5,
    borderWidth: 1,
    borderColor: CONST.lightBackgroundColor,
  },
  secondaryButton: {
    backgroundColor: CONST.secondaryButtonBackground,
    justifyContent: "center",
    height: CONST.heightButton,
    borderRadius: CONST.normalButtonRadius,
    margin: 5,
    borderWidth: 1,
    borderColor: CONST.secondaryButtonBorderColor,
  },
  titleText: {
    fontSize: CONST.pageTitleSize,
    fontFamily: "GothamMedium",
    color: CONST.darkerColor,
  },
  titleTextWhite: {
    fontSize: CONST.pageTitleSize,
    fontFamily: "GothamMedium",
    color: CONST.whiteText,
  },
  normalText: {
    fontSize: CONST.pageTextSize,
    fontFamily: "GothamBook",
    lineHeight: CONST.pageTextSize + 5,
    color: CONST.darkerColor,
  },
  smallText: {
    fontSize: CONST.pageSmallTextSize,
    fontFamily: "GothamBook",
    lineHeight: CONST.pageTextSize + 5,
    color: CONST.darkerColor,
  },
  normalTextWhite: {
    fontSize: CONST.pageTextSize,
    fontFamily: "GothamBook",
    lineHeight: CONST.pageTextSize + 5,
    color: CONST.whiteText,
  },
  logoText: {
    textAlign: "center",
    fontFamily: "GothamMedium",
    color: CONST.whiteText,
    fontSize: CONST.welcomeLogoText,
    paddingTop: CONST.textPadding,
  },
  inputLabel: {
    fontFamily: "GothamBook",
    fontSize: CONST.pageTextSize,
    color: CONST.darkerColor,
    textAlign: "left",
    paddingBottom: CONST.inputPadding,
  },
  inputLabelWhite: {
    fontFamily: "GothamBook",
    fontSize: CONST.pageTextSize,
    color: CONST.whiteText,
    textAlign: "left",
    paddingBottom: CONST.inputPadding,
  },
  inputField: {
    fontFamily: "GothamBook",
    fontSize: CONST.pageSmallTextSize,
    borderBottomColor: CONST.darkerColor,
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 0,
    marginBottom: CONST.inputMargin,
    color: CONST.darkerColor,
  },
  inputFieldWhite: {
    fontFamily: "GothamBook",
    fontSize: CONST.pageSmallTextSize,
    borderBottomColor: CONST.whiteText,
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 0,
    marginBottom: CONST.inputMargin,
    color: CONST.whiteText,
  },
  boxOptions: {
    paddingLeft: CONST.boxMargin,
    paddingRight: CONST.boxMargin,
    paddingTop: CONST.boxPadding,
    paddingBottom: CONST.boxPadding,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: CONST.dividerColor,
    flexDirection: "row",
    alignItems: "center",
  },
  boxOptionsPressed: {
    marginBottom: CONST.boxMargin,
    paddingLeft: CONST.boxMargin,
    paddingRight: CONST.boxMargin,
    paddingTop: CONST.boxPadding,
    paddingBottom: CONST.boxPadding,
    borderBottomWidth: 1,
    borderBottomColor: CONST.dividerColor,
    opacity: 0.5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  boxIcon: {
    color: CONST.darkerColor,
    marginRight: CONST.boxPadding,
  },

  // ---- MAIN NAVIGATION ----
  IconContainer: {},
  Indicator: {
    width: 50,
    height: 3,
    backgroundColor: CONST.mainBlue,
    borderRadius: 5,
    top: -15,
  },
  IndicatorError: {
    width: 50,
    height: 3,
    backgroundColor: "#FFF",
    borderRadius: 5,
    top: -15,
  },

  // --- RETURN TOP BUTTON ON STACK NAV --- //
  returnTopButton: {
    paddingLeft: 20,
  },

  // --- WELCOME, ONBOARDING AND LOGIN PAGES ----
  imageLogo: {
    alignItems: "center",
    marginTop: CONST.backgroundPaddingTop * 2,
  },

  // ---- LOGIN PAGE ----
  forgotPasswordText: {
    color: CONST.darkerColor,
    opacity: 0.5,
    fontSize: CONST.pageSmallTextSize,
    textAlign: "right",
    marginBottom: CONST.inputMargin,
  },

  // ---- FORGOT PASSWORD PAGE ----
  passwordProgressBar: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    overflow: "hidden",
    borderRadius: CONST.smallButtonRadius,
    marginBottom: CONST.inputMargin,
    position: "relative",
    marginTop: -CONST.inputMargin / 2,
  },

  // ---- PROFILE SETTINGS: ARROW BACK TO TOP ----
  arrow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    position: 'absolute',
    right: CONST.backgroundPaddingLateral,
    bottom: CONST.backgroundPaddingTop * 3,
    zIndex: 10,
    backgroundColor: CONST.lightBackgroundColor,
    borderRadius: 50,
  },
  // ---- ONBOARDING ----
  skipBox: {
    paddingLeft: CONST.backgroundPaddingLateral,
    paddingRight: CONST.backgroundPaddingLateral,
    backgroundColor: CONST.mainBlue,
    paddingTop: CONST.backgroundPaddingTop * 1.5,
    paddingBottom: CONST.backgroundPaddingTop,
  },
  skipText: {
    textAlign: "right",
    fontFamily: "GothamBook",
    color: CONST.whiteText,
    fontSize: CONST.pageSmallTextSize,
  },
  navigator: {
    flexDirection: "row",
    bottom: CONST.backgroundPaddingTop * 1.5,
    backgroundColor: "transparent",
    paddingLeft: CONST.backgroundPaddingLateral,
    paddingRight: CONST.backgroundPaddingLateral,
    position: "absolute",
    left: CONST.screenWidth / 2 - CONST.backgroundPaddingLateral * 2,
  },
  firstImage: {
    position: "absolute",
    bottom: 0,
    top: undefined,
    right: 0,
    left: undefined,
  },

  // ---- DASHBOARD ---- //

  addPauseButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  addPauseButton: {
    backgroundColor: CONST.thirdBlue,
    color: CONST.darkerColor,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: CONST.normalButtonRadius,
    borderBottomRightRadius: CONST.normalButtonRadius,
    marginLeft: -CONST.heightButton / 2,
    height: CONST.heightButton,
    paddingLeft: CONST.iconPadding, //TODO: COLCOAR - 10
    paddingRight: CONST.iconPadding + 10,
    justifyContent: "center",
  },

  addPauseButtonText: {
    color: CONST.darkerColor,
    fontSize: CONST.pageTextSize,
    fontFamily: "GothamMedium",
    textAlign: "left",
    paddingLeft: CONST.heightButton / 2,
  },

  pauseCircle: {
    backgroundColor: CONST.whiteText,
    height: CONST.heightButton,
    width: CONST.heightButton,
    borderRadius: CONST.heightButton / 2,
    alignItems: "center",
    zIndex: 100,
    justifyContent: "center",
  },

  verEquipaButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  verEquipaButton: {
    backgroundColor: CONST.thirdOrange,
    color: CONST.darkerColor,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: CONST.normalButtonRadius,
    borderBottomRightRadius: CONST.normalButtonRadius,
    marginLeft: -CONST.heightButton / 2,
    height: CONST.heightButton,
    paddingLeft: CONST.iconPadding, //TODO: COLCOAR - 10
    paddingRight: CONST.iconPadding + 10,
    justifyContent: "center",
  },

  //////ESTILOS LIXO

  pageContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 90,
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingLeft: 25,
    paddingRight: 25,
  },
  modalView: {
    backgroundColor: "#E3ECF7",
    borderRadius: 15,
    padding: 25,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 10,
  },
  modalTextBold: {
    fontFamily: "GothamMedium",
    fontSize: 16,
    textAlign: "left",
    marginBottom: 20,
    lineHeight: 22,
  },
  modalText: {
    fontFamily: "GothamBook",
    fontSize: 16,
    textAlign: "left",
    marginBottom: 20,
    lineHeight: 22,
  },
  buttonAdd: {
    backgroundColor: "#0051ba",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 10,
  },

  batteryView: {
    //display: "none",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    //backgroundColor: "red",
  },
  batteryContainer: {
    height: 171,
    width: 85,
    borderRadius: 18,
    borderColor: CONST.whiteText,
    borderWidth: 1,
  },
  batteryBolt: {
    position: "absolute",
    zIndex: 1,
    alignSelf: "center",
    width: 94,
    height: 94,
  },
  batteryTip: {
    height: 2.38,
    width: 23.78,
    marginBottom: 2,
    backgroundColor: CONST.whiteText,
    borderTopLeftRadius: 107.03,
    borderTopRightRadius: 107.03,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderColor: CONST.whiteText,
    //borderWidth: 2.5,
    //marginLeft: 4,
  },
  batteryFill: {
    // height: 88,
    // width: 90, //máximo 163
    backgroundColor: CONST.whiteText,
    borderRadius: 16,
    position: "absolute",
    left: CONST.screenWidth / 2 - 112,
    transform: [{ rotate: '90deg' }]
  },
  batteryFillPause: {
    // height: 88,
    // width: 90, //máximo 163
    backgroundColor: "#E3ECF7",
    borderRadius: 16,
    position: "absolute",
    left: CONST.screenWidth / 2 - 112,
  },
  /*
  toggleView: {
    top: 65,
    alignItems: "center",
    flexDirection: "row",
  },*/
  toggleContainer: {
    width: CONST.screenWidth - 50,
    height: CONST.heightButton,
    borderRadius: CONST.normalButtonRadius,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  toggleSelector: {
    width: (CONST.screenWidth - CONST.backgroundPaddingLateral * 2) / 2,
    height: CONST.heightButton,
    borderRadius: CONST.normalButtonRadius,
    alignItems: "center",
    justifyContent: "center",
  },

  ButtonDashboardView: {
    marginTop: 60,
    marginBottom: 60,
  },
  ButtonDashboardContainer: {
    backgroundColor: "#0051BA",
    width: CONST.screenWidth - 50,
    borderRadius: 15,
    alignItems: "center",
    flexDirection: "row",
  },
  ButtonDashboardText: {
    color: CONST.whiteText,
    fontSize: 16,
    fontFamily: "GothamMedium",
    textAlign: "left",
    padding: 15,
    paddingLeft: 20,
  },
  icon: {
    alignSelf: "center",
    marginLeft: "auto",
    marginRight: 20,
  },
  
  metricsElement: {
    width: CONST.screenWidth - 50,
    //backgroundColor: "#E3ECF7",
    borderRadius: 15,

    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  metricsCircle: {
    backgroundColor: CONST.thirdBlue,
    height: CONST.heightButton,
    width: CONST.heightButton,
    borderRadius: CONST.heightButton / 2,
    alignItems: "center",
    zIndex: 100,
    justifyContent: "center",
    marginRight: 15,
  },

  /////LIXO/////

  // ---- PROFILE ---- //


  profileInfo: {
    alignItems: "center",
    marginBottom: CONST.inputMargin,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: CONST.circleRadius,
  },
  profileName: {
    marginTop: CONST.textPadding,
    fontSize: CONST.pageTitleSize,
    textTransform: "capitalize",
    fontFamily: "GothamMedium",
    color: CONST.darkerColor,
  },
  profileOrganization: {
    marginTop: CONST.boxMargin,
    fontSize: CONST.pageTextSize,
    color: CONST.darkerColor,
    fontFamily: "GothamBook",
  },

  profileOptionsText: {
    fontSize: CONST.pageTextSize,
    color: CONST.darkerColor,
    fontFamily: "GothamBook",
  },

  editProfileRewards: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: CONST.boxPadding,
  },

  pauseBoxMain: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 1,
    shadowRadius: 10,
    borderRadius: CONST.normalButtonRadius,
    marginTop: CONST.boxMargin,
    marginBottom: CONST.boxMargin + 10,
  },
  pauseBoxTop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: CONST.mainBlue,
    padding: CONST.boxPadding,
    borderTopLeftRadius: CONST.normalButtonRadius,
    borderTopRightRadius: CONST.normalButtonRadius,
  },
  pauseBoxBottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: CONST.boxPadding,
  }
});

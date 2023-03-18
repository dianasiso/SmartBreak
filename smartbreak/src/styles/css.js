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
  dashboardContent: {
    paddingTop: CONST.backgroundPaddingTop,
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
    paddingTop: 15,
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
    position: "absolute",
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

  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  columnContainerLeft: {
    flexDirection: "column",
    //justifyContent: "space-between",
  },
  columnContainerRight: {
    flexDirection: "column",
    //  justifyContent: "space-between",
    alignItems: "center",
  },

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

  openTeamButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  openTeamButton: {
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

  batteryValuesTitle: {
    fontFamily: "GothamBook",
    fontSize: CONST.pageTextSize,
    color: CONST.whiteText,
    paddingBottom: 10,
  },
  batteryValuesCharge: {
    fontFamily: "GothamMedium",
    fontSize: CONST.dashboardChargeSize,
    color: CONST.whiteText,
    paddingBottom: 15,
  },
  batteryValuesGoals: {
    fontFamily: "GothamMedium",
    fontSize: CONST.dashboardGoalsSize,
    color: CONST.whiteText,
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
    //overflow: "hidden",
    //backgroundColor: "red",
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
    position: "absolute",
    marginRight: CONST.cardPadding,
    width: 82.5,
    height: 50,
    // width: 90, //máximo 163
    backgroundColor: CONST.whiteText,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderRadius: 16.5,
    bottom: 0,
    //position: "absolute",
    //left: CONST.screenWidth / 2 - 112,
    //transform: [{ rotate: "90deg" }],
  },
  batteryFillPause: {
    // height: 88,
    // width: 90, //máximo 163
    backgroundColor: "#E3ECF7",
    borderRadius: 16,
    position: "absolute",
    left: CONST.screenWidth / 2 - 112,
  },
  batteryEmoji: {
    paddingTop: 110,
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

  buttonDashboardView: {
    marginTop: 60,
    marginBottom: 60,
  },
  buttonDashboardContainer: {
    backgroundColor: "#0051BA",
    width: CONST.screenWidth - 50,
    borderRadius: 15,
    alignItems: "center",
    flexDirection: "row",
  },
  buttonDashboardText: {
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

  metricsText: {
    fontSize: 20,
    fontFamily: "GothamMedium",
    marginBottom: 18,
  },
  metricsElement: {
    width: CONST.screenWidth - 50,
    //backgroundColor: "#E3ECF7",
    borderRadius: 15,

    marginBottom: 20,
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
  },
  metricsElementText: {
    fontSize: CONST.pageSmallTextSize,
    color: CONST.darkerColor,
    fontFamily: "GothamBook",
    paddingLeft: 15,
    paddingRight: 25,
    lineHeight: 20,
  },

  membersView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
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
  editprofileRewards: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});

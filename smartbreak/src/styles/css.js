import { StyleSheet } from "react-native";

// IMPORT VARIABLES FROM VARIABLES.JS FILE
import * as CONST from "./variables.js";

export const styles = StyleSheet.create({
  // ---- GENERAL -----
  // ---- containers ----
  mainContainer: {
    flex: 1,
    paddingTop: CONST.backgroundPaddingTop,
    backgroundColor: CONST.mainBlue,
    paddingBottom: CONST.backgroundPaddingTop / 2,
    width: CONST.screenWidth,
  },

  mainContainerLight: {
    flex: 1,
    paddingTop: CONST.backgroundPaddingTop,
    backgroundColor: CONST.lightBackgroundColor,
    paddingBottom: CONST.backgroundPaddingTop / 2,
    marginBottom: 90,
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
  // ! CADA VEZ QUE SE USA O CONTAINER LIGHT NUMA PÁGINA QUE TEM < SETA PRA VOLTAR ATRÁS É PRECISO ALTERAR NA PRÓPRIA PÁGINA
  // ! O VALOR DO PADDINGTOP PARA CONST.BACKGROUNDPADDINGTOP / 2
  containerLight: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: CONST.backgroundPaddingLateral,
    paddingRight: CONST.backgroundPaddingLateral,
    paddingTop: CONST.backgroundPaddingTop,
    backgroundColor: CONST.lightBackgroundColor,
    paddingBottom: CONST.backgroundPaddingTop / 2,
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
    paddingBottom: CONST.cardPadding,
    paddingTop: CONST.cardPadding,
    maxHeight: (CONST.screenHeight / 5) * 3,
  },
  // ---- buttons ----
  primaryButtonText: {
    fontFamily: "GothamMedium",
    color: CONST.primaryButtonTextColor,
    fontSize: CONST.normalButtonSize,
    textAlign: "center",
  },
  smallPrimaryButtonText: {
    fontFamily: "GothamMedium",
    color: CONST.primaryButtonTextColor,
    fontSize: CONST.smallButtonSize,
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
  smallSecondaryButtonText: {
    fontFamily: "GothamMedium",
    color: CONST.secondaryButtonTextColor,
    fontSize: CONST.smallButtonSize,
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
  smallPrimaryButton: {
    backgroundColor: CONST.primaryButtonBackground,
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: CONST.heightButton,
    borderRadius: CONST.smallButtonRadius,
    margin: 5,
    borderWidth: 1,
    borderColor: CONST.primaryButtonBorderColor,
  },
  buttonWhite: {
    backgroundColor: CONST.lightBackgroundColor,
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: CONST.heightButton,
    borderRadius: CONST.normalButtonRadius,
    margin: 5,
    borderWidth: 1,
    borderColor: CONST.lightBackgroundColor,
  },
  smallButtonWhite: {
    backgroundColor: CONST.lightBackgroundColor,
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: CONST.heightButton,
    borderRadius: CONST.smallButtonRadius,
    margin: 5,
    borderWidth: 1,
    borderColor: CONST.lightBackgroundColor,
  },
  secondaryButton: {
    backgroundColor: CONST.secondaryButtonBackground,
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: CONST.heightButton,
    borderRadius: CONST.normalButtonRadius,
    margin: 5,
    borderWidth: 1,
    borderColor: CONST.secondaryButtonBorderColor,
  },
  smallSecondaryButton: {
    backgroundColor: CONST.secondaryButtonBackground,
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: CONST.heightButton,
    borderRadius: CONST.smallButtonRadius,
    margin: 5,
    borderWidth: 1,
    borderColor: CONST.secondaryButtonBorderColor,
  },

  // ---- texts ----
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
  subTitleText: {
    fontSize: CONST.pageSubtitleSize,
    fontFamily: "GothamMedium",
    color: CONST.darkerColor,
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

  smallTextWhite: {
    fontSize: CONST.smallTextSize,
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

  // ---- input ----
  inputLabel: {
    fontFamily: "GothamBook",
    fontSize: CONST.pageTextSize,
    color: CONST.darkerColor,
    textAlign: "left",
    paddingBottom: CONST.inputPadding,
    marginTop: CONST.inputMargin,
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

  // ---- cards/boxes ----
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
    paddingLeft: CONST.boxMargin,
    paddingRight: CONST.boxMargin,
    paddingTop: CONST.boxPadding,
    paddingBottom: CONST.boxPadding,
    flex: 1,
    opacity: 0.8,
    borderBottomWidth: 1,
    borderBottomColor: CONST.dividerColor,
    flexDirection: "row",
    alignItems: "center",
  },
  boxIcon: {
    color: CONST.darkerColor,
    marginRight: CONST.boxPadding,
  },

  // ---- MAIN NAVIGATION ----
  iconContainer: {},
  indicator: {
    width: 50,
    height: 3,
    borderRadius: 5,
    top: -15,
  },
  indicatorError: {
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

  // ---- ROUTINES ----
  rowRoutine: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  boxRoutine: {
    flexDirection: "column",
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
  },

  // ---- MODALS ----
  modalBackgroundView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },

  modalView: {
    backgroundColor: CONST.lightBackgroundColor,
    borderRadius: CONST.smallButtonRadius,
    padding: CONST.modalPadding,
    shadowColor: CONST.darkerColor,
    shadowRadius: CONST.shadowRadius,
    width: (CONST.screenWidth / 3) * 2,
    shadowOpacity: 0.5,
    elevation: 10,
    overflow: "hidden",
  },

  // ---- MODAL DEVICES -----

  modalDeviceTypeButton: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: CONST.smallButtonRadius,
    padding: CONST.smallButtonRadius,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  modalDeviceTypeButtonPressed: {
    backgroundColor: "transparent",
    borderColor: CONST.darkerColor,
    borderWidth: 1,
    borderRadius: CONST.smallButtonRadius,
    padding: CONST.smallButtonRadius,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  // ---- MODAL ROUTINES ----

  modalRoutineButton: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: CONST.smallButtonRadius,
    padding: CONST.smallButtonRadius,
    paddingTop: 4,
    paddingBottom: 4,
    margin: 2,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  modalRoutineButtonPressed: {
    backgroundColor: "transparent",
    borderColor: CONST.darkerColor,
    borderWidth: 1,
    borderRadius: CONST.smallButtonRadius,
    padding: CONST.smallButtonRadius,
    paddingTop: 4,
    paddingBottom: 4,
    margin: 2,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  hoursContainer: {
    width: CONST.screenWidth / 4,
    marginBottom: CONST.backgroundPaddingTop,
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 5,
  },
  daysContainer: {
    width: CONST.screenWidth / 4,
    marginBottom: CONST.inputMargin,
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 5,
  },
  hoursTextStyle: {
    color: CONST.darkerColor,
    fontFamily: "GothamBook",
    fontSize: CONST.pageSmallTextSize,
  },
  hoursPicker: {
    backgroundColor: "transparent",
    borderWidth: 0,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: CONST.darkerColor,
    color: CONST.darkerColor,
    fontFamily: "GothamBook",
    fontSize: CONST.pageTextSize,
  },
  dropwdownBoxRoutines: {
    backgroundColor: CONST.dividerColor,
    borderColor: CONST.darkerColor,
    color: CONST.whiteText,
    fontSize: CONST.pageSmallTextSize,
    fontFamily: "GothamBook",
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
    bottom: CONST.backgroundPaddingTop,
    zIndex: 10,
    backgroundColor: CONST.lightBackgroundColor,
    borderRadius: 50,
  },

  // ---- PROFILE ----
  profileInfo: {
    alignItems: "center",
    //marginBottom: CONST.inputMargin,
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    marginBottom: CONST.backgroundPaddingTop ,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: CONST.circleRadius,
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
    paddingLeft: CONST.iconPadding, //TODO: COLOCAR - 10
    paddingRight: CONST.iconPadding + 10,
    justifyContent: "center",
  },

  viewTeamButton: {
    backgroundColor: CONST.thirdOrange,
    color: CONST.darkerColor,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: CONST.normalButtonRadius,
    borderBottomRightRadius: CONST.normalButtonRadius,
    marginLeft: -CONST.heightButton / 2,
    height: CONST.heightButton,
    paddingLeft: CONST.iconPadding, //TODO: COLOCAR - 10
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
  modalTextBold: {
    fontFamily: "GothamMedium",
    fontSize: 16,
    textAlign: "left",
    marginBottom: 20,
    lineHeight: 22,
    color: CONST.darkerColor,
  },
  modalText: {
    fontFamily: "GothamBook",
    fontSize: 16,
    textAlign: "left",
    marginBottom: 20,
    color: CONST.darkerColor,
    lineHeight: 22,
  },
  buttonAdd: {
    backgroundColor: CONST.mainBlue,
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
    background: "transparent",
    // width: 90, //máximo 163
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderRadius: 16.5,
    bottom: 0,
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
    //backgroundColor: "#E3ECF7",
    borderRadius: 15,
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  metricsCircle: {
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
    lineHeight: 20,
    flex: 1,
  },

  membersView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },

  editprofileRewards: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  // ---- ERROR PAGES ---- //
  errorTitleText: {
    fontSize: CONST.errorTitleText,
    fontFamily: "GothamMedium",
    color: CONST.whiteText,
    paddingTop: CONST.backgroundPaddingTop,
    textAlign: "center",
  },

  errorNormalText: {
    fontSize: CONST.pageSubtitleSize,
    fontFamily: "GothamBook",
    lineHeight: CONST.pageTextSize + 5,
    color: CONST.whiteText,
    textAlign: "center",
    paddingTop: CONST.backgroundPaddingTop,
  },

  // ---- REWARDS PROFILE ----
  editprofileRewards: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: CONST.inputMargin,
  },

  // ---- TIPS ---- //
  smallSecondaryButton: {
    backgroundColor: CONST.secondaryButtonBackground,
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: CONST.heightButton,
    borderRadius: CONST.smallButtonRadius,
    margin: 5,
    borderWidth: 1,
    borderColor: CONST.secondaryButtonBorderColor,
  },
  smallPrimaryButton: {
    backgroundColor: CONST.primaryButtonBackground,
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: CONST.heightButton,
    borderRadius: CONST.smallButtonRadius,
    margin: 5,
    borderWidth: 1,
    borderColor: CONST.primaryButtonBorderColor,
  },
  smallPrimaryButtonText: {
    fontFamily: "GothamMedium",
    color: CONST.primaryButtonTextColor,
    fontSize: CONST.smallButtonSize,
    textAlign: "center",
  },

  smallSecondaryButtonText: {
    fontFamily: "GothamMedium",
    color: CONST.secondaryButtonTextColor,
    fontSize: CONST.smallButtonSize,
    textAlign: "center",
  },

  optionsTips: {
    marginLeft: CONST.backgroundPaddingLateral,
    marginRight: CONST.backgroundPaddingLateral,
    marginBottom: CONST.dividerMargin,
    overflow: "hidden",
    borderRadius: CONST.normalButtonRadius,
    padding: CONST.cardPadding,
  },

  numberTips: {
    fontFamily: "GothamMedium",
    fontSize: CONST.pageTextSiz,
    marginBottom: CONST.dividerMargin,
    padding: CONST.dividerMargin,
    backgroundColor: "#839FBD",
    borderRadius: CONST.circleRadius,
    color: CONST.whiteText,
    width: CONST.iconWidth + 15,
    height: CONST.iconWidth + 15,
  },

  // ---- HISTORIC ----
  pauseBoxMain: {
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowColor: 'rgba(0, 0, 0, 0.1)',
    // shadowOpacity: 1,
    // shadowRadius: 10,
    marginLeft: CONST.backgroundPaddingLateral,
    marginRight: CONST.backgroundPaddingLateral,
    shadowColor: CONST.enableColor,
    shadowRadius: CONST.shadowRadius,
    shadowOpacity: 1,
    elevation: 10,
    backgroundColor: CONST.lightBackgroundColor,
    borderRadius: CONST.normalButtonRadius,
    marginTop: CONST.boxMargin,
    marginBottom: CONST.inputMargin,
  },

  profileOptionsText: {
    fontSize: CONST.pageTextSize,
    color: CONST.darkerColor,
    fontFamily: "GothamBook",
  },
  pauseBoxTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: CONST.mainBlue,
    padding: CONST.boxPadding,
    borderTopLeftRadius: CONST.normalButtonRadius,
    borderTopRightRadius: CONST.normalButtonRadius,
  },
  pauseBoxBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: CONST.boxPadding,
    paddingTop: 0,
  },

  // --- GOALS --- //

  modalAlign: {
    flexDirection: "column",
    paddingTop: CONST.iconPadding,
    paddingBottom: CONST.iconPadding + 10,
  },

  modal: {
    marginRight: 0,
    marginLeft: "auto",
    marginBottom: 20,
    padding: CONST.boxMargin,
    borderRadius: CONST.smallButtonRadius,
  },

  viewPriority: {
    borderRadius: CONST.circleRadius,
    marginBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
    paddingTop: 5, 
  },

  goals: {
    flex: 1,
    marginBottom: CONST.inputMargin,
    borderTopRightRadius: CONST.normalButtonRadius,
    borderBottomRightRadius: CONST.normalButtonRadius,
    paddingTop: CONST.boxPadding,
    paddingBottom: CONST.boxPadding,
    paddingLeft: CONST.modalPadding,
    paddingRight: CONST.boxPadding,
    width: CONST.screenWidth - 50,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "left",
    borderLeftWidth: 3,
 

    backgroundColor: "transparent",
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowRadius: CONST.shadowRadius,
    shadowOpacity: 1,
    elevation: 1,
  },

  shadowColor: CONST.enableColor,
  shadowRadius: CONST.shadowRadius,
  shadowOpacity: 1,

  goalsBox: {
    flexDirection: "row",
    flex: 1,
    marginTop: "auto",
    marginBottom: "auto",
    alignItems: "center",
  },

  goalsBoxContent: {
    marginRight: 5,
    flexDirection: "column",
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
  },

  goalsBoxPriority: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    marginTop: 40,
  },

  textPriority: {
    fontFamily: "GothamBook",
    fontSize: CONST.pageSmallTextSize,
    color: CONST.whiteText
  }, 

  modalFilter: {
    marginRight: "auto",
    marginLeft: 0,
    backgroundColor: CONST.lightBackgroundColor,
    borderRadius: CONST.normalButtonRadius,
    paddingTop: CONST.inputPadding,
    paddingBottom: CONST.inputPadding,
    paddingLeft: CONST.boxPadding - 10,
    paddingRight: CONST.boxPadding,
    marginTop: CONST.boxMargin - 5,
    marginBottom: CONST.boxMargin,
  },

  modalFilterSelected: {
    marginRight: "auto",
    marginLeft: 0,
    borderRadius: CONST.normalButtonRadius,
    paddingTop: CONST.inputPadding,
    paddingBottom: CONST.inputPadding,
    paddingLeft: CONST.boxPadding - 5,
    paddingRight: CONST.boxPadding,
    marginTop: CONST.boxMargin - 5,
    marginBottom: CONST.boxMargin,
    backgroundColor: CONST.darkerColor,
  },
});

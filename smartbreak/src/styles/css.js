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

  // ---- input ----
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
    backgroundColor: CONST.mainBlue,
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
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },

  modalView: {
    backgroundColor: CONST.lightBackgroundColor,
    borderRadius: CONST.smallButtonRadius,
    padding: CONST.modalPadding,
    shadowColor: CONST.darkerColor,
    shadowRadius: CONST.shadowRadius,
    width: CONST.screenWidth/3*2,
    shadowOpacity: 0.5,
    elevation: 10,
    overflow: 'hidden',
  },

   // ---- MODAL DEVICES -----

  modalDeviceTypeButton: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: CONST.smallButtonRadius,
    padding: CONST.smallButtonRadius,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  }, 

  modalDeviceTypeButtonPressed: {
    backgroundColor: 'transparent',
    borderColor: CONST.darkerColor,
    borderWidth: 1,
    borderRadius: CONST.smallButtonRadius,
    padding: CONST.smallButtonRadius,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  }, 

  // ---- MODAL ROUTINES ----

  modalRoutineButton: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: CONST.smallButtonRadius,
    padding: CONST.smallButtonRadius,
    paddingTop: 4,
    paddingBottom: 4,
    margin: 2,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  }, 

  modalRoutineButtonPressed: {
    backgroundColor: 'transparent',
    borderColor: CONST.darkerColor,
    borderWidth: 1,
    borderRadius: CONST.smallButtonRadius,
    padding: CONST.smallButtonRadius,
    paddingTop: 4,
    paddingBottom: 4,
    margin: 2,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  }, 

  hoursContainer: {
    width:  CONST.screenWidth/4,
    marginBottom: CONST.backgroundPaddingTop,
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
  },
  daysContainer: {
    width:  CONST.screenWidth/4,
    marginBottom: CONST.inputMargin,
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
  },
  hoursTextStyle: {  
    color: CONST.darkerColor,
    fontFamily: 'GothamBook',
    fontSize: CONST.pageSmallTextSize,
  },
  hoursPicker: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: CONST.darkerColor,
    color: CONST.darkerColor,
    fontFamily: 'GothamBook',
    fontSize: CONST.pageTextSize,
  },
  dropwdownBoxRoutines: {
    backgroundColor: CONST.thirdBlue,
    borderColor: CONST.darkerColor,
    color: CONST.whiteText,
    fontSize: CONST.pageSmallTextSize,
    fontFamily: 'GothamBook'
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

  // ---- PROFILE ----
  profileInfo: {
    alignItems: "center",
    marginBottom: CONST.inputMargin,
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

  metricasText: {
    fontSize: 20,
    fontFamily: "GothamMedium",
    marginBottom: 18,
  },
  metricasElement: {
    width: CONST.screenWidth - 50,
    //backgroundColor: "#E3ECF7",
    borderRadius: 15,
   
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  metricasCircle: {
    backgroundColor: CONST.thirdBlue,
    height: CONST.heightButton,
    width: CONST.heightButton,
    borderRadius: CONST.heightButton / 2,
    alignItems: "center",
    zIndex: 100,
    justifyContent: "center",
  },
  metricasElementText: {
    fontSize: CONST.pageSmallTextSize,
    color: CONST.darkerColor,
    fontFamily: "GothamBook",
    paddingLeft: 15,
    paddingRight: 25,
    lineHeight: 20,
  },

  membrosView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
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

  // ---- REWARDS ----
  editprofileRewards: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});

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
    paddingTop: 15,
    paddingBottom: 40,
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

  //main navigation//
  IconContainer: {},
  Indicator: {
    width: 50,
    height: 3,
    backgroundColor: CONST.mainBlue,
    borderRadius: 5,
    //position: "absolute",
    top: -15,
  },
  IndicatorError: {
    width: 50,
    height: 3,
    backgroundColor: "#FFF",
    borderRadius: 5,
    //position: "absolute",
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
    bottom: CONST.backgroundPaddingTop*3,
    zIndex: 10,
    backgroundColor:  CONST.lightBackgroundColor,
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

  // ---- PROFILE ---- //

 
  profileInfo: {
    alignItems: "center",
    marginBottom: CONST.inputMargin,
  },
  profileImage: {
    width: 100,
    height: 100,
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
});

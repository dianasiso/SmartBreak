import { StyleSheet } from "react-native";


// Variables
import * as CONST from "./variables.js";


export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: CONST.backgroundPaddingTop,
        backgroundColor: CONST.mainBlue,
    },
    container: {
        flex: 1,
        flexDirection: "column",
        paddingLeft: CONST.backgroundPaddingLateral,
        paddingRight: CONST.backgroundPaddingLateral,
        paddingTop: CONST.backgroundPaddingTop,
        backgroundColor: CONST.mainBlue,
    },
    subContainer: {
        backgroundColor: CONST.lightBackgroundColor,
        flex: 1,
        position: 'absolute',
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
        paddingTop: 15,
        paddingBottom: 40,
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

    // --- WELCOME AND LOGIN PAGES ----
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
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
        overflow: 'hidden',
        borderRadius: CONST.smallButtonRadius,
        marginBottom: CONST.inputMargin,
        position: 'relative',
        marginTop: - CONST.inputMargin/2,
    },
    
  });
  
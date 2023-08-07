export const colorTokens = {
    grey: {
        0: "#FFFFFF",
        10: "#F6F6F6",
        50: "#F0F0F0",
        100: "#E0E0E0",
        200: "#C2C2C2",
        300: "#A3A3A3",
        400: "#858585",
        500: "#666666",
        600: "#4D4D4D",
        700: "#333333",
        800: "#1A1A1A",
        900: "#0A0A0A",
        1000: "#000000",
    },
    primary: {
        50: "#FFF4F8",
        100: "#FFD5E1",
        200: "#FD8EB0",
        300: "#F25E8B",
        400: "#EA2863",
        500: "#CF0945",
        600: "#BA093F",
        700: "#7E092D",
        800: "#3B0314",
        900: "#180108",
    },
    background: {
        light100: "#EBF5E2",
        light200: "#D8EBC9",
        light300: "#C7D9B8",

        imagesBg: "#C8E7CD",
        buttonBgPink: "#F7A0FF",
        buttonBgLightPink: "#FCBBBB",
    },
    text: {
        primary: "#222121",
        secondary: "#4F4F4F",
    },
    brand: {
        secondaryMain: "#64E579",
        secondaryDark: "#19A52F",
    },
    shadow: {
        primary: "#9F9F9F",
    },
};

// mui theme settings

export const themeSettings = (mode) => {
    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
                ? {
                      primary: {
                          dark: colorTokens.brand.secondaryDark,
                          main: colorTokens.brand.secondaryMain,
                          light: colorTokens.brand.secondaryMain,
                      },
                      text: {
                          primary: colorTokens.text.primary,
                          secondary: colorTokens.text.secondary,
                      },
                      neutral: {
                          shadow: colorTokens.shadow.primary,
                      },
                      background: {
                          default: colorTokens.background.light100,
                          alt: colorTokens.background.light200,
                          light200: colorTokens.background.light200,
                          light300: colorTokens.background.light300,
                          imagesBg: colorTokens.background.imagesBg,
                          buttonBgPink: colorTokens.background.buttonBgPink,
                          buttonBgLightPink:
                              colorTokens.background.buttonBgLightPink,
                      },
                  }
                : {
                      primary: {
                          dark: colorTokens.brand.secondaryDark,
                          main: colorTokens.brand.secondaryMain,
                          light: colorTokens.brand.secondaryMain,
                      },
                      text: {
                          primary: colorTokens.text.primary,
                          secondary: colorTokens.text.secondary,
                      },
                      neutral: {
                          shadow: colorTokens.shadow.primary,
                      },
                      background: {
                          default: colorTokens.background.light100,
                          alt: colorTokens.background.light200,
                          light200: colorTokens.background.light200,
                          light300: colorTokens.background.light300,
                          imagesBg: colorTokens.background.imagesBg,
                          buttonBgPink: colorTokens.background.buttonBgPink,
                          buttonBgLightPink:
                              colorTokens.background.buttonBgLightPink,

                          gradient2: "#BCECC5",
                      },
                      nav: {
                          boxShadow: "#E5E5E5",
                      },
                      error: {
                            main: "#CD103E",
                            secondary: "#EEA4B6",
                      }
                  }),
        },
        typography: {
            fontFamily: ["Rubik", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
    };
};

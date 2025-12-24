
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
                        darker: "#0F661C",

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
                        buttonBgLightPinkDark: "#E69A9A",
                    },
                }
                : {
                    primary: {
                        darker: "#0c8e97ff",
                        dark: "#0db7c4ff",
                        main: "#1febfaff",
                        main1: "#1febfaff",
                        light: "#4be8f3ff",
                        light2: "#70f1faff",
                        light3: "rgba(164, 249, 255, 1)",
                        cardBackground: "#8899e6ff"
                    },
                    secondary: {
                        main: "#43106dff",
                        light: "#43106dff",
                        dark: "#320953ff",

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
                        imagesBg1: "#CBEFD1",
                        buttonBgPink: colorTokens.background.buttonBgPink,
                        buttonBgPinkDark: "#E482EC",
                        buttonBgPinkDark2: "#D835E6",
                        buttonBgLightPink:
                            colorTokens.background.buttonBgLightPink,
                        buttonBgLightPinkDark: "#E69A9A",

                        gradient2: "#BCECC5",
                        top: "#E5F3E7",
                        bottom: "#B4EBC0",
                        questionHover: "#CCE5B5",
                        questionSelected: "#C1ED9A",
                        questionCorrect: "#A7D87C",
                    },
                    nav: {
                        boxShadow: "#E5E5E5",
                    },
                    rating: "#F4B30A",
                    error: {
                        main: "#CD103E",
                        main1: "#F31C1C",
                        secondary: "#EEA4B6",
                        light: "#FFB5B5",
                        light1: "#FFD7D7",
                        questionError: "#F0D1CE",
                    },
                    warning: {
                        main: "#ff9966",
                    },
                    customDivider: {
                        main: "#909090",
                    },
                    grey: {
                        grey0: "#FFFFFF",
                        grey10: "#F6F6F6",
                        grey50: "#F0F0F0",
                        grey100: "#E0E0E0",
                        grey150: "#DEDEDE",
                        grey200: "#C2C2C2",
                        grey300: "#A3A3A3",
                        grey400: "#858585",
                        grey500: "#666666",
                        grey600: "#4D4D4D",
                        grey700: "#333333",
                        grey800: "#1A1A1A",
                        grey900: "#0A0A0A",
                        grey1000: "#000000",
                    },
                    glassMorphism: {
                        threeCornerColor: "#3e6e77ff",
                        rightBottomColor: "#3e6e77ff",
                        fixedBackgroundTop: "#3e6e77ff",
                        fixedBackgroundBottom: "#3e6e77ff",
                        backgroundGradient: "#3e6e77ff",
                        fixedBackgroundImage: `
      radial-gradient(circle at 100% 100%, #d1709056 0%, transparent 60%),
      radial-gradient(circle at 100% 0%, #3e6e77ff 0%, transparent 50%),
      radial-gradient(circle at 0% 0%, #3e6e77ff 0%, transparent 50%),
      radial-gradient(circle at 0% 100%, #ff6d9e8f 0%, transparent 60%),
    radial-gradient(at 0% 0%, rgba(0, 255, 157, 1) 0px, transparent 50%), /* Top-left Teal glow */
     radial-gradient(at 100% 100%, rgba(255, 0, 149, 0.38) 0px, transparent 50%), /* Bottom-right Pink glow */
    radial-gradient(at 50% 50%, rgba(5, 234, 250, 1) 0px, transparent 100%), /* Deep center depth */
    radial-gradient(at 20% 50%, rgba(255, 255, 255, 0.95) 0px, transparent 100%) /* Deep center depth */
    `,
                        scrollBackgroundImage: `
                              radial-gradient(
                                ellipse 50vw 40vh at 50vw 40vh, 
                                #3e6e77ff 0%, 
                                transparent 100%
                              ),
                        
                              radial-gradient(
                                ellipse 50vw 80vh at 50vw 80vh, 
                                #3e6e77ff 0%, 
                                transparent 100%
                              )
                            `,
                        noise: {
                            position: 'fixed', // Stays over the screen while you scroll
                            top: 0, left: 0, width: '100%', height: '100%',
                            opacity: 0.03, // Very subtle
                            pointerEvents: 'none',
                            zIndex: 1,
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                            filter: 'contrast(150%) brightness(100%)',
                            pointerEvents: 'none',
                        }
                    },
                    glassMorphismCard: {
                        background: "rgba(255, 255, 255, 0.03)", // Extremely low opacity
                        backdropFilter: "blur(25px) saturate(160%)", // High saturation is the key
                        WebkitBackdropFilter: "blur(25px) saturate(160%)", // High saturation is the key
                        // The 'Light Leak' Border: Brighter at the top, invisible at the bottom
                        borderTop: "1px solid rgba(255, 255, 255, 0.2)",
                        borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                        borderRight: "1px solid rgba(255, 255, 255, 0.05)",

                        borderRadius: "20px",

                        // Two shadows: One for the 'drop' and one 'inset' for the glass edge
                        boxShadow: `
                        0 20px 40px rgba(0, 0, 0, 0.06), 
                        inset 0 0 0 1px rgba(255, 255, 255, 0.05)
                      `,
                    },

                }),
        },
        typography: {
            fontFamily: ["Roboto", "sans-serif"].join(","),
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
            h3600: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 24,
                fontWeight: 600,
            },
            h3grey: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 24,
                color: colorTokens.grey[400],
            },
            h4: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 20,

            },
            h4bold: {
                fontFamily: ["Roboto", 'sans-serif'].join(","),
                fontSize: 20,
                fontWeight: 600,
            },

            h4grey: {
                fontSize: 20,
                fontWeight: 400,
                color: colorTokens.grey[400],
            },
            h5: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 16,
            },
            h5600: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 16,
                fontWeight: 600,
            },
            h6: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 14,
                fontWeight: "bold"
            },
            lightGrey: {
                fontFamily: ["Roboto", 'sans-serif'].join(","),
                fontSize: 14,
                fontWeight: 300,
                color: colorTokens.grey[500],
            },
            grey: {
                fontSize: 16,
                fontWeight: 400,
                color: colorTokens.grey[500]
            },
            body: {
                fontSize: 16,
                fontWeight: 400,
            }

        },
    };
};

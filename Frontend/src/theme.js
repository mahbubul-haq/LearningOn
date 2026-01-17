
export const colorTokens = {
    // #used - Primary Color (Purple)
    primary: {
        main: "#4522ba",      // Base primary
        light: "#6b4fd9",     // Lighter variant
        lighter: "#9178e6",   // Even lighter
        dark: "#2f1880",      // Darker variant
        darker: "#1f0f55",    // Even darker
    },

    // #used - Secondary Color (Pink/Magenta)
    secondary: {
        main: "#c2215f",      // Base secondary
        light: "#d94d85",     // Lighter variant
        lighter: "#e879aa",   // Even lighter
        dark: "#8f1844",      // Darker variant
        darker: "#5f0f2d",    // Even darker
    },

    // #used - Whites & Light Greys
    white: {
        pure: "#FFFFFF",
        main: "#FAFAFA",
        light: "#F5F5F5",
    },

    // #used - Blacks & Dark Greys
    black: {
        pure: "#000000",
        main: "#0A0A0A",
        light: "#1A1A1A",
        lighter: "#2A2A2A",
    },

    // #used - Grey Scale (simplified, even steps)
    grey: {
        50: "#F5F5F5",
        100: "#E5E5E5",
        200: "#D0D0D0",
        300: "#B0B0B0",
        400: "#909090",
        500: "#707070",
        600: "#505050",
        700: "#303030",
        800: "#202020",
        900: "#101010",
    },

    // #used - Glassmorphism Utilities
    glass: {
        // Light mode glass
        light: {
            bg: "rgba(255, 255, 255, 0.4)", // More opaque for visibility
            bgStrong: "rgba(255, 255, 255, 0.6)",
            border: "rgba(255, 255, 255, 0.6)",
            borderSubtle: "rgba(255, 255, 255, 0.3)",
            shadow: "rgba(31, 38, 135, 0.08)", // Premium colored shadow
            shadowStrong: "rgba(31, 38, 135, 0.15)",
            backdropFilter: "blur(12px)",
        },
        // Dark mode glass
        dark: {
            bg: "rgba(20, 20, 25, 0.4)", // Darker, transparent bg
            bgStrong: "rgba(30, 30, 35, 0.6)",
            border: "rgba(255, 255, 255, 0.08)", // Subtle white border
            borderSubtle: "rgba(255, 255, 255, 0.05)",
            shadow: "rgba(0, 0, 0, 0.15)",
            shadowStrong: "rgba(0, 0, 0, 0.25)",
            backdropFilter: "blur(12px)",
        },
    },

    // #used - Gradients for Mesh Background
    gradients: {
        light: {
            mesh: "radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)", // Fallback / Base
            // We'll use a more complex CSS value in the component for the full effect, or define colors here
            orb1: "#6b4fd9", // Primary Light
            orb2: "#d94d85", // Secondary Light
            bgBase: "#f0f2f5", // Light greyish blue base
        },
        dark: {
            orb1: "#2f1880", // Primary Dark
            orb2: "#8f1844", // Secondary Dark
            bgBase: "#050505", // Deep black base
        }
    },

    // #used - Opacity variants (standardized to 0.05 increments)
    opacity: {
        5: "0.05",
        10: "0.1",
        15: "0.15",
        20: "0.2",
        25: "0.25",
        30: "0.3",
        35: "0.35",
        40: "0.4",
        45: "0.45",
        50: "0.5",
        55: "0.55",
        60: "0.6",
        65: "0.65",
        70: "0.7",
        75: "0.75",
        80: "0.8",
        85: "0.85",
        90: "0.9",
        95: "0.95",
        100: "1",
    },

    // Utility colors (kept minimal)
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",

    // ========================================
    // LEGACY COLORS (for non-refactored components)
    // These will be gradually removed as pages are refactored
    // ========================================

    // Legacy purples & pinks
    purple: {
        neon: "#D835E6",
        bright: "#a855f7",
        deep: "#791535",
        deepRich: "#9c27b0",
        lavender: "#b97aecff",
    },

    pink: {
        neon: "#F7A0FF",
        soft: "#FD8EB0",
        medium: "#F25E8B",
        error: "#ff6b81",
    },

    // Legacy cyans & teals
    cyan: {
        neon: "#00E0FF",
        bright: "#1febfaff",
        teal: "#00acc1",
    },

    // Legacy greens
    green: {
        success: "#2ed573",
        mint: "#CBEFD1",
        lightMint: "#BCECD1",
        neon: "#00E0FF", // Redirected to cyan neon if neon green was similar or using original values
        darker: "#004d40",
        bright: "#1febfaff",
    },

    // Legacy oranges
    orange: {
        warning: "#ffa502",
    },

    // Legacy blues
    blue: {
        darkBlueGrey: "#3F3D56",
    },

    // Legacy backgrounds
    background: {
        light100: "#F6F6F6",
        light200: "#F0F0F0",
        light300: "#E0E0E0",
        imagesBg: "#F6F6F6",
        imagesBg1: "#CBEFD1",
    },

    // Legacy translucent colors
    translucentWhite: {
        x1: "rgba(255, 255, 255, 0.1)",
        x2: "rgba(255, 255, 255, 0.2)",
        x05: "rgba(255, 255, 255, 0.05)",
        x3: "rgba(255, 255, 255, 0.3)",
        x8: "rgba(255, 255, 255, 0.8)",
    },

    translucentBlack: {
        x5: "rgba(0, 0, 0, 0.5)",
        x25: "rgba(0, 0, 0, 0.25)",
        x1: "rgba(0, 0, 0, 0.1)",
    },

    // Legacy utility
    utility: {
        red: "#ef4444",
        green: "#10b981",
        yellow: "#f59e0b",
        blue: "#3b82f6",
    },

    // Legacy translucent variants
    translucentCyan: {
        x1: "rgba(0, 224, 255, 0.1)",
    },
    translucentGreen: {
        x15: "rgba(16, 185, 129, 0.15)",
    },
    glassMorphism: {
        backgroundColorDark: "#0f0f13",
        backgroundColorLight: "#F0F4F8",
        backgroundImageDark: `
                                    radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), 
                                    radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), 
                                    radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)`,
        backgroundImageLight: `
                                    radial-gradient(at 40% 20%, hsla(266, 60%, 90%, 1) 0px, transparent 50%),
                                    radial-gradient(at 80% 0%, hsla(289, 100%, 86%, 1) 0px, transparent 50%),
                                    radial-gradient(at 0% 50%, hsla(220, 100%, 87%, 1) 0px, transparent 50%),
                                    radial-gradient(at 80% 50%, hsla(240, 100%, 93%, 1) 0px, transparent 50%),
                                    radial-gradient(at 0% 100%, hsla(340, 100%, 86%, 1) 0px, transparent 50%),
                                    radial-gradient(at 80% 100%, hsla(220, 100%, 82%, 1) 0px, transparent 50%),
                                    radial-gradient(at 0% 0%, hsla(330, 100%, 96%, 1) 0px, transparent 50%)
                                  `,
        noise: {
            content: '""',
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0.4,
            pointerEvents: "none",
            zIndex: -1,
            backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
            filter: "contrast(170%) brightness(50%)",

        }
    },
};

// mui theme settings

export const themeSettings = ({ mode }) => {
    return {
        palette: {
            mode: mode,
            glassNavbar: mode === "dark" ? {
                background: "rgba(20, 20, 25, 0.4)",
                backdropFilter: "blur(12px)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            } : {
                background: "rgba(255, 255, 255, 0.4)",
                backdropFilter: "blur(12px)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.05)",
            },
            glassSheet: mode === "dark" ? {
                background: "rgba(30, 30, 35, 0.6)", // Semi-transparent dark
                backdropFilter: "blur(20px)",         // Strong blur
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
            } : {
                background: "rgba(255, 255, 255, 0.7)", // Semi-transparent white
                backdropFilter: "blur(20px)",
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.4)",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
            },
            ...(mode === "dark"
                ? {
                    // DARK MODE
                    primary: {
                        main: colorTokens.primary.light,
                        light: colorTokens.primary.lighter,
                        dark: colorTokens.primary.main,
                    },
                    secondary: {
                        main: colorTokens.secondary.light,
                        light: colorTokens.secondary.lighter,
                        dark: colorTokens.secondary.main,
                    },
                    background: {
                        default: colorTokens.black.main,
                        paper: colorTokens.black.light,
                        elevated: colorTokens.black.lighter,
                    },
                    text: {
                        primary: colorTokens.white.pure,
                        secondary: colorTokens.grey[400],
                        disabled: colorTokens.grey[600],
                    },
                    divider: `rgba(255, 255, 255, ${colorTokens.opacity[10]})`,

                    // #used - Homepage semantic tokens (DARK MODE)
                    homepageSliderChipBg: "rgba(255, 255, 255, 0.08)",
                    homepageSliderChipHoverBg: "rgba(255, 255, 255, 0.15)",
                    homepageSliderChipSelectedBg: colorTokens.primary.light,
                    homepageSliderChipSelectedText: colorTokens.white.pure,
                    homepage: {
                        // Hero section
                        heroBg: "transparent", // Made transparent for global background
                        heroText: colorTokens.white.pure,
                        heroTextSecondary: colorTokens.grey[300],
                        heroTextShadow: 'rgba(255, 255, 255, 0.2)',

                        // Navigation
                        navBg: colorTokens.glass.dark.bg,
                        navBorder: colorTokens.glass.dark.border,
                        navShadow: colorTokens.glass.dark.shadow,

                        // Cards
                        cardBg: colorTokens.glass.dark.bgStrong,
                        cardBgHover: colorTokens.glass.dark.bgStrong,
                        cardBorder: colorTokens.glass.dark.border,
                        cardShadow: colorTokens.glass.dark.shadow,

                        // Buttons
                        buttonPrimary: colorTokens.primary.light,
                        buttonPrimaryHover: colorTokens.primary.lighter,
                        buttonPrimaryText: colorTokens.white.pure,
                        buttonSecondary: colorTokens.secondary.light,
                        buttonSecondaryHover: colorTokens.secondary.lighter,
                        buttonSecondaryText: colorTokens.white.pure,

                        // Tabs
                        tabActive: colorTokens.primary.light,
                        tabInactive: colorTokens.grey[400],
                        tabIndicator: colorTokens.primary.light,

                        // Text
                        textPrimary: colorTokens.white.pure,
                        textSecondary: colorTokens.grey[300],
                        textTertiary: colorTokens.grey[500],

                        // Borders & Dividers
                        border: `rgba(255, 255, 255, ${colorTokens.opacity[10]})`,
                        divider: `rgba(255, 255, 255, ${colorTokens.opacity[5]})`,

                        // Backgrounds
                        sectionBg: colorTokens.black.main,
                        sectionBgAlt: colorTokens.black.lighter,

                        // Arrows & Navigation
                        arrowBg: `rgba(255, 255, 255, ${colorTokens.opacity[30]})`,
                        arrowHover: `rgba(255, 255, 255, ${colorTokens.opacity[45]})`,
                        arrowColor: colorTokens.black.main,

                        // Course Placeholder (Locked colors)
                        coursePlaceholder: {
                            adventureIconBg: `rgba(145, 120, 230, 0.1)`,
                            adventureIcon: colorTokens.primary.lighter,
                            adventureButton: colorTokens.primary.lighter,
                            createIconGradient: `linear-gradient(135deg, ${colorTokens.primary.lighter} 0%, ${colorTokens.secondary.main} 100%)`,
                            createIconShadow: `0 10px 20px rgba(194, 33, 95, 0.3)`,
                            createButtonText: colorTokens.secondary.main,
                            createButtonHover: `rgba(194, 33, 95, 0.05)`,
                            errorIndicator: `#ff4d4d`,
                            reloadButtonBg: `#333333`,
                            reloadButtonHover: `#000000`,
                        },
                        signUpBtn: {
                            text: colorTokens.white.pure,
                            bg: "transparent",
                            hoverBg: colorTokens.primary.main,
                        },
                    },

                    // #used - Learning Page semantic tokens (DARK MODE)
                    learningPage: {
                        leftPanelBg: colorTokens.glass.dark.bg, // Glass bg
                        navBg: colorTokens.glass.dark.bg,
                        lessonActive: `rgba(107, 79, 217, 0.3)`, // primary.light with more opacity
                        lessonHover: "rgba(255, 255, 255, 0.05)",
                        textPrimary: colorTokens.white.pure,
                        textSecondary: colorTokens.grey[400],
                        divider: colorTokens.glass.dark.borderSubtle,
                        cardBg: colorTokens.glass.dark.bgStrong,
                        glassBorder: colorTokens.glass.dark.border,
                        glassShadow: colorTokens.glass.dark.shadow,
                        backdropFilter: colorTokens.glass.dark.backdropFilter,
                    },

                    // #used - Mobile Nav semantic tokens (DARK MODE)
                    mobileNav: {
                        drawerBg: colorTokens.glass.dark.bgStrong,
                        drawerBorder: colorTokens.glass.dark.border,
                        drawerShadow: colorTokens.glass.dark.shadowStrong,
                        itemHover: "rgba(255, 255, 255, 0.05)",
                    },

                    // #used - Notification Menu semantic tokens (DARK MODE)
                    notificationMenu: {
                        bg: colorTokens.glass.dark.bgStrong,
                        backdropFilter: "blur(20px)",
                        border: colorTokens.glass.dark.border,
                        shadow: "0 8px 32px rgba(0,0,0,0.5)",
                        itemBgRead: "transparent",
                        itemBgUnread: "rgba(69, 34, 186, 0.25)",
                        itemHover: "rgba(255,255,255,0.08)",
                        textPrimary: colorTokens.white.pure,
                        textSecondary: colorTokens.grey[400],
                        divider: "rgba(255,255,255,0.05)",
                    },

                    // #used - Course Explorer semantic tokens (DARK MODE)
                    courseExplorer: {
                        bg: colorTokens.glass.dark.bgStrong,
                        backdropFilter: "blur(20px)",
                        border: colorTokens.glass.dark.border,
                        shadow: "0 8px 32px rgba(0,0,0,0.5)",
                        sidebarBg: "rgba(0,0,0,0.2)",
                        headerBg: "rgba(10, 10, 20, 0.7)", // Semi-transparent for sticky header
                        itemHover: "rgba(255,255,255,0.08)",
                        textPrimary: colorTokens.white.pure,
                        textSecondary: colorTokens.grey[400],
                        divider: "rgba(255,255,255,0.05)",
                        activeItemBg: "rgba(69, 34, 186, 0.25)",
                    },

                    // #used - To Top Button semantic tokens (DARK MODE)
                    toTopButton: {
                        bg: colorTokens.glass.dark.bgStrong,
                        color: colorTokens.primary.lighter,
                        border: colorTokens.glass.dark.border,
                        shadow: "0 8px 32px rgba(0,0,0,0.3)",
                        hoverBg: colorTokens.primary.main,
                        hoverColor: colorTokens.white.pure,
                        backdropFilter: "blur(12px)",
                    },

                    // #used - Course Widget semantic tokens (DARK MODE)
                    courseWidget: {
                        bg: colorTokens.glass.dark.bgStrong,
                        border: colorTokens.glass.dark.border,
                        shadow: "0 8px 32px rgba(0,0,0,0.3)",
                        titleColor: colorTokens.white.pure,
                        authorColor: colorTokens.grey[400],
                        priceColor: colorTokens.primary.lighter,
                        divider: "rgba(255,255,255,0.05)",
                    },


                }
                : {
                    // LIGHT MODE
                    primary: {
                        main: colorTokens.primary.main,
                        light: colorTokens.primary.light,
                        dark: colorTokens.primary.dark,
                    },
                    secondary: {
                        main: colorTokens.secondary.main,
                        light: colorTokens.secondary.light,
                        dark: colorTokens.secondary.dark,
                    },
                    background: {
                        default: colorTokens.white.light,
                        paper: colorTokens.white.pure,
                        elevated: colorTokens.white.main,
                    },
                    text: {
                        primary: colorTokens.black.main,
                        secondary: colorTokens.grey[600],
                        disabled: colorTokens.grey[400],
                    },
                    divider: `rgba(0, 0, 0, ${colorTokens.opacity[10]})`,

                    // #used - Homepage semantic tokens (LIGHT MODE)
                    homepageSliderChipBg: colorTokens.grey[200],
                    homepageSliderChipHoverBg: colorTokens.grey[300],
                    homepageSliderChipSelectedBg: colorTokens.primary.light,
                    homepageSliderChipSelectedText: colorTokens.white.pure,
                    homepage: {
                        // Hero section
                        heroBg: "transparent", // Made transparent for global background
                        heroText: colorTokens.black.main,
                        heroTextSecondary: colorTokens.grey[600],
                        heroTextShadow: 'rgba(0, 0, 0, 0.3)',

                        // Navigation
                        navBg: colorTokens.glass.light.bg,
                        navBorder: colorTokens.glass.light.border,
                        navShadow: colorTokens.glass.light.shadow,

                        // Cards
                        cardBg: colorTokens.glass.light.bg,
                        cardBgHover: colorTokens.glass.light.bgStrong,
                        cardBorder: colorTokens.glass.light.border,
                        cardShadow: colorTokens.glass.light.shadow,

                        // Buttons
                        buttonPrimary: colorTokens.primary.main,
                        buttonPrimaryHover: colorTokens.primary.dark,
                        buttonPrimaryText: colorTokens.white.pure,
                        buttonSecondary: colorTokens.secondary.main,
                        buttonSecondaryHover: colorTokens.secondary.dark,
                        buttonSecondaryText: colorTokens.white.pure,

                        // Tabs
                        tabActive: colorTokens.primary.main,
                        tabInactive: colorTokens.grey[600],
                        tabIndicator: colorTokens.primary.main,

                        // Text
                        textPrimary: colorTokens.black.main,
                        textSecondary: colorTokens.grey[600],
                        textTertiary: colorTokens.grey[500],

                        // Borders & Dividers
                        border: `rgba(0, 0, 0, ${colorTokens.opacity[10]})`,
                        divider: `rgba(0, 0, 0, ${colorTokens.opacity[5]})`,

                        // Backgrounds
                        sectionBg: colorTokens.grey[100],
                        sectionBgAlt: colorTokens.white.main,

                        // Arrows & Navigation
                        arrowBg: `rgba(0, 0, 0, ${colorTokens.opacity[50]})`,
                        arrowHover: `rgba(0, 0, 0, ${colorTokens.opacity[65]})`,
                        arrowColor: colorTokens.white.main,

                        // Course Placeholder (Locked colors)
                        coursePlaceholder: {
                            adventureIconBg: `rgba(145, 120, 230, 0.1)`,
                            adventureIcon: colorTokens.primary.lighter,
                            adventureButton: colorTokens.primary.lighter,
                            createIconGradient: `linear-gradient(135deg, ${colorTokens.primary.lighter} 0%, ${colorTokens.secondary.main} 100%)`,
                            createIconShadow: `0 10px 20px rgba(194, 33, 95, 0.3)`,
                            createButtonText: colorTokens.secondary.main,
                            createButtonHover: `rgba(194, 33, 95, 0.05)`,
                            errorIndicator: `#ff4d4d`,
                            reloadButtonBg: `#333333`,
                            reloadButtonHover: `#000000`,
                        },
                        signUpBtn: {
                            text: colorTokens.primary.main,
                            bg: "rgba(69, 34, 186, 0.05)",
                            hoverBg: colorTokens.primary.dark,
                        },
                    },

                    // #used - Learning Page semantic tokens (LIGHT MODE)
                    learningPage: {
                        leftPanelBg: colorTokens.glass.light.bg,
                        navBg: colorTokens.glass.light.bg,
                        lessonActive: `rgba(69, 34, 186, 0.15)`, // primary.main with 0.15 opacity
                        lessonHover: "rgba(0, 0, 0, 0.03)",
                        textPrimary: colorTokens.black.main,
                        textSecondary: colorTokens.grey[600],
                        divider: colorTokens.glass.light.borderSubtle,
                        cardBg: colorTokens.glass.light.bgStrong,
                        glassBorder: colorTokens.glass.light.border,
                        glassShadow: colorTokens.glass.light.shadow,
                        backdropFilter: colorTokens.glass.light.backdropFilter,
                    },

                    // #used - Mobile Nav semantic tokens (LIGHT MODE)
                    mobileNav: {
                        drawerBg: colorTokens.glass.light.bgStrong,
                        drawerBorder: colorTokens.glass.light.border,
                        drawerShadow: colorTokens.glass.light.shadowStrong,
                        itemHover: "rgba(0, 0, 0, 0.03)",
                    },

                    // #used - Notification Menu semantic tokens (LIGHT MODE)
                    notificationMenu: {
                        bg: "rgba(255, 255, 255, 0.85)",
                        backdropFilter: "blur(20px)",
                        border: colorTokens.glass.light.border,
                        shadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
                        itemBgRead: "transparent",
                        itemBgUnread: "rgba(69, 34, 186, 0.08)",
                        itemHover: "rgba(0, 0, 0, 0.04)",
                        textPrimary: colorTokens.black.main,
                        textSecondary: colorTokens.grey[600],
                        divider: "rgba(0,0,0,0.05)",
                    },

                    // #used - Course Explorer semantic tokens (LIGHT MODE)
                    courseExplorer: {
                        bg: "rgba(255, 255, 255, 0.95)", // Strong opacity
                        backdropFilter: "blur(20px)",
                        border: colorTokens.glass.light.border,
                        shadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
                        sidebarBg: "rgba(0,0,0,0.02)",
                        headerBg: "rgba(255, 255, 255, 0.8)",
                        itemHover: "rgba(0,0,0,0.04)",
                        textPrimary: colorTokens.black.main,
                        textSecondary: colorTokens.grey[600],
                        divider: "rgba(0,0,0,0.05)",
                        activeItemBg: "rgba(69, 34, 186, 0.08)",
                    },

                    // #used - To Top Button semantic tokens (LIGHT MODE)
                    toTopButton: {
                        bg: colorTokens.glass.light.bgStrong,
                        color: colorTokens.primary.main,
                        border: colorTokens.glass.light.border,
                        shadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
                        hoverBg: colorTokens.primary.main,
                        hoverColor: colorTokens.white.pure,
                        backdropFilter: "blur(12px)",
                    },

                    // #used - Course Widget semantic tokens (LIGHT MODE)
                    courseWidget: {
                        bg: colorTokens.glass.light.bgStrong,
                        border: colorTokens.glass.light.border,
                        shadow: "0 8px 32px rgba(31, 38, 135, 0.1)",
                        titleColor: colorTokens.black.main,
                        authorColor: colorTokens.grey[600],
                        priceColor: colorTokens.primary.main,
                        divider: "rgba(0,0,0,0.05)",
                    },

                }),

            // Common colors (same in both modes)
            success: {
                main: colorTokens.success,
            },
            warning: {
                main: colorTokens.warning,
            },
            error: {
                main: colorTokens.error,
            },
            info: {
                main: colorTokens.info,
            },

            // ========================================
            // LEGACY PALETTE PROPERTIES
            // For backward compatibility with non-refactored components
            // ========================================
            grey: {
                grey0: mode === "dark" ? "#121212" : "#FFFFFF",
                grey10: mode === "dark" ? "#1E1E1E" : "#F6F6F6",
                grey50: mode === "dark" ? "#232323" : "#F0F0F0",
                grey100: mode === "dark" ? "#2C2C2C" : "#E0E0E0",
                grey150: mode === "dark" ? "#383838" : "#DEDEDE",
                grey200: mode === "dark" ? "#4F4F4F" : "#C2C2C2",
                grey300: mode === "dark" ? "#828282" : "#A3A3A3",
                grey400: mode === "dark" ? "#BDBDBD" : "#858585",
                grey500: mode === "dark" ? "#E0E0E0" : "#666666",
                grey600: mode === "dark" ? "#F2F2F2" : "#4D4D4D",
                grey700: mode === "dark" ? "#F5F5F5" : "#333333",
                grey800: mode === "dark" ? "#FAFAFA" : "#1A1A1A",
                grey900: mode === "dark" ? "#FFFFFF" : "#0A0A0A",
                grey1000: mode === "dark" ? "#FFFFFF" : "#000000",
            },
            customDivider: {
                main: mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
            },
            neutral: {
                shadow: colorTokens.black.main,
                darkBlueGrey: colorTokens.blue.darkBlueGrey,
                main: colorTokens.grey[500],
                light: colorTokens.grey[200],
                lighter: colorTokens.grey[100],
                nearWhite: colorTokens.white.light,
                offWhite: colorTokens.white.light,
                translucentWhite: colorTokens.translucentWhite.x1,
                translucentWhiteStrong: colorTokens.translucentWhite.x8,
                translucentBlack: colorTokens.translucentBlack.x5,
                translucentBlackLight: colorTokens.translucentBlack.x25,
            },
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
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: "none",
                        borderRadius: "8px",
                    },
                },
            },
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        minHeight: "100vh",
                        backgroundColor: mode === 'dark' ? "#0f0f13" : "#F0F4F8",
                        position: "relative",
                        "&::before": {
                            content: '""',
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            zIndex: -2,
                            backgroundImage: mode === 'dark'
                                ? colorTokens.glassMorphism.backgroundImageDark
                                : colorTokens.glassMorphism.backgroundImageLight,
                            backgroundSize: "100% 100%",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }
                    },
                    "#root": {
                        position: "relative",
                        minHeight: "100vh",
                        "&::before": {
                            ...colorTokens.glassMorphism.noise
                        }
                    },
                    "*::-webkit-scrollbar": {
                        width: "6px",
                        height: "6px",
                    },
                    "*::-webkit-scrollbar-track": {
                        background: "transparent",
                    },
                    "*::-webkit-scrollbar-thumb": {
                        background: mode === 'dark' ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)",
                        borderRadius: "10px",
                        transition: "background 0.3s ease",
                    },
                    "*::-webkit-scrollbar-thumb:hover": {
                        background: mode === 'dark' ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)",
                    },
                },
            },
        },
    };
};

export default themeSettings;

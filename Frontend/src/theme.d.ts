import "@mui/material/styles";
import "@mui/material/Typography";
import React from "react";

/* =======================
   Custom type aliases
======================= */

type H7 = React.CSSProperties;
type H7Bold = React.CSSProperties;
type H3Bold = React.CSSProperties;
type H4Bold = React.CSSProperties;

type GlassMorphismCard = {
    background: string;
    backdropFilter: string;
    WebkitBackdropFilter: string;
    borderTop: string;
    borderLeft: string;
    borderBottom: string;
    borderRight: string;
    borderRadius: string;
    boxShadow: string;
};

/* =======================
   Module augmentation
======================= */

declare module "@mui/material/styles" {
    interface Palette {
        glassMorphismCard: GlassMorphismCard;
    }

    interface PaletteOptions {
        glassMorphismCard?: GlassMorphismCard;
    }

    interface TypographyVariants {
        h7: H7;
        h7bold: H7Bold;
        h3bold: H3Bold;
        h4bold: H4Bold;
    }

    interface TypographyVariantsOptions {
        h7?: H7;
        h7bold?: H7Bold;
        h3bold?: H3Bold;
        h4bold?: H4Bold;
    }
}

declare module "@mui/material/Typography" {
    interface TypographyPropsVariantOverrides {
        h7: true;
        h7bold: true;
        h3bold: true;
        h4bold: true;
    }
}

import '@mui/material/styles';

type glassMorphismCard = {
    background: string,
    backdropFilter: string,
    WebkitBackdropFilter: string,
    borderTop: string,
    borderLeft: string,
    borderBottom: string,
    borderRight: string,
    borderRadius: string,
    boxShadow: string,
}

declare module '@mui/material/styles' {
    interface Palette {
        glassMorphismCard: glassMorphismCard
    }
    interface PaletteOptions {
        glassMorphismCard?: glassMorphismCard;
    }
}

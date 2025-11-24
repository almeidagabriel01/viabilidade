export const THRESHOLD_POSITIVE = 60;
export const THRESHOLD_MODERATE = 50;

export const VIABILITY_RANGES = {
    POSITIVE: { min: THRESHOLD_POSITIVE, max: 100, label: "Alta" },
    MODERATE: { min: THRESHOLD_MODERATE, max: THRESHOLD_POSITIVE - 1, label: "Moderada" },
    NEGATIVE: { min: 0, max: THRESHOLD_MODERATE - 1, label: "Baixa" },
};

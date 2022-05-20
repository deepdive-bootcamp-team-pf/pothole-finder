export interface Pothole {
    potholeId: string | null,
    potholeProfileId: string | null,
    potholeDate: Date | null,
    potholeDescription: string | null,
    potholeLat: string | undefined,
    potholeLng: string | undefined,
    potholeSeverity: string
}
export interface PartialProfile {
    profileId: string | null,
    profileEmail: string,
    profileFirstName: string,
    profileHash: string,
    profileLastName: string,
    profileUsername: string
}

export interface Profile {
    profileId: string | null,
    profileAuthenticationToken: string | null,
    profileEmail: string,
    profileFirstName: string,
    profileHash: string,
    profileLastName: string,
    profileUsername: string
}
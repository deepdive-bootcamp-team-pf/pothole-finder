export interface Profile {
    profileId: string | null,
    profileAuthenticationToken: string | null,
    profileEmail: string,
    profileFirstName: string,
    profileHash: string | null,
    profileLastName: string,
    profileUsername: string
}
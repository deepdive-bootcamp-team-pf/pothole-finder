export interface Profile {
    profileId: string | null,
    profileAuthenticationToken: string | null,
    profileEmail: string,
    profileFirstName: string,
    profileHash: string,
    profileLastName: string,
    profileUsername: string
}
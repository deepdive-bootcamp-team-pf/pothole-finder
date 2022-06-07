// import { Request, Response } from 'express'
// import { uploadToCloudinary } from '../../utils/cloudinary.utils'
//
// export async function photoUploadController (request: Request, response: Response): Promise<Response> {
//     try {
//         // uncomment if in production
//         if (request.file === undefined) {
//             throw new Error('Please provide a valid file type ')
//         }
//
//         const message: string = await uploadToCloudinary(request.file)
//         //insert photo (into the database)
//         return response.json({ status: 200, data: null, message: message })
//     } catch (error: any) {
//         return response.json({ status: 400, message: error.message, data: null })
//     }
// }
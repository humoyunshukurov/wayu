import {diskStorage} from "multer";
import {extname} from "path";
import {randomUUID} from "crypto";
import {BadRequestException} from "@nestjs/common";

export function imageStorage(folder: string) {
    return diskStorage({
        destination: `./uploads/${folder}`,
        filename: (_req, file, cb) => {
            cb(null, `${randomUUID()}${extname(file.originalname)}`);
        },
    });
}

export function fileFilter(allowedTypes: RegExp) {
    return (_req: any, file: Express.Multer.File, cb: any) => {
        if (!allowedTypes.test(extname(file.originalname).toLowerCase())) {
            return cb(new BadRequestException('Invalid file type'), false);
        }
        cb(null, true);
    };
}

export const imageFilter = fileFilter(/\.(jpg|jpeg|png|webp)$/);
export const pdfFilter = fileFilter(/\.(pdf)$/);

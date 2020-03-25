import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(
    process.env.PRODUCTION ? process.env.MONGO_URL_PROD : process.env.MONGO_URL,
    {
        useNewUrlParser : true,
        useFindAndModify : false
    }
);
const db = mongoose.connection;
const handleOpen = () => console.log("✅ Connected to DB");
const handleError = error => console.log("❌ Error on DB Connection:${error}");

db.once("open", handleOpen);
db.on("error", handleError);


// import { hostname } from "os";

// export const videos = [
//     {
//         id: 12345,
//         title: "Pasasite",
//         description: "This is something I love",
//         views: 24,
//         videoFile :
//         "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//         creator: {
//             id: 121212,
//             name: "junho-Bong",
//             email: "Bong@naver.com"
//         }
//     },
//     {
//     id: 23456,
//     title: "The Host",
//     description: "This is something I horror",
//     views: 502,
//     videoFile :
//     "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//     creator: {
//         id: 121212,
//         name: "junho-Bong",
//         email: "Bong@naver.com"
//     }
// },
// {
//     id: 23456,
//     title: "Okja",
//     description: "This is something I action",
//     views: 192,
//     videoFile :
//     "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//     creator: {
//         id: 121212,
//         name: "junho-Bong",
//         email: "Bong@naver.com"
//     }
// },
// {
//     id: 23456,
//     title: "Memories Of Murder,",
//     description: "This is something I Crime",
//     views: 2866,
//     videoFile :
//     "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//     creator: {
//         id: 121212,
//         name: "junho-Bong",
//         email: "Bong@naver.com"
//     }
// }
// ];
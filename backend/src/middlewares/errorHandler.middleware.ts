import { ErrorRequestHandler } from "express";
import { HTTPSTATUS } from "../config/http.config";

const errorHandler:ErrorRequestHandler = (err, req, res, next): any => {
    console.error(`Error Occured on Path: ${req.path} Error: ${err.message}`);

    if(err instanceof SyntaxError){
        return res.status(HTTPSTATUS.BAD_REQUEST).json({
            success: false,
            message: "Invalid JSON payload provided.",
        });
    }

    return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err?.message || "Internal Server Error",
    });
}

export { errorHandler };

// app.get("/api/user/:id", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// }); yeh wala try catch ab harr jagah lagega toh code bohot messy ho jayega isliye hum error handling middleware banayenge jo sare errors ko handle karega

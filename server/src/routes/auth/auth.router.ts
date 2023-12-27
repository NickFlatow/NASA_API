import express from 'express';

export const authRouter = express.Router();

authRouter.get('/message', checkloggedIn, (req, res) => {
    res.json({ message: 'secret' });
});

authRouter.get('/google', (req, res) => {
    res.json({ message: 'google' });
});

authRouter.get('/google/callback', (req, res) => {
    res.json({ message: 'callback' });
});

authRouter.get('/logout', (req, res) => {
    res.json({ message: 'logout' });
});



function checkloggedIn(req: express.Request, res: express.Response, next: express.NextFunction) {
    const isloggedIn = true;
    if (!isloggedIn) {
        return res.status(401).json({ error: 'Unauthorised' });    
    }
    next();   
}
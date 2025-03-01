import express from 'express';

const router = express.Router();

router.get('/test', (req, res) => {
    res.send('Hello test Server is running');
})

export default router;

import { Router } from 'express';
import {
    getArticles,
    getArticleBySlug,
    createArticle,
    updateArticle,
    deleteArticle,
} from '../controllers/article.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/articles', getArticles);
router.get('/article/:slug', getArticleBySlug);
router.post('/article', authenticate, createArticle);
router.put('/article/:id', authenticate, updateArticle);
router.delete('/article/:id', authenticate, deleteArticle);

export default router;

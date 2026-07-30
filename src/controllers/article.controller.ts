import * as ArticleService from '../services/article.service.js';
import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ArticleSchema, type ArticleInput } from '../validations/article.schema.js';

// get Articles
export const getArticles = asyncHandler(async (_req: Request, res: Response) => {
    const articles = await ArticleService.getArticles();
    return res.status(200).json({
        success: true,
        data: articles,
    });
});

// get ArticleBySlug
export const getArticleBySlug = asyncHandler(
    async (req: Request<{ slug: string }>, res: Response) => {
        const article = await ArticleService.getArticleBySlug(req.params.slug);
        return res.status(200).json({
            success: true,
            data: article,
        });
    }
);

// create Article
export const createArticle = asyncHandler(
    async (req: Request<object, object, ArticleInput>, res: Response) => {
        // validate with zod
        const validateData = ArticleSchema.safeParse(req.body);
        if (!validateData.success) {
            return res.status(400).json({
                success: false,
                errors: validateData.error.flatten(),
            });
        }
        const article = await ArticleService.createArticle({
            ...validateData.data,
        });
        return res.status(201).json({
            success: true,
            message: 'Article created successfully.',
            data: article,
        });
    }
);

// update Article
export const updateArticle = asyncHandler(
    async (req: Request<{ id: string }, object, ArticleInput>, res: Response) => {
        // validate with zod
        const validateData = ArticleSchema.safeParse(req.body);
        if (!validateData.success) {
            return res.status(400).json({
                success: false,
                errors: validateData.error.flatten(),
            });
        }

        const article = await ArticleService.updateArticle(req.params.id, {
            ...validateData.data,
        });

        return res.status(200).json({
            success: true,
            message: 'Article update successfully.',
            data: article,
        });
    }
);

// delete Article
export const deleteArticle = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    await ArticleService.deleteArticle(req.params.id);
    return res.status(200).json({
        success: true,
        message: 'Article delete successfully.',
    });
});

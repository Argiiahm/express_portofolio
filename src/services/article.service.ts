import prisma from '../config/prisma.js';
import { generateSlug } from '../utils/slug.js';
import type { ArticleInput } from '../validations/article.schema.js';

// get Articles
export const getArticles = async () => {
    const articles = await prisma.articles.findMany();
    return articles;
};

// get ArticlesBySlug
export const getArticleBySlug = async (slug: string) => {
    const article = await prisma.articles.findUnique({
        where: { slug },
    });

    if (!article) {
        throw new Error('Article not found');
    }

    return article;
};

// create Article
export const createArticle = async (data: ArticleInput) => {
    const slug = generateSlug(data.title);
    return await prisma.articles.create({
        data: {
            ...data,
            slug,
        },
    });
};

// update Article
export const updateArticle = async (id: string, data: ArticleInput) => {
    const article = await prisma.articles.findUnique({
        where: { id },
    });

    if (!article) {
        throw new Error('Article not found');
    }

    let slug = article.slug;
    if (article.title !== data.title) {
        slug = generateSlug(data.title);
    }

    return await prisma.articles.update({
        where: { id },
        data: {
            ...data,
            slug,
        },
    });
};

// delete Article
export const deleteArticle = async (id: string) => {
    const article = await prisma.articles.findUnique({
        where: { id },
    });

    if (!article) {
        throw new Error('Article not found');
    }

    return await prisma.articles.delete({
        where: { id },
    });
};

import prisma from '../config/prisma.js';
import { generateSlug } from '../utils/slug.js';

type ProjectType = {
    name: string;
    imageUrl?: string;
    url?: string;
    description: string[];
    techStack: string[];
};

// get all project
export const getProjects = async () => {
    return prisma.project.findMany({
        orderBy: {
            created_at: 'asc',
        },
    });
};

// get project by slug
export const getProjectBySlug = async (slug: string) => {
    const project = await prisma.project.findUnique({
        where: {
            slug: slug,
        },
    });

    if (!project) {
        throw new Error('Project Not Found');
    }

    return project;
};

// create Project
export const createProject = async (data: ProjectType) => {
    // slug
    const slug = generateSlug(data.name);
    // create
    return await prisma.project.create({
        data: {
            ...data,
            slug,
        },
    });
};

// update project
export const updateProject = async (id: string, data: ProjectType) => {
    const project = await prisma.project.findUnique({
        where: {
            id: id,
        },
    });

    if (!project) {
        throw new Error('Project not found');
    }

    // update slug
    let slug = project.slug;
    if (project.name !== data.name) {
        slug = generateSlug(data.name);
    }

    // update
    return await prisma.project.update({
        where: {
            id: project.id,
        },
        data: {
            ...data,
            slug,
        },
    });
};

// delete Project
export const deleteProject = async (id: string) => {
    const project = await prisma.project.findUnique({
        where: {
            id: id,
        },
    });

    if (!project) {
        throw new Error('Project not found');
    }

    await prisma.project.delete({
        where: {
            id: project.id,
        },
    });
};

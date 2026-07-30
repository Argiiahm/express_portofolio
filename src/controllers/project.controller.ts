import * as ProjectService from '../services/project.service.js';
import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ProjectSchema, type ProjectInput } from '../validations/project.schema.js';

// getProjects
export const getProjects = asyncHandler(async (_req: Request, res: Response) => {
    const projects = await ProjectService.getProjects();

    return res.status(200).json({
        success: true,
        data: projects,
    });
});

//  getProjectBySlug
export const getProjectBySlug = asyncHandler(
    async (req: Request<{ slug: string }>, res: Response) => {
        const project = await ProjectService.getProjectBySlug(req.params.slug);
        return res.status(200).json({
            success: true,
            data: project,
        });
    }
);

// createProject
export const createProject = asyncHandler(
    async (req: Request<object, object, ProjectInput>, res: Response) => {
        // validate with zod
        const validateData = ProjectSchema.safeParse(req.body);
        if (!validateData.success) {
            return res.status(400).json({
                success: false,
                errors: validateData.error.flatten(),
            });
        }

        // create project
        const project = await ProjectService.createProject({ ...validateData.data });
        return res.status(201).json({
            success: true,
            message: 'project created successfully.',
            data: project,
        });
    }
);

// updateProject
export const updateProject = asyncHandler(
    async (req: Request<{ id: string }, object, ProjectInput>, res: Response) => {
        // validate with zod
        const validateData = ProjectSchema.safeParse(req.body);
        if (!validateData.success) {
            return res.status(400).json({
                success: false,
                errors: validateData.error.flatten(),
            });
        }

        // update project
        const project = await ProjectService.updateProject(req.params.id, {
            ...validateData.data,
        });
        return res.status(200).json({
            success: true,
            message: 'project update successfully.',
            data: project,
        });
    }
);

// deleteProject
export const deleteProject = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    await ProjectService.deleteProject(req.params.id);
    return res.status(200).json({
        success: true,
        message: 'project delete successfully.',
    });
});
